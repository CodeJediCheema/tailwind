import { CDN_URL } from "./utils/constants";

const RestaurantCard = (props) =>{
    const {resData} = props;
    const {name,cuisines,costForTwo,avgRating,cloudinaryImageId} = resData?.info;
    const {deliveryTime} = resData?.info?.sla;
    return(
        <div className="">
            <div className="res-logo">
                <img src={CDN_URL + cloudinaryImageId} alt="Restaurant main picture"></img>
            </div>
            <h4 className="text-lg font-bold my-2">{name}</h4>
            <p className="my-1">{cuisines.join(", ")}</p>
            <p className="my-1">{costForTwo}</p>
            <p className="my-1">{avgRating} ⭐</p>
            <p className="my-1">{deliveryTime} Mins. ⏰</p>
        </div>
        
    )
};

export default RestaurantCard;