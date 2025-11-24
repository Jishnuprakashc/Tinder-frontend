import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "./utils/feedUser";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, about, age, gender } = user;
  const dispatch = useDispatch();
 const handleSendRequest = async (status, userId) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/request/send/${status.toLowerCase()}/${userId}`
,
      {},
      { withCredentials: true }
    );
    console.log(res.data);

    dispatch(removeFeed(userId));

  } catch (err) {
    console.log("Something went wrong:", err.message);
  }
};

  return (
    <div className="flex justify-center items-center ">
      <div className="card bg-base-300 w-96  h-[600px] shadow-sm flex items-center">
        <figure>
          <img src={photoUrl} className="w-38 h-18" alt="user" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>{age}</p>
          <p>{gender}</p>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-error"
              onClick={() => handleSendRequest("Ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleSendRequest("Interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
