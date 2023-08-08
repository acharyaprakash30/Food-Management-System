import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAllOrder } from "../../store/order/orderAction";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.currUser);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      const userId = userData?.id;
      dispatch(getUserAllOrder({ userId }));
    }
  }, []);
  return (
    <section className="text-xl flex flex-col gap-5  w-[300px] max-h-full  ">
      <div className="mx-auto bg-[rgb(246,217,172)] px-3 rounded-md py-1 text-headingColor font-medium shadow-md">
        <h1 className="flex gap-2 ">
          <span className="w-48">Completed Orders</span>100
        </h1>
        <h1 className="flex gap-2">
          <span className="w-48 ">Cancelled Orders</span> 100
        </h1>
      </div>
      {/* Mapping orders */}
      <aside className="w-full"></aside>
    </section>
  );
};

export default OrderSummary;
