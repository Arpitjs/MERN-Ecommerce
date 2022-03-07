import axios from 'axios';

export const createPaymentIntent = (token, coupon) => {
    return axios.post(
      `${process.env.REACT_APP_API}/create-payment`,
      { coupon },
      {
        headers: { authToken: token },
      }
    );
  };
  