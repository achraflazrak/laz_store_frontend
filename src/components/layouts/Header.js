import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleShowSearchBox } from "../../redux/slices/productSlice";
import axios from "axios";
import { BASE_URL } from "../../helpers/config";
import { getConfig } from "../../helpers/config";
import {
  checkIfUserDataIsValid,
  setCurrentUser,
  setLoggedInOut,
  setToken,
} from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { setLang } from "../../redux/slices/settingSlice";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn, user, token } = useSelector((state) => state.user);
  const { lang } = useSelector(state => state.setting);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) getLoggedInUser();
  }, [token]);

  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user`, getConfig(token));
      dispatch(setCurrentUser(response.data.user));
      dispatch(checkIfUserDataIsValid());
    } catch (error) {
      if (error?.response?.status === 401) {
        sessionStorage.removeItem("currentToken");
        dispatch(setLoggedInOut(false));
        dispatch(setCurrentUser(null));
        dispatch(setToken(""));
      }
    }
  };

  const logOutUser = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/logout`,
        null,
        getConfig(token)
      );
      sessionStorage.removeItem("currentToken");
      dispatch(setLoggedInOut(false));
      dispatch(setToken(""));
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.png"
            alt="logo"
            className="rounded-pill"
            height={45}
          />
          <strong>Laz Store</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                <i className="bi bi-house-door"></i>{" "}
                {lang === "en" ? "Home" : "Accueil"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/cart" ? "active" : ""
                }`}
                to="/cart"
              >
                <i className="bi bi-basket"></i>{" "}
                {lang === "en" ? "Cart" : "Panier"} ({cartItems.length})
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => dispatch(setLang("en"))}
                className={`btn btn-link text-decoration-none mt-2 ms-2 me-1 ${
                  lang === "en"
                    ? "text-white badge bg-black"
                    : "text-white badge bg-secondary"
                }`}
              >
                EN
              </button>
            </li>
            <span className="mt-1">|</span>
            <li className="nav-item">
              <button
                onClick={() => dispatch(setLang("fr"))}
                className={`btn btn-link text-decoration-none mt-2 ms-1 ${
                  lang === "fr"
                    ? "text-white badge bg-black"
                    : "text-white badge bg-secondary"
                }`}
              >
                FR
              </button>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/profile" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/profile"
                  >
                    <i className="bi bi-person"></i> {user && user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => logOutUser()}
                    className="nav-link border-0 bg-light"
                  >
                    <i className="bi bi-person-fill-up"></i>{" "}
                    {lang === "en" ? "Logout" : "Déconnexion"}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/register" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/register"
                  >
                    <i className="bi bi-person-add"></i>{" "}
                    {lang === "en" ? "Register" : "Inscription"}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                    to="/login"
                  >
                    <i className="bi bi-person-fill-up"></i>{" "}
                    {lang === "en" ? "Login" : "Connexion"}
                  </Link>
                </li>
              </>
            )}
            {location.pathname === "/" && (
              <li className="nav-item">
                <button
                  onClick={() => dispatch(toggleShowSearchBox())}
                  className="btn btn-link text-decoration-none text-dark"
                >
                  <i className="bi bi-search"></i>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
