import { Avatar, Box, Grid, Tooltip, Zoom } from "@mui/material"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"

const UserCard = ({ ...props }) => {
  return (
    <Box sx={[styles.singleCard, { boxShadow: 2 }]}>
      <Grid container>
        <Grid item xs={6} md={2} lg={2} sx={styles.infoGrid}>
          <Box sx={styles.infoContainer}>
            <Avatar
              src={
                props?.profileimage
                  ? `${process.env.REACT_APP_ENDPOINT_URL}/${props?.profileimage}`
                  : "/broken-image.jpg"
              }
              alt={props?.name}
              sx={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 56,
                height: 56,
                marginBottom: 2,
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6} md={2} lg={2} sx={styles.infoGrid}>
          <Box sx={styles.infoContainer}>
            <span>{props?.lang.fullname}</span>
            {props?.name}
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3} sx={styles.infoGrid}>
          <Box sx={styles.infoContainer}>
            <span>{props?.lang.user}</span>
            {props?.username}
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3} sx={styles.infoGrid}>
          <Box sx={styles.infoContainer}>
            <span>{props?.lang.email}</span>
            {props?.email}
          </Box>
        </Grid>

        <Grid item xs={12} md={2} lg={2} sx={styles.infoGrid}>
          <Box sx={styles.cardIcon}>
            <Tooltip TransitionComponent={Zoom} title={props?.lang.viewdetails}>
              <Box
                onClick={props?.viewDetails}
                style={{
                  ...styles.infoContainer,
                  ...{
                    backgroundColor: "#042f36",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginRight: "10px",
                  },
                }}>
                {props?.language === "english" ? (
                  <KeyboardArrowRightIcon sx={{ color: "#fff" }} />
                ) : (
                  <KeyboardArrowLeftIcon sx={{ color: "#fff" }} />
                )}
              </Box>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
const styles = {
  singleCard: {
    display: { lg: "flex", md: "flex", xs: "block" },
    justifyContent: "space-between",
    backgroundColor: "white",
    fontSize: "14px",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
  },
  infoGrid: {
    alignSelf: "center",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    span: {
      display: "block",
      opacity: "0.7",
      fontSize: "14px",
      fontWeight: "500",
      color: "text.hint",
      marginBottom: "10px",
    },
  },
  info: {
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  },

  activeStatus: {
    color: "success.main",
  },

  disabledStatus: {
    color: "main.main",
  },

  cardIcon: {
    display: "inline-flex",
    justifyContent: "center",
    width: "fit-content",
  },
}
export default UserCard
