import ModalImage from "react-modal-image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {InputNumber } from 'antd';

const ProductCardCheckout = ({ product }) => {
  const dispatch = useDispatch();
  const [colors] = useState(["Black", "Brown", "Silver", "White", "Blue"]);

  function handleColorChange(e) {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        cart.forEach((p) => {
          if (p._id === product._id) {
            p.color = e.target.value;
          }
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  }
  function handleQuantityChange(value) {
      if(value > product.quantity) {
          toast('Exceeded total quantity in stock.');
          return;
      }
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach((p) => {
        if (p._id === product._id) {
          p.quantity = value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  }
  function handleRemove() {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        cart.forEach((p) => {
          if (p._id === product._id) {
            cart.splice(p._id, 1);
          }
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  }

  return (
  <>
  { JSON.stringify(product.quantity) }
    <tbody>
      <tr>
        <td>
          <div style={{ width: "200px", height: "auto" }}>
            {product.images.length ? (
              <ModalImage
                small={product.images[0].url}
                large={product.images[0].url}
              />
            ) : (
              <ModalImage
                small={process.env.PUBLIC_URL + "/images/laptop3.jpg"}
                large={process.env.PUBLIC_URL + "/images/laptop3.jpg"}
              />
            )}
          </div>
        </td>
        <td>{product.title}</td>
        <td>$ {product.price}</td>
        <td>{product.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {product.color ? <option>{product.color}</option> : "Select"}
            {colors
              .filter((c) => c !== product.color)
              .map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <InputNumber min={1} defaultValue={1} onChange={handleQuantityChange} />
        </td>
        <td>
          {product.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td>
          <CloseOutlined
            style={{ cursor: "pointer " }}
            onClick={handleRemove}
          />
        </td>
      </tr>
    </tbody>
    </>
  );
};

export default ProductCardCheckout;
