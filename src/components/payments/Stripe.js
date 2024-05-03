import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import { BASE_URL, getConfig } from "../../helpers/config";

export default function Stripe() {
  const stripePromise = loadStripe(
    "pk_test_51PBmYzRssmTdN8LNPi3GN5AsWwJ0egrlbccI3wqs74zndpPRXT7Kqp2SkKKdJqTQFG1ITAE7oHAdUn6EhS2D2Cfi004BLWrmOa"
  );
  const [clientSecret, setClientSecret] = useState("");
  const { token } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    fetchClientSecret();
  }, []);

  const fetchClientSecret = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order/pay`,
        { cartItems },
        getConfig(token)
      );
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
