import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../app/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.Auth?.user);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await dispatch(logOutUser()).unwrap();
      navigate("/login");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex p-4 bg-white shadow-lg">
      <div className="logo w-1/2">
        <h2>Blog</h2>
      </div>
      <div className="flex">
        <ul className="flex gap-8">
          <Link to={"/"}>
            <li className="hover:text-purple-500">Home</li>{" "}
          </Link>
          <li className="hover:text-purple-500">About Us</li>
          <li className="hover:text-purple-500">Explore</li>
          <li className="hover:text-purple-500">Trending</li>
          {user ? (
            <>
              <Link to={"/create"}>
                {" "}
                <li className="cursor-pointer hover:text-purple-500">
                  Create
                </li>{" "}
              </Link>
              <li
                className="cursor-pointer hover:text-purple-500"
                onClick={() => logout()}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <li className="hover:text-purple-500">Login</li>
              </Link>
              <Link to={"/signup"}>
                <li className="hover:text-purple-500">Signup</li>{" "}
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
