import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost } from "../app/features/post/postSlice";
export default function CreatePostPage() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("image", data.image[0]);
      await dispatch(createPost(formData)).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen  flex justify-center items-center">
      <div className="sm:w-1/2 md:w-[40%] lg:w-[23%] w-[90%] ">
        <h2 className="text-2xl font-semibold">Create Post</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="flex flex-col ">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              {...register("title", {
                required: { value: true, message: "Title is required" },
              })}
              className="p-2 rounded-sm mb-2 bg-[#eeeeee]"
              placeholder="Enter Title"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="content">Content</label>
            <textarea
              {...register("content", {
                required: { value: true, message: "content is required" },
              })}
              className="p-2 rounded-sm mb-2 bg-[#eeeeee]"
              rows={4}
              placeholder="Enter content"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              {...register("image", { required: { value: true } })}
            />
          </div>
          <div className="w-full ">
            <button className="bg-green-300 py-2 rounded-md w-full">
              Upload Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
