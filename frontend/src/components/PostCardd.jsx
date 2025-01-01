import { Link } from "react-router-dom";
import React from "react";

export default function PostCardd({ post }) {
  const truncateContent = (content, wordLimit) => {
    const words = content.split(" ");
    return words.length > wordLimit
      ? `${words.slice(0, wordLimit).join(" ")}...`
      : content;
  };

  return (
    <Link to={`/blog/${post._id}`}>
      <div className="w-[300px] h-[310px]  shadow-md  rounded-md mt-10 overflow-hidden">
        <div className="w-full h-[200px]">
          <img
            src={post.image.url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="content p-2">
          <h4 className=" font-medium text-base mb-2 leading-none">
            {post.title}
          </h4>
          <p className="text-sm text-gray-700 py-2">
            {truncateContent(post.content, 9)}
          </p>
        </div>
      </div>
    </Link>
  );
}
