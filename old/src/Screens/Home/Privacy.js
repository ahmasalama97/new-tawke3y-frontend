import { useContext, useEffect, useState } from "react"
import { Container, Box, Grid, Typography } from "@mui/material"
import SquareIcon from "@mui/icons-material/Square"
import SideBar from "../../Components/SideBar/SideBar"
import MenuBar from "../../Components/Utils/MenuBar"
import CircularLoader from "../../Components/Utils/CircularLoader"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import { LanguageContext } from "../../Contexts/LanguageContext"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"

const Privacy = () => {
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
            title={lang.privacy}
            onClick={isMobile ? toggleDrawer : toggleOpen}
            open={open}
          />
        </Grid>
        <Box sx={styles.root}>
          <Grid item xs={9}>
            <Container maxWidth="xl">
              {isLoading ? <CircularLoader /> : null}
              <Box
                sx={{
                  marginTop: 5,
                }}>
                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.privacy}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.privacydesc}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.privacycookietitle}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.privacycookiedesc}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.whatarecookiestitle}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.whatarecookiesdesc}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.howweusecookiestitle}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.howweusecookiesdesc}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.disablingcookiestitle}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.disablingcookiesdesc}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thecookiestitle}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      fontWeight: 700,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thecookiesdesc1title}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thecookiesdesc1desc}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      fontWeight: 700,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thecookiesdesc2title}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thecookiesdesc2desc}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      fontWeight: 700,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thecookiesdesc3title}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thecookiesdesc3desc}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      fontWeight: 700,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thecookiesdesc4title}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thecookiesdesc4desc}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      fontWeight: 700,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thecookiesdesc5title}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thecookiesdesc5desc}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      fontWeight: 700,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thecookiesdesc6title}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thecookiesdesc6desc}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      fontWeight: 700,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thecookiesdesc7title}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thecookiesdesc7desc}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thirdpartycookiestitle}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.thirdpartycookiessubtitle}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thirdpartycookiesdesc1}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thirdpartycookiesdesc2}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thirdpartycookiesdesc3}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thirdpartycookiesdesc4}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  <SquareIcon sx={styles.icon} />
                  {lang.thirdpartycookiesdesc5}
                </Typography>
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
  textHeader: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 5,
    marginBottom: 5,
  },
  textSubHeader: {
    width: "100%",
    fontWeight: 400,
    color: "#042f36",
    fontSize: 16,
    marginLeft: { xs: "auto", md: "auto", lg: 0 },
    marginRight: { xs: "auto", md: "auto" },
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
export default Privacy
