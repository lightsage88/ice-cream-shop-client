import axios from "axios";
import { useState, useEffect } from 'react';

const IceCreamShopList = (props) => {
  const apiEndpoint = "https://ice-cream-shop-api.onrender.com";
  const [iceCreamShops, setIceCreamShops] = useState([]);
  useEffect(() => {
    getIceCreamData();
  }, [props.location])
  const getIceCreamData = async () => {
    const location = props.location;
    const response = await axios({
      method: "post",
      url: `${apiEndpoint}/api/yelp`,
      data: {
        location,
        categories: 'icecream'
      }
    });
    const topFiveIceCreamShops = response.data.slice(0, 5);
    const shopsWithReviews = await getReviewsForEachShop(topFiveIceCreamShops);
    setIceCreamShops(shopsWithReviews);
  };

  const retrieveReview = async (shop) => {
    const { id } = shop;
    const response = await axios({
      method: "post",
      url: `${apiEndpoint}/api/yelp-review`,
      data: {
        id
      }
    });
    const reviewData = {
      reviewerName: response.data.user.name,
      reviewText: response.data.text.split('.')[0]
    }
    return reviewData;
  }

  const getReviewsForEachShop = async (topShops) => {
    let array = [];
    for (let el of topShops) {
      const reviewData = await retrieveReview(el);
      el = {...el, reviewData} 
      array.push(el);
    }
    return array;
  }

  const iceCreamShopListItems = iceCreamShops.map((el, index) => {
    return (
      <li key={index}>
        <span><strong>Name: </strong>{el.name} <strong> | Review Count: </strong>{el.review_count}</span>
        <div className="addressArea">
          <strong>Address: </strong>
          <span>{el.location.address1}</span>
          <span>{el.location.city}, {el.location.state}</span>
        </div>
        <div className="reviewArea">
          <strong>{el.reviewData.reviewerName} said:</strong>
          <span>{el.reviewData.reviewText}</span>
        </div>
      </li>
    )
  })
  return <div id="ice-cream-shop-list-div">
    <ul>
      {iceCreamShopListItems}
    </ul>
  </div>;
};

export default IceCreamShopList;
