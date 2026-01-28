import { Box, Link } from "@mui/material"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"

const SingleNavLinks = ({ name, to, active, changeMenuStatusHandler }) => {
  return (
    <Box sx={[styles.singleLink, active && styles.singleLinkActive]}>
      <ScrollLink to={to} onClick={changeMenuStatusHandler} spy>
        {name}
      </ScrollLink>
    </Box>
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
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  singleLinkActive: {
    margin: "0 2px",
    padding: "10px 20px",
    color: "#000",
    display: "flex",
    borderRadius: "7px",
    textDecoration: "unset",
    // fontFamily: "Avenir",
    transition: "all 0.5s",
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}

export default SingleNavLinks
