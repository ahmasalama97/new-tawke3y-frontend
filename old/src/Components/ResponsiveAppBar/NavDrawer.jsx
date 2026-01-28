import { useState } from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import MenuIcon from "@mui/icons-material/Menu"
import { useLocation, useNavigate } from "react-router-dom"
import SingleNavLinks from "./SingleNavLinks.jsx"
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material"
import { Logout } from "@mui/icons-material"

const NavDrawer = ({ MenuLinks, LogoutMutation }) => {
  const navigate = useNavigate()
  const activeUrl = useLocation()

  const user = JSON.parse(sessionStorage.getItem("user"))

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [drawerState, setDrawerState] = useState(false)

  const toggleDrawer = () => {
    setDrawerState(!drawerState)
  }

  return (
    <Box sx={{ width: { xs: "100%", md: 0, lg: 0 } }}>
      <>
        <Button
          onClick={toggleDrawer}
          sx={{
            ...styles.drawerBtn,
            ...{ display: { xs: "flex", md: "none" } },
          }}>
          <MenuIcon />
        </Button>

        <Drawer anchor={"right"} open={drawerState} onClose={toggleDrawer}>
          <Box
            sx={{ width: "auto", display: "grid", justifyContent: "center" }}
            onKeyDown={toggleDrawer}>
            {user && (
              <>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}>
                    <Avatar
                      sx={{ width: 50, height: 50 }}
                      alt={user?.name}
                      src={user?.profileimage}
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
                  <MenuItem onClick={() => {}}>
                    <Avatar /> {user?.name}
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
                    <Avatar /> Dashboard
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
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
            <List sx={styles.drawerStyle}>
              {MenuLinks.map((page) => (
                <ListItem key={page.key} disablePadding>
                  <SingleNavLinks
                    name={page.label}
                    to={page.link}
                    changeMenuStatusHandler={toggleDrawer}
                    active={activeUrl.pathname === page.link}
                    fullWidth
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </>
    </Box>
  )
}

const styles = {
  drawerBtn: {
    fontSize: "18px",
    color: "#000",
    width: "100%",
    justifyContent: "flex-end",
  },
  drawerStyle: {
    backgroundColor: "#fff",
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
  textBtn: {
    alignSelf: "center",
    paddingLeft: "10%",
    fontWeight: 500,
    cursor: "pointer",
    color: "#000",
  },
}

export default NavDrawer
