import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, fetchSinglePost } from "../app/features/post/postSlice";
import "remixicon/fonts/remixicon.css";
export default function BlogDetails() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.Auth?.user);
  const post = useSelector((state) => state?.Post?.Post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await dispatch(deletePost(id)).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSingleDetail = async () => {
    try {
      const post = await dispatch(fetchSinglePost(id)).unwrap();
      console.log(post);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSingleDetail();
  }, []);

  return (
    post && (
      <div className="w-[90%] mx-auto">
        <div className="w-1/2  mx-auto">
          <div className="flex justify-between py-2 relative">
            <div className="py-2 flex gap-4 ">
              <p className="w-18 h-18  rounded-full">
                <i className="ri-user-fill w-full"></i>
              </p>
              <p className="text-center">
                <span>{post?.author?.fullName.firstName}</span>
                <span> {post?.author?.fullName?.lastName}</span>
              </p>
            </div>

            {user && post?.author?._id === user?._id && (
              <div
                className=""
                onClick={() => {
                  setToggleMenu(!toggleMenu);
                }}
              >
                <i className="text-lg ri-menu-line"></i>
              </div>
            )}

            {toggleMenu && (
              <div className=" absolute right-0 top-9 rounded-sm bg-slate-50 shadow-sm p-4 px-8">
                <ul className="flex flex-col gap-2">
                  <li className="hover:text-gray-500">Edit</li>
                  <li
                    className="hover:text-gray-500"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </li>
                  <li className="hover:text-gray-500">Details</li>
                </ul>
              </div>
            )}
          </div>
          <h2 className="py-4 text-xl font-medium">{post.title}</h2>
          <div className="img">
            <img
              className="w-full bg-cover h-[450px] py-2"
              src={post.image.url}
              alt=""
            />
          </div>
          <p className="py-2">{post.content}</p>
        </div>
      </div>
    )
  );
}
