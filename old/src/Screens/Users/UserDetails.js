import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { Container, Box, Grid, Avatar, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileSignature } from "@fortawesome/free-solid-svg-icons"
import { LanguageContext } from "../../Contexts/LanguageContext"
import { GetUserDetails_API } from "../../APIs/API"
import CircularLoader from "../../Components/Utils/CircularLoader"
import MenuBar from "../../Components/Utils/MenuBar"
import ErrorSection from "../../Components/PageHandler/ErrorSection"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import SecondaryBtn from "../../Components/Buttons/SecondaryBtn"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"

const UserDetails = () => {
  let params = useParams()
  const navigate = useNavigate()

  const { lang, language } = useContext(LanguageContext)

  const [width, setWidth] = useState(window.innerWidth)
  const [open, setopen] = useState(true)
  const [drawerState, setDrawerState] = useState(false)
  const [loading, setIsLoading] = useState(false)

  const toggleDrawer = () => {
    setDrawerState(!drawerState)
  }

  const toggleOpen = () => {
    setopen(!open)
  }

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

  const {
    isLoading,
    isSuccess,
    isError,
    data: userData,
    refetch,
  } = useQuery(
    ["GetUserDetails_API", { id: params.id }],
    () =>
      GetUserDetails_API({
        id: params.id,
      }),
    {
      refetchOnWindowFocus: true,
    },
  )

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
            title={lang.userdet}
            onClick={isMobile ? toggleDrawer : toggleOpen}
            open={open}
            onGoBack={() => navigate(-1)}
            language={language}
          />
        </Grid>
        <Box sx={styles.root}>
          <Grid item xs={9}>
            <Container maxWidth="xl">
              {isLoading || loading ? <CircularLoader /> : null}
              {isError && (
                <ErrorSection
                  onClick={() => refetch()}
                  image={require("../../assets/contract.png")}
                  text={"Error in retriving User Details"}
                />
              )}
              {isSuccess && (
                <>
                  <Box sx={styles.imageContainer}>
                    <Avatar
                      alt={userData?.data?.user?.name}
                      src={userData?.data?.user?.profileimage}
                      sx={styles.image}
                    />
                  </Box>
                  <Box sx={styles.main}>
                    <Typography sx={styles.title}>
                      {userData?.data?.user?.name}
                    </Typography>
                    <Typography sx={styles.subTitle}>
                      {userData?.data?.user?.email}
                    </Typography>
                  </Box>
                  <SecondaryBtn
                    title={lang.viewsignaturedcontracts}
                    icon={
                      <FontAwesomeIcon
                        icon={faFileSignature}
                        style={styles.icon}
                      />
                    }
                    onClick={() => {
                      navigate(`/users/user-contracts/${params?.id}/1`)
                    }}
                    language={language}
                  />
                  <SecondaryBtn
                    title={lang.viewnotsignaturedcontracts}
                    icon={
                      <FontAwesomeIcon
                        icon={faFileSignature}
                        style={styles.icon}
                      />
                    }
                    onClick={() => {
                      navigate(`/user-contracts/${params?.id}/0`)
                    }}
                    language={language}
                  />
                </>
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
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  main: {
    marginTop: 1,
  },
  title: {
    fontSize: 20,
    color: "#042f36",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    color: "#a9a9a9",
    fontStyle: "italic",
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
    fontSize: 24,
  },
}
export default UserDetails
