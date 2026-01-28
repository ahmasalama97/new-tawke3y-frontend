import { Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PrimaryBtn from "../Buttons/PrimaryBtn";

const MenuBar = ({ onClick, title, onAdd, onGoBack, language, lang }) => {
  return (
    <Box sx={{ justifyContent: "space-between" }}>
      {onGoBack ? (
        <Box onClick={onGoBack} sx={styles.container}>
          <Box
            sx={{
              ...styles.main,
              ...{
                margin: 0,
                paddingRight: 0,
                paddingTop: 2.3,
                paddingLeft: 3,
              },
            }}
          >
            {language === "english" ? (
              <ArrowBackIosIcon sx={{ alignSelf: "center", marginRight: 5 }} />
            ) : (
              <ArrowForwardIosIcon
                sx={{ alignSelf: "center", marginRight: 5 }}
              />
            )}
          </Box>
          <Box sx={{ display: { lg: "flex", md: "block", xs: "block" } }}>
            <Typography sx={styles.title}>{title}</Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={styles.container}>
          <Box onClick={onClick} sx={styles.main}>
            <Box sx={styles.menu}></Box>
            <Box
              sx={{
                ...styles.menu,
                ...{ marginTop: 1, width: 35 },
              }}
            ></Box>
            <Box
              sx={{
                ...styles.menu,
                ...{ marginTop: 1 },
              }}
            ></Box>
          </Box>
          <Box sx={{ display: { lg: "flex", md: "block", xs: "block" } }}>
            <Typography sx={styles.title}>{title}</Typography>
          </Box>
        </Box>
      )}
      {onAdd && (
        <Box
          sx={
            language === "english"
              ? styles.primaryBtnContainer
              : styles.primaryBtnContainerAr
          }
        >
          <PrimaryBtn
            title={lang.generatecontract}
            btnStyle={styles.primaryBtn}
            onClick={onAdd}
          />
        </Box>
      )}
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    marginTop: "2%",
  },
  main: {
    margin: 2,
    paddingRight: 3,
    cursor: "pointer",
    display: "block",
    height: "30px",
  },
  menu: {
    width: 30,
    height: 4,
    backgroundColor: "#042f36",
  },
  title: {
    display: "flex",
    fontSize: 22,
    marginTop: 2,
    fontWeight: 700,
    color: "#042f36",
  },
  icon: {
    position: "absolute",
    right: "3%",
    alignSelf: "center",
    fontSize: "30px",
    color: "#018601",
    cursor: "pointer",
  },
  primaryBtnContainer: {
    marginTop: 2,
    top: "5%",
    right: "3%",
    justifyContent: "center",
    position: { lg: "absolute" },
    display: "flex",
  },
  primaryBtnContainerAr: {
    marginTop: 2,
    top: "2.5%",
    right: "3%",
    justifyContent: "center",
    position: { lg: "absolute" },
    display: "flex",
  },
  primaryBtn: {
    backgroundColor: "#042f36",
    borderColor: "#042f36",
    height: "40px",
    color: "#fff",
    textTransform: "capitalize",
  },
};

export default MenuBar;
