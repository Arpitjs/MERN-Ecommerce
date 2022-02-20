import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/admin/dashboard" 
                className="nav-link">Dasboard</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/product"
                className="nav-link">Product</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/products"
                className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/category"
                className="nav-link">Category</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/sub"
                className="nav-link">Sub Category</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/coupon"
                className="nav-link">Cupon</Link>
            </li>
            <li className="nav-item">
                <Link to="/user/change-password"
                className="nav-link">Password</Link>
            </li>
            </ul>    
        </nav>
    )
}

export default AdminNav
