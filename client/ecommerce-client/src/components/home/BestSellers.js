import { listProducts, getProductsCount } from "../../functions/productInfo";
import { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';

let BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount()
    .then(({ data }) => {
      setProductsCount(data);
    })
    .catch(err => console.log('err', err));
  }, []);

  async function loadAllProducts() {
    setLoading(true);
    const { data } = await listProducts('sold', page, 'desc')
    setProducts(data.products);
    setTimeout(() => setLoading(false), 1000);
  }
  return (
      <div className="container">
     { loading ? <LoadingCard count={productsCount - products.length}/> :  <div className="row">
          {products.map((product) => (
              <div className="col-md-4" key={product._id}>
            <ProductCard product={product} />
              </div>
          ))}
        </div>}
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center p-2">
        <Pagination 
        current={page} 
        total={(productsCount/ 3) * 10}
        onChange={val => setPage(val)}
        />
        </nav>
      </div>
      </div>
  );
};

export default BestSellers;

