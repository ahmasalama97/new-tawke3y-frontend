import { useState, useEffect, useContext } from "react"
import { useInfiniteQuery, useMutation } from "react-query"
import SignatureCanvas from "react-signature-canvas"
import {
  Container,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material"
import { useSnackbar } from "notistack"
import {
  GetContracts_API,
  ResendCode_API,
  SendMail_API,
  SignContract_API,
  VerifyEmail_API,
} from "../../APIs/API"
import { LanguageContext } from "../../Contexts/LanguageContext"
import ContractCard from "../../Components/Cards/ContractCard"
import CircularLoader from "../../Components/Utils/CircularLoader"
import SideBar from "../../Components/SideBar/SideBar"
import MenuBar from "../../Components/Utils/MenuBar"
import ModalContainer from "../../Components/Utils/ModalContainer"
import ErrorSection from "../../Components/PageHandler/ErrorSection"
import SearchBarComponent from "../../Components/FormComponents/SearchBarComponent"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"

const Contracts = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { lang, language } = useContext(LanguageContext)

  const user = JSON.parse(sessionStorage.getItem("user"))

  const username = user?.username

  const [width, setWidth] = useState(window.innerWidth)
  const [search, setSearch] = useState("")
  const [openVerifyCodeModal, setOpenVerifyCodeModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [open, setopen] = useState(true)
  const [drawerState, setDrawerState] = useState(false)
  const [contractid, setContractid] = useState(null)
  const [companyid, setCompanyid] = useState(null)
  const [cid, setCid] = useState(null)
  const [sign, setSign] = useState(null)
  const [url, setUrl] = useState(null)
  const [loading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const toggleDrawer = () => {
    setDrawerState(!drawerState)
  }

  const toggleOpen = () => {
    setopen(!open)
  }

  const [verifyPayload, setVerifyPayload] = useState({
    code: "",
    email: user?.email,
  })

  useEffect(() => {
    if (verifyPayload.code) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [verifyPayload.code])

  const {
    isLoading,
    isSuccess,
    isError,
    isFetchingNextPage,
    hasNextPage,
    data,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery(
    ["getwebcontracts", search, username],
    ({ pageParam = 1, signed = 0 }) =>
      GetContracts_API({ search, pageParam, signed, username }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.page !== "full") {
          return pages.length + 1
        } else {
          return undefined
        }
      },
      staleTime: 999,
    },
  )

  useEffect(() => {
    const handleScroll = () => {
      const isWindowBottomReached =
        window.innerHeight + window.scrollY >= document.body.scrollHeight

      if (!isFetchingNextPage && isWindowBottomReached && hasNextPage) {
        fetchNextPage()
      }
    }

    // Add event listener
    window.addEventListener("scroll", handleScroll)

    // Remove event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasNextPage, fetchNextPage, isFetchingNextPage])

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

  const signContractPayload = {
    userid: user?.id,
    username: user?.username,
    companyid: companyid,
    contractid: contractid,
    signature: url,
    id: cid,
    name: user?.name,
    address: user?.address,
  }

  const SignatureMutation = useMutation("SignContract_API", {
    mutationFn: SignContract_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar("Something Went Wrong! Please try agin", {
        variant: "error",
      })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        setOpenModal(false)
        enqueueSnackbar("Contract Signatured Successfully", {
          variant: "success",
        })
        refetch()
      } else {
        setOpenModal(false)
        enqueueSnackbar("Error in Signing Contract! Please try agin", {
          variant: "warning",
        })
      }
    },
  })

  const SendEmailMutation = useMutation("SendSignEmail_API", {
    mutationFn: SendMail_API,
    onMutate: () => {},
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, { variant: "error" })
    },
    onSuccess: (data) => {
      setIsLoading(false)
    },
  })

  const ResendMutation = useMutation("ResendSignatureCode_API", {
    mutationFn: ResendCode_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, { variant: "error" })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        enqueueSnackbar(lang.emailverifysuccess, { variant: "success" })
      } else {
        enqueueSnackbar(lang.errorResponse, {
          variant: "warning",
        })
      }
    },
  })

  const VerifyMutation = useMutation("VerifySignEmail_API", {
    mutationFn: VerifyEmail_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, { variant: "error" })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        setOpenVerifyCodeModal(!openVerifyCodeModal)
        setOpenModal(!openModal)
        enqueueSnackbar(lang.codeverified, { variant: "success" })
      } else {
        enqueueSnackbar(
          language === "english" ? data?.data?.reason : data?.data?.reasonar,
          { variant: "warning" },
        )
      }
    },
  })

  let SearchHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase()
    setSearch(lowerCase)
  }

  return (
    <>
      <SideBar
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
          <BackToHomeBtn lang={lang} language={language} />
          <MenuBar
            title={lang.contracts}
            onClick={isMobile ? toggleDrawer : toggleOpen}
            open={open}
          />
        </Grid>
        <Box sx={styles.root}>
          <Grid item xs={9}>
            <SearchBarComponent
              searchPlaceholder={`${lang.search} ${lang.contracts}`}
              search={search}
              state={SearchHandler}
              language={language}
            />
            <Container maxWidth="xl">
              {isLoading || loading ? <CircularLoader /> : null}
              {isError && (
                <ErrorSection
                  onClick={() => refetch()}
                  image={require("../../assets/contract.png")}
                  text={lang.errorcontracts}
                />
              )}
              {data?.pages?.map((page) => page?.data?.contracts?.data)[0]
                .length === 0 && (
                <ErrorSection
                  image={require("../../assets/contract.png")}
                  text={lang.noContracts}
                />
              )}
              {isSuccess &&
                data?.pages?.map((page) =>
                  page?.data?.contracts?.data.map((contract) => {
                    return (
                      <ContractCard
                        contractName={contract?.contractname}
                        date={contract?.uploadedAt}
                        signed={contract?.signed}
                        signedAt={contract?.signedAt}
                        originalFile={`${process.env.REACT_APP_ENDPOINT_URL}/${contract?.contractfile}`}
                        setOpenModal={() => {
                          SendEmailMutation.mutate({
                            email: user?.email,
                          })
                          setOpenVerifyCodeModal(!openVerifyCodeModal)
                          setContractid(contract?.contractid)
                          setCompanyid(contract?.companyid)
                          setCid(contract?.id)
                        }}
                        lang={lang}
                        language={language}
                      />
                    )
                  }),
                )}
              {isFetchingNextPage && (
                <CircularProgress size={30} sx={{ color: "#042f36" }} />
              )}
            </Container>
          </Grid>
        </Box>
      </Grid>
      <ModalContainer
        modalState={openVerifyCodeModal}
        modalChangeState={setOpenVerifyCodeModal}
        btnPlaceholder=""
        modalTitle={lang.signcontract}
        btnTitle={lang.verifycode}
        disabled={disabled}
        modalAction={() => VerifyMutation.mutate(verifyPayload)}>
        <Typography sx={styles.content}>{lang.verifymsg}</Typography>
        <Typography sx={styles.emailAddress}> {user?.email || ""}</Typography>
        <Box sx={styles.textFieldContainer}>
          <TextInputComponent
            textStyle={{ color: "#000" }}
            name={lang.verifycode}
            type="code"
            value={verifyPayload.code}
            refState={(e) => {
              var temppayload = { ...verifyPayload }
              temppayload.code = Number(e.target.value)
              setVerifyPayload({ ...temppayload })
            }}
            required
          />
        </Box>
        <Typography
          sx={styles.textBtn}
          onClick={() =>
            ResendMutation.mutate({
              email: user?.email,
            })
          }>
          {`${lang.code} ${lang.resend}`}
        </Typography>
      </ModalContainer>
      <ModalContainer
        modalState={openModal}
        modalChangeState={setOpenModal}
        btnPlaceholder=""
        modalTitle={lang.signcontract}
        btnTitle={lang.signcontract}
        modalAction={() => SignatureMutation.mutate(signContractPayload)}
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
  textFieldContainer: {
    marginTop: 2,
  },
  content: {
    marginTop: 2,
    color: "#042f36",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  emailAddress: {
    color: "#042f36",
    alignSelf: "center",
    textAlign: "center",
  },
  textBtn: {
    alignSelf: "center",
    color: "#000",
    fontWeight: 500,
    cursor: "pointer",
    textAlign: "center",
  },
}
export default Contracts
