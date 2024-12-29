import { Link } from "react-router-dom";
import React from "react";

export default function PostCardd({ post }) {
  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")}...`
      : content;
  };
  const handleOnClick = () => {};
  return (
    <Link to={`/blog/${post._id}`}>
      <div className="w-[300px] h-[300px] shadow-md  rounded-md">
        <div className="w-full h-[200px]">
          <img
            src={post.image.url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="content p-2">
          <h4 className=" font-medium mb-2">{post.title}</h4>
          <p className="text-sm text-gray-700">
            {truncateContent(post.content, 12)}
          </p>
        </div>
      </div>
    </Link>
  );
}
