import { Link, useLocation, useNavigate } from "react-router-dom"
import { Avatar, Box, Divider, Typography, Drawer, List } from "@mui/material"
import ArticleIcon from "@mui/icons-material/Article"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import {
  AllUsers,
  CompanyContracts,
  CompanySignaturedContracts,
} from "../../Screens"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileSignature } from "@fortawesome/free-solid-svg-icons"
import { useMutation } from "react-query"
import { Logout_API } from "../../APIs/API"
import { useSnackbar } from "notistack"
import InfoIcon from "@mui/icons-material/Info"
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip"
import SubjectIcon from "@mui/icons-material/Subject"
import PeopleIcon from "@mui/icons-material/People"
import { LanguageContext } from "../../Contexts/LanguageContext"
import { useContext } from "react"

const CompanySideBar = ({ open, setIsLoading, drawerState, toggleDrawer }) => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { lang, language } = useContext(LanguageContext)

  const user = JSON.parse(sessionStorage.getItem("user"))

  const LogoutMutation = useMutation("Company_Logout_API", {
    mutationFn: Logout_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, {
        variant: "error",
      })
    },
    onSuccess: (data) => {
      if (data.data.status) {
        setIsLoading(false)
        navigate("/home")
        enqueueSnackbar(lang.loggedoutsuccess, { variant: "success" })
        sessionStorage.removeItem("user")
      } else {
        setIsLoading(false)
        enqueueSnackbar(lang.errorResponse, {
          variant: "warning",
        })
      }
    },
  })

  const activeUrl = useLocation()
  const navData = [
    {
      id: 1,
      icon: <ArticleIcon />,
      text: lang.contracts,
      link: "/my-contracts",
      component: <CompanyContracts />,
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faFileSignature} />,
      text: lang.signatured,
      link: "/my-signatured-contracts",
      component: <CompanySignaturedContracts />,
    },
    {
      id: 3,
      icon: <PeopleIcon />,
      text: lang.users,
      link: "/users",
      component: <AllUsers />,
    },
  ]

  const aboutData = [
    {
      id: 2,
      icon: <InfoIcon />,
      text: lang.about,
      link: "/about",
    },
    {
      id: 3,
      icon: <PrivacyTipIcon />,
      text: lang.privacy,
      link: "/privacy",
    },
    {
      id: 4,
      icon: <SubjectIcon />,
      text: lang.terms,
      link: "/terms",
    },
  ]

  const settingsData = [
    {
      id: 5,
      icon: <AccountCircleIcon />,
      text: lang.profile,
      link: "/profile",
    },
  ]

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={open ? styles.sidenav : styles.sidenavClosed}>
          <Box
            sx={{
              marginBottom: 3,
            }}>
            <Avatar
              src={
                user?.profileimage
                  ? `${process.env.REACT_APP_ENDPOINT_URL}/${user?.profileimage}`
                  : "/broken-image.jpg"
              }
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 56,
                height: 56,
                marginBottom: 2,
              }}
            />

            <Typography
              sx={{ color: "#fff", display: open ? "block" : "none" }}>
              {user?.name}
            </Typography>
          </Box>
          {navData.map((item) => {
            return (
              <Link
                to={item?.link}
                key={item.id}
                style={
                  `/${activeUrl.pathname.split("/")[1]}` === item.link
                    ? styles.activesideitem
                    : styles.sideitem
                }>
                {item.icon}
                <span style={open ? styles.linkText : styles.linkTextClosed}>
                  {item.text}
                </span>
              </Link>
            )
          })}
          <Divider
            sx={{
              backgroundColor: "#fff",
              width: "90%",
              margin: "10px auto 10px auto",
            }}
          />

          {settingsData.map((item) => {
            return (
              <Link
                to={item?.link}
                key={item.id}
                style={
                  `/${activeUrl.pathname.split("/")[1]}` === item.link
                    ? styles.activesideitem
                    : styles.sideitem
                }>
                {item.icon}
                <span style={open ? styles.linkText : styles.linkTextClosed}>
                  {item.text}
                </span>
              </Link>
            )
          })}
          <Divider
            sx={{
              backgroundColor: "#fff",
              width: "90%",
              margin: "10px auto 10px auto",
            }}
          />
          {aboutData.map((item) => {
            return (
              <Link
                to={item?.link}
                key={item.id}
                style={
                  `/${activeUrl.pathname.split("/")[1]}` === item.link
                    ? styles.activesideitem
                    : styles.sideitem
                }>
                {item.icon}
                <span style={open ? styles.linkText : styles.linkTextClosed}>
                  {item.text}
                </span>
              </Link>
            )
          })}
          <Box
            style={styles.sideitem}
            onClick={() => {
              LogoutMutation.mutate()
            }}>
            <ExitToAppIcon />
            <span style={open ? styles.linkText : styles.linkTextClosed}>
              {lang.logout}
            </span>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none", lg: "none" },
          width: { xs: "100%", md: 0, lg: 0 },
        }}>
        <>
          <Drawer
            anchor={language === "english" ? "left" : "right"}
            open={drawerState}
            onClose={toggleDrawer}>
            <Box sx={{ width: "auto" }} onKeyDown={toggleDrawer}>
              <List sx={styles.drawerStyle}>
                <Box
                  sx={{
                    marginBottom: 5,
                  }}>
                  <Avatar
                    src={
                      user?.profileimage
                        ? `${process.env.REACT_APP_ENDPOINT_URL}/${user?.profileimage}`
                        : "/broken-image.jpg"
                    }
                    sx={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: 56,
                      height: 56,
                      marginBottom: 2,
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#fff",
                      display: open ? "block" : "none",
                      textAlign: "center",
                    }}>
                    {user?.name}
                  </Typography>
                </Box>
                {navData.map((item) => {
                  return (
                    <Link
                      to={item?.link}
                      key={item.id}
                      style={
                        `/${activeUrl.pathname.split("/")[1]}` === item.link
                          ? styles.activesideitem
                          : styles.sideitem
                      }>
                      {item.icon}
                      <span
                        style={open ? styles.linkText : styles.linkTextClosed}>
                        {item.text}
                      </span>
                    </Link>
                  )
                })}
                <Divider
                  sx={{
                    backgroundColor: "#fff",
                    width: "90%",
                    margin: "10px auto 10px auto",
                  }}
                />

                {settingsData.map((item) => {
                  return (
                    <Link
                      to={item?.link}
                      key={item.id}
                      style={
                        `/${activeUrl.pathname.split("/")[1]}` === item.link
                          ? styles.activesideitem
                          : styles.sideitem
                      }>
                      {item.icon}
                      <span
                        style={open ? styles.linkText : styles.linkTextClosed}>
                        {item.text}
                      </span>
                    </Link>
                  )
                })}
                <Divider
                  sx={{
                    backgroundColor: "#fff",
                    width: "90%",
                    margin: "10px auto 10px auto",
                  }}
                />
                {aboutData.map((item) => {
                  return (
                    <Link
                      to={item?.link}
                      key={item.id}
                      style={
                        `/${activeUrl.pathname.split("/")[1]}` === item.link
                          ? styles.activesideitem
                          : styles.sideitem
                      }>
                      {item.icon}
                      <span
                        style={open ? styles.linkText : styles.linkTextClosed}>
                        {item.text}
                      </span>
                    </Link>
                  )
                })}
                <Box
                  style={styles.sideitem}
                  onClick={() => {
                    LogoutMutation.mutate()
                  }}>
                  <ExitToAppIcon />
                  <span style={open ? styles.linkText : styles.linkTextClosed}>
                    {lang.logout}
                  </span>
                </Box>
              </List>
            </Box>
          </Drawer>
        </>
      </Box>
    </>
  )
}

