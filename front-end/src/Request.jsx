import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addrequest, removeRequests } from "./utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id))
    } catch (err) {
      res.status(400).send("Something went wrong")
    }
  };

  const RequestConnection = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/requests/received",
        { withCredentials: true }
      );
      console.log(res.data);

      dispatch(addrequest(res.data.data));
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  };

  useEffect(() => {
    RequestConnection();
  }, []);

  if (requests === null || requests === undefined) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (requests.length === 0) {
    return <h1 className="text-center mt-10">No requests Found</h1>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-10">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex items-center gap-4 m-4 p-4 rounded-xl bg-base-300 shadow-lg"
          >
            <img
              src={photoUrl}
              alt="photo"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div className="flex-1">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p className="text-sm opacity-80">{about}</p>
              {age && gender && (
                <p className="text-sm mt-1 opacity-70">{age + ", " + gender}</p>
              )}
            </div>
            <div className="flex gap-2 ml-auto">
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-success"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
