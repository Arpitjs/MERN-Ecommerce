import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import ProductInfo from "./ProductInfo";
import StarRating from "react-star-ratings";
import RatingModal from "../modals/RatingModal";
import ShowAverage from "../../functions/ratings";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClicked, star }) => {
  const { title, images, slug, description, _id } = product;
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
              <ShoppingCartOutlined className="text-success" /> Add to Cart
            </>,
            <Link to={`/product/${slug}`}>
              <br />
              <HeartOutlined className="text-info" />
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
