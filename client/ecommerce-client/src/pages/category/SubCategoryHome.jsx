import { getSub } from '../../functions/categoryInfo'
import ProductCard from '../../components/cards/ProductCard'
import { useState, useEffect }from 'react';

const SubCategoryHome = ({ match }) => {
    const [subCategory, setSubCategory] = useState({});
    const [products, setProducts] = useState([]);
    const { slug } = match.params;

    useEffect(() => {
        getSub(slug)
        .then(res => {
            setSubCategory(res.data.subCategory);
            setProducts(res.data.products);
        });
    }, []);

  return (
    <div className='container'>
        <div className="row">
            <div className="col">
         <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron jumbotron-fluid'>
                { products.length } Products in "{ subCategory.name }" SubCategory
               </h4>
            </div>
        </div>
        <div className="row">
                { products && products.map(product => (
                    <div className='col-md-4' key={product._id}>
                         <ProductCard product={product}/>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default SubCategoryHome;