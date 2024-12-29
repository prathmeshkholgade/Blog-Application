import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePost } from "../app/features/post/postSlice";
import "remixicon/fonts/remixicon.css";
export default function BlogDetails() {
  const { id } = useParams();
  const post = useSelector((state) => state?.Post?.Post);
  const dispatch = useDispatch();

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
          <div className="py-2 flex gap-4 ">
            <p className="w-18 h-18  rounded-full">
              <i className="ri-user-fill w-full"></i>
            </p>
            <p className="text-center">
              <span>{post?.author?.fullName.firstName}</span>
              <span> {post?.author?.fullName?.lastName}</span>
            </p>
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
