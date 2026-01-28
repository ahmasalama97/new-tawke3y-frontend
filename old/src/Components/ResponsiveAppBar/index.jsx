import { Fragment, cloneElement, useState, useEffect } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import {
  AppBar,
  Avatar,
  Box,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material"
import PropTypes from "prop-types"
import Logo from "../Utils/Logo"
import NavDrawer from "./NavDrawer.jsx"
import NavLinks from "./NavLinks.jsx"
import PrimaryBtn from "../Buttons/PrimaryBtn"
import { Dashboard, Logout } from "@mui/icons-material"
import { useSnackbar } from "notistack"
import { Logout_API } from "../../APIs/API"
import CircularLoader from "../Utils/CircularLoader"

const Index = (props) => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const user = JSON.parse(sessionStorage.getItem("user"))

  const [width, setWidth] = useState(window.innerWidth)
  const [anchorEl, setAnchorEl] = useState(null)
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [shadow, setShadow] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  const open = Boolean(anchorEl)
  const openLanguage = Boolean(languageAnchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLanguageClick = (event) => {
    setLanguageAnchorEl(event.currentTarget)
  }
  const handleLanguageClose = () => {
    setLanguageAnchorEl(null)
  }
  const MenuLinks = [
    {
      key: 1,
      label: props?.lang.home,
      link: "home",
    },
    {
      key: 2,
      label: props?.lang.about,
      link: "about-us",
    },
    {
      key: 3,
      label: props?.lang.privacy,
      link: "policy-privacy",
    },
    {
      key: 4,
      label: props?.lang.terms,
      link: "terms-conditions",
    },
  ]
  const RespMenuLinks = [
    {
      key: 1,
      label: props?.lang.home,
      link: "home",
    },
    {
      key: 2,
      label: props?.lang.about,
      link: "about-us",
    },
    {
      key: 3,
      label: props?.lang.privacy,
      link: "/policy-privacy",
    },
    {
      key: 4,
      label: props?.lang.terms,
      link: "/terms-conditions",
    },
    {
      key: 5,
      label: props?.lang.languageSwitcherButton,
    },
    {
      key: 6,
      label: props?.lang.signin,
      link: "/login",
    },
    {
      key: 7,
      label: props?.lang.register,
      link: "/register",
    },
  ]

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

  const LogoutMutation = useMutation("Home_Logout_API", {
    mutationFn: Logout_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(props?.lang.errorResponse, {
        variant: "error",
      })
    },
    onSuccess: (data) => {
      if (data.data.status) {
        setIsLoading(false)
        enqueueSnackbar(props?.lang.loggedoutsuccess, { variant: "success" })
        sessionStorage.removeItem("user")
      } else {
        setIsLoading(false)
        enqueueSnackbar(props?.lang.errorResponse, {
          variant: "warning",
        })
      }
    },
  })

  useEffect(() => {
    const handleScroll = () => {
      // Update elevation based on the scroll position
      const scrollY = window.scrollY

      if (scrollY > 100) {
        setShadow(4) // Add your desired elevation value
      } else {
        setShadow(0)
      }

      const currentPosition = window.scrollY
      const sections = [
        "home",
        "about-us",
        "policy-privacy",
        "terms-conditions",
      ]
      let active = null

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (
          element &&
          element.offsetTop <= currentPosition &&
          element.offsetTop + element.offsetHeight >= currentPosition
        ) {
          active = section
        }
      })

      setActiveSection(active || activeSection)
    }

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Trigger initial scroll check
    handleScroll()

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []) // Empty dependency array means this effect runs once after the initial render

  return (
    <Fragment>
      {isLoading && <CircularLoader />}
      <CssBaseline />
      <AppBar
        // position="static"
        sx={{
          ...styles.root,
          ...{
            boxShadow: shadow,
          },
        }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo
              imgStyle={styles.imgStyle}
              title={props?.lang.tawke3y}
              textStyle={styles.textStyle}
            />
            <NavLinks
              MenuLinks={MenuLinks}
              handleLanguageClick={handleLanguageClick}
              handleLanguageClose={handleLanguageClose}
              openLanguage={openLanguage}
              languageAnchorEl={languageAnchorEl}
              selectLanguage={props?.selectLanguage}
              lang={props?.lang}
              language={props?.language}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            {user && !isMobile ? (
              <>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={styles.iconBtn}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}>
                    <Avatar
                      sx={styles.avatar}
                      alt={user?.name}
                      src={
                        user?.profileimage
                          ? `${process.env.REACT_APP_ENDPOINT_URL}/${user?.profileimage}`
                          : "/broken-image.jpg"
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: styles.menuContainer,
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                  <MenuItem
                    onClick={() => {
                      navigate("/profile")
                    }}>
                    <Avatar
                      src={
                        user?.profileimage
                          ? `${process.env.REACT_APP_ENDPOINT_URL}/${user?.profileimage}`
                          : "/broken-image.jpg"
                      }
                    />{" "}
                    {user?.name}
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      if (user?.role === "user") {
                        navigate("/contracts")
                      } else {
                        navigate("/my-contracts")
                      }
                    }}>
                    <ListItemIcon>
                      <Dashboard fontSize="small" />
                    </ListItemIcon>
                    {props?.lang.dashboard}
                  </MenuItem>

                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleClose()
                      LogoutMutation.mutate()
                    }}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    {props?.lang.logout}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={styles.loginContainer}>
                <PrimaryBtn
                  title={props?.lang.signin}
                  onClick={() => navigate("/login")}
                />
                <Typography
                  sx={{
                    ...styles.textBtn,
                    ...{ paddingLeft: props.language === "english" && "10%" },
                  }}
                  onClick={() => navigate("/register")}>
                  {props?.lang.register}
                </Typography>
              </Box>
            )}

            <NavDrawer
              MenuLinks={user ? MenuLinks : RespMenuLinks}
              LogoutMutation={LogoutMutation}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  )
}
const styles = {
  root: {
    marginBottom: "30px",
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 109,
  },
  iconBtn: {
    ml: 2,
  },
  textBtn: {
    alignSelf: "center",
    fontWeight: 500,
    cursor: "pointer",
    color: "#000",
    width: "max-content",
  },
  textStyle: {
    display: { xs: "none", md: "none", lg: "block" },
  },
  avatar: {
    width: 50,
    height: 50,
  },
  imgStyle: {
    width: "3rem",
    marginTop: 1,
    marginBottom: 0.8,
  },
  menuContainer: {
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
  loginContainer: {
    marginRight: 5,
    display: { xs: "none", md: "flex", lg: "flex" },
  },
}

export default Index
