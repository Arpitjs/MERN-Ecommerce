import { listProducts, getProductsCount } from "../../functions/productInfo";
import { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';

let NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount()
    .then(({ data }) => setProductsCount(data));
  }, []);

  async function loadAllProducts() {
    setLoading(true);
    const { data } = await listProducts('createdAt', page, 'desc')
    setProducts(data.products);
    setTimeout(() => setLoading(false), 2000);
  }
  return (
      <div className="container">
     { loading ? <LoadingCard count={page}/> :  <div className="row">
          {products.map((product) => (
              <div className="col-md-4" key={product._id}>
            <ProductCard product={product} />
              </div>
          ))}
        </div>}
        <Pagination 
        current={page} 
        total={(productsCount  / 3) * 10}
        onChange={val => setPage(val)}
        />
      </div>
  );
};

export default NewArrivals;
