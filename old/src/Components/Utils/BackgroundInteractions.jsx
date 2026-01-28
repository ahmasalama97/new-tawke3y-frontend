import { Box } from "@mui/material";
import Interaction1 from "../../assets/interaction1.svg";
import Interaction2 from "../../assets/interaction2.svg";
import Interaction3 from "../../assets/interaction3.svg";
import Interaction4 from "../../assets/interaction4.svg";

const BackgroundInteractions = () => {
  return (
    <>
      <Box
        component="img"
        sx={styles.interactionGreen}
        alt="Interaction"
        src={Interaction2}
      />
      <Box
        component="img"
        sx={styles.interactionWhite}
        alt="Interaction"
        src={Interaction3}
      />
      <Box
        component="img"
        sx={styles.interactionBlue}
        alt="Interaction"
        src={Interaction1}
      />
      <Box
        component="img"
        sx={styles.interactionYellow}
        alt="Interaction"
        src={Interaction4}
      />
    </>
  );
};

const styles = {
  interactionBlue: {
    position: "absolute",
    top: "29rem",
    left: "10rem",
    display: { xs: "none", md: "none", lg: "block" },
    width: "6rem",
    height: "6rem",
  },
  interactionGreen: {
    position: "absolute",
    top: "7rem",
    left: "18%",
    display: { xs: "none", md: "none", lg: "block" },
    width: "1.25rem",
    height: "1.25rem",
  },
  interactionWhite: {
    position: "absolute",
    top: "14rem",
    left: "-27rem",
    display: { xs: "none", md: "none", lg: "block" },
    width: "40rem",
    height: "40rem",
  },
  interactionYellow: {
    position: "absolute",
    top: "13rem",
    right: "8%",
    display: { xs: "none", md: "none", lg: "block" },
    width: "2.5rem",
    height: "2.5rem",
  },
};

export default BackgroundInteractions;
