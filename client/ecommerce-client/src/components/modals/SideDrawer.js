import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => state);
  const imageStyle = {
    width: "100%",
    height: "50px",
    objectFit: "cover",
  };
  return (
    <Drawer
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      className="text-center"
      title={`Cart / ${cart.length} Product`}
      visible={drawer}
    >
      {cart.map((product) => (
        <div key={product._id} className="row">
          <div className="col">
            {product.images && product.images.length ? (
                <>
              <img style={imageStyle} alt="cart" src={product.images[0].url} />
            <p className="text-center text-light bg-secondary">
                {product.title} x {product.count} </p>
                </>
            ) : (
            <>
              <img
                style={imageStyle}
                alt="cart"
                src={process.env.PUBLIC_URL + "/images/laptop3.jpg"}
              />
                 <p className="text-center text-light bg-secondary">
                {product.title} x {product.count} </p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to='/cart'>
          <button 
          onClick={() => {
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            });
          }}
          className="text-center btn btn*primary btn-block btn-raised"
          >
              Go to Cart...
          </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
