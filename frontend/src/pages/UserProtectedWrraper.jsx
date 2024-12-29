import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../app/features/auth/authSlice";

export default function UserProtectedWrraper({ children }) {
  const dispath = useDispatch();

  const fetchUser = async () => {
    try {
      await dispath(authenticateUser()).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [dispath]);

  return <div>{children}</div>;
}
