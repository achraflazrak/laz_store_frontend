import axios from "axios";
import React, { useState } from "react";
import { BASE_URL, getConfig } from "../../helpers/config";
import {
  checkIfUserDataIsValid,
  setCurrentUser,
} from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/spinner/Spinner";

export default function UpdateUserInfosForm({ user, token, updating }) {
  const [userInfos, setUserInfos] = useState({
    phone_number: user.phone_number || "",
    email: user.email || "",
    country: user.country || "",
    state: user.state || "",
    city: user.city || "",
    zip_code: user.zip_code || "",
    first_address: user.first_address || "",
    second_address: user.second_address || "",
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { lang } = useSelector((state) => state.setting);

  const saveUserInfos = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/user/update/${user.id}`,
        userInfos,
        getConfig(token)
      );

      dispatch(setCurrentUser(response.data.user));
      dispatch(checkIfUserDataIsValid());
      setLoading(false);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-8 mx-auto">
      <form onSubmit={(e) => saveUserInfos(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-2">
              <input
                type="text"
                value={userInfos.phone_number}
                onChange={(e) =>
                  setUserInfos({ ...userInfos, phone_number: e.target.value })
                }
                required
                maxLength={255}
                className="form-control"
                placeholder={
                  lang === "en" ? "Phone number" : "Numéro de téléphone"
                }
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-2">
              <input
                type="text"
                value={userInfos.email}
                readOnly
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-2">
              <input
                type="text"
                value={userInfos.first_address}
                required
                maxLength={255}
                onChange={(e) =>
                  setUserInfos({ ...userInfos, first_address: e.target.value })
                }
                className="form-control"
                placeholder={lang === "en" ? "Address 1*" : "Adresse 1*"}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-2">
              <input
                type="text"
                value={userInfos.second_address}
                maxLength={255}
                onChange={(e) =>
                  setUserInfos({ ...userInfos, second_address: e.target.value })
                }
                className="form-control"
                placeholder={lang === "en" ? "Address 2" : "Adresse 2"}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-2">
              <input
                type="text"
                value={userInfos.zip_code}
                required
                maxLength={255}
                onChange={(e) =>
                  setUserInfos({ ...userInfos, zip_code: e.target.value })
                }
                className="form-control"
                placeholder={lang === "en" ? "Zip code*" : "Code zip*"}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-2">
              <input
                type="text"
                value={userInfos.city}
                required
                maxLength={255}
                onChange={(e) =>
                  setUserInfos({ ...userInfos, city: e.target.value })
                }
                className="form-control"
                placeholder={lang === "en" ? "City*" : "Ville*"}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-2">
              <input
                type="text"
                value={userInfos.state}
                maxLength={255}
                onChange={(e) =>
                  setUserInfos({ ...userInfos, state: e.target.value })
                }
                className="form-control"
                placeholder={lang === "en" ? "State" : "Etat"}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-2">
              <input
                type="text"
                value={userInfos.country}
                required
                maxLength={255}
                onChange={(e) =>
                  setUserInfos({ ...userInfos, country: e.target.value })
                }
                className="form-control"
                placeholder={
                  lang === "en" ? "Country*" : "Pays*"
                }
              />
            </div>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          updating && (
            <button type="submit" className="btn btn-sm btn-primary">
              {lang === "en" ? "Update" : "Modifier"}
            </button>
          )
        )}
      </form>
    </div>
  );
}
