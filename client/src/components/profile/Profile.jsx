import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../assests/Avatar.png";
import { btnClick } from "../../animations";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { MdOutlineUpdate, MdOutlineVerifiedUser } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import {
  getUser,
  updateProfilePicture,
  updateUser,
} from "../../store/user/currUserAction";
import { clearFields } from "../../store/user/currUserSlice";
import { toast } from "react-hot-toast";
import { APIURL } from "../../utils/constants";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditPic, setIsEditPic] = useState(false);
  const [file, setFile] = useState(null);

  const { userData } = useSelector((state) => state.currUser);
  const initialValues = {
    userName: "",
    address: "",
    email: "",
    phoneNumber: "",
  };
  const dispatch = useDispatch();
  const handleEdit = (e) => {
    if (e) e.preventDefault();
    setIsEdit(!isEdit);
  };

  const changePicture = () => {
    setIsEditPic(true);

    setTimeout(() => {
      setIsEditPic(false);
    }, 10000);
  };

  const uploadPicture = async () => {
    if (file === null) return toast.error("Please select picture");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const userId = userData.id;
      // console.log(userData.image);
      let prevFile = userData.image ? userData.image : null;

      await dispatch(
        updateProfilePicture({ formData, userId, prevFile })
      ).unwrap();
      await dispatch(getUser({ userId })).unwrap();
      setFile(null);
      dispatch(clearFields());

      setIsEditPic(false);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: profileSchema,
    onSubmit: async (values, action) => {
      values.id = userData?.id;

      try {
        await dispatch(updateUser(values)).unwrap();
        const userId = userData.id;
        await dispatch(getUser({ userId })).unwrap();
        dispatch(clearFields());
        handleEdit();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    // console.log(userData);
    // console.log(values);
    if (userData) {
      // set the values of formik with the userData
      setFieldValue("userName", userData?.userName);
      setFieldValue("address", userData?.address);
      setFieldValue("email", userData?.email);
      setFieldValue("phoneNumber", userData?.phoneNumber);
    }
  }, [userData, setFieldValue]);

  return (
    <main className=" pt-28 sm:pt-40  w-full h-auto sm:h-screen pb-8 bg-gray-100 px-5 xs:px-8 md:px-0  select-text ">
      <form
        className=" flex flex-col gap-3 sm:flex-row justify-center sm:gap-20  mx-auto py-10 px-5 bg-[rgb(240,245,254)] md:w-[750px] lg:w-[800px] rounded-lg  profilecard "
        onSubmit={handleSubmit}
      >
        <div className="h-[95%] relative  w-fit mx-auto">
          {!isEditPic ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-9 sm:h-9 w-10 h-10 right-1 hover:bg-gray-200 hover:-top-1 duration-200 bg-[rgb(235,240,248)] cursor-pointer p-1 rounded-lg absolute top-0 z-20"
              onClick={changePicture}
              enableBackground="new 0 0 32 32"
              viewBox="0 0 32 32"
              id="edit"
            >
              <path d="M12.82373,12.95898l-1.86279,6.21191c-0.1582,0.52832-0.01367,1.10156,0.37646,1.49121c0.28516,0.28516,0.66846,0.43945,1.06055,0.43945c0.14404,0,0.28906-0.02051,0.43066-0.06348l6.2124-1.8623c0.23779-0.07129,0.45459-0.2002,0.62988-0.37598L31.06055,7.41016C31.3418,7.12891,31.5,6.74707,31.5,6.34961s-0.1582-0.7793-0.43945-1.06055l-4.3501-4.34961c-0.58594-0.58594-1.53516-0.58594-2.12109,0L13.2002,12.3291C13.02441,12.50488,12.89551,12.7207,12.82373,12.95898z M15.58887,14.18262L25.6499,4.12109l2.22852,2.22852L17.81738,16.41113l-3.18262,0.9541L15.58887,14.18262z"></path>
              <path d="M30,14.5c-0.82861,0-1.5,0.67188-1.5,1.5v10c0,1.37891-1.12158,2.5-2.5,2.5H6c-1.37842,0-2.5-1.12109-2.5-2.5V6c0-1.37891,1.12158-2.5,2.5-2.5h10c0.82861,0,1.5-0.67188,1.5-1.5S16.82861,0.5,16,0.5H6C2.96729,0.5,0.5,2.96777,0.5,6v20c0,3.03223,2.46729,5.5,5.5,5.5h20c3.03271,0,5.5-2.46777,5.5-5.5V16C31.5,15.17188,30.82861,14.5,30,14.5z"></path>
            </svg>
          ) : (
            <MdOutlineVerifiedUser
              className="sm:w-9 sm:h-9 w-10 h-10 right-1 text-green-700 hover:bg-gray-200 hover:-top-1 duration-200 bg-[rgb(235,240,248)] cursor-pointer p-1 rounded-lg absolute top-0 z-20"
              onClick={uploadPicture}
              title="Upload Picture"
            />
          )}
          {!isEditPic ? (
            <img
              src={
                userData?.image ? `${APIURL}/file/${userData.image}` : Avatar
              }
              alt="Avatar"
              className="w-40 h-40 mx-auto select-none rounded-full "
            />
          ) : (
            <div className="relative w-40 h-40 mx-auto select-none rounded-full bg-gray-300 z-0  hover:opacity-60 border border-dashed border-gray-500 cursor-pointer group ">
              {!file ? (
                <>
                  <label
                    htmlFor="fileInput"
                    className=" select-none rounded-full cursor-pointer m-auto absolute top-1/2 left-[18%] mx-auto opacity-0 -mt-2 hover:opacity-100 z-30 group-hover:opacity-100"
                    id="fileInputLabel"
                  >
                    Click to Upload
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className="opacity-0 absolute w-full h-full cursor-pointer group"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </>
              ) : (
                <img
                  src={URL.createObjectURL(file)}
                  alt="profile"
                  className="w-full h-full rounded-full hover:opacity-100"
                />
              )}
            </div>
          )}
          {!isEdit ? (
            <motion.button
              {...btnClick}
              className=" bg-red-500 px-8 py-2 sm:px-4 sm:py-1 text-white rounded-sm font-medium mt-8 flex mx-auto hover:bg-red-600  gap-2 items-center"
              onClick={handleEdit}
            >
              <FiEdit2 className="w-6 h-5 sm:w-5 sm:h-4" />
              Edit Profile
            </motion.button>
          ) : (
            <motion.button
              {...btnClick}
              className=" bg-red-500 px-6 sm:px-3  py-[6px] sm:py-1 text-white rounded-sm font-medium mt-8 flex mx-auto hover:bg-red-600  gap-2 items-center"
              type="submit"
            >
              <MdOutlineUpdate className="w-6 sm:w-5 h-7 sm:h-6" />
              Update Profile
            </motion.button>
          )}
        </div>

        <div className=" w-full sm:w-2/3 font-sans font-semibold  text-headingColor flex flex-col gap-2  ">
          <div className="flex flex-col md:flex-row gap-2 md:gap-5">
            <aside className="flex flex-col w-full   h-20 gap-1  md:w-[48%]  ">
              <label htmlFor="">Full Name</label>
              <input
                className=" border-gray-400 bg-gray-50 border rounded focus:outline-none focus:border-red-400  px-3 text-base font-normal py-[3px]"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                required
                name="userName"
                value={values.userName}
                readOnly={!isEdit}
              />
              {touched.userName && errors.userName && (
                <p className="text-red-500 text-sm font-medium ">
                  {errors.userName}
                </p>
              )}
            </aside>

            <aside className="flex flex-col  h-20 gap-1  md:w-[48%] ">
              <label htmlFor="">Address</label>
              <input
                className=" border-gray-400 bg-gray-50 border rounded focus:outline-none focus:border-red-400 px-3 text-base font-normal py-[3px]"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Kalikanagar, Butwal"
                name="address"
                value={values.address}
                readOnly={!isEdit}
                required
              />
            </aside>
          </div>

          <aside className="flex flex-col gap-1 h-[85px]">
            <label htmlFor="">Email Address</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="myemailaddress@email.com"
              className=" border-gray-400 bg-gray-50 border rounded h-8 focus:outline-none focus:border-red-400 text-base px-3 font-normal"
              value={values.email}
              type="email"
              name="email"
              readOnly={!isEdit}
              required
            />
          </aside>

          <aside className="flex flex-col h-[85px] gap-1">
            <label htmlFor="">Phone number</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+97798765432132"
              value={values.phoneNumber}
              className=" border-gray-400 bg-gray-50 border rounded h-8 focus:outline-none focus:border-red-400 px-3 text-base font-normal"
              type="text"
              name="phoneNumber"
              readOnly={!isEdit}
              required
            />
          </aside>
        </div>
      </form>
    </main>
  );
};

export default Profile;
