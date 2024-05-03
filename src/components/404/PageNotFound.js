import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../../helpers/useTitle";
import { useSelector } from "react-redux";

export default function PageNotFound() {
  const { lang } = useSelector((state) => state.setting);

  //set page title
  useTitle("404 Not Found");
  return (
    <div className="container">
      <div className="my-5 pb-5">
        <div className="col-md-6 mx-auto">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="my-3">
                {lang === "en" ? "404 Page Not Found" : "Page introuvable"}
              </h3>
              <Link to="/" className="btn btn-secondary my-2">
                {lang === "en" ? "Back Home" : "Retour à la page d'Accueil"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
