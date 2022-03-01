import { getProductsByCount } from "../functions/productInfo";
import { getCategories, getSubs } from "../functions/categoryInfo";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { useState, useEffect } from "react";
import { fetchProductsByFilter } from "../functions/productInfo";
import { Menu, Slider, Checkbox } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/Forms/Star";

const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [pickedSub, setPickedSub] = useState('');
  const [ok, setOk] = useState(false);

  const { text } = search;

  function fetchOnSearch(arg) {
    fetchProductsByFilter(arg).then((res) => setProducts(res.data));
  }

  const loadCategories = () =>
    getCategories().then(({ data }) => setCategories(data));

  const loadSubs = () => getSubs().then(({ data }) => setSubs(data));

  //default load
  useEffect(() => {
    loadAllProducts();
    loadCategories();
    loadSubs();
  }, []);

  function loadAllProducts() {
    getProductsByCount(12).then((res) => setProducts(res.data));
  }
  //load on search text
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchOnSearch({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  //load on price range
  function handleSlider(value) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setPickedSub("");
    setTimeout(() => setOk(!ok), 300);
  }

  useEffect(() => {
    fetchOnSearch({ price });
  }, [ok]);

  //load on category

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setPickedSub("");
  
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    fetchOnSearch({ category: inTheState });
  };

  //search by stars
  function handleStarClick(s) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setPickedSub("");
    setStar(s);
    fetchOnSearch({ stars: s });
  }

  function showStars() {
    const nums = [5, 4, 3, 2, 1];
    return (
      <div className="pr-4 pl-4 pb-2">
        {nums.map((n) => <Star numberOfStars={n} starClick={handleStarClick} />)}
      </div>
    );
  }

  //subs
  function handleSub(sub) {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setPickedSub(sub);
    fetchOnSearch({ sub }); 
  }

  function showSubCategories() {
    return subs.map(s => (
      <div 
      key={s._id}
      className="p-1 m-1 badge badge-secondary"
      style={{cursor: 'pointer'}}
      onClick={() => handleSub(s)}>
        { s.name }
      </div>
    ))
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>search filter</h4>
          <hr />
          <Menu defaultOpenKeys={["1", "2", "3", "4"]} mode="inline">
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  max="100"
                  onChange={handleSlider}
                />
              </div>
            </SubMenu>

            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>


            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined />
                  Rating
                </span>
              }
            >
              <div>{showStars()}</div>
            </SubMenu>

            { /* subs */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Sub Categories
                </span>
              }
            >
              <div className="pl-4 pr-4">{showSubCategories()}</div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">loading...</h4>
          ) : (
            <h4>Products</h4>
          )}

          {products.length < 1 && <p>No products found :(</p>}
          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
