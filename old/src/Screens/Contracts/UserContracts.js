import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useInfiniteQuery } from "react-query"
import { Container, Box, CircularProgress, Grid } from "@mui/material"
import { GetUserContracts_API } from "../../APIs/API"
import ContractCard from "../../Components/Cards/ContractCard"
import CircularLoader from "../../Components/Utils/CircularLoader"
import MenuBar from "../../Components/Utils/MenuBar"
import ErrorSection from "../../Components/PageHandler/ErrorSection"
import SearchBarComponent from "../../Components/FormComponents/SearchBarComponent"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import { LanguageContext } from "../../Contexts/LanguageContext"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"

const UserContracts = () => {
  let params = useParams()
  const navigate = useNavigate()

  const { lang, language } = useContext(LanguageContext)

  const user = JSON.parse(sessionStorage.getItem("user"))
  const companyId = user?.id
  const userid = params?.id

  const [width, setWidth] = useState(window.innerWidth)
  const [search, setSearch] = useState("")
  const [open, setopen] = useState(true)
  const [drawerState, setDrawerState] = useState(false)
  const [loading, setIsLoading] = useState(false)

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
    ["GetUserContracts_API", search, companyId, userid, params?.signed],
    ({ pageParam = 1, signed = params?.signed }) =>
      GetUserContracts_API({ pageParam, search, companyId, userid, signed }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.page !== "full") {
          return pages.length + 1
        } else {
          return undefined
        }
      },
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

  const isMobile = width <= 768

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
              language === "arabic" && open
                ? { lg: "20%", md: "0%", xs: "0%" }
                : "4.5%",
          },
        }}>
        <Grid item xs={3}>
          <BackToHomeBtn lang={lang} language={language} />
          <MenuBar
            title={
              params?.signed === "0" ? lang.notsignatured : lang.signatured
            }
            onClick={isMobile ? toggleDrawer : toggleOpen}
            open={open}
            onGoBack={() => navigate(-1)}
            language={language}
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
                        originalFile={`${process.env.REACT_APP_ENDPOINT_URL}/${contract?.contractfile}`}
                        signaturedFile={`${process.env.REACT_APP_ENDPOINT_URL}/${contract?.usersignaturedfile}`}
                        type="Company"
                        signedAt={contract?.signedAt}
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
    </>
  )
}
const styles = {
  container: {
    display: "block",
  },
  root: {
    position: "relative",
    padding: "20px 10px",
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
}
export default UserContracts
