import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/categoryInfo'
import { useState, useEffect }from 'react';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(res => setCategories(res.data));
    }, []);

  return (
    <div className='container'>
        <div className='row'>
            { categories.map(c => (
                <div 
                key={c._id}
                className='btn btn-outlined-primary btn-lg
                btn-raised m-3
                '>
                 <Link to={`/category/${c.slug}`}>
                 {c.name}
                </Link>
                </div>
            )
            )}
        </div>
    </div>
  )
}

export default CategoryList