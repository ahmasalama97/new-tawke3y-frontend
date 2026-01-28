import { Box, Grid, Tooltip, Zoom } from "@mui/material"
import DrawIcon from "@mui/icons-material/Draw"
import FileOpenIcon from "@mui/icons-material/FileOpen"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ShareIcon from "@mui/icons-material/Share"
import { Link } from "react-router-dom"
import moment from "moment"
import "moment/locale/ar"

const ContractCard = ({ ...props }) => {
  return (
    <Box sx={[styles.singleCard, { boxShadow: 2 }]}>
      <Grid container>
        <Grid item xs={6} md={2} lg={2} sx={styles.infoGrid}>
          <Box sx={styles.infoContainer}>
            <span>{props?.lang?.contractname}</span>
            {props?.contractName}
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3} sx={styles.infoGrid}>
          <Box sx={styles.infoContainer}>
            <span>{props?.lang?.uploaded}</span>
            {props?.language === "english"
              ? props?.date
              : moment.locale("ar") && moment(props?.date).format("l")}
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3} sx={styles.infoGrid}>
          {props?.signed === "1" && (
            <Box sx={styles.infoContainer}>
              <span>{props?.lang?.signed}</span>
              {props?.language === "english"
                ? props?.signedAt
                : moment.locale("ar") && moment(props?.signedAt).format("l")}
            </Box>
          )}
        </Grid>
        <Grid item xs={6} md={2} lg={2} sx={styles.infoGrid}>
          {props?.by && (
            <Box sx={styles.infoContainer}>
              <span>{props?.lang?.signedby}</span>
              {props?.by}
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={2} lg={2} sx={styles.infoGrid}>
          <Box sx={styles.cardIcon}>
            {props?.signed === "0" && !props?.type && (
              <Tooltip
                TransitionComponent={Zoom}
                title={props?.lang?.signcontract}>
                <Box
                  onClick={() => props?.setOpenModal(true)}
                  sx={[
                    styles.infoContainer,
                    {
                      backgroundColor: "#042f36",
                      padding: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginRight: "10px",
                    },
                  ]}>
                  <DrawIcon sx={{ color: "#fff" }} />
                </Box>
              </Tooltip>
            )}
            {props?.onShare && (
              <Tooltip
                TransitionComponent={Zoom}
                title={props?.lang?.sharecontract}>
                <Box
                  onClick={props?.onShare}
                  sx={[
                    styles.infoContainer,
                    {
                      backgroundColor: "#042f36",
                      padding: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    },
                  ]}>
                  <ShareIcon sx={{ color: "#fff" }} />
                </Box>
              </Tooltip>
            )}
            {props?.signed === 0 && (
              <Tooltip
                TransitionComponent={Zoom}
                title={props?.lang?.signature}>
                <Box sx={[styles.infoContainer, { marginRight: "10px" }]}>
                  <CheckCircleIcon
                    sx={{ fontSize: "30px", color: "#018601" }}
                  />
                </Box>
              </Tooltip>
            )}
            <Tooltip
              TransitionComponent={Zoom}
              title={props?.lang?.viewcontract}>
              <Link
                target="_blank"
                to={
                  props?.signed === "1"
                    ? props?.signaturedFile
                    : props?.originalFile
                }
                style={{
                  ...styles.infoContainer,
                  ...{
                    backgroundColor: "#042f36",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    marginRight: "10px",
                    marginLeft: "10px",
                  },
                }}>
                <FileOpenIcon sx={{ color: "#fff" }} />
              </Link>
            </Tooltip>
            {props?.onDelete && (
              <Tooltip
                TransitionComponent={Zoom}
                title={props?.lang?.deletedContract}>
                <Box
                  onClick={props?.onDelete}
                  sx={{
                    ...styles.infoContainer,
                    ...{
                      backgroundColor: "#ff0000",
                      padding: "10px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    },
                  }}>
                  <DeleteForeverIcon sx={{ color: "#fff" }} />
                </Box>
              </Tooltip>
            )}
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
    textTransform: "capitalize",
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
export default ContractCard
