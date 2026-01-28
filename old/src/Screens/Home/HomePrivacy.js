import { useContext } from "react"
import { Box, Container, Typography } from "@mui/material"
import SquareIcon from "@mui/icons-material/Square"
import ResponsiveAppBar from "../../Components/ResponsiveAppBar"
import LogoImg from "../../assets/AppIcon.png"
import SectionHeader from "../../Components/Headers/SectionHeader"
import Footer from "../../Components/Utils/Footer"
import { LanguageContext } from "../../Contexts/LanguageContext"

const HomePrivacy = () => {
  const { lang, language, selectLanguage } = useContext(LanguageContext)

  return (
    <Box id="policy-privacy">
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
        <SectionHeader title={lang.privacy} />
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

export default HomePrivacy
