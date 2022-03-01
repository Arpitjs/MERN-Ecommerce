import React from 'react'
import { Card } from 'antd';
import {EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Link } from 'react-router-dom';
import ShowAverage from '../../functions/ratings';
const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { images, title, description, slug } = product;
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
            <ShoppingCartOutlined  className='text-danger'/>
            <br /> Add to Card
         </div>
            ]}
      >
   <Meta
        title={title}
        description={`${
          description && description.substring(0, 20)
        }...`}
      />
      </Card>
      </>
  )
}

export default ProductCard