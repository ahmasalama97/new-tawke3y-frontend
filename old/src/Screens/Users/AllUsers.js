import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useInfiniteQuery } from "react-query"
import { Container, Box, CircularProgress, Grid } from "@mui/material"
import { GetAllUsersAndCompanies_API } from "../../APIs/API"
import CircularLoader from "../../Components/Utils/CircularLoader"
import MenuBar from "../../Components/Utils/MenuBar"
import ErrorSection from "../../Components/PageHandler/ErrorSection"
import SearchBarComponent from "../../Components/FormComponents/SearchBarComponent"
import UserCard from "../../Components/Cards/UserCard"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import { LanguageContext } from "../../Contexts/LanguageContext"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"

const AllUsers = () => {
  const navigate = useNavigate()

  const { lang, language } = useContext(LanguageContext)

  const user = JSON.parse(sessionStorage.getItem("user"))
  const userid = user?.id

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
    data: users,
    isLoading: isLoadingUsers,
    isSuccess: isSuccessUsers,
    isError: isErrorUsers,
    hasNextPage: hasNextUsers,
    refetch: refetchUsers,
    fetchNextPage: fetchNextUsers,
    isFetchingNextPage: isFetchingUsersNextPage,
  } = useInfiniteQuery(
    ["GetAllUsers_API", search, userid],
    ({ pageParam = 1 }) =>
      GetAllUsersAndCompanies_API({ search, pageParam, userid }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.page !== "full") {
          return pages.length + 1
        } else {
          return undefined
        }
      },
    },
    {
      refetchOnWindowFocus: true,
    },
  )

  useEffect(() => {
    const handleScroll = () => {
      const isWindowBottomReached =
        window.innerHeight + window.scrollY >= document.body.scrollHeight

      if (!isFetchingUsersNextPage && isWindowBottomReached && hasNextUsers) {
        fetchNextUsers()
      }
    }

    // Add event listener
    window.addEventListener("scroll", handleScroll)

    // Remove event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasNextUsers, fetchNextUsers, isFetchingUsersNextPage])

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
              language === "arabic" && open
                ? { lg: "20%", md: "0%", xs: "0%" }
                : "4.5%",
          },
        }}>
        <Grid item xs={3}>
          <BackToHomeBtn lang={lang} language={language} />
          <MenuBar
            title={lang.users}
            onClick={isMobile ? toggleDrawer : toggleOpen}
            open={open}
          />
        </Grid>
        <Box sx={styles.root}>
          <Grid item xs={9}>
            <SearchBarComponent
              searchPlaceholder={`${lang.search} ${lang.users}`}
              search={search}
              state={SearchHandler}
              language={language}
            />
            <Container maxWidth="xl">
              {isLoadingUsers || loading ? <CircularLoader /> : null}
              {isErrorUsers && (
                <ErrorSection
                  onClick={() => refetchUsers()}
                  image={require("../../assets/contract.png")}
                  text={lang.errorusers}
                />
              )}
              {isSuccessUsers &&
                users?.pages?.map((page) =>
                  page?.data?.users?.data.map((contract) => {
                    return (
                      <UserCard
                        profileimage={contract?.profileimage}
                        name={contract?.name}
                        username={contract?.username}
                        email={contract?.email}
                        viewDetails={() =>
                          navigate(`/users/user-details/${contract?.id}`)
                        }
                        lang={lang}
                        language={language}
                      />
                    )
                  }),
                )}
              {isFetchingUsersNextPage && (
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
export default AllUsers
