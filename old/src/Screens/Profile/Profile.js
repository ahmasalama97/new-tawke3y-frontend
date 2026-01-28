import { useContext, useEffect, useRef, useState } from "react"
import { Container, Box, Avatar, Grid, Typography } from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import SettingsIcon from "@mui/icons-material/Settings"
import TranslateIcon from "@mui/icons-material/Translate"
import SideBar from "../../Components/SideBar/SideBar"
import MenuBar from "../../Components/Utils/MenuBar"
import SecondaryBtn from "../../Components/Buttons/SecondaryBtn"
import PrimaryBtn from "../../Components/Buttons/PrimaryBtn"
import ModalContainer from "../../Components/Utils/ModalContainer"
import EditProfile from "./EditProfile"
import ChangePassword from "./ChangePassword"
import CircularLoader from "../../Components/Utils/CircularLoader"
import DeactivateAccount from "./DeactivateAccount"
import CompanySideBar from "../../Components/SideBar/CompanySideBar"
import { LanguageContext } from "../../Contexts/LanguageContext"
import Language from "./Language"
import BackToHomeBtn from "../../Components/Buttons/BackToHomeBtn"
import {
  ChangePassword_API,
  DeactivateAccount_API,
  EditUser_API,
} from "../../APIs/API"
import { useMutation } from "react-query"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import { AddPhotoAlternate } from "@mui/icons-material"

