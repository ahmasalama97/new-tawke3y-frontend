import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { Box, Typography } from "@mui/material"
import SyncIcon from "@mui/icons-material/Sync"
import { useSnackbar } from "notistack"
import * as canvas from "canvas"
import * as faceapi from "face-api.js"
import { CompleteProfileContext } from "../../Contexts/CompleteProfileContext"
import { LanguageContext } from "../../Contexts/LanguageContext"
import { GetUserValidation_API } from "../../APIs/API"
import CircularLoader from "../../Components/Utils/CircularLoader"

const FaceRecognition = () => {
  let params = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const { lang } = useContext(LanguageContext)

  const { verifyUserContextMutation, submitbuttonloadingcontext } = useContext(
    CompleteProfileContext,
  )
  const [isLoading, setIsLoading] = useState(true)

  const { isSuccess, data: userData } = useQuery(
    ["GetUserValidation_API", { id: params?.id }],
    () =>
      GetUserValidation_API({
        id: params?.id,
      }),
    {
      refetchOnWindowFocus: true,
    },
  )

  useEffect(() => {
    ;(async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models")
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models")
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models")
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models")
      await faceapi.nets.faceExpressionNet.loadFromUri("/models")

      const queryImage = await canvas.loadImage(
        `${process.env.REACT_APP_ENDPOINT_URL}/${userData?.data?.data[0]?.idcard}`,
      )
      const queryImage2 = await canvas.loadImage(
        `${process.env.REACT_APP_ENDPOINT_URL}/${userData?.data?.data[0]?.profileimage}`,
      )

      const faceDescriptor1 = await faceapi
        .detectSingleFace(queryImage)
        .withFaceLandmarks()
        .withFaceDescriptor()
      const faceDescriptor2 = await faceapi
        .detectSingleFace(queryImage2)
        .withFaceLandmarks()
        .withFaceDescriptor()

      const distance = faceapi.euclideanDistance(
        faceDescriptor1.descriptor,
        faceDescriptor2.descriptor,
      )
      if (distance) {
        setIsLoading(false)
        verifyUserContextMutation.mutate({
          distance: distance.toFixed(1),
          id: params?.id,
        })
      }
    })()
  }, [isSuccess, userData, enqueueSnackbar])

  return (
    <>
      <Box sx={styles.container}>
        {submitbuttonloadingcontext || isLoading ? <CircularLoader /> : null}
        <Typography sx={styles.logoTitle}>{lang.verifyuser}</Typography>
        <Box sx={styles.successMsg}>
          <SyncIcon sx={styles.check} />
          <Typography sx={styles.description}>{lang.verifyuserdata}</Typography>
        </Box>
      </Box>
    </>
  )
}

const styles = {
  container: {
    backgroundColor: "#042f36",
    height: "100%",
    "min-height": "100vh",
  },
  logoTitle: {
    fontSize: "45px",
    fontWeight: 500,
    color: "#fff",
    alignSelf: "center",
    paddingTop: 5,
  },
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

export default FaceRecognition
