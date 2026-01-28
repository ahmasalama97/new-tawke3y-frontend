import { Box } from "@mui/material"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"

const Language = (props) => {
  console.log(props?.langValue)
  return (
    <>
      <Box sx={styles.textFieldContainer}>
        <PrimaryBtn
          disabled={props?.langValue === "english"}
          title="English"
          btnStyle={{
            ...styles.primaryBtn,
            ...{
              width: "100%",
              marginBottom: 5,
            },
          }}
          onClick={() => props?.setLangValue("english")}
        />
        <PrimaryBtn
          disabled={props?.langValue === "arabic"}
          title="العربية"
          btnStyle={{ ...styles.primaryBtn, ...{ width: "100%" } }}
          onClick={() => props?.setLangValue("arabic")}
        />
      </Box>
    </>
  )
}
const styles = {
  textFieldContainer: {
    marginTop: 2,
  },
  primaryBtnContainer: {
    marginTop: 5,
    justifyContent: "center",
    display: "flex",
  },
  primaryBtn: {
    textTransform: "capitalize",
    backgroundColor: "#042f36",
    borderColor: "#042f36",
    height: "40px",
    color: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#042f36",
      borderColor: "#042f36",
    },
  },
}
export default Language
