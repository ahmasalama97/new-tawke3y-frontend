import { Box, Typography } from "@mui/material"
import Webcam from "react-webcam"
import { useCallback, useEffect, useRef, useState } from "react"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import ModalContainer from "../../Components/Utils/ModalContainer"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"

const Step3 = (props) => {
  const webcamRef = useRef(null)
  const [openModal, setOpenModal] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])
  const isMobile = width <= 768

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    var temppayload = { ...props?.completeProfilepayloadobjContext }
    temppayload.profileimage = imageSrc
    props?.setCompleteProfilepayloadobjContext({ ...temppayload })
    setOpenModal(!openModal)
  }, [webcamRef, setOpenModal, openModal, props])

  const videoConstraints = {
    width: "100%",
    height: 720,
    facingMode: "user",
  }
  return (
    <Box sx={{}}>
      <Box
        onClick={() => {
          setOpenModal(true)
        }}>
        {!props?.completeProfilepayloadobjContext.profileimage ? (
          <>
            <Box style={styles.selectFieldHeader}>
              <Typography style={styles.selectFieldText}>
                {props?.lang.capturepersonalimage}
              </Typography>
            </Box>
            <Box style={styles.documentpicker}>
              <AddPhotoAlternateIcon sx={styles.documenticon} />
            </Box>
          </>
        ) : (
          <>
            <Box style={styles.selectFieldHeader}>
              <Typography style={styles.selectFieldText}>
                {props?.lang.capturepersonalimage}
              </Typography>
            </Box>
            <Box style={styles.documentpicker}>
              <img
                src={props?.completeProfilepayloadobjContext.profileimage}
                width={isMobile ? "100%" : "50%"}
                height="100%"
                alt="profileImage"
              />
            </Box>
          </>
        )}
      </Box>

      <ModalContainer
        modalState={openModal}
        modalChangeState={setOpenModal}
        btnPlaceholder=""
        modalTitle={props?.lang.capturepersonalimage}
        modalAction={capture}
        btnTitle={props?.lang.capture}>
        <Webcam
          ref={webcamRef}
          audio={false}
          height={320}
          screenshotFormat="image/jpeg"
          width={"100%"}
          videoConstraints={videoConstraints}
        />
      </ModalContainer>
    </Box>
  )
}

const styles = {
  selectFieldHeader: {
    // marginLeft: 30,
    marginTop: 10,
  },
  selectFieldText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  documentpicker: {
    border: "1px dashed #fff",
    width: "85%",
    justifyContent: "center",
    alignSelf: "center",
    top: 20,
    borderRadius: 15,
    borderStyle: "dashed",
    display: "inline-block",
    height: "50vh",
  },
  documenticon: {
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 15,
    color: "#fff",
    fontSize: 60,
  },
  primaryBtnContainer: {
    marginTop: 5,
    justifyContent: "center",
    display: "flex",
  },
  primaryBtn: {
    backgroundColor: "#042f36",
    borderColor: "#042f36",
    height: "40px",
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      opacity: 0.5,
    },
  },
}

export default Step3
