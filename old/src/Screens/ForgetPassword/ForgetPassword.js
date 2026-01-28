import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Box, Typography } from "@mui/material";
import TextInputComponent from "../../Components/FormComponents/TextInputComponent";
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn";
import CircularLoader from "../../Components/Utils/CircularLoader";
import { LanguageContext } from "../../Contexts/LanguageContext";
import { SendMail_API } from "../../APIs/API";
import LogoImg from "../../assets/AppIcon.png";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { lang, language } = useContext(LanguageContext);

  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const regexMail = /\S+@\S+\.\w{2,}/

  const [forgetPasswordPayload, setForgetPasswordPayload] = useState({
    email: "",
  });

  useEffect(() => {
    if (forgetPasswordPayload.email && regexMail.test(forgetPasswordPayload.email)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [forgetPasswordPayload.email, regexMail]);

  const SendEmailMutation = useMutation("SendEmail_API", {
    mutationFn: SendMail_API,
    onMutate: () => {
      setIsLoading(true);
    },
    onError: () => {
      setIsLoading(false);
      enqueueSnackbar(lang.errorResponse, { variant: "error" });
    },
    onSuccess: (data) => {
      setIsLoading(false);
      if (data.data.status) {
        enqueueSnackbar(lang.accountverified, { variant: "success" });
        navigate("/verify-email", {
          state: { email: forgetPasswordPayload.email },
        });
      } else {
        enqueueSnackbar(
          language === "english" ? data?.data?.reason : data?.data?.reasonAr,
          { variant: "warning" }
        );
      }
    },
  });

  return (
    <Box sx={styles.container}>
      {isLoading && <CircularLoader />}
      <Box component="img" sx={styles.logoImage} alt="logo" src={LogoImg} />
      <Typography sx={styles.logoTitle}>{lang.forget}</Typography>
      <Box sx={styles.textFieldContainer}>
        <TextInputComponent
          textStyle={{ color: "#fff" }}
          name={lang.email}
          type="email"
          value={forgetPasswordPayload.email}
          refState={(e) => {
            var temppayload = { ...forgetPasswordPayload };
            temppayload.email = e.target.value;
            setForgetPasswordPayload({ ...temppayload });
          }}
          helperText={lang.incorrectemail}
          required
        />
      </Box>
      <PrimaryBtn
        title={lang.send}
        btnStyle={styles.primaryBtn}
        disabled={disabled || isLoading}
        onClick={() => SendEmailMutation.mutate(forgetPasswordPayload)}
      />
    </Box>
  );
};
const styles = {
  container: {
    backgroundColor: "#042f36",
    height: "100%",
    "min-height": "100vh",
  },
  logoImage: {
    marginTop: 10,
    width: "12.6875rem",
  },
  logoTitle: {
    fontSize: "45px",
    fontWeight: 500,
    color: "#fff",
    alignSelf: "center",
    fontFamily: "cursive",
  },
  textFieldContainer: {
    marginTop: 2,
    marginLeft: { xs: 8, md: 8, lg: 30 },
    marginRight: { xs: 8, md: 8, lg: 30 },
  },
  primaryBtn: {
    marginTop: 5,
    width: 200,
    textTransform: "capitalize",
    backgroundColor: "#fff",
    borderColor: "#fff",
    height: "40px",
    color: "#042f36",
    "&:disabled": {
      opacity: 0.5,
      backgroundColor: "#fff",
      borderColor: "#fff",
      color: "#042f36",
    },
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#fff",
      borderColor: "#fff",
      color: "#042f36",
    },
  },
  textBtn: {
    marginTop: 5,
    paddingBottom: 5,
    alignSelf: "center",
    color: "#fff",
    fontWeight: 500,
    cursor: "pointer",
    width: "65%",
    marginLeft: "auto",
    marginRight: "auto",
  },
};
export default ForgetPassword;
