import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeFromWishlist } from "../../functions/UserInfo";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(
    () => loadWishlist(),
    []
  );

  function loadWishlist() {
    return getWishlist(user.token).then((res) => setWishlist(res.data.wishlist))
  }

  const handleDelete = async (id) => {
    await removeFromWishlist(id, user.token);
    loadWishlist();
    toast.success("deleted from wishlist....");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          User Wishlist Page
          {wishlist.map((w) => (
            <div style={{margin: '0 auto', width: '400px'}}>
              <ul className="list-group">
                <li
                  key={w._id}
                  className="list-group-item list-group-item-primary"
                >
                  {w.title}
                  <span className="px-2">
                    <DeleteFilled onClick={() => handleDelete(w._id)} />
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
