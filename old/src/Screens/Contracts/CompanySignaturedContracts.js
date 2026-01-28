import { useContext, useState, useEffect } from "react"
import { useInfiniteQuery } from "react-query"
import { Container, Box, CircularProgress, Grid } from "@mui/material"
import { LanguageContext } from "../../Contexts/LanguageContext"
import { GetCompanySignaturedContracts_API } from "../../APIs/API"
import ContractCard from "../../Components/Cards/ContractCard"
import CircularLoader from "../../Components/Utils/CircularLoader"
import MenuBar from "../../Components/Utils/MenuBar"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import ErrorSection from "../../Components/PageHandler/ErrorSection"
import SearchBarComponent from "../../Components/FormComponents/SearchBarComponent"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"

const CompanySignaturedContracts = () => {
  const { lang, language } = useContext(LanguageContext)

  const user = JSON.parse(sessionStorage.getItem("user"))
  const userid = user?.id

  const [width, setWidth] = useState(window.innerWidth)
  const [search, setSearch] = useState("")
  const [loading, setIsLoading] = useState(false)
  const [open, setopen] = useState(true)
  const [drawerState, setDrawerState] = useState(false)

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
    ["GetCompanySignaturedContracts_API", search, userid],
    ({ pageParam = 1 }) =>
      GetCompanySignaturedContracts_API({ search, pageParam, userid }),
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
    window.onscroll = function () {
      if (hasNextPage) {
        fetchNextPage()
      }
    }
  }, [hasNextPage, fetchNextPage])

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
                ? { lg: "auto", md: "0%", xs: "0%" }
                : 0,
          },
        }}>
        <Grid item xs={3}>
          <BackToHomeBtn lang={lang} language={language} />
          <MenuBar
            title={lang.signatured}
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
                        signaturedFile={`${process.env.REACT_APP_ENDPOINT_URL}/${contract?.usersignaturedfile}`}
                        by={contract?.username}
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
    padding: "20px 15px",
  },
}
export default CompanySignaturedContracts
