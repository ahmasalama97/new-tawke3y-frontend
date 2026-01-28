import { Box, Typography } from "@mui/material";

const SmallFeatures = ({ icon, title, color }) => {
  return (
    <Box sx={styles.card}>
      <Box
        sx={[
          styles.cardImage,
          {
            backgroundColor: color,
          },
        ]}
      >
        {icon}
      </Box>
      <Box sx={styles.cardBody}>
        <Typography sx={styles.cardTitle}>{title}</Typography>
      </Box>
    </Box>
  );
};

const styles = {
  card: {
    maxWidth: "11rem",
    marginRight: "auto",
    marginBottom: "3rem",
    marginLeft: "auto",
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
  },
  cardImage: {
    width: "7.5rem",
    height: "7.5rem",
    marginRight: "auto",
    marginBottom: "1.5rem",
    marginLeft: "auto",
    borderRadius: "50%",
  },
  cardBody: {
    padding: 0,
  },
  cardTitle: {
    marginBottom: "0.5rem",
    fontWeight: 700,
    fontSize: "1.125rem",
  },
};

export default SmallFeatures;