const Profile = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { lang, language, selectLanguage } = useContext(LanguageContext)

  const regexText = /^([0-9a-zA-Z\u0600-\u06FF])/i
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).{6,}$/

  const user = JSON.parse(sessionStorage.getItem("user"))

  const inputFile = useRef(null)

  const [img, setImage] = useState(null)
  const [drawerState, setDrawerState] = useState(false)
  const [open, setopen] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [openEditLogoModal, setOpenEditLogoModal] = useState(false)
  const [type, setType] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [disabledEdit, setDisabledEdit] = useState(true)
  const [disabledPassword, setDisabledPassword] = useState(true)
  const [langValue, setLangValue] = useState(language)

  const toggleOpen = () => {
    setopen(!open)
  }

  const toggleDrawer = () => {
    setDrawerState(!drawerState)
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 1024

  const [editProfilePayload, setEditProfilePayload] = useState({
    id: user?.id,
    profileimage: null,
    name: user?.name,
    username: user?.username,
    mobile: user?.mobile,
    address: user?.address,
    email: user?.email,
  })

  const [changePasswordPayload, setChangePasswordPayload] = useState({
    password: "",
    newpassword: "",
    confirmpassword: "",
  })

  useEffect(() => {
    if (
      editProfilePayload.username &&
      editProfilePayload.username.length !== 0 &&
      regexText.test(editProfilePayload.username)
    ) {
      setDisabledEdit(false)
    } else {
      setDisabledEdit(true)
    }
  }, [editProfilePayload.username, regexText])

  useEffect(() => {
    if (
      changePasswordPayload.password &&
      changePasswordPayload.newpassword &&
      changePasswordPayload.confirmpassword &&
      changePasswordPayload.newpassword ===
        changePasswordPayload.confirmpassword &&
      regexPassword.test(changePasswordPayload.password) &&
      regexPassword.test(changePasswordPayload.newpassword) &&
      regexPassword.test(changePasswordPayload.confirmpassword)
    ) {
      setDisabledPassword(false)
    } else {
      setDisabledPassword(true)
    }
  }, [
    changePasswordPayload.password,
    changePasswordPayload.newpassword,
    changePasswordPayload.confirmpassword,
    regexPassword,
  ])

  const ChangepasswordMutation = useMutation("Changepassword_API", {
    mutationFn: ChangePassword_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, {
        variant: "error",
      })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        setOpenModal(false)
        enqueueSnackbar(lang.passwordupdated, {
          variant: "success",
        })
        navigate("/login")
      } else {
        enqueueSnackbar(
          language === "english" ? data.data.reason : data.data.reasonAr,
          "warning",
        )
      }
    },
  })

  const EdituserMutation = useMutation("edituser_API", {
    mutationFn: EditUser_API,
    onMutate: () => {
      setIsLoading(true)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, {
        variant: "error",
      })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        setOpenModal(false)
        setOpenEditLogoModal(false)
        sessionStorage.setItem("user", JSON.stringify(data.data.user))
        enqueueSnackbar(lang.successeditprofile, {
          variant: "success",
        })
      } else {
        enqueueSnackbar(lang.erroreditprofile, {
          variant: "warning",
        })
      }
    },
  })

  const DeactivateAccountMutation = useMutation("DeactivateAccount_API", {
    mutationFn: DeactivateAccount_API,
    onMutate: () => {
      setIsLoading(false)
    },
    onError: () => {
      setIsLoading(false)
      enqueueSnackbar(lang.errorResponse, {
        variant: "error",
      })
    },
    onSuccess: (data) => {
      setIsLoading(false)
      if (data.data.status) {
        setOpenModal(false)
        enqueueSnackbar(lang.successDeleteAccount, {
          variant: "success",
        })
        sessionStorage.removeItem("user")
        navigate("/home")
      } else {
        enqueueSnackbar(lang.errorDeleteAccount, {
          variant: "warning",
        })
      }
    },
  })

  const handleFileUpload = (e) => {
    const { files } = e.target
    if (files && files.length) {
      var temppayload = { ...editProfilePayload }
      temppayload.profileimage = files[0]
      setImage(URL.createObjectURL(files[0]))
      setEditProfilePayload({ ...temppayload })
    }
  }

  const onButtonClick = () => {
    inputFile.current.click()
  }

  const handleMutation = () => {
    if (type === "editProfile") {
      EdituserMutation.mutate(editProfilePayload)
    } else if (type === "changePass") {
      ChangepasswordMutation.mutate(changePasswordPayload)
    } else if (type === "changeLang") {
      selectLanguage(langValue)
    } else if (type === "delete") {
      DeactivateAccountMutation.mutate({
        id: user?.id,
      })
    }
  }

  return (
    <>
      {user?.role === "user" ? (
        <SideBar
          open={open}
          drawerState={drawerState}
          setIsLoading={setIsLoading}
          toggleDrawer={toggleDrawer}
        />
      ) : (
        <CompanySideBar
          open={open}
          drawerState={drawerState}
          setIsLoading={setIsLoading}
          toggleDrawer={toggleDrawer}
        />
      )}
      <Grid
        sx={{
          ...styles.container,
          ...{
            marginLeft:
              language === "english" && open
                ? { lg: "20%", md: "0%", xs: "0%" }
                : "4.5%",
            marginRight:
              language === "english" && open
                ? { lg: "auto", md: "0%", xs: "0%" }
                : 0,
          },
        }}>
        <Grid item xs={3}>
          <BackToHomeBtn lang={lang} language={language} />
          <MenuBar
            title={lang.profile}
            onClick={isMobile ? toggleDrawer : toggleOpen}
            open={open}
          />
        </Grid>
        <Box sx={styles.root}>
          <Grid item xs={9}>
            <Container maxWidth="xl">
              {isLoading ? <CircularLoader /> : null}
              <Box sx={styles.imageContainer}>
                <Avatar
                  alt={user?.name}
                  src={`${process.env.REACT_APP_ENDPOINT_URL}/${user?.profileimage}`}
                  sx={styles.image}
                />
              </Box>
              {user?.role === "company" && (
                <Box
                  onClick={() => setOpenEditLogoModal(!openEditLogoModal)}
                  sx={{
                    cursor: "pointer",
                    width: "fit-content",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}>
                  <Typography sx={{ margin: 2, color: "blue" }}>
                    Edit Logo
                  </Typography>
                </Box>
              )}
              <Box sx={styles.main}>
                <Typography sx={styles.title}>{user?.name}</Typography>
                <Typography sx={styles.subTitle}>{user?.email}</Typography>
              </Box>
              <SecondaryBtn
                title={lang.editprofile}
                icon={<CreateIcon sx={styles.icon} />}
                onClick={() => {
                  setOpenModal(!openModal)
                  setType("editProfile")
                }}
                language={language}
              />
              <SecondaryBtn
                title={lang.changepass}
                icon={<SettingsIcon sx={styles.icon} />}
                onClick={() => {
                  setOpenModal(!openModal)
                  setType("changePass")
                }}
                language={language}
              />
              <SecondaryBtn
                title={lang.changelang}
                icon={<TranslateIcon sx={styles.icon} />}
                onClick={() => {
                  // selectLanguage("arabic");
                  setOpenModal(!openModal)
                  setType("changeLang")
                }}
                language={language}
              />
              <Box sx={styles.primaryBtnContainer}>
                <PrimaryBtn
                  title={lang.deactivateacc}
                  btnStyle={styles.primaryBtn}
                  onClick={() => {
                    setOpenModal(!openModal)
                    setType("delete")
                  }}
                />
              </Box>
            </Container>
          </Grid>
        </Box>
      </Grid>
      <ModalContainer
        modalState={openModal}
        modalChangeState={setOpenModal}
        btnPlaceholder=""
        modalTitle={
          type === "editProfile"
            ? lang.editprofile
            : type === "changePass"
            ? lang.changepass
            : type === "changeLang"
            ? lang.changelang
            : type === "delete"
            ? lang.deactivateacc
            : null
        }
        btnTitle={type === "delete" ? lang.delete : lang.save}
        btnStyle={
          type === "delete"
            ? { backgroundColor: "#ff0000", borderColor: "#ff0000" }
            : null
        }
        modalAction={handleMutation}
        disabled={
          type === "editProfile"
            ? disabledEdit
            : type === "changePass"
            ? disabledPassword
            : false
        }>
        {type === "editProfile" ? (
          <EditProfile
            setIsLoading={setIsLoading}
            setOpenModal={setOpenModal}
            editProfilePayload={editProfilePayload}
            setEditProfilePayload={setEditProfilePayload}
          />
        ) : type === "changePass" ? (
          <ChangePassword
            setIsLoading={setIsLoading}
            setOpenModal={setOpenModal}
            changePasswordPayload={changePasswordPayload}
            setChangePasswordPayload={setChangePasswordPayload}
          />
        ) : type === "delete" ? (
          <DeactivateAccount
            setIsLoading={setIsLoading}
            setOpenModal={setOpenModal}
          />
        ) : type === "changeLang" ? (
          <Language
            setIsLoading={setIsLoading}
            setOpenModal={setOpenModal}
            langValue={langValue}
            setLangValue={setLangValue}
          />
        ) : null}
      </ModalContainer>
      <ModalContainer
        modalState={openEditLogoModal}
        modalChangeState={setOpenEditLogoModal}
        btnPlaceholder=""
        modalTitle={"Edit Logo"}
        btnTitle={lang.save}
        modalAction={() => {
          EdituserMutation.mutate(editProfilePayload)
        }}>
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
            {!img ? (
              <>
                <Box style={styles.documentpicker}>
                  <AddPhotoAlternate sx={styles.documenticon} />
                </Box>
              </>
            ) : (
              <>
                <Box style={styles.documentpicker}>
                  <img src={img} height="100%" alt="idCard" />
                </Box>
              </>
            )}
          </Box>
        </>
      </ModalContainer>
    </>
  )
}
const styles = {
  container: {
    display: "block",
  },
  root: {
    position: "relative",
    padding: "20px 15px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  main: {
    marginTop: 1,
  },
  title: {
    fontSize: 20,
    color: "#042f36",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    color: "#a9a9a9",
    fontStyle: "italic",
  },
  icon: {
    marginRight: 1,
    marginLeft: 1,
  },
  primaryBtnContainer: {
    marginTop: 5,
  },
  primaryBtn: {
    width: "30%",
    textTransform: "capitalize",
    backgroundColor: "#ff0000",
    borderColor: "#ff0000",
    height: "40px",
    color: "#fff",
    "&:hover": {
      opacity: 0.5,
      backgroundColor: "#ff0000",
      borderColor: "#ff0000",
    },
  },
  secondaryBtnBtnContainer: {
    display: { lg: "flex", md: "block", sm: "block" },
    justifyContent: { lg: "flex-end", md: "center", sm: "center" },
  },
  secondaryBtn: {
    backgroundColor: "#042f36",
    borderColor: "#042f36",
    height: "40px",
    color: "#fff",
    textTransform: "capitalize",
    "&:hover": {
      opacity: 0.5,
    },
  },
  selectFieldHeader: {
    marginTop: 10,
  },
  documentpicker: {
    border: "1px dashed #000",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    top: 15,
    borderRadius: 15,
    borderStyle: "dashed",
    display: "flex",
    height: "50vh",
  },
  documenticon: {
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 0,
    color: "#000",
    fontSize: 60,
    marginLeft: "auto",
    marginRight: "auto",
  },
}
export default Profile
