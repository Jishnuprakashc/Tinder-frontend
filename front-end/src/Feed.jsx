import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./utils/feedUser";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.length > 0) return;

    try {
      const res = await axios.get("http://localhost:3000/feed", {
        withCredentials: true,
      });

      console.log("Backend Response:", res.data);
      dispatch(addFeed(res.data.data)); // your existing correct dispatch
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  console.log("Feed Data:", feed);
  if(!feed) return null
  if(feed.length <=0){
    return <h1 className="flex justify-center items-center font-bold text-2xl h-screen">No Users Found!</h1>
  }
  return (
    Array.isArray(feed) && feed.length > 0 ? (
      <div>
        <UserCard user={feed[0]} />
      </div>
    ) : null
  );
};

export default Feed;
