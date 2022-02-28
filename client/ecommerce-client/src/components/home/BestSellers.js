import { listProducts } from "../../functions/productInfo";
import { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import LoadingCard from '../cards/LoadingCard';

let BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  async function loadAllProducts() {
    setLoading(true);
    const { data } = await listProducts('sold', '2', 'desc')
    console.log(data);
    setProducts(data.products);
    setTimeout(() => setLoading(false), 2000);
  }
  return (
      <div className="container">
     { loading ? <LoadingCard count={2}/> :  <div className="row">
          {products.map((product) => (
              <div className="col-md-4" key={product._id}>
            <ProductCard product={product} />
              </div>
          ))}
        </div>}
      </div>
  );
};

export default BestSellers;
