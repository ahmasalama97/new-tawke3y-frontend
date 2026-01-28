import { Box, Typography } from "@mui/material"
import LogoImg from "../../assets/AppIcon.png"

const Logo = ({ title, style, imgStyle, textStyle }) => {
  return (
    <Box sx={[styles.container, style]}>
      <Box
        component="img"
        sx={[styles.logoImage, imgStyle]}
        alt="logo"
        src={LogoImg}
      />
      <Typography sx={[styles.logoTitle, textStyle]}>{title}</Typography>
    </Box>
  )
}

const styles = {
  container: {
    display: { xs: "block", md: "block", lg: "flex" },
  },
  logoImage: {
    width: "4.6875rem",
  },
  logoTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#333",
    alignSelf: "center",
    paddingLeft: { xs: 0, md: 0, lg: 2 },
    paddingRight: { xs: 0, md: 0, lg: 2 },
    // fontFamily: "cursive",
  },
}

export default Logo
