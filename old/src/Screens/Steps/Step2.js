import { Box, Typography } from "@mui/material"
import Webcam from "react-webcam"
import { useCallback, useRef, useState } from "react"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import ModalContainer from "../../Components/Utils/ModalContainer"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"

const Step2 = (props) => {
  const webcamRef = useRef(null)
  const inputFile = useRef(null)
  const [openModal, setOpenModal] = useState(false)
  const [img, setImage] = useState(null)

  const capture = useCallback(() => {
    setOpenModal(!openModal)
  }, [setOpenModal, openModal])

  const handleFileUpload = (e) => {
    const { files } = e.target
    if (files && files.length) {
      var temppayload = { ...props?.completeProfilepayloadobjContext }
      temppayload.idcard = files[0]
      setImage(URL.createObjectURL(files[0]))
      props?.setCompleteProfilepayloadobjContext({ ...temppayload })
    }
  }

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  }

  const onButtonClick = () => {
    inputFile.current.click()
  }
  return (
    <>
      <div style={{ display: "none" }}>
        <input
          style={{ display: "none" }}
          // accept=".zip,.rar"
          ref={inputFile}
          onChange={handleFileUpload}
          type="file"
        />
        <div className="button" onClick={onButtonClick}>
          Upload
        </div>
      </div>
      <Box
        onClick={() => {
          inputFile.current.click()
        }}>
        {!props?.completeProfilepayloadobjContext.idcard ? (
          <>
            <Box style={styles.selectFieldHeader}>
              <Typography style={styles.selectFieldText}>
                {props?.lang.captureidcard}
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
                {props?.lang.captureidcard}
              </Typography>
            </Box>
            <Box style={styles.documentpicker}>
              <img
                src={
                  img
                    ? img
                    : URL.createObjectURL(
                        props?.completeProfilepayloadobjContext.idcard,
                      )
                }
                height="100%"
                alt="idCard"
              />
            </Box>
          </>
        )}
      </Box>

      <ModalContainer
        modalState={openModal}
        modalChangeState={setOpenModal}
        btnPlaceholder=""
        modalTitle={props?.lang.captureidcard}>
        <Webcam
          ref={webcamRef}
          audio={false}
          height={320}
          screenshotFormat="image/jpeg"
          width={620}
          videoConstraints={videoConstraints}
        />
        <Box sx={styles.primaryBtnContainer}>
          <PrimaryBtn
            onClick={capture}
            title={props?.lang?.capture}
            btnStyle={styles.primaryBtn}
          />
        </Box>
      </ModalContainer>
    </>
  )
}

const styles = {
  selectFieldHeader: {
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

export default Step2
