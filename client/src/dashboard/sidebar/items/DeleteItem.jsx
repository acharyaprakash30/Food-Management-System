import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Overlay from "../../../common/Overlay";
import { motion } from "framer-motion";
import { btnClick } from "../../../animations";
import { deleteItem } from "../../../store/product/productAction";
import { clearFields } from "../../../store/product/productSlice";

export const DeleteItem = ({ hideDeleteModal, selectItem }) => {


    const dispatch = useDispatch();


    return (
        <Overlay>

            <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen">

                <div className="w-1/3 ">

                    <div className="relative flex flex-col w-full px-4 bg-gray-100 border-0 rounded-lg shadow-lg outline-none focus:outline-none ">
                        {/*body*/}

                        <div className="relative flex justify-center">
                            <p className="my-4 text-lg font-semibold leading-relaxed text-slate-800">
                                Are you sure you want to delete?
                            </p>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-400 gap-4">

                            <motion.button {...btnClick} className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-red-500 active:bg-red-600 hover:shadow-lg focus:outline-none" type="button" onClick={async () => {
                                dispatch(deleteItem(selectItem)).then(() => {
                                    setTimeout(() => {
                                        dispatch(clearFields())
                                        hideDeleteModal(true)

                                    }, [1800])

                                })



                            }}> Yes </motion.button>

                            <motion.button {...btnClick} className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none" type="button" onClick={hideDeleteModal} >  No </motion.button>

                        </div>
                    </div>
                </div>
            </div>
        </Overlay>
    );
};
