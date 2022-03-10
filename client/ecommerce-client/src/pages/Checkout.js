import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import { applyCoupon } from '../functions/couponInfo';
import { getUserCart, emptyUserCart, saveAddress, createCashOrderUser } from "../functions/UserInfo";

const Checkout = ({history}) => {
  const [products, setProducts] = useState([]);
  const [couponValue, setCouponValue] = useState({});
  const [totalAferDiscount, setTotalAfterDiscount] = useState(0);
  const [address, setAddress] = useState('');
  const [total, setTotal] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);
  const dispatch = useDispatch();
  const { user, cod, coupon } = useSelector((state) => state);

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
    setTotalAfterDiscount(0);
    setCouponValue('');
    toast("cart is emptied...");
    localStorage.removeItem("cart");
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
  }

  function showAddress() {
    return (
      <div>
        <ReactQuill 
        theme='snow'
        onChange={setAddress}
        value={address}/>
        <button className="btn btn-primary pt-3" onClick={saveAddressToDb}>
          Save
        </button>
      </div>
    )
  }

  function showProductSummary() {
    return products.map((p) => (
      <div key={p.product._id}>
        <p>
          {p.product.title} ({p.color} x {p.count}) = $
          {p.product.price * p.count}
        </p>
      </div>
    ))
  }

  async function applyDiscountCupon() {
    try {
      const {data} = await applyCoupon(couponValue, user.token);
      if(data) {
        setTotalAfterDiscount(data);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true
        })
      } 
    }  catch (e) {
        console.log(e);
        toast.error(e.response.data.msg);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false
        })
    }     
  }

  function showApplyCoupon() {
    return (
      <>
      <input type="text" 
      onChange={e => setCouponValue(e.target.value)}
      className='form-control'/>
         <button 
         onClick={applyDiscountCupon}
         className="btn btn-primary pt-3" >
        Save
      </button>
      </>
    )
  }

  async function createCashOrder() {
    const {data} = await createCashOrderUser(user.token, cod, coupon);
    if (data.ok) {
      localStorage.removeItem("cart");
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });
      dispatch({
        type: "COUPON_APPLIED",
        payload: false,
      });
      dispatch({
        type: "COD",
        payload: false,
      });
      await emptyUserCart(user.token);
      history.push('/user/history');
    }
  } 

  return (
    <div className="row">
      <div className="col-md-6">
        <h4 className='pt-3'>delivery address...</h4>
        <br />
        <br />
        { showAddress() }
        <hr />
        <h4>Got Cupon??</h4>
          { showApplyCoupon() }
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
          { showProductSummary() }
        <hr />
        <p>Cart Total: ${total}</p>
        { totalAferDiscount > 0 && (
          <p className='bg-success p-2'>
            Discount applied. Total Payable: ${totalAferDiscount}
            </p>
        )}
        <div className="row">
          <div className="col-md-6">
          { cod ? 
           <button 
           disabled={!addressSaved || !products.length}
           className="btn btn-primary"
           onClick={createCashOrder}
           >Place order...</button>
          : 
             <button 
             disabled={!addressSaved || !products.length}
             className="btn btn-primary"
             onClick={() => history.push('/payment')}
             >Place order...</button>
          }
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
