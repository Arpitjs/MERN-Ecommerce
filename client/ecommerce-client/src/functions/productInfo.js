import axios from "axios";

//products
export const getProducts = () =>
  axios.get(`${process.env.REACT_APP_API}/products`);

export const getProduct = (slug) =>
  axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const getProductsByCount = (count) =>
  axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const deleteProduct = (slug) =>
  axios.delete(`${process.env.REACT_APP_API}/product/${slug}`);

export const createProduct = (token, data) => {
  return axios.post(`${process.env.REACT_APP_API}/product`, data, {
    headers: { authToken: token },
  });
};

export const modifyProduct = (token, data, slug, method) => {
  return axios({
    method,
    url: `${process.env.REACT_APP_API}/product/${slug}`,
    data,
    headers: { authToken: token },
  });
};

export const listProducts = (sort, page, order) => {
  return axios.get(
    `${process.env.REACT_APP_API}/list?sort=${sort}&page=${page}&order=${order}`
  );
};

export const getProductsCount = () => {
  return axios.get(
    `${process.env.REACT_APP_API}/products/total`
  );
};