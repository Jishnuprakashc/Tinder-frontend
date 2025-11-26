import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addconnections } from "./utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get("/api/user/connections", {
        withCredentials: true,
      });
      dispatch(addconnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections === null || connections === undefined) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (connections.length === 0) {
    return <h1 className="text-center mt-10">No Connections Found</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-10">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex items-center bg-base-300 p-4 m-4 rounded-xl shadow-lg gap-6"
          >
            <img
              src={photoUrl}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border"
            />

            <div className="flex flex-col">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>

              {about && (
                <p className="text-gray-600 mt-1 text-sm max-w-md">{about}</p>
              )}

              {age && gender && (
                <p className="mt-2 text-sm font-semibold">
                  {age}, {gender}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
