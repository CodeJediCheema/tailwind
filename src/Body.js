import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";
import OfflineShimmer from "./OfflineShimmer";



const Body = () =>{
    const [ListOfRestaurants,setListOfRestaurants] = useState([]);
    const [FilteredListOfRestaurants , setFilteredListOfRestaurants] = useState([]);
    const [SearchBtn, setSearchBtn] = useState("");


    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async () =>{
        let data = await fetch ("https://www.swiggy.com/dapi/restaurants/list/v5?lat=31.3260152&lng=75.57618289999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        let json = await data.json();
        
        setListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        

        setFilteredListOfRestaurants(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

   
    {/* Here Using the online/ offline feature */}

    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false){
        return (
        <OfflineShimmer/>
        )
    };


    return ListOfRestaurants.length === 0 ? (<Shimmer/>) : (
        <div className="body-container">

            <input type="text" className=" search-box mx-4 p-[5px] border border-stone-950 rounded-full"  value={SearchBtn} onChange={(e)=>{
                setSearchBtn(e.target.value);
            }}></input>
            <button className="p-3 mt-2  hover:bg-cyan-300 text-blue-950 font-bold rounded-full" onClick={()=>{
                let filteredRestaurants = ListOfRestaurants.filter((res) =>{
                    return (res.info.name.toLowerCase().includes(SearchBtn.toLowerCase()))
                })
                 

                setFilteredListOfRestaurants(filteredRestaurants);
                
            }}>Submit</button>

            <button className="p-3 mt-2 hover:bg-cyan-300 text-blue-950 font-bold rounded-full" onClick={() =>{ 
            
               let filteredList = ListOfRestaurants.filter(res => res.info.avgRating > 4)
                setFilteredListOfRestaurants(filteredList);
            }

               }>Top Rated Restaurants</button>

            

            <div className="flex flex-wrap ">
            {/* Here Again we have to map the FilteredListOfRestaurants
            otherwise there will be no change inflicted in the output */}
            {FilteredListOfRestaurants.map((restaurant)=>{
               return(
               <Link className="w-56 p-2 m-2 border-solid border-2 hover:border-black" key={restaurant.info.id} to={"restaurant/" +restaurant.info.id }><RestaurantCard  resData = {restaurant}/> </Link>)

            })}  

            </div>
        </div>
    )
};

export default Body;
