import { useRef } from "react";
import { Box, Icon, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarComponent = ({ state, searchPlaceholder, search, language }) => {
  const searchInput = useRef("");

  return (
    <Box sx={styles.root}>
      <Box
        sx={
          language === "english"
            ? styles.root.iconButton
            : styles.root.iconButtonAr
        }
      >
        <Icon component={SearchIcon} />
      </Box>

      <TextField
        fullWidth
        inputRef={searchInput}
        value={search}
        onChange={state}
        sx={styles.root.inputField}
        placeholder={searchPlaceholder}
        name="pageSearchBar"
        id="pageSearchBar"
        autoComplete="off"
      />
    </Box>
  );
};

const styles = {
  root: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: 20,
    maxHeight: "40px",
    marginBottom: "20px",
    minWidth: "360px",
    "& .MuiInputLabel-outlined.MuiInputLabel-marginDense": {
      transform: "translate(14px,12px) scale(1)",
    },
    "& .MuiFormControl-marginDense": {
      paddingRight: "0",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fafbfc",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "solid 2px #e2e8ee",
      transition: "all 0.3s ease-in-out",
    },
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: "12px",
    },
    "& .MuiAlert-root": {
      width: "100%",
    },

    inputField: {
      transition: "all 0.5s ease",
      borderRadius: "10px",
      height: "40px",
      input: {
        padding: "0",
        paddingLeft: "10px",
        paddingRight: "10px",
        width: "100%",
        height: "40px",
        minWidth: "360px",
      },
      "&:hover": {
        borderColor: "primary.main",
      },
      fieldset: {
        border: 0,
        borderColor: "unset",
        borderRadius: "10px",
      },
    },

    iconButton: {
      display: "flex",
      position: "absolute",
      right: "0",
      width: "40px",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 2,
      svg: {
        fontSize: "28px",
        color: "text.hint",
      },
    },
    iconButtonAr: {
      display: "flex",
      position: "absolute",
      left: "0",
      width: "40px",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 2,
      svg: {
        fontSize: "28px",
        color: "text.hint",
      },
    },
  },
};

export default SearchBarComponent;
