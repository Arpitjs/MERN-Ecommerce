import StarRating from 'react-star-ratings';

const ShowAverage = (product) => {
    if(product && product.ratings) {
        const ratingsArr = product.ratings;
        const total = [];

        ratingsArr.map(rating => total.push(rating.star));
        const sum = total.reduce((acc, sum) => acc += sum, 0);
        const average = sum / total.length;

        return (
            <div className='text-center pt-1 pb-3'>
                <span>
                    <StarRating 
                    starDimension='20px'
                    starSpacing='2px'
                    starRatedColor='red'
                    starHoverColor='grey'
                    rating={average}
                    />
                    ({product.ratings.length})
                </span>
            </div>
        )
    }
}

export default ShowAverage;