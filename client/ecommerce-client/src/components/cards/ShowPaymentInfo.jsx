const ShowPaymentInfo = ({ order, showStatus = true }) => {
  const { paymentIntent } = order;
  return (
    <div>
      <p>
        <span>Order Id: {paymentIntent.id}</span>{" "}
        <span>
          Amount:{" "}
          {(paymentIntent.amount / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>{" "}
        <span>Currency: {paymentIntent.currency.toUpperCase()}</span>{" "}
        <span>Method: {paymentIntent.payment_method_types[0]}</span>{" "}
        <span>Payment: {paymentIntent.status.toUpperCase()}</span>{" "}
        <span>
          Ordered on: {new Date(paymentIntent.created * 1000).toLocaleString()}
        </span>{" "}
        <br />
      {showStatus && <span className="badge bg-primary text-white">
          Order status: {order.orderStatus}
        </span>}
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
