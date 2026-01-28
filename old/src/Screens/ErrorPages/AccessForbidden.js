import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";

const AccessForbidden = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.baseio}>
        <Typography variant="h1" sx={styles.io}>
          403
        </Typography>
        <Typography variant="h2" sx={styles.text}>
          Access Forbidden
        </Typography>
        <PrimaryBtn
          title="Go Back"
          btnStyle={styles.primaryBtn}
          onClick={() => {
            navigate(-2);
          }}
        />
      </Box>
    </Box>
  );
};
const styles = {
  container: {
    backgroundColor: "#042f36",
    height: "100vh",
  },
  baseio: {
    width: "100%",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexDirection: "column",
  },
  io: {
    fontFamily: "cursive",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: "20vw",
    display: "block",
    margin: 0,
    color: "#9ae1e2",
    position: "relative",
    zIndex: 0,
    "&:before": {
      content: '"U"',
      position: "absolute",
      top: "-15%",
      right: "39%",
      transform: "rotate(180deg)",
      fontSize: "10vw",
      color: "#f6c667",
      zIndex: -1,
      textAlign: "center",
    },
  },
  primaryBtn: {
    marginTop: 5,
    width: 200,
    textTransform: "capitalize",
    backgroundColor: "#fff",
    borderColor: "#fff",
    height: "40px",
    color: "#042f36",
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#fff",
      borderColor: "#fff",
      color: "#042f36",
    },
  },
  text: {
    fontFamily: "cursive",
    color: "#9ae1e2",
    fontSize: "3vw",
    margin: 0,
    textAlign: "center",
    opacity: 1,
  },
};
export default AccessForbidden;
