import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import { getUserCart, emptyUserCart, saveAddress } from "../functions/UserInfo";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState('');
  const [total, setTotal] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  async function saveAddressToDb() {
    const {data } = await saveAddress(address, user.token);
    if(data.ok) setAddressSaved(true);
  }

  async function handleEmptyCart() {
    await emptyUserCart(user.token);
    setProducts([]);
    setTotal(0);
    toast("cart is emptied...");
    localStorage.removeItem("cart");
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
  }
  
  return (
    <div className="row">
      <div className="col-md-6">
        <h4>delivery address...</h4>
        <br />
        <br />
        <ReactQuill 
        theme='snow'
        onChange={setAddress}
        value={address}/>
        <button className="btn btn-primary" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Cupon??</h4>
        coupon input and apply button
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {products.map((p) => (
          <div key={p.product._id}>
            <p>
              {p.product.title} ({p.color} x {p.count}) = $
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: ${total}</p>
        <div className="row">
          <div className="col-md-6">
            <button 
            disabled={!addressSaved || !products.length}
            className="btn btn-primary">Place order...</button>
          </div>
          <div className="col-md-6">
            <button
              disabled={!products.length}
              className="btn btn-info"
              onClick={handleEmptyCart}
            >
              Empty cart...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
