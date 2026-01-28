import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useInfiniteQuery, useMutation } from "react-query"
import { useSnackbar } from "notistack"
import {
  Container,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material"
import {
  DeletePersonalContract_API,
  GetPersonalContracts_API,
  ShareContract_API,
} from "../../APIs/API"
import { LanguageContext } from "../../Contexts/LanguageContext"
import ContractCard from "../../Components/Cards/ContractCard"
import CircularLoader from "../../Components/Utils/CircularLoader"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import MenuBar from "../../Components/Utils/MenuBar"
import ModalContainer from "../../Components/Utils/ModalContainer"
import ErrorSection from "../../Components/PageHandler/ErrorSection"
import SearchBarComponent from "../../Components/FormComponents/SearchBarComponent"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"
import TextInputComponent from "../../Components/FormComponents/TextInputComponent"

const CompanyContracts = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { lang, language } = useContext(LanguageContext)

  const user = JSON.parse(sessionStorage.getItem("user"))
  const userid = user?.id

  const [width, setWidth] = useState(window.innerWidth)
  const [loading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [openShareModal, setOpenShareModal] = useState(false)
  const [open, setopen] = useState(true)
  const [drawerState, setDrawerState] = useState(false)
  const [contractid, setContractid] = useState(null)

  const [contractToUserPayload, setContractToUserPayload] = useState({
    id: user?.id,
    username: "",
    contractid: "",
    contractname: "",
    contractfile: "",
  })

  const toggleDrawer = () => {
    setDrawerState(!drawerState)
  }

  const toggleOpen = () => {
    setopen(!open)
  }

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
    ["GetPersonalContracts_API", search, userid],
    ({ pageParam = 1 }) =>
      GetPersonalContracts_API({ search, pageParam, userid }),
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

  const DeleteContractMutation = useMutation("DeletePersonalContract_API", {
    mutationFn: DeletePersonalContract_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      setOpenModal(false)
      enqueueSnackbar(lang.errorResponse, {
        variant: "error",
      })
    },
    onSuccess: (data) => {
      setOpenModal(false)
      if (data.data.status) {
        setIsLoading(false)
        enqueueSnackbar(
          language === "english" ? data?.data?.message : data?.data?.messageAr,
          {
            variant: "success",
          },
        )
        refetch()
      } else {
        enqueueSnackbar(
          language === "english" ? data?.data?.reason : data?.data?.reasonAr,
          {
            variant: "warning",
          },
        )
        setIsLoading(false)
      }
    },
  })

  const ShareContractMutation = useMutation("ShareContract_API", {
    mutationFn: ShareContract_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, {
        variant: "error",
      })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      setOpenShareModal(false)
      if (data.data.status) {
        enqueueSnackbar(lang.contractsuccess, {
          variant: "success",
        })
      } else {
        enqueueSnackbar(
          language === "english" ? data?.data?.reason : data?.data?.reasonAr,
          {
            variant: "warning",
          },
        )
      }
    },
  })

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

  let SearchHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase()
    setSearch(lowerCase)
  }

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
              language === "english" && open
                ? { lg: "auto", md: "0%", xs: "0%" }
                : 0,
          },
        }}>
        <Grid item xs={3}>
          <BackToHomeBtn lang={lang} language={language} />
          <MenuBar
            title={lang.contracts}
            onClick={isMobile ? toggleDrawer : toggleOpen}
            open={open}
            onAdd={() => navigate("/my-contracts/create-contract")}
            lang={lang}
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
              {isError ? (
                <ErrorSection
                  onClick={() => refetch()}
                  image={require("../../assets/contract.png")}
                  text={lang.errorcontracts}
                />
              ) : null}
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
                        onDelete={() => {
                          setContractid(contract?.contractid)
                          setOpenModal(!openModal)
                        }}
                        onShare={() => {
                          setOpenShareModal(!openShareModal)
                          var temppayload = { ...contractToUserPayload }
                          temppayload.contractid = contract.contractid
                          temppayload.contractname = contract.contractname
                          temppayload.contractfile = contract.contractfile
                          setContractToUserPayload({ ...temppayload })
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
        modalState={openModal}
        modalChangeState={setOpenModal}
        btnPlaceholder=""
        modalTitle={lang.deletedContract}
        btnTitle={lang.delete}
        btnStyle={styles.secondaryBtn}
        modalAction={() =>
          DeleteContractMutation.mutate({
            contractid: contractid,
            id: user?.id,
          })
        }>
        <Box sx={styles.textFieldContainer}>
          <Typography sx={styles.confirmationMsg}>
            {lang.deletedContractConfirmation}
          </Typography>
        </Box>
      </ModalContainer>
      <ModalContainer
        modalState={openShareModal}
        modalChangeState={setOpenShareModal}
        btnPlaceholder=""
        btnTitle={lang.send}
        modalTitle={lang.sharecontract}
        modalAction={() => ShareContractMutation.mutate(contractToUserPayload)}>
        <Typography sx={{ ...styles.confirmationMsg, ...{ padding: 2 } }}>
          {lang.sharecontractmessage}
        </Typography>
        <TextInputComponent
          textStyle={{ color: "#000" }}
          name={lang.user}
          type="text"
          value={contractToUserPayload.username}
          refState={(e) => {
            var temppayload = { ...contractToUserPayload }
            temppayload.username = e?.target?.value
            setContractToUserPayload({ ...temppayload })
          }}
          helperText={lang.incorrectinput}
          required
        />
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
  textFieldContainer: {
    marginTop: 2,
  },
  primaryBtnContainer: {
    marginTop: 5,
    justifyContent: "center",
    display: "flex",
  },
  primaryBtn: {
    textTransform: "capitalize",
    backgroundColor: "#042f36",
    borderColor: "#042f36",
    height: "40px",
    color: "#fff",
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#042f36",
      borderColor: "#042f36",
    },
  },
  secondaryBtn: {
    textTransform: "capitalize",
    backgroundColor: "#ff0000",
    borderColor: "#ff0000",
    height: "40px",
    color: "#fff",
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#ff0000",
      borderColor: "#ff0000",
    },
  },
  confirmationMsg: {
    textAlign: "center",
    fontSize: 18,
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  Containerstyle: {
    width: "100%",
    paddingTop: "2%",
    paddingBottom: "2%",
    cursor: "pointer",
  },
  title: {
    fontSize: 15,
    fontWeight: "400",
    color: "#171717",
    display: "flex",
    justifyContent: "flex-start",
  },
}
export default CompanyContracts
