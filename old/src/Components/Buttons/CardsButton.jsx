import { Link } from "react-router-dom";

const CardsButton = ({ to, children, ...props }) => (
  <Link to={to} style={styles} {...props}>
    {children}
  </Link>
);

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  textDecoration: "unset",
  minWidth: "fit-content",
  marginRight: "20px",
};

export default CardsButton;
