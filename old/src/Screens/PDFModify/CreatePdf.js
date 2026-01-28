import MUIRichTextEditor from "mui-rte"
import { useContext, useEffect, useState } from "react"
import { stateToHTML } from "draft-js-export-html"
import {
  convertFromHTML,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@mui/styles"
import { GenerateContract_API } from "../../APIs/API"
import { useMutation } from "react-query"
import { Box, Container, Divider, Grid, Typography } from "@mui/material"
import MenuBar from "../../Components/Utils/MenuBar"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"
import CircularLoader from "../../Components/Utils/CircularLoader"
import SignatureCanvas from "react-signature-canvas"
import ModalContainer from "../../Components/Utils/ModalContainer"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"
import { LanguageContext } from "../../Contexts/LanguageContext"

const CreatePdf = () => {
  const user = JSON.parse(sessionStorage.getItem("user"))

  const { lang, language } = useContext(LanguageContext)

  const [open, setopen] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sign, setSign] = useState(null)
  const [contractName, setContractName] = useState(null)
  const [url, setUrl] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)
  const [drawerState, setDrawerState] = useState(false)

  const date = new Date()

  const toggleOpen = () => {
    setopen(!open)
  }

  const toggleDrawer = () => {
    setDrawerState(!drawerState)
  }

  const textEditorControls = [
    "bold",
    "italic",
    "numberList",
    "bulletList",
    "save",
  ]

  const [contract, setContract] = useState(null)
  const HTMLToTextEditor = (sampleMarkup) => {
    let sampleMarkupVar = sampleMarkup === null ? "" : sampleMarkup
    // 1. Convert the HTML
    const contentHTML = convertFromHTML(sampleMarkupVar)

    // 2. Create the ContentState object
    const state = ContentState.createFromBlockArray(
      contentHTML.contentBlocks,
      contentHTML.entityMap,
    )

    // 3. Stringify `state` object from a Draft.Model.Encoding.RawDraftContentState object
    const content = JSON.stringify(convertToRaw(state))
    // value = content
    return content
  }

  const myTheme = createTheme({
    overrides: {
      MUIRichTextEditor: {
        container: {
          minHeight: "222px",
          minWidth: "100%",
          position: "relative",
        },
        editorContainer: {
          marginTop: 10,
        },
        toolbar: {
          marginTop: -10,
          borderBottom: "2px solid #e3e4ed",
        },
      },
    },
  })

  const UploadFile = () => {
    const data = new FormData()
    data.append("pdf", contract)
    data.append("companyname", user?.name)
    data.append("companyid", user?.id)
    data.append("companyaddress", user?.address)
    data.append("companysignature", url)
    data.append("contractname", contractName)
    UploadContractMutation.mutate(data)
  }

  const UploadContractMutation = useMutation("GenerateContract_API", {
    mutationFn: GenerateContract_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        window.open(
          `${process.env.REACT_APP_ENDPOINT_URL}/contract/${data?.data?.data}`,
          "_blank",
        )
        setOpenModal(!openModal)
      }
    },
  })

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 1024

  return (
    <>
      <CompanySideBar
        open={open}
        drawerState={drawerState}
        setIsLoading={setIsLoading}
        toggleDrawer={toggleDrawer}
      />
      <Grid
        sx={{
          ...styles.container,
          ...{
            marginLeft:
              language === "english" && open
                ? { lg: "20%", md: "0%", xs: "0%" }
                : "4.5%",
            marginRight:
              language === "arabic" && open
                ? { lg: "20%", md: "0%", xs: "0%" }
                : "4.5%",
          },
        }}>
        <Grid item xs={3}>
          <MenuBar
            title={lang.generatecontract}
            onClick={isMobile ? toggleDrawer : toggleOpen}
            open={open}
            lang={lang}
          />
        </Grid>
        <Box sx={styles.root}>
          <Grid item xs={9}>
            <Container maxWidth="xl">
              {isLoading && <CircularLoader />}
              <TextInputComponent
                textStyle={{ color: "#000" }}
                name={lang.contractname}
                type="text"
                value={contractName}
                refState={(e) => {
                  setContractName(e.target.value)
                }}
                helperText={lang.incorrectinput}
                required
              />
              <Box sx={{ marginBottom: 5, direction: "ltr" }}>
                <Typography
                  sx={{
                    textAlign: "right",
                    fontWeight: "600",
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  :إنه في يوم الموافق __ / __ / __ أبرم هذا العقد بين كل من
                </Typography>
                <Grid container>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      الطرف الثاني
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      _____________________________
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      المقيم في
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      _____________________________
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      و يحمل رقم قومي
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      _____________________________
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      الطرف الاول الشركة
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      {user?.name}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      و مقرها
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      {user?.address}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={styles.formContainer}>
                <Box style={styles.formHeader}>
                  <Typography
                    sx={{
                      ...styles.formTitle,
                      ...{
                        textAlign: language === "english" ? "left" : "right",
                      },
                    }}>
                    {lang.contractcontent}
                  </Typography>
                </Box>
                <Divider sx={styles.divider} />
                <ThemeProvider theme={myTheme}>
                  <MUIRichTextEditor
                    style={styles.textEditorBorder}
                    label={lang.placetext}
                    controls={textEditorControls}
                    defaultValue={contract ? HTMLToTextEditor(contract) : null}
                    onSave={(data) => {
                      setContract(stateToHTML(convertFromRaw(JSON.parse(data))))
                    }}
                  />
                </ThemeProvider>
              </Box>
              <Grid container sx={{ direction: "ltr" }}>
                <Grid item xs={6}>
                  <Box>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      اسم الطرف الثاني
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      _____________________________
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      التاريخ
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      __ / __ / __
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      التوقيع
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      _____________________________
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      اسم الطرف الاول
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      {user?.name}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      التاريخ
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      {`${date.getDate()} / ${
                        date.getMonth() + 1
                      } / ${date.getFullYear()}`}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 18,
                      }}>
                      التوقيع
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontSize: 16,
                        marginBottom: 2,
                      }}>
                      _____________________________
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
            <Box sx={styles.primaryBtnContainer}>
              <PrimaryBtn
                disabled={!contract || !contractName}
                title={lang.generatecontract}
                btnStyle={styles.primaryBtn}
                onClick={() => setOpenModal(!openModal)}
              />
            </Box>
            {!contract && (
              <Typography sx={{ fontSize: 14, marginTop: 1 }}>
                {lang.savecontractcontent}
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
      <ModalContainer
        modalState={openModal}
        modalChangeState={setOpenModal}
        modalTitle={lang.signcontract}
        modalAction={() => {
          UploadFile()
        }}
        btnPlaceholder=""
        btnTitle={lang.signcontract}
        disabled={!url}
        deletbtnTitle={"Clear"}
        deleteAction={() => {
          setUrl(sign?.clear())
        }}
        deletbtnStyle={styles.secondaryBtn}>
        <Box>
          <SignatureCanvas
            ref={(data) => setSign(data)}
            onEnd={() =>
              setUrl(sign?.getTrimmedCanvas().toDataURL("image/png"))
            }
            penColor="#000"
            canvasProps={{
              justifyContent: "center",
              width: 620,
              height: 200,
              className: "sigCanvas",
              border: 0,
            }}
          />
        </Box>
      </ModalContainer>
    </>
  )
}

