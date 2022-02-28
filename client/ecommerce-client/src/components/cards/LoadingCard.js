import { Card, Skeleton } from "antd";

const LoadingCard = ({ count }) => {
  function skeletonCards() {
    const totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col m-3">
          <Skeleton active></Skeleton>
        </Card>
      );
    }
    return totalCards;
  }
  return <div className="row pb-5"> {skeletonCards()}</div>;
};

export default LoadingCard;
