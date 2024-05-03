import { useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { BASE_URL, getConfig } from "../../helpers/config";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/slices/cartSlice";
import { setCurrentUser } from "../../redux/slices/userSlice";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { user, token } = useSelector((state) => state.user);
  const validCoupon = JSON.parse(localStorage.getItem("coupon")) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.setting);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order/store`,
        {
          products: cartItems,
          coupon_id: validCoupon && validCoupon.id,
          user_id: user && user.id,
        },
        getConfig(token)
      );

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(clearCartItems());
      dispatch(setCurrentUser(response.data.user));
      setIsProcessing(false);
      navigate("/user/orders");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required",
    });

    if (
      (response.error && response.error.type === "card_error") ||
      (response.error && response.error.type === "validation_error")
    ) {
      setMessage(response.error.message);
      setIsProcessing(false);
    } else if (response.paymentIntent.id) {
      ///store order
      placeOrder();
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} type="submit">
        <span id="button-text">
          {isProcessing
            ? lang === "en"
              ? "Processing"
              : "En cours de traitement"
            : lang === "en"
            ? "Pay now"
            : "Payez maintenant"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
