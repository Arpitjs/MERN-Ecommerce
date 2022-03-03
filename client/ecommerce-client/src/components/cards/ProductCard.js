import { useState } from 'react'
import { Card, Tooltip } from 'antd';
import {EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Link } from 'react-router-dom';
import ShowAverage from '../../functions/ratings';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [toolTip, setToolTip] = useState('Click to Add..')
  const dispatch = useDispatch();

    const { images, title, description, slug, price } = product;

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
  return (
    <>
         { product && product.ratings && product.ratings.length ? 
        ShowAverage(product) : 
        <div className="text-center pt-1 pb-3">
          NO rating yet!
          </div>
        }
      <Card
      cover={
        <img
          style={{ height: "150px", objectFit: "cover" }}
          alt="product"
          className="p-1"
          src={
            images && images.length
              ? images[0].url
              : process.env.PUBLIC_URL + '/images/laptop3.jpg'
          }
        />
      }
        actions={[
         <div style={{ display: 'flex' }}>
            <Link to={`/product/${slug}`}>
              <EyeOutlined className="text-warning" />
              <br /> View Product
            </Link>,
          <Tooltip title={toolTip}>
          <button onClick={handleAddToCart} 
            style={{border: 'none', background: 'white'}}
            >
            <ShoppingCartOutlined  className='text-danger'/>
            </button>
          </Tooltip>
            <br /> Add to Card
         </div>
            ]}
      >
   <Meta
        title={`${title} - $${price}`}
        description={`${
          description && description.substring(0, 20)
        }...`}
      />
      </Card>
      </>
  )
}

export default ProductCard