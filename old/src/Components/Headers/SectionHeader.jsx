import { Typography } from "@mui/material"

const SectionHeader = ({ title, style }) => {
  return <Typography sx={[styles.textHeader, style]}>{title}</Typography>
}

const styles = {
  textHeader: {
    marginBottom: "1rem",
    fontSize: { xs: "2rem", md: "3rem", lg: "3rem" },
    lineHeight: "4.875rem",
    fontWeight: 700,
  },
}

export default SectionHeader
