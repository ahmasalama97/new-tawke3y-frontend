import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { Box } from "@mui/material"
import PrimaryBtn from "../Buttons/PrimaryBtn"
import { LanguageContext } from "../../Contexts/LanguageContext"
import { useContext } from "react"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

const ModalContainer = ({
  modalState,
  modalChangeState,
  children,
  modalTitle,
  modalAction,
  deleteAction,
  btnTitle,
  deletbtnTitle,
  disabled,
  btnStyle,
  deletbtnStyle,
}) => {
  const { language } = useContext(LanguageContext)

  const handleClose = () => modalChangeState(false)

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={modalState}
      PaperProps={{
        style: {
          ...styles.container,
          ...{
            direction: language === "english" ? "ltr" : "rtl",
          },
        },
      }}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {modalTitle}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: language === "english" && 8,
          left: language === "arabic" && 8,
          top: 12,
          color: (theme) => theme.palette.grey[500],
        }}>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}>
          {deleteAction ? (
            <Box sx={styles.primaryBtnContainer}>
              <PrimaryBtn
                onClick={deleteAction}
                title={deletbtnTitle}
                btnStyle={{ ...styles.primaryBtn, ...deletbtnStyle }}
              />
            </Box>
          ) : (
            <Box></Box>
          )}
          <Box sx={styles.primaryBtnContainer}>
            <PrimaryBtn
              disabled={disabled}
              onClick={modalAction}
              title={btnTitle}
              btnStyle={{ ...styles.primaryBtn, ...btnStyle }}
            />
          </Box>
        </Box>
      </DialogActions>
    </BootstrapDialog>
  )
}

const styles = {
  container: {
    minWidth: "50%",
  },
  primaryBtnContainer: {
    display: { lg: "flex", md: "block", sm: "block" },
    justifyContent: { lg: "flex-end", md: "center", sm: "center" },
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

export default ModalContainer
