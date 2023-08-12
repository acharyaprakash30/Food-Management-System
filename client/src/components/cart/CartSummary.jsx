import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiCurrencyRupee } from "react-icons/hi";
import {
  calculateTotalPrice,
  clearCartItems,
  showCart,
} from "../../store/cart/cartSlice";
import { btnClick } from "../../animations";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { createAnOrder } from "../../store/order/orderAction";

const CartSummary = ({ shopMealNow }) => {
  const { totalPrice, totalQuantity, cartItems, cartId } = useSelector(
    (state) => state.cart
  );
  const { userData } = useSelector((state) => state.currUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [cartItems]);

  const handleOrder = async () => {
    const userId = userData.id;
    try {
      const order = await dispatch(createAnOrder({ cartId, userId })).unwrap();
      dispatch(clearCartItems());
      dispatch(showCart());
    } catch (error) {
      //   console.log(error);
      //   console.log(error.message);
    }
  };

  return (
    <section className="bg-zinc-800 rounded-t-[40px] w-full h-[130px]    px-4  pt-5 pb-3  absolute bottom-14 md:bottom-14">
      <div className="flex justify-evenly">
        <h4 className="text-zinc-300 font-semibold text-lg sm:text-xl">
          Subtotal ({totalQuantity}) items
        </h4>
        <div>
          <h4 className="flex gap-1 items-center text-lg sm:text-xl font-semibold text-zinc-300">
            <span className="pr-2">Total :</span>
            <HiCurrencyRupee className="text-red-500 " />
            <span className="text-red-400 text-base sm:text-lg">
              {" "}
              {totalPrice}
            </span>
          </h4>
        </div>
      </div>

      <p className="mt-3  w-full flex justify-center font-sans">
        <motion.button
          {...btnClick}
          className="   bg-green-700 font-medium py-2 pl-6 pr-3 sm:pl-8 sm:pr-3 rounded-l-full text-gray-300 sm:font-semibold sm:tracking-wide hover:bg-green-600"
          onClick={shopMealNow}
        >
          Back to Shopping
        </motion.button>
        <motion.button
          {...btnClick}
          className="  bg-blue-800  sm:font-semibold pr-6 pl-3 sm:pl-3 sm:pr-8 py-2 text-gray-200 hover:bg-blue-700 font-medium sm:tracking-wide rounded-r-full"
          onClick={handleOrder}
        >
          Proceed to Order
        </motion.button>
      </p>
    </section>
  );
};

export default CartSummary;
