import Spinner from "@/components/shared/Spinner";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isAdmin, adminIsLoading] = useAdmin();
  const { user, loading } = useAuth();
  if (loading || adminIsLoading) return <Spinner />;

  if (user && isAdmin) return children;

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
