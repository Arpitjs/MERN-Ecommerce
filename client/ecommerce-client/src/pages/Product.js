import { useEffect, useState } from "react";
import { getProduct, starProduct, getRelated } from "../functions/productInfo";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from '../components/cards/ProductCard';

const Product = ({ match }) => {
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      const existingRatingObject = product.ratings.find(
        (elem) => elem.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then(res => setRelated(res.data));
    });
  };

  const onStarClicked = (newRating, name) => {
    setStar(newRating);
    starProduct(name, newRating, user.token).then(() => loadProduct());
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClicked={onStarClicked}
          star={star}
        />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
          <div className="row pb-5">
          { related && related.length ? related.map(r => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          )) : <div className="text-center col">
            No related products found... :(
            </div>}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
