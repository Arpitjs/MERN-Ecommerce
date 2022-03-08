import UserNav from '../../components/nav/UserNav'
import { getUserOrders } from '../../functions/UserInfo';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import {
    PDFDownloadLink,
  } from "@react-pdf/renderer";
import Invoice from '../../components/order/Invoice';

const History = () => {
    const { user } = useSelector((state) => state);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
       loadUserOrders();
    }, []);

    async function loadUserOrders() {
        const { data } = await getUserOrders(user.token);
        setOrders(data);
    }

    function showDownloadLink(order) {
        return (
            <PDFDownloadLink document={
              <Invoice order={order}/>
            }
            fileName="invoice.pdf"
            className="btn btn-sm btn-block btn-outline-primary"
            >
            Download PDF
            </PDFDownloadLink>
        )
    }

    function showOrders() {
        return orders.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                    <ShowPaymentInfo order={order}/>
                { showOrderInTable(order) }
                <div className='row'>
                    <div className='col'>
                        { showDownloadLink(order) }
                        </div>
                </div>
            </div>  
        ))
    }
    
    function showOrderInTable(order) {
        return (
            <table className='table table-bordered'>
                <thead className='thead-light'>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                    </tr>
                </thead>
                <tbody>
                    { order.products.map((p, i) => (
                        <tr key={i}>
                            <td>
                                <b>{p.product.title}</b>
                            </td>
                            <td>{p.product.price}</td>
                            <td>{p.product.brand}</td>
                            <td>{p.product.color}</td>
                            <td>{p.count}</td>
                            <td>
                         {   p.product.shipping === 'Yes' ?
                            <CheckCircleOutlined style={{color: 'green'}}/>
                         : <CloseCircleOutlined style={{color: 'red'}}></CloseCircleOutlined>}
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    return (
       <div className="container-fluid">
           <div className="row">
               <div className="col-md-2">
                   <UserNav />
               </div>
               <div className="col text-center">
                   <h4>
                   { orders.length ? 'user purchase orders' : 'no orders' }
                   </h4>
                   { showOrders() }
               </div>
           </div>
       </div>
    )
}

export default History
