import { Box, Button } from "@mui/material";

const PrimaryBtn = ({ title, onClick, disabled, btnStyle }) => {
  return (
    <Box sx={{ alignSelf: "center" }}>
      <Button
        disabled={disabled}
        onClick={onClick}
        sx={[styles.container, btnStyle]}
      >
        {title}
      </Button>
    </Box>
  );
};

const styles = {
  container: {
    display: "inline-block",
    padding: "0.3rem 1.5rem 0.3rem 1.5rem",
    color: "#333",
    textDecoration: "none",
    transition: "all 0.2s ease",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: "bold",
    border: "0.125rem solid #042f36",
    borderRadius: "2rem",
    marginLeft: "0.625rem",
    width: "max-content",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#042f36",
    },
    "&:disabled": {
      color: "#fff",
      opacity: 0.5,
    },
  },
};

export default PrimaryBtn;