const styles = {
  sidenav: {
    display: { lg: "block", md: "none", xs: "none" },
    width: "20%",
    transition: "width 0.3s ease-in-out",
    height: "100%",
    backgroundColor: "#042f36",
    paddingTop: "28px",
    zIndex: 1,
    "overflow-x": "hidden",
    position: "fixed",
  },
  sidenavClosed: {
    display: { lg: "block", md: "none", sm: "none" },
    transition: "width 0.3s ease-in-out",
    backgroundColor: "#042f36",
    width: "4.5%",
    height: "100vh",
    paddingTop: "28px",
    zIndex: 1,
    "overflow-x": "hidden",
    position: "fixed",
  },
  sideitem: {
    display: "flex",
    alignItems: "center",
    padding: "20px 15px",
    cursor: "pointer",
    color: "#B2BAC2",
    textDecoration: "none",
    marginLeft: "10%",
    marginRight: "10%",
    "&:hover": {
      opacity: 0.7,
    },
  },
  activesideitem: {
    display: "flex",
    alignItems: "center",
    padding: "20px 15px",
    cursor: "pointer",
    color: "#042f36",
    backgroundColor: "#fff",
    textDecoration: "none",
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 20,
  },
  linkText: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  linkTextClosed: {
    visibility: "hidden",
  },
  menuBtn: {
    alignSelf: "center",
    justifySelf: "flex-end",
    color: "#B2BAC2",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    paddingLeft: "20px",
  },
  drawerBtn: {
    fontSize: "18px",
    color: "#000",
    width: "100%",
    justifyContent: "flex-end",
  },
  drawerStyle: {
    backgroundColor: "#042f36",
    minHeight: "94vh",
    paddingTop: "5vh",
    "& button": {
      width: "100%",
      fontSize: "17px",
      fontWeight: "900",
      justifyContent: "flex-start",
      borderRadius: 0,
      margin: "5px 0",
    },
  },
}

export default CompanySideBar
