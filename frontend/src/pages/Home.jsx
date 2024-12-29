import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost } from "../app/features/post/postSlice";
import PostCard from "../components/PostCardd";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.Post.Posts);
  const fetchData = async () => {
    try {
      const res = await dispatch(fetchAllPost()).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    posts && (
      <div className=" flex items-center justify-center  mx-auto">
        <div className="flex w-[90%] mx-auto items-center mt-4  flex-wrap gap-8">
          {posts.map((post) => (
            <PostCard  post={post} />
          ))}
        </div>
      </div>
    )
  );
}
