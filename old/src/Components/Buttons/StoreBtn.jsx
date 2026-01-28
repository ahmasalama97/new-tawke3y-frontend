import { Box, Link } from "@mui/material";

const StoreBtn = ({ link, style, src }) => {
  return (
    <Link href={link} target="_blank">
      <Box component="img" sx={style} alt="store" src={src} />
    </Link>
  );
};

export default StoreBtn;
