import AdminNav from "../../components/nav/AdminNav";
import { changeStatus, getOrders } from "../../functions/adminInfo";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  const [orders, SetOrders] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const { data } = await getOrders(user.token);
    SetOrders(data);
  }

  async function handleStatusChange(orderId, orderStatus) {
    await changeStatus(orderId, orderStatus, user.token);
    toast.success("status updated");
    loadOrders();
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
