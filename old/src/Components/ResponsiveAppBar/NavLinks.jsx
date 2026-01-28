import Box from "@mui/material/Box"
import { useLocation, useNavigate } from "react-router-dom"
import SingleNavLinks from "./SingleNavLinks.jsx"
import { Divider, Menu, MenuItem } from "@mui/material"
import { animateScroll as scroll } from "react-scroll"

const NavLinks = ({ MenuLinks, ...props }) => {
  const navigate = useNavigate()
  let activeurl = useLocation()
  const handleLinkClick = (link) => {
    if (
      activeurl?.pathname === "/home" &&
      link !== "home" &&
      link !== "about-us"
    ) {
      navigate("/" + link)
      scroll.scrollTo(link, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -70, // Adjust the offset as needed
      })
    } else if (
      activeurl?.pathname === "/policy-privacy" ||
      activeurl?.pathname === "/terms-conditions"
    ) {
      navigate(link === "about-us" ? "/home" : "/" + link)
      scroll.scrollTo("about-us", {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -70, // Adjust the offset as needed
      })
    }
  }
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}>
        {MenuLinks.map((page) => (
          <SingleNavLinks
            key={page.key}
            name={page.label}
            to={page.link}
            active={page.link === props?.activeSection}
            changeMenuStatusHandler={() => {
              props?.setActiveSection(page.link)
              handleLinkClick(page.link)
            }}
          />
        ))}
        <Box onClick={props?.handleLanguageClick} sx={styles.singleLink}>
          {props?.lang.languageSwitcherButton}
        </Box>
        {/* language */}
        <Menu
          anchorEl={props?.languageAnchorEl}
          id="account-menu"
          open={props?.openLanguage}
          onClose={props?.handleLanguageClose}
          onClick={props?.handleLanguageClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <MenuItem
            disabled={props?.language === "english"}
            onClick={() => {
              props?.selectLanguage("english")
            }}>
            English
          </MenuItem>
          <Divider />
          <MenuItem
            disabled={props?.language === "arabic"}
            onClick={() => {
              props?.selectLanguage("arabic")
            }}>
            العربية
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
}

const styles = {
  singleLink: {
    margin: "0 2px",
    padding: "10px 20px",
    color: "#000",
    display: "flex",
    borderRadius: "7px",
    textDecoration: "unset",
    // fontFamily: "Avenir",
    transition: "all 0.5s",
    cursor: "pointer",
    "&.fullWidth": {
      width: "100%",
      borderRadius: "0",
      margin: "0 0 5px 0",
    },
    "&.active": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
}

export default NavLinks
