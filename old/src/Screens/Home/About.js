import { useContext, useEffect, useState } from "react"
import { Container, Box, Grid, Typography } from "@mui/material"
import SquareIcon from "@mui/icons-material/Square"
import GroupIcon from "@mui/icons-material/Group"
import CodeIcon from "@mui/icons-material/Code"
import SettingsIcon from "@mui/icons-material/Settings"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import SideBar from "../../Components/SideBar/SideBar"
import MenuBar from "../../Components/Utils/MenuBar"
import SmallFeatures from "../../Components/Utils/SmallFeatures"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import CircularLoader from "../../Components/Utils/CircularLoader"
import { LanguageContext } from "../../Contexts/LanguageContext"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"

const About = () => {
  const { lang, language } = useContext(LanguageContext)

  const user = JSON.parse(sessionStorage.getItem("user"))

  const [isLoading, setIsLoading] = useState(false)
  const [open, setopen] = useState(true)
  const [drawerState, setDrawerState] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  const toggleOpen = () => {
    setopen(!open)
  }

  const toggleDrawer = () => {
    setDrawerState(!drawerState)
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

  return (
    <>
      {user?.role === "user" ? (
        <SideBar
          open={open}
          drawerState={drawerState}
          setIsLoading={setIsLoading}
          toggleDrawer={toggleDrawer}
        />
      ) : (
        <CompanySideBar
          open={open}
          drawerState={drawerState}
          setIsLoading={setIsLoading}
          toggleDrawer={toggleDrawer}
        />
      )}
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
            title={lang.about}
            onClick={isMobile ? toggleDrawer : toggleOpen}
            open={open}
          />
        </Grid>
        <Box sx={styles.root}>
          {isLoading ? <CircularLoader /> : null}
          <Grid item xs={9}>
            <Container maxWidth="xl">
              <Typography
                sx={[
                  styles.textSubHeader,
                  {
                    textAlign:
                      language === "english" ? { lg: "left" } : { lg: "right" },
                    fontSize: 16,
                    marginLeft: { xs: "auto", md: "auto", lg: 0 },
                    marginRight: { xs: "auto", md: "auto" },
                  },
                ]}>
                {lang.aboutTawke3y}
              </Typography>
              <Typography
                sx={[
                  styles.textSubHeader,
                  {
                    textAlign: { lg: "left" },
                    fontSize: 16,
                    marginLeft: { xs: "auto", md: "auto", lg: 0 },
                    marginRight: { xs: "auto", md: "auto" },
                    marginTop: 2,
                    display: "flex",
                  },
                ]}>
                <SquareIcon sx={styles.icon} />
                {lang.subAboutTawke3y1}
              </Typography>
              <Typography
                sx={[
                  styles.textSubHeader,
                  {
                    textAlign: { lg: "left" },
                    fontSize: 16,
                    marginLeft: { xs: "auto", md: "auto", lg: 0 },
                    marginRight: { xs: "auto", md: "auto" },
                    marginTop: 2,
                    display: "flex",
                  },
                ]}>
                <SquareIcon sx={styles.icon} />
                {lang.subAboutTawke3y2}
              </Typography>
              <Typography
                sx={[
                  styles.textSubHeader,
                  {
                    textAlign: { lg: "left" },
                    fontSize: 16,
                    marginLeft: { xs: "auto", md: "auto", lg: 0 },
                    marginRight: { xs: "auto", md: "auto" },
                    marginTop: 2,
                    display: "flex",
                  },
                ]}>
                <SquareIcon sx={styles.icon} />
                {lang.subAboutTawke3y3}
              </Typography>
              <Box sx={styles.featuresContainer}>
                <SmallFeatures
                  icon={
                    <GroupIcon
                      sx={[
                        styles.cardIcon,
                        {
                          color: "#aa7eec",
                        },
                      ]}
                    />
                  }
                  title={lang.specialFeaturesDesc1}
                  color="#ebe7fa"
                />
                <SmallFeatures
                  icon={
                    <CodeIcon
                      sx={[
                        styles.cardIcon,
                        {
                          color: "#19ca94",
                        },
                      ]}
                    />
                  }
                  title={lang.specialFeaturesDesc4}
                  color="#daf4ef"
                />
                <SmallFeatures
                  icon={
                    <SettingsIcon
                      sx={[
                        styles.cardIcon,
                        {
                          color: "#ff556e",
                        },
                      ]}
                    />
                  }
                  title={lang.specialFeaturesDesc3}
                  color="#f8e5ea"
                />
                <SmallFeatures
                  icon={
                    <QuestionAnswerIcon
                      sx={[
                        styles.cardIcon,
                        {
                          color: "#ffb30f",
                        },
                      ]}
                    />
                  }
                  title={lang.specialFeaturesDesc2}
                  color="#f8f1de"
                />
              </Box>
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
  textSubHeader: {
    width: "100%",
    marginTop: 5,
    marginRight: "auto",
    marginLeft: "auto",
    fontWeight: 400,
    color: "#042f36",
  },
  icon: {
    fontSize: 14,
    alignSelf: "center",
    marginInlineEnd: 1,
  },
  featuresContainer: {
    display: { xs: "block", md: "flex", lg: "flex" },
    width: { xs: "100%", md: "75%", lg: "60%" },
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardIcon: {
    fontSize: "4.5rem",
    marginTop: "1.5rem",
  },
}
export default About
