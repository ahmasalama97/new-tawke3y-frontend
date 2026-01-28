import { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"

const StepsHeaderComponent = (props) => {
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

  const isMobile = width < 425

  return (
    <Box>
      <Box style={styles.stepsContainer}>
        <Box
          style={{
            ...styles.steps,
            ...{
              width: isMobile ? "15%" : 70,
              height: isMobile ? "50px" : 70,
              border:
                props.stepProps === 1 ? "1px solid #000" : "0px solid #fff",
              backgroundColor: props.stepProps === 1 ? "#ffffff" : "#018601",
            },
          }}>
          {props.stepProps === 1 && (
            <Typography style={styles.stepsText}>{props.lang.a}</Typography>
          )}
          {props.stepProps !== 1 && (
            <CheckIcon sx={{ fontSize: "35px", color: "#fff" }} />
          )}
        </Box>
        <Box
          style={{
            ...styles.stepsLine,
            ...{
              border:
                props.stepProps !== 1
                  ? "1px solid #018601"
                  : "1px solid #E0E0E0",
            },
          }}></Box>

        <Box
          style={{
            ...styles.steps,
            ...{
              width: isMobile ? "15%" : 70,
              height: isMobile ? "50px" : 70,
              border:
                props.stepProps === 3 || props.stepProps === 4
                  ? "0px solid #E0E0E0"
                  : "1px solid #E0E0E0",
              borderColor:
                props.stepProps === 2 ||
                props.stepProps === 3 ||
                props.stepProps === 4
                  ? "#000"
                  : "#E0E0E0",
              backgroundColor:
                props.stepProps === 3 || props.stepProps === 4
                  ? "#018601"
                  : "#ffffff",
            },
          }}>
          {props.stepProps !== 3 && props.stepProps !== 4 && (
            <Typography
              style={{
                ...styles.stepsText,
                ...{
                  color: props.stepProps === 2 ? "#000" : "#E0E0E0",
                },
              }}>
              {props.lang.b}
            </Typography>
          )}
          {props.stepProps === 3 || props.stepProps === 4 ? (
            <CheckIcon sx={{ fontSize: "35px", color: "#fff" }} />
          ) : null}
        </Box>
        <Box
          style={{
            ...styles.stepsLine,
            ...{
              border:
                props.stepProps === 3 || props.stepProps === 4
                  ? "1px solid #018601"
                  : "1px solid #E0E0E0",
            },
          }}></Box>

        <Box
          style={{
            ...styles.steps,
            ...{
              width: isMobile ? "15%" : 70,
              height: isMobile ? "50px" : 70,
              border: props.stepProps === 4 ? 0 : "1px solid #E0E0E0",
              borderColor:
                props.stepProps === 3 || props.stepProps === 4
                  ? "#000"
                  : "#E0E0E0",
              backgroundColor: props.stepProps === 4 ? "#018601" : "#ffffff",
            },
          }}>
          {props.stepProps !== 4 && (
            <Typography
              style={{
                ...styles.stepsText,
                ...{
                  color: props.stepProps === 3 ? "#000" : "#E0E0E0",
                },
              }}>
              {props.lang.c}
            </Typography>
          )}
          {props.stepProps === 4 && (
            <CheckIcon sx={{ fontSize: "35px", color: "#fff" }} />
          )}
        </Box>
        <Box
          style={{
            ...styles.stepsLine,
            ...{
              border:
                props.stepProps === 4 ? "1px solid #000" : "1px solid #E0E0E0",
            },
          }}></Box>

        <Box
          style={{
            ...styles.steps,
            ...{
              width: isMobile ? "15%" : 70,
              height: isMobile ? "50px" : 70,
              border: "1px solid #E0E0E0",
              borderColor: props.stepProps === 4 ? "#000" : "#E0E0E0",
              backgroundColor: props.stepProps === 4 ? "#ffffff" : "#ffffff",
            },
          }}>
          {props.stepProps !== 4 && (
            <Typography
              style={{
                ...styles.stepsText,
                ...{
                  color: "#E0E0E0",
                },
              }}>
              {props.lang.d}
            </Typography>
          )}
          {props.stepProps === 4 && (
            <Typography
              style={{
                ...styles.stepsText,
                ...{
                  color: props.stepProps === 4 ? "#000" : "#E0E0E0",
                },
              }}>
              {props.lang.d}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

const styles = {
  stepsHeader: {
    color: "#000",
    fontSize: 26,
    alignSelf: "center",
    marginTop: 10,
  },
  stepsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  steps: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 50,
    borderColor: "#018601",
    display: "flex",
  },
  stepsText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 3,
  },
  stepsLine: {
    borderWidth: 1.5,
    width: "10%",
    alignItems: "center",
  },
}

export default StepsHeaderComponent
