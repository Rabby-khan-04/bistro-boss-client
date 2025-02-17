import PropTypes from "prop-types";
import AuthContext from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const authInfo = { name: "rabby" };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
