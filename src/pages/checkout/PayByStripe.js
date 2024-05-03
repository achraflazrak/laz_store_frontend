import React, { useEffect } from "react";
import Stripe from "../../components/payments/Stripe";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../helpers/useTitle";

export default function PayByStripe() {
  const { validInfos, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.setting);

  //set page title
  useTitle("Pay Orders");

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  return (
    <div className="container">
      <div className="row my-5">
        <div className="card p-3">
          {validInfos ? (
            <Stripe />
          ) : (
            <Link to="/profile" className="btn btn-primary w-100">
              {lang === 'en'? 'Update your infos' : 'Mettez à jour vos informations'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
