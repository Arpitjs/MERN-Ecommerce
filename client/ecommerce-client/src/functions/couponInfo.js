import axios from "axios";

export const getCoupons = () => {
  return axios.get(
    `${process.env.REACT_APP_API}/coupon`,
  );
};


export const createCoupon = (coupon, token) => {
    return axios.post(
      `${process.env.REACT_APP_API}/coupon/`,
      { coupon },
      {
        headers: { authToken: token },
      }
    );
  };

  export const applyCoupon = (coupon, token) => {
    return axios.post(
      `${process.env.REACT_APP_API}/user/coupon`,
      { coupon },
      {
        headers: { authToken: token },
      }
    );
  };
  
export const removeCoupon = (couponId, token) => {
  return axios.delete(
    `${process.env.REACT_APP_API}/coupon/${couponId}`,
    {
      headers: { authToken: token },
    }
  );
};

