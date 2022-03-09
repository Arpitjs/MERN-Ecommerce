import axios from "axios";

export const getOrders = (token) => {
    return axios.get(
      `${process.env.REACT_APP_API}/admin/orders`,
      {
        headers: { authToken: token },
      }
    );
  };
  
  
export const changeStatus = (orderId, orderStatus, token) => {
    return axios.put(
      `${process.env.REACT_APP_API}/admin/order-status`,
      { orderId, orderStatus },
      {
        headers: { authToken: token },
      }
    );
  };
  
  