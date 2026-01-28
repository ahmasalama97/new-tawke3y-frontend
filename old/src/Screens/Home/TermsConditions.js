import { useContext, useEffect, useState } from "react"
import { Container, Box, Grid, Typography } from "@mui/material"
import SideBar from "../../Components/SideBar/SideBar"
import MenuBar from "../../Components/Utils/MenuBar"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import CircularLoader from "../../Components/Utils/CircularLoader"
import { LanguageContext } from "../../Contexts/LanguageContext"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"

const TermsConditions = () => {
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
            title={lang.terms}
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
                  {lang.termstitle1}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termsdesc1}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termstitle2}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  {lang.termsdesc2a}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  {lang.termsdesc2b}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  {lang.termsdesc2c}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  {lang.termsdesc2d}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  {lang.termsdesc2e}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  {lang.termsdesc2f}
                </Typography>
                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{
                      marginTop: 2,
                      textAlign: language === "english" ? "left" : "right",
                    },
                  }}>
                  {lang.termsdesc2g}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termstitle3}
                </Typography>

                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termsdesc3}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termstitle4}
                </Typography>

                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termsdesc4}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termstitle5}
                </Typography>

                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termsdesc5}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termstitle6}
                </Typography>

                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termsdesc6}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termstitle7}
                </Typography>

                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termsdesc7}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    ...styles.textHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termstitle8}
                </Typography>

                <Typography
                  sx={{
                    ...styles.textSubHeader,
                    ...{ textAlign: language === "english" ? "left" : "right" },
                  }}>
                  {lang.termsdesc8}
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
    width: "95%",
    fontWeight: 400,
    color: "#042f36",
    fontSize: 16,
    marginLeft: { xs: "auto", md: "auto", lg: 5 },
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
export default TermsConditions
