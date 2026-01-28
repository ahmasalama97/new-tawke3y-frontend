import { Box, CircularProgress, Typography } from "@mui/material";

const CircularLoader = ({ text }) => {
  return (
    <Box sx={styles.loader}>
      <CircularProgress size={100} sx={{ color: "#fff" }} />
      {text && (
        <Typography variant="h5" sx={{ color: "#fff" }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};
const styles = {
  loader: {
    position: "fixed",
    zIndex: 10000,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.4,
    backgroundColor: "black",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
};
export default CircularLoader;
