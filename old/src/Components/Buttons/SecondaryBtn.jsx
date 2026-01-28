import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const SecondaryBtn = ({ icon, title, onClick, language }) => {
  return (
    <Box sx={styles.container} onClick={onClick}>
      <Box sx={styles.btnContainer}>
        <Box sx={styles.btnTextIcon}>
          {icon}
          <Typography>{title}</Typography>
        </Box>
        {language === "english" ? (
          <ArrowForwardIosIcon />
        ) : (
          <ArrowBackIosNewIcon />
        )}
      </Box>
    </Box>
  );
};
const styles = {
  container: {
    marginTop: 5,
    justifyContent: "flex-start",
    backgroundColor: "#E5E4E2",
    padding: 2,
    borderRadius: 3,
    cursor: "pointer",
  },
  btnContainer: {
    justifyContent: "space-between",
    display: "flex",
  },
  btnTextIcon: {
    display: "flex",
  },
};
export default SecondaryBtn;
