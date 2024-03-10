import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import { deleteCartItem, getCartItemById } from "../../api/cart/cartAPI";

interface CartItem {
  _id: string;
  user: string;
  artwork: {
    name: string;
    imageUrl: string;
  };
  price: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    getCartItemById("65bc7471c22e1a44d323b6a0").then((res) => {
      setCart(res);
    });
  }, []);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/home" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCart = () => {
    let subtotal = 0;
    let taxes = 30.0;
    cart.forEach((item: any) => {
      subtotal += item.price;
    });

    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <Link to="/home" className="btn  btn-outline-dark mx-4">
                    <i className="fa fa-arrow-left"></i> Continue Shopping
                  </Link>
                  <div className="card-header py-3">
                    <h4 className="mb-0">Cart List</h4>
                  </div>
                  <div className="card-body">
                    {cart.map((item: any) => {
                      return (
                        <div key={item._id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={item.artwork.imageUrl}
                                  alt={item.artwork.name}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.artwork.name}</strong>
                              </p>
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "-20px",
                                }}
                              >
                                <button
                                  className="btn px-2"
                                  onClick={() => {
                                    deleteCartItem(item._id);
                                  }}
                                  style={{ marginTop: "-10px" }}
                                >
                                  x
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item.qty}</span>{" "}
                                  ${item.price}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h4 className="mb-0">Order Summary</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({cart.length})<span>${subtotal}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        VAT Taxes
                        <span>${taxes}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Estimated Total</strong>
                        </div>
                        <span>
                          <strong>${subtotal + taxes}</strong>
                        </span>
                      </li>
                    </ul>

                    <Button
                      className="btn btn-dark btn-xl btn-block"
                      style={{
                        width: "375px",
                        height: "50px",
                        fontWeight: "bold",
                      }}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {cart?.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Cart;
