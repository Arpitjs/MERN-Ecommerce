import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);
    const { text } = search;

    const history = useHistory();

    function handleChange(e) {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        history.push(`/shop?${text}`)
    }
  return (
      <form 
      onSubmit={handleSubmit}
      className='form-inline my-2 my-lg-0'>
          <input type='search' 
          onChange={e => handleChange(e)}
          value={text} 
          className='form-control mr-sm-2' placeholder='Search'/>
        <SearchOutlined onClick={handleSubmit} style={{cursor: 'pointer'}}/>
      </form>
  )
}

export default Search;