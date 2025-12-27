import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navabar from "./Navabar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { BASE_URL } from "./utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const Navigate =useNavigate();
  const userData =useSelector((store)=>store.user) //checking the store to avoid calling api again and again
  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 400){
        Navigate("/login");
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navabar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
