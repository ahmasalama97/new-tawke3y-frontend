import { Box, Typography } from "@mui/material"
import VerifiedIcon from "@mui/icons-material/Verified"
import { CompleteProfileContext } from "../../Contexts/CompleteProfileContext"
import { useContext, useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import CircularLoader from "../../Components/Utils/CircularLoader"
import * as faceapi from "face-api.js"
import * as canvas from "canvas"
import { LanguageContext } from "../../Contexts/LanguageContext"
import { useParams } from "react-router-dom"

const Step4 = (props) => {
  let params = useParams()

  const { enqueueSnackbar } = useSnackbar()
  const { lang } = useContext(LanguageContext)
  const { completeProfilepayloadobjContext, submitprofilecontext } = useContext(
    CompleteProfileContext,
  )

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models")
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models")
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models")
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models")
      await faceapi.nets.faceExpressionNet.loadFromUri("/models")

      const queryImage = await canvas.loadImage(
        URL.createObjectURL(completeProfilepayloadobjContext.idcard),
      )
      const queryImage2 = await canvas.loadImage(
        completeProfilepayloadobjContext.profileimage,
      )

      const faceDescriptor1 = await faceapi
        .detectSingleFace(queryImage)
        .withFaceLandmarks()
        .withFaceDescriptor()
      const faceDescriptor2 = await faceapi
        .detectSingleFace(queryImage2)
        .withFaceLandmarks()
        .withFaceDescriptor()
      if (faceDescriptor2 === undefined || faceDescriptor1.undefined) {
        setIsLoading(false)
        enqueueSnackbar(lang.mismatchimages, { variant: "error" })
      }
      const distance = faceapi.euclideanDistance(
        faceDescriptor1.descriptor,
        faceDescriptor2.descriptor,
      )

      if (distance.toFixed(1) === "0.6" || distance.toFixed(1) === "0.5") {
        setIsLoading(false)
        submitprofilecontext(params?.id)
      } else if (
        distance.toFixed(1) !== "0.6" ||
        distance.toFixed(1) !== "0.5"
      ) {
        setIsLoading(false)
        enqueueSnackbar(lang.mismatchimages, { variant: "error" })
      } else {
        setIsLoading(false)
        enqueueSnackbar(lang.errorResponse, { variant: "error" })
      }
      // } catch (error) {
      // setIsLoading(false)
      //   enqueueSnackbar(lang.errorResponse, { variant: "error" })
      // }
    })()
  }, [
    enqueueSnackbar,
    completeProfilepayloadobjContext.idcard,
    completeProfilepayloadobjContext.profileimage,
  ])
  return (
    <>
      {isLoading && <CircularLoader />}
      <Box sx={styles.successMsg}>
        <VerifiedIcon sx={styles.check} />
        <Typography sx={styles.description}>
          {props?.lang.completeprofileSuccess}
        </Typography>
      </Box>
    </>
  )
}

const styles = {
  successMsg: {
    height: "45vh",
    justifyContent: "center",
  },
  check: {
    fontSize: 150,
    // padding: 10,
    margin: 5,
    alignSelf: "center",
    color: "#fff",
  },
  description: {
    flexDirection: "column",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
}

export default Step4
