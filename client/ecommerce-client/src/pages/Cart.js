import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardCheckout from "../components/cards/ProductCardCheckout";
import { userCart } from "../functions/UserInfo";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));

  function showCartItems() {
    return (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                   <th scope="col">Image</th> 
                   <th scope="col">Title</th> 
                   <th scope="col">Price</th> 
                   <th scope="col">Brand</th> 
                   <th scope="col">Color</th> 
                   <th scope="col">Count</th> 
                   <th scope="col">Shipping</th> 
                   <th scope="col">Remove</th> 
                </tr>
            </thead>
                { cart.map(p => <ProductCardCheckout key={p._id} product={p}/>) }
        </table>
    )
  }

  const getTotal = () => cart.reduce((acc, c) => (acc += c.price), 0);

  function saveOrder() {
      //save to db
      userCart(cart, user.token)
      .then(res => {
        console.log(res.data);
        if(res.data.ok) history.push('/checkout');
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product </h4>
          {!cart.length ? (
            <p>
              <Link to="/shop">
                Nothing has been added yet. continue shopping
              </Link>
            </p>
          ) : (
            showCartItems()
          )}

        </div>
        <div className="col-md-4">
          summary..
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total:
          <b> ${getTotal()}</b>
          <hr />
          {user ? (
            <button 
            onClick={saveOrder} 
            disabled={!cart.length}
            className="btn btn-sm btn-primary mt-2">
              Proceed to checkout..
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
             <Link to={{
                 pathname: '/login',
                 state: { from: 'cart' }
             }}>
                  Login to checkout..
             </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
