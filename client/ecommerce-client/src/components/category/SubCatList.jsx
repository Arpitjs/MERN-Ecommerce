import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/categoryInfo'
import { useState, useEffect }from 'react';

const SubCategoryList = () => {
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        getSubs().then(res => setSubCategories(res.data));
    }, []);

  return (
    <div className='container'>
        <div className='row'>
            { subCategories.map(c => (
                <div 
                key={c._id}
                className='btn btn-outlined-primary btn-lg
                btn-raised m-3
                '>
                 <Link to={`/sub-category/${c.slug}`}>
                 {c.name}
                </Link>
                </div>
            )
            )}
        </div>
    </div>
  )
}

export default SubCategoryList