import React, { useEffect, useState } from "react";
import MenuCat from "./MenuCat";
import { useDispatch, useSelector } from "react-redux";
import FoodItemCard from "./FoodItemCard";
import "./Swiper.css";
import "swiper/css/bundle";
import { getAllItems, searchItems } from "../../store/product/productAction";
import { clearFields } from "../../store/product/productSlice";
import { motion } from "framer-motion";
import { fadeInOut } from "../../animations";

const Menu = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.product);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState({
    searchValue: "",
    category: "",
    status: false,
  });

  const handleSearch = (value) => {
    setSearch({
      ...search,
      searchValue: value,
      category: category,
      status: true,
    });
  };

  const handleFilter = (category) => setCategory(category);

  useEffect(() => {
    const id = setTimeout(() => {
      if (search.status) {
        // console.log(search.searchValue);
        dispatch(searchItems(search)).then((res) => dispatch(clearFields()));
      }
    }, [1000]);

    return () => {
      clearTimeout(id);
    };
  }, [search, dispatch]);

  useEffect(() => {
    setSearch({ searchValue: "", category: "", status: false });

    dispatch(getAllItems(category)).then((res) => dispatch(clearFields()));
  }, [dispatch, category]);

  return (
    <main className=" pt-[90px]  pb-20 ">
      <MenuCat
        handleFilter={handleFilter}
        category={category}
        handleSearch={handleSearch}
        searchValue={search.searchValue}
      />

      <ul className="mt-10 max-w-screen-lg lg:max-w-screen-xl xl:max-w-[1300px] gap-x-0  mx-auto   grid  xs:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 gap-y-5   lg:p-0 ">
        {items.length > 0 ? (
          items?.map((item) => <FoodItemCard key={item.id} item={item} />)
        ) : (
          <motion.li
            {...fadeInOut}
            className="text-xl ml-10 -mt-2 w-72 font-semibold lg:-mt-12 lg:ml-20"
          >
            {!loading &&
              (search.searchValue.length > 0
                ? "No Searched Meal Found"
                : "No Meal Available")}
          </motion.li>
        )}
      </ul>
    </main>
  );
};

export default Menu;
