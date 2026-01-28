import { useContext } from "react"
import { Box, Container, Typography } from "@mui/material"
import ResponsiveAppBar from "../../Components/ResponsiveAppBar"
import LogoImg from "../../assets/AppIcon.png"
import SectionHeader from "../../Components/Headers/SectionHeader"
import Footer from "../../Components/Utils/Footer"
import { LanguageContext } from "../../Contexts/LanguageContext"

const HomeTerms = () => {
  const { lang, language, selectLanguage } = useContext(LanguageContext)

  return (
    <Box id="terms-conditions">
      <ResponsiveAppBar
        lang={lang}
        language={language}
        selectLanguage={selectLanguage}
      />
      <Box sx={styles.header}>
        <Box
          component="img"
          sx={{
            width: "30%",
            display: { xs: "inline-flex", md: "none", lg: "none" },
          }}
          alt="logo"
          src={LogoImg}
        />
        <SectionHeader title={lang.terms} />
      </Box>
      <Container maxWidth="xl">
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

      <Footer lang={lang} language={language} />
    </Box>
  )
}

const styles = {
  container: {
    display: { xs: "none", md: "flex", lg: "flex" },
    fontWeight: 700,
    fontSize: "0.875rem/0.875rem",
    fontFamily: "'Open Sans', sans-serif",
    transition: "all 0.2s",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#f7fafd",
  },
  header: {
    position: "relative",
    overflow: "hidden",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    backgroundColor: "#f7fafd",
    textAlign: "center",
  },
  aboutusContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  aboutusImageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  textSubHeader: {
    marginRight: "auto",
    marginLeft: "auto",
    fontWeight: 400,
    color: "#777",
  },
  downloadSection: {
    padding: { xs: 5, md: 5, lg: 10 },
  },
  googleApp: {
    width: { xs: "40%", md: "33.4%", lg: "20%" },
  },
  appStore: {
    width: { xs: "35.5%", md: "30%", lg: "18%" },
  },
  appImage: {
    width: { xs: "80%", lg: "50%" },
  },
  featuresContainer: {
    display: { xs: "block", md: "flex", lg: "flex" },
    width: { xs: "100%", md: "75%", lg: "60%" },
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardIcon: {
    fontSize: "4.5rem",
    marginTop: "1.5rem",
  },
  icon: {
    fontSize: 14,
    alignSelf: "center",
    marginInlineEnd: 1,
  },
  textFieldContainer: {
    marginLeft: { xs: 8, md: 8, lg: 20 },
    marginRight: { xs: 8, md: 8, lg: 20 },
  },
  divider: {
    marginTop: 10,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 5,
    marginBottom: 5,
  },
}

export default HomeTerms
