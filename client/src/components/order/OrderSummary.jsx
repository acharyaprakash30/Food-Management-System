import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAllOrder } from "../../store/order/orderAction";
import MainLoader from "../../animations/MainLoader";
import { motion } from 'framer-motion';
import { fadeInOut } from '../../animations';
import OrderTable from "./OrderTable";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.currUser);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      const userId = userData?.id;
      // const userId = 1;
      dispatch(getUserAllOrder({ userId }));
    }
  }, [dispatch,userData]);
  
  const { userOrders,loading } = useSelector((state) => state.order);
  return (
    <section className="text-xl flex align-middle justify-center  max-h-full  ">

      <div className="  p-12 overflow-y-auto scrollbar-thin relative w-[100vw] rounded-lg">
                {loading && <MainLoader />}


                <table className="min-w-full text-center static" >
                    <thead className="  text-[17px] text-gray-800 shadow-md font-sans bg-[rgb(218,221,228)] ">
                        <tr className="text-center">
                            <th className="py-3 px-6 text-center">Order Date</th>
                            <th className="py-3 px-6 text-center">Username</th>
                            <th className="py-3 px-6 text-center">Orders</th>
                            <th className="py-3 px-6 text-center">Subtotal</th>
                            <th className="py-3 px-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll max-h-[60vh] scrollbar-track-black  ">

                        {userOrders?.length > 0 ? userOrders.map((item, index) => (

                            <OrderTable item={item} index={index} userRole={userData?.role} key={item.id}  />

                        )) : <motion.tr {...fadeInOut} className='text-red-700  flex w-full  p-2 text-lg'><td className=''>{!loading && 'No Order Found.'}</td></motion.tr>
                        }
                    </tbody>
                </table>
            </div>

    </section>
  );
};

export default OrderSummary;
