import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthUserMutation } from "../app/auth/authApi";
import { useEffect, useState } from "react";
import { setUser } from "../app/auth/authReducer";

function ProtectedRoutes() {
  const { isAuthorized } = useSelector((state) => state.auth);
  const [trigger, { isLoading }] = useAuthUserMutation();
  const [checkAuth, setCheckAuth] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthUser = async function () {
      try {
        const res = await trigger()
          .unwrap()
          .then((data) => {
            dispatch(setUser(data?.user));
          });
      } catch (error) {
        console.error("Authentication check failed! ");
      } finally {
        setCheckAuth(true);
      }
    };

    if (!isAuthorized) {
      checkAuthUser();
    } else {
      setCheckAuth(true);
    }
  }, [isAuthorized, dispatch, trigger]);

  if (!checkAuth || isLoading) return <p>Loading...</p>;

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
