import React, { useState } from "react";
import { APIURL } from "../../utils/constants";
import { HiCurrencyRupee } from "react-icons/hi";
import { RiShoppingBasketFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { btnClick } from "../../animations";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart/cartAction";
import {
  calculateTotalQuantity,
  clearFields,
} from "../../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const FoodItemCard = ({ item }) => {
  const [quantity,setQuantity] = useState(1);
  const { userData } = useSelector((state) => state.currUser);
  const { cartItems, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addAnItemToCart = async () => {
    if (userData && localStorage.getItem("userToken")) {
      const userId = userData.id;
      const itemId = item.id;

      dispatch(addToCart({ userId, itemId,quantity }))
        .unwrap()
        .then(async() => {
          dispatch(calculateTotalQuantity(true));
          dispatch(clearFields());
        })
        .catch((error) => {
          // console.log(error);
        });
       setQuantity(1);
    } else {
      navigate("/login");
      toast("You must be logged in.", {
        icon: "👏",
      });
    }
  };
  

  return (
    <motion.div className=" duration-200  bg-white drop-shadow-md hover:shadow-lg hover:shadow-gray-400  flex items-center w-[350px] xs:w-225  sm:w-300 md:w-[230px] lg:w-[290px] py-4 pl-2 gap-1 rounded-lg mx-auto relative h-[10rem] food-item-card ">
      <LazyLoadImage
        className=" w-[8rem] xs:w-[6rem]  sm:max-w-[9rem] sm:min-w-[9rem]   md:min-w-[7rem] md:max-w-[7rem]   lg:min-w-[9rem] max-h-[9rem]   object-contain p-1 "
        effect="opacity"
        src={`${APIURL}/file/${item.image}`}
        alt="FoodItem"
        delayTime={500}
        visibleByDefault={false}
      />
      <div className="pt-4 w-28 lg:w-[120px]  ">
        <p className=" text-headingColor font-semibold text-center ">
          {item.name}
        </p>
        <p className="font-semibold text-red-500 flex items-center justify-center gap-1 pt-1">
          <HiCurrencyRupee className="text-xl" />
          {parseFloat(item.price)}
        </p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-2 absolute top-2 right-16">
          <motion.div
            className="h-7 w-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl drop-shadow-md bg-red-500 cursor-pointer active:bg-green-600"
            {...btnClick}
            onClick={()=>setQuantity(quantity+1)}
          >
            <p className="text-xl sm:text-xl font-semibold text-primary ">+</p>
          </motion.div>
          <p className="text-base sm:text-lg text-black font-semibold flex">
            {quantity}
          </p>
          <motion.div
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl drop-shadow-md bg-red-500 cursor-pointer active:bg-blue-600"
            {...btnClick}
            onClick={()=>setQuantity(quantity<=1?quantity:quantity-1)}
          >
            <p className="text-xl sm:text-xl font-semibold text-primary">--</p>
          </motion.div>
        </div>

      <motion.div
        className="w-8 h-8 p-1 rounded-full bg-red-500 flex items-center justify-center absolute top-2 right-2 cursor-pointer active:bg-red-700 hover:bg-red-700"
        {...btnClick}
        onClick={addAnItemToCart}
      >
        <RiShoppingBasketFill className="text-3xl text-primary" />
      </motion.div>
    </motion.div>
  );
};

export default FoodItemCard;
