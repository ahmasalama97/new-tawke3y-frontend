import { Box, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const BackToHomeBtn = (props) => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.container} onClick={() => navigate("/home")}>
      {props?.language === "english" ? (
        <ArrowBackIosNewIcon sx={styles.icon} />
      ) : (
        <ArrowForwardIosIcon sx={styles.icon} />
      )}
      <Typography sx={styles.text}>{props?.lang.backtohome}</Typography>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    textAlign: "left",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "15px",
    marginBottom: "-15px",
    cursor: "pointer",
  },
  icon: {
    fontSize: 16,
    alignSelf: "center",
    color: "blue",
    paddingLeft: 1,
    paddingRight: 1,
  },
  text: {
    fontSize: 14,
    color: "blue",
  },
};

export default BackToHomeBtn;
