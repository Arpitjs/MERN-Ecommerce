import Jumbrotron from '../components/cards/Jumbotron';
// import BestSellers from '../components/home/BestSellers';
import NewArrivals from "../components/home/NewArrivals";

let Home = () => {

  return (
    <>
      <div className="jumbotron text-danger h1 text-center font-weight-bold">
          <Jumbrotron text={['kada products', 'dami sellers', 'khatra products']}/>
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">New Arrivals</h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Best Sellers</h4>
      {/* <BestSellers /> */}
      <br />
    </>
  );
};

export default Home;
