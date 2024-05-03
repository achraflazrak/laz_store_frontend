import React from "react";
import { useSelector } from "react-redux";

export default function Coupon({ coupon, setCoupon, applyCoupon }) {
  const { lang } = useSelector((state) => state.setting);

  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <div className="d-flex">
          <input
            type="text"
            value={coupon.name}
            onChange={(e) => setCoupon({ ...coupon, name: e.target.value })}
            className="form-control rounded-0"
            placeholder={lang === 'en'? "Enter a promo code" : "Entrez un code promo"}
          />
          <button
            disabled={!coupon.name}
            onClick={() => applyCoupon()}
            className="btn btn-primary rounded-0"
          >
            {lang === 'en'? 'Apply' : 'Appliquer'}
          </button>
        </div>
      </div>
    </div>
  );
}
