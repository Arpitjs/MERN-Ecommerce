import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import "../stripe.css";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";

const StripeCheckout = ({ history }) => {
  // const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => state);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then(({ data }) => {
      setClientSecret(data.clientSecret);
      setCartTotal(data.cartTotal);
      setTotalAfterDiscount(data.totalAfterDiscount);
      setPayable(data.payable);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed. ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSuccess(true);
    }
  }

  function handleChange(e) {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  }

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <>
      {!success && (
        <div>
          {coupon && totalAfterDiscount ? (
            <p className="alert alert-success">
              {`total after discount: $${totalAfterDiscount}`}
            </p>
          ) : (
            <p className="alert alert-danger">no coupon applied :(</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              alt="default"
              src={process.env.PUBLIC_URL + "/images/laptop3.jpg"}
              style={{
                height: "200px",
                objectFit: "cover",
                margin: "20px 0px -70px -200px",
              }}
            />
          }
          actions={[
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <DollarOutlined className="text-info"/>
              Total: ${cartTotal}
              <CheckOutlined className="text-info" />
              Total Payable: ${(payable / 100).toFixed(2)}
            </div>,
          ]}
        />
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || success}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={success ? "result-message" : "result-message hidden"}>
          Payment sucessful!
          <br />
          <Link to="/user/history">See in purchase history</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