const styles = {
  container: {
    display: "block",
  },
  root: {
    position: "relative",
    padding: "20px 15px",
    "overflow-x": "hidden",
  },
  formContainer: {
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px 0 #cfd8dc, 0 0 0 1px #f1f1f1",
    backgroundColor: "#ffffff",
    marginBottom: "24px",
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "space-between",
  },
  formTitle: {
    fontFamily: "Avenir",
    fontSize: "20px",
    fontWeight: "900",
    color: "#171725",
    display: "inline-block",
    alignItems: "center",
  },
  formSubTitle: {
    fontFamily: "Avenir",
    fontSize: "16px",
    fontWeight: "500",
    color: "#a9a9a9",
    display: "block",
  },
  divider: {
    width: "100%",
    height: "1px",
    margin: "15px 0px 15px 0px",
    borderRadius: "12px",
    backgroundColor: "#e3e4ed",
  },
  textEditorBorder: {
    "& .MUIRichTextEditor-toolbar": {
      borderBottom: "1px solid red",
    },
  },
  primaryBtnContainer: {
    marginTop: 5,
    justifyContent: "center",
    display: "flex",
  },
  primaryBtn: {
    backgroundColor: "#042f36",
    borderColor: "#042f36",
    height: "40px",
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      opacity: 0.5,
    },
  },
  secondaryBtn: {
    backgroundColor: "#ff0000",
    borderColor: "#ff0000",
    height: "40px",
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#ff0000",
      borderColor: "#ff0000",
      opacity: 0.5,
    },
  },
}

export default CreatePdf
