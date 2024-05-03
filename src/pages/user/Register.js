import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helpers/config";
import { toast } from "react-toastify";
import Spinner from '../../components/spinner/Spinner';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useTitle from "../../helpers/useTitle";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.setting);

  //set page title
  useTitle("Register");

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/user/register`, user);
      setLoading(false);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setErrors(error.response.data.errors);
    }
  };

  const renderErrors = (field) =>
    errors?.[field]?.map((error, index) => (
      <div key={index} className="text-white my-2 rounded bg-danger">
        {error}
      </div>
    ));

  return (
    <div className="container">
      <div className="row my-5 mb-5">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5 className="text-center mt-2">{lang === 'en'? 'Register' : 'Inscription'}</h5>
            </div>
            <div className="card-body">
              <form className="mt-5" onSubmit={(e) => registerUser(e)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    {lang === 'en' ? "Name" : 'Nom'}*
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({
                        ...user,
                        name: e.target.value,
                      })
                    }
                    type="text"
                    id="name"
                    className="form-control"
                  />
                  {renderErrors("name")}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    {lang === 'en'? 'Email' : 'E-mail'}*
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({
                        ...user,
                        email: e.target.value,
                      })
                    }
                    type="email"
                    id="email"
                    className="form-control"
                  />
                  {renderErrors("email")}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    {lang === 'en'? 'Password' : 'Mot de passe'}*
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({
                        ...user,
                        password: e.target.value,
                      })
                    }
                    type="password"
                    id="password"
                    className="form-control"
                  />
                  {renderErrors("password")}
                </div>

                <div className="mb-3">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      {lang === 'en'? 'Submit' : 'S\'inscrire'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
