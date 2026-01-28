import { useContext, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Box, Grid, Typography } from "@mui/material"
import { CompleteProfileContext } from "../../Contexts/CompleteProfileContext"
import { LanguageContext } from "../../Contexts/LanguageContext"
import StepsHeaderComponent from "../../Components/Headers/StepsHeaderComponent"
import CircularLoader from "../../Components/Utils/CircularLoader"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import Step4 from "./Step4"
import { useSnackbar } from "notistack"

const CompleteProfile = () => {
  const location = useLocation()
  const { lang, language } = useContext(LanguageContext)
  const [distance, setDistance] = useState(null)

  const {
    completeProfilepayloadobjContext,
    setCompleteProfilepayloadobjContext,
    submitprofilecontext,
    submitbuttonloadingcontext,
  } = useContext(CompleteProfileContext)

  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (
      !completeProfilepayloadobjContext.idnumber ||
      !completeProfilepayloadobjContext.birthdate ||
      !completeProfilepayloadobjContext.mothername
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [
    !completeProfilepayloadobjContext.idnumber,
    !completeProfilepayloadobjContext.birthdate,
    !completeProfilepayloadobjContext.mothername,
  ])

  const [disabled2, setDisabled2] = useState(true)

  useEffect(() => {
    if (!completeProfilepayloadobjContext.idcard) {
      setDisabled2(true)
    } else {
      setDisabled2(false)
    }
  }, [completeProfilepayloadobjContext.idcard])

  const [disabled3, setDisabled3] = useState(true)

  useEffect(() => {
    if (!completeProfilepayloadobjContext.profileimage) {
      setDisabled3(true)
    } else {
      setDisabled3(false)
    }
  }, [completeProfilepayloadobjContext.profileimage])

  return (
    <Box style={styles.container}>
      {isLoading || submitbuttonloadingcontext ? <CircularLoader /> : null}
      <Typography sx={styles.logoTitle}>{lang.completeprofile}</Typography>
      <StepsHeaderComponent
        stepProps={step}
        setIsLoading={setIsLoading}
        lang={lang}
      />
      {step === 1 && (
        <Step1
          completeProfilepayloadobjContext={completeProfilepayloadobjContext}
          setCompleteProfilepayloadobjContext={
            setCompleteProfilepayloadobjContext
          }
          email={location?.state?.email || ""}
          lang={lang}
          language={language}
        />
      )}
      {step === 2 && (
        <Step2
          completeProfilepayloadobjContext={completeProfilepayloadobjContext}
          setCompleteProfilepayloadobjContext={
            setCompleteProfilepayloadobjContext
          }
          lang={lang}
        />
      )}
      {step === 3 && (
        <Step3
          completeProfilepayloadobjContext={completeProfilepayloadobjContext}
          setCompleteProfilepayloadobjContext={
            setCompleteProfilepayloadobjContext
          }
          lang={lang}
        />
      )}
      {step === 4 && (
        <Step4
          completeProfilepayloadobjContext={completeProfilepayloadobjContext}
          setCompleteProfilepayloadobjContext={
            setCompleteProfilepayloadobjContext
          }
          lang={lang}
          distance={distance}
          setDistance={setDistance}
        />
      )}
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        {step !== 1 && (
          <Grid item xs={12} md={6} lg={6}>
            <PrimaryBtn
              title={lang.back}
              btnStyle={styles.primaryBtn}
              disabled={isLoading}
              onClick={() => {
                setStep(step - 1)
              }}
            />
          </Grid>
        )}
        {step !== 4 && (
          <Grid item xs={12} md={6} lg={6}>
            <PrimaryBtn
              title={lang.next}
              btnStyle={styles.primaryBtn}
              disabled={
                step === 1
                  ? disabled
                  : step === 2
                  ? disabled2
                  : step === 3
                  ? disabled3
                  : isLoading
              }
              onClick={() => {
                setStep(step + 1)
              }}
            />
          </Grid>
        )}
        {/* {step === 4 && (
          <Grid item xs={12} md={12} lg={6}>
            <PrimaryBtn
              title={lang.submit}
              btnStyle={styles.primaryBtn}
              disabled={isLoading || disabled}
              onClick={() => {
                if (distance.toFixed(1) == 0.6) {
                  submitprofilecontext()
                } else {
                  enqueueSnackbar(
                    "Photo in ID Image and Your Image are not matching, Try Again!",
                    { variant: "error" },
                  )
                }
              }}
            />
          </Grid>
        )} */}
      </Grid>
    </Box>
  )
}

const styles = {
  container: {
    backgroundColor: "#042f36",
  },
  logoTitle: {
    fontSize: "45px",
    fontWeight: 500,
    color: "#fff",
    alignSelf: "center",
    fontFamily: "cursive",
    paddingTop: 5,
  },
  primaryBtn: {
    marginTop: 5,
    marginBottom: 5,
    width: 200,
    textTransform: "capitalize",
    backgroundColor: "#fff",
    height: "40px",
    color: "#042f36",
    "&:disabled": {
      opacity: 0.5,
      backgroundColor: "#fff",
      color: "#042f36",
    },
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#fff",
      color: "#042f36",
    },
  },
}

export default CompleteProfile
