import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import {
  getCoupons,
  createCoupon,
  removeCoupon,
} from "../../../functions/couponInfo";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCoupon = () => {
    const [name, setName] = useState('');
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState('');
    const [expiry, setExpiry] = useState('');

    const user = useSelector(state => state.user);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        createCoupon({name, expiry, discount}, user.token)
        .then(res => {
            setLoading(true);
            setName('');
            setDiscount('');
            setExpiry('');
            toast.success(`new coupon added ${res.data.name}`)
        })
        .catch(err => {
            console.log(err);
        });

    }
    return (
        <div className="container-fluid">
            <div className="row">
        <div className="col-md-2">
            <AdminNav />
        </div>
        <div className="col-md-10">
            Coupon
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        autoFocus
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label className="text-muted">Discount %</label>
                    <input type="text" className="form-control"
                        onChange={e => setDiscount(e.target.value)}
                        value={discount}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label className="text-muted">Expiry</label>
                    <br />
                        <DatePicker 
                        selected={new Date()}
                        value={expiry}
                        required
                        onChange={date => setExpiry(date)}
                        className="form-control"/>
                    </div>

                   <button className="btn btn-outline-primary">Save</button> 
                </form>
        </div>
        </div>
        </div>
    )
};

export default CreateCoupon;
