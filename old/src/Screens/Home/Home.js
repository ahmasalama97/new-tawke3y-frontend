import { useContext } from "react"
import { Box, Divider, Grid, Typography } from "@mui/material"
import GroupIcon from "@mui/icons-material/Group"
import CodeIcon from "@mui/icons-material/Code"
import SettingsIcon from "@mui/icons-material/Settings"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import SquareIcon from "@mui/icons-material/Square"
import ResponsiveAppBar from "../../Components/ResponsiveAppBar"
import BackgroundInteractions from "../../Components/Utils/BackgroundInteractions"
import SmallFeatures from "../../Components/Utils/SmallFeatures"
import SectionHeader from "../../Components/Headers/SectionHeader"
import StoreBtn from "../../Components/Buttons/StoreBtn"
import Footer from "../../Components/Utils/Footer"
import { LanguageContext } from "../../Contexts/LanguageContext"
import GooglePlay from "../../assets/google-play.png"
import AppStore from "../../assets/app-store.png"
import App from "../../assets/app.png"
import MultiDevice from "../../assets/multidevice.png"
import LogoImg from "../../assets/AppIcon.png"

const Home = () => {
  const { lang, language, selectLanguage } = useContext(LanguageContext)

  return (
    <>
      <ResponsiveAppBar
        lang={lang}
        language={language}
        selectLanguage={selectLanguage}
      />
      <Box id="home">
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
          <SectionHeader title={lang.tawke3y} />
          <Typography sx={styles.textSubHeader}>{lang.tawke3ydes}</Typography>
          <Box sx={styles.downloadSection}>
            <StoreBtn
              link="https://play.google.com/store/apps/details?id=com.tawke3y"
              style={styles.googleApp}
              src={GooglePlay}
            />
            <StoreBtn
              link="https://apps.apple.com/us/app/tawke3y/id6443518840"
              style={styles.appStore}
              src={AppStore}
            />
          </Box>
        </Box>
        <Box>
          <Box
            component="img"
            sx={[styles.appImage, { marginTop: 5, marginBottom: 5 }]}
            alt="alternative"
            src={App}
          />
        </Box>

        <BackgroundInteractions />
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
      </Box>
      <Grid container sx={styles.aboutusContainer} id="about-us">
        <Grid item xs={12} md={12} lg={6} sx={styles.aboutusImageContainer}>
          <Box
            component="img"
            sx={styles.appImage}
            alt="about"
            src={MultiDevice}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          sx={{
            marginTop: 15,
          }}>
          <SectionHeader
            title={lang.about}
            style={{
              textAlign: { lg: language === "english" ? "left" : "right" },
            }}
          />
          <Typography
            sx={[
              styles.textSubHeader,
              {
                textAlign: { lg: language === "english" ? "left" : "right" },
                fontSize: 16,
                marginLeft: { xs: "auto", md: "auto" },
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
        </Grid>
      </Grid>
      {/* <Box id="apply">
        <SectionHeader title={lang.applyascompany} />
        <Box sx={styles.textFieldContainer}>
          <TextInputComponent
            name={lang.companyname}
            type="text"
            value={applyPayload.companyName}
            refState={(e) => {
              var temppayload = { ...applyPayload };
              temppayload.companyName = e.target.value;
              setApplyPayload({ ...temppayload });
            }}
            required
          />
        </Box>
        <Box sx={styles.textFieldContainer}>
          <TextInputComponent
            name={lang.companyemail}
            type="email"
            value={applyPayload.companyEmail}
            refState={(e) => {
              var temppayload = { ...applyPayload };
              temppayload.companyEmail = e.target.value;
              setApplyPayload({ ...temppayload });
            }}
            required
          />
        </Box>
        <Box sx={styles.textFieldContainer}>
          <TextInputComponent
            name={lang.companynumber}
            type="text"
            value={applyPayload.companyNumber}
            refState={(e) => {
              var temppayload = { ...applyPayload };
              temppayload.companyNumber = e.target.value;
              setApplyPayload({ ...temppayload });
            }}
          />
        </Box>
        <Box sx={styles.textFieldContainer}>
          <TextInputComponent
            name={lang.companyaddress}
            type="text"
            value={applyPayload.companyAddress}
            refState={(e) => {
              var temppayload = { ...applyPayload };
              temppayload.companyAddress = e.target.value;
              setApplyPayload({ ...temppayload });
            }}
          />
        </Box>
        <Box sx={styles.textFieldContainer}>
          <TextInputComponent
            name={lang.companyregnum}
            type="text"
            value={applyPayload.companyCommercialRegisteration}
            refState={(e) => {
              var temppayload = { ...applyPayload };
              temppayload.companyCommercialRegisteration = e.target.value;
              setApplyPayload({ ...temppayload });
            }}
            required
          />
        </Box>
        <Box sx={styles.textFieldContainer}>
          <TextInputComponent
            name={lang.companytaxnum}
            type="text"
            value={applyPayload.companyTaxCard}
            refState={(e) => {
              var temppayload = { ...applyPayload };
              temppayload.companyTaxCard = e.target.value;
              setApplyPayload({ ...temppayload });
            }}
            required
          />
        </Box>
        <Box sx={styles.textFieldContainer}>
          <TextInputComponent
            name={lang.companydesc}
            type="text"
            value={applyPayload.companyDesc}
            refState={(e) => {
              var temppayload = { ...applyPayload };
              temppayload.companyDesc = e.target.value;
              setApplyPayload({ ...temppayload });
            }}
            multiline
            rows={3}
            required
          />
        </Box>
        <PrimaryBtn title={lang.save} />
      </Box> */}
      <Divider sx={styles.divider} />
      <Footer lang={lang} language={language} />
    </>
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
    marginTop: 15,
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
}

export default Home
