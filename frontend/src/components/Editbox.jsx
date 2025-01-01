import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSinglePost, updatePost } from "../app/features/post/postSlice";

export default function Editbox() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [preImg, setPreImg] = useState("");
  const navigate = useNavigate();
  const getPost = async () => {
    try {
      const fetchedPost = await dispatch(fetchSinglePost(id)).unwrap();
      console.log(fetchedPost);
      setValue("title", fetchedPost.title);
      setValue("content", fetchedPost.content);
      // Assuming fetchedPost contains an image field
      setValue("image", fetchedPost.image.url);
      setPreImg(fetchedPost.image.url);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.image[0]) {
        formData.append("image", data.image[0]); // File input
      }
      // Dispatch update action
      await dispatch(updatePost({ id, data: formData })).unwrap();
      alert("Post updated successfully!");
      navigate("/"); // Redirect to posts list
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="h-screen  flex gap-8 justify-center items-center">
      <div>
        <div>
          <h2 className="text-lg font-medium"> Previous Image</h2>
          <div className="h-[300px]  w-[350px]">
            <img
              src={preImg}
              className="w-full object-cover h-full"
              alt="previous image"
            />
          </div>
        </div>
      </div>
      <div className="sm:w-1/2 md:w-[40%] lg:w-[23%] w-[90%] ">
        <h2 className="text-2xl font-semibold">Edit Post</h2>
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
            <input type="file" {...register("image")} />
          </div>
          <div className="w-full ">
            <button className="bg-green-300 py-2 rounded-md w-full">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
