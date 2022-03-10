import axios from "axios";

export const CreateOrGetUser = (idTokenResult, endpoint) => {
  return axios.post(
    `${process.env.REACT_APP_API}${endpoint}`,
    {},
    {
      headers: { authToken: idTokenResult.token },
    }
  );
};

export const GetAdmin = (token) => {
  return axios.post(
    `${process.env.REACT_APP_API}/admin`,
    {},
    {
      headers: { authToken: token },
    }
  );
};

export const userCart = (cart, token) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: { authToken: token },
    }
  );
};


export const getUserCart = (token) => {
  return axios.get(
    `${process.env.REACT_APP_API}/user/cart`,
    {
      headers: { authToken: token },
    }
  );
};

export const emptyUserCart = (token) => {
  return axios.put(
    `${process.env.REACT_APP_API}/user/cart`,
    {},
    {
      headers: { authToken: token },
    }
  );
};

export const saveAddress = (address, token) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: { authToken: token },
    }
  );
};

export const creatOrder = (stripeResponse, token) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: { authToken: token },
    }
  );
};


export const getUserOrders = (token) => {
  return axios.get(
    `${process.env.REACT_APP_API}/user/orders`,
    {
      headers: { authToken: token },
    }
  );
};

export const addToWishlist = (productId, token) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
     { productId },
    {
      headers: { authToken: token },
    }
  );
};

export const getWishlist = (token) => {
  return axios.get(
    `${process.env.REACT_APP_API}/user/wishlist`,
    {
      headers: { authToken: token },
    }
  );
};

export const removeFromWishlist = (productId, token) => {
  return axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: { authToken: token },
    }
  );
};

export const createCashOrderUser = (token, cod, coupon) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { cod, couponApplied: coupon },
    {
      headers: { authToken: token },
    }
  );
};
