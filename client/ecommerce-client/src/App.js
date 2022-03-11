import { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { CreateOrGetUser } from "./functions/UserInfo";
import { ToastContainer } from "react-toastify";

const Login =  lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/header"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() => import("./pages/admin/category/CategoryCreate"));
const CategoryUpdate = lazy(() => import("./pages/admin/category/CategoryUpdate"));
const subCreate = lazy(() => import("./pages/admin/sub/subCreate"));
const subUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/productUpdate"));
const Product = lazy(() => import("./pages/Product"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const SideDrawer = lazy(() => import("./components/modals/SideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));
const Payment = lazy(() => import('./pages/Payment'));
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'))
const SubCategoryHome = lazy(() => import('./pages/category/SubCategoryHome'))

let App = () => {
  let dispatch = useDispatch();
  //to check firebase auth state
  useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        let idTokenResult = await user.getIdTokenResult();
        CreateOrGetUser(idTokenResult, "/current-user")
          .then((response) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                email: response.data.email,
                name: response.data.name,
                token: idTokenResult.token,
                role: response.data.role,
                _id: response.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Suspense fallback={
      <div className="col text-center p-5">
        loading...
      </div>
    }>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Register/complete" component={RegisterComplete} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub-category/:slug" component={SubCategoryHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />

        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/change-password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/payment" component={Payment} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/sub" component={subCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={subUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/coupon" component={CreateCoupon} />
      </Switch>
      </Suspense>
  );
};

export default App;
