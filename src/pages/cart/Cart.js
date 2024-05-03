import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQ,
  incrementQ,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import useTitle from "../../helpers/useTitle";

export default function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.setting);

  //set page title
  useTitle("Cart");

  return (
    <div className="container">
      <div className="row my-5 mb-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {!cartItems.length ? (
                <div className="alert alert-primary">
                  {lang === "en"
                    ? "Your cart is empty"
                    : "Votre panier est vide"}
                  !
                </div>
              ) : (
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>{lang === "en" ? "Name" : "Nom"}</th>
                        <th>{lang === "en" ? "Color" : "Couleur"}</th>
                        <th>{lang === "en" ? "Size" : "Taille"}</th>
                        <th>{lang === "en" ? "Quantity" : "Quantité"}</th>
                        <th>{lang === "en" ? "Price" : "Prix"}</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td>{(index += 1)}</td>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded"
                              width={60}
                              height={60}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td className="text-capitalize">{item.color}</td>
                          <td>{item.size ? item.size.toUpperCase() : "N/A"}</td>
                          <td>
                            <i
                              onClick={() => dispatch(incrementQ(item))}
                              style={{ cursor: "pointer" }}
                              className="bi bi-caret-up"
                            ></i>
                            <span className="mx-4">{item.quantity}</span>
                            <i
                              onClick={() => dispatch(decrementQ(item))}
                              style={{ cursor: "pointer" }}
                              className="bi bi-caret-down"
                            ></i>
                          </td>
                          <td>${item.price}</td>
                          <td>${item.price * item.quantity}</td>
                          <td>
                            <i
                              onClick={() => dispatch(removeFromCart(item))}
                              style={{ cursor: "pointer" }}
                              className="bi bi-cart-x text-danger"
                            ></i>
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <th colSpan={4} className="text-center">
                          Total
                        </th>
                        <td colSpan={5} className="text-center">
                          <span className="border border-dark rounded p-1 fw-bold">
                            $
                            {cartItems.reduce(
                              (acc, item) =>
                                (acc += item.price * item.quantity),
                              0
                            )}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end align-items-center">
                    <Link to="/checkout" className="btn btn-primary rounded-0">
                      {lang === "en" ? "Checkout" : "Vérifier"}
                    </Link>
                    <Link to="/" className="btn btn-dark mx-2 rounded-0">
                      {lang === 'en'? 'Continue shopping' : 'Continuer vos achats'}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
