import { Box, Typography } from "@mui/material";
import PrimaryBtn from "../Buttons/PrimaryBtn";

const ErrorSection = ({ image, text, onClick }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box style={styles.errorImageContainer}>
        <Box
          component="img"
          sx={styles.errorImage}
          alt="errorImg"
          src={image}
        />
        <Typography style={styles.errorText}>{text}</Typography>
        {onClick && (
          <PrimaryBtn
            title="Reload"
            btnStyle={styles.primaryBtn}
            onClick={onClick}
          />
        )}
      </Box>
    </Box>
  );
};
const styles = {
  errorImageContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: "5%",
    height: 300,
    width: 350,
  },
  errorImage: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    fontSize: 25,
    color: "#171717",
    textAlign: "center",
    marginTop: 25,
  },
  primaryBtn: {
    marginTop: 5,
  },
};
export default ErrorSection;
