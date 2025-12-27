import axios from "axios";
import React from "react";
import { BASE_URL } from "./utils/constants";
const Premium = () => {
  const handleBuyClick = async (type) => {
    try {
      // Create order from backend
      const { data } = await axios.post(
        `${BASE_URL}/create/payment`,
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = data;

      // Razorpay options
      const options = {
        key: keyId,
        amount,
        currency,
        name: "JisTinder",
        description: "Connect to other developer",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      // Open Razorpay dialog
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div className="flex w-full">
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h1 className="font-bold text-3xl">Silver Membership</h1>
        <ul>
          <li>- Chat with other people</li>
          <li>- 100 Connection Requests per day</li>
          <li>- Blue Tick</li>
          <li>- 3 months</li>
        </ul>
        <button
          onClick={() => handleBuyClick("silver")}
          className="btn bg-gray-300 text-black hover:bg-gray-400"
        >
          Buy Silver
        </button>
      </div>

      <div className="divider divider-horizontal">OR</div>

      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h1 className="font-bold text-3xl">Gold Membership</h1>
        <ul>
          <li>- Chat with other people</li>
          <li>- 100 Connection Requests per day</li>
          <li>- Blue Tick</li>
          <li>- 6 months</li>
        </ul>
        <button
          onClick={() => handleBuyClick("gold")}
          className="btn btn-warning"
        >
          Buy Gold
        </button>
      </div>
    </div>
  );
};
export default Premium;
