import { Box, Grid, Link, Typography } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = (props) => {
  return (
    <Grid container sx={styles.container}>
      <Grid xs={12} md={6} lg={3}>
        <Typography sx={styles.footerSectionHeader}>
          {props?.lang.about}
        </Typography>
        <Typography sx={styles.footerSectionSubHeader}>
          {props?.lang.aboutTawke3y}
        </Typography>
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <Typography sx={styles.footerSectionHeader}>
          {props?.lang.contactinfo}
        </Typography>
        <Typography sx={styles.footerSectionSubHeader}>
          <MyLocationIcon sx={styles.icon} />
          {props?.lang.tawke3yAddress}
        </Typography>
        <Typography sx={styles.footerSectionSubHeader}>
          <EmailIcon sx={styles.icon} />
          contact@tawke3y-eg.com
        </Typography>
        <Typography sx={styles.footerSectionSubHeader}>
          <LocalPhoneIcon sx={styles.icon} />
          {props?.language === "english" ? "01015899965" : "٠١٠١٥٨٩٩٩٦٥"}
        </Typography>
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <Typography sx={styles.footerSectionHeader}>
          {props?.lang.links}
        </Typography>
        <Link
          href="/home#about"
          sx={[
            styles.footerSectionSubHeader,
            { cursor: "pointer", textAlign: "center" },
          ]}
        >
          {props?.lang.about}
        </Link>
        <Link
          href="/policy-privacy"
          sx={[
            styles.footerSectionSubHeader,
            { cursor: "pointer", textAlign: "center" },
          ]}
        >
          {props?.lang.privacy}
        </Link>
        <Link
          href="/terms-conditions"
          sx={[
            styles.footerSectionSubHeader,
            { cursor: "pointer", textAlign: "center" },
          ]}
        >
          {props?.lang.terms}
        </Link>
      </Grid>
      <Grid xs={12} md={6} lg={3}>
        <Typography sx={styles.footerSectionHeader}>
          {props?.lang.support}
        </Typography>
        <Box sx={styles.supportContainer}>
          <Link
            href="https://www.facebook.com/tawke3y"
            target="_blank"
            sx={[
              styles.footerSectionSubHeader,
              { cursor: "pointer", width: "auto" },
            ]}
          >
            <FacebookIcon sx={styles.socialIcon} />
          </Link>
          <Link
            href="https://wa.me/01015899965"
            target="_blank"
            sx={[
              styles.footerSectionSubHeader,
              { cursor: "pointer", width: "auto" },
            ]}
          >
            <WhatsAppIcon sx={[styles.socialIcon, { color: "#25d366" }]} />
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    padding: 10,
  },
  footerSectionHeader: {
    fontSize: 22,
    fontWeight: 700,
    color: "#999",
    marginBottom: 5,
  },
  footerSectionSubHeader: {
    display: "block",
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
    fontWeight: 400,
    color: "#777",
    marginBottom: 2,
    textAlign: "left",
    textDecoration: "none",
  },
  supportContainer: {
    display: "flex",
  },
  socialIcon: {
    fontSize: 30,
    color: "#3b5998",
  },
  icon: {
    fontSize: 14,
    alignSelf: "center",
    marginInlineEnd: 1,
  },
};

export default Footer;
