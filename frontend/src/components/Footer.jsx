import React from "react";

export default function Footer() {
  return (
    <div className="flex text-white p-8 justify-evenly  bg-[#242424]">
      <div>
        <ul className="flex flex-col gap-2">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl">Follow us on </h2>
        <div className="flex gap-4">
          <i className=" text-3xl ri-facebook-box-fill"></i>
          <i className="text-3xl  ri-instagram-fill"></i>
          <i className="text-3xl  ri-twitter-fill"></i>
        </div>
      </div>
    </div>
  );
}
