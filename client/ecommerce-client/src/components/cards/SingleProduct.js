import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, Tabs, Tooltip } from "antd";
import { useState } from 'react'
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import ProductInfo from "./ProductInfo";
import StarRating from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import ShowAverage from "../../functions/ratings";
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import{addToWishlist } from '../../functions/UserInfo';

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClicked, star }) => {
  const [toolTip, setToolTip] = useState('Click to Add..')
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.user);
  const { title, images, slug, description, _id } = product;

  function handleAddToCart() {
    let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      count: 1,
    });
    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));
    setToolTip("Added");

    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });

    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  }
  }
  async function handleWishlist(e) {
    e.preventDefault();
    await addToWishlist(_id, user.token);
    history.push('/user/wishlist');
  }
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img alt="prodimg" key={image.public_id} src={image.url} />
              ))}
          </Carousel>
        ) : (
          <img
            alt="default"
            src={process.env.PUBLIC_URL + "/images/laptop3.jpg"}
            style={{ height: "450px", objectFit: "cover" }}
          ></img>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" 
          key="2">
            Call us on xxxx
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        
        { product && product.ratings && product.ratings.length ? 
        ShowAverage(product) : 
        <div className="text-center pt-1 pb-3">
          NO rating yet!
          </div>
        }
        <Card
          actions={[
            <>
              <Tooltip title={toolTip}>
          <button onClick={handleAddToCart} 
            style={{border: 'none', background: 'white'}}
            >
            <ShoppingCartOutlined  className='text-danger'/>
            </button>
          </Tooltip>
          <br /> Add to Card
            </>,
            <Link to={`/product/${slug}`}>
              <br />
              <HeartOutlined className="text-info" onClick={handleWishlist}/>
              Add to Wishlist
            </Link>,
               <RatingModal>
               <StarRating
                 name={_id}
                 numberOfStars={5}
                 rating={star}
                 isSelectable={true}
                 starRatedColor="red"
                 changeRating={onStarClicked}
               />
             </RatingModal>
          ]}
        >
          <ProductInfo product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
