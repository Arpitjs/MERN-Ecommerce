import React from 'react'
import { Card } from 'antd';
import {EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Link } from 'react-router-dom';
const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { images, title, description } = product;
  return (
      <Card
      cover={
        <img
          style={{ height: "150px", objectFit: "cover" }}
          alt="product"
          className="p-1"
          src={
            images && images.length
              ? images[0].url
              : 'https://img.search.brave.com/Ih-g5_hyvI8117NA52yGmf68mWw9ZIHfE7NZ7sDCGL4/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9iZXRh/bmV3cy5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTQvMTEv/ZnJvbnQuanBn'
          }
        />
      }
        actions={[
         <div style={{ display: 'flex' }}>
            <Link>
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
  )
}

export default ProductCard