import React, { useState } from "react";
import Image from "next/image";
import { User } from "../user/User";
import { LikeOutlined } from "@ant-design/icons";
import { Input } from "../input/Input";
import user1 from "../../../public/image/user.png";
import loadingGif from "../../../public/image/loading.gif";

interface PostProps {
  userName: string;
  content: string;
  userAvatar: string;
  date?: string;
  className?: string;
  likes?: number;
  comments?: any[];
  image?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Post = ({
  userName,
  userAvatar,
  content,
  date,
  className,
  likes,
  image,
  comments
}: PostProps) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: any) => setValue(e.target.value)

  return (
    <div
      className={`bg-white border-2 border-b-4 border-dark border-solid rounded-lg w-full min-w-[300px] p-6 ${className}`}
    >
      <User
        userName={userName}
        width="45px"
        height="45px"
        src={userAvatar}
        date={date}
        className="mb-4"
      />
      <p className="mb-4">{content}</p>
      {image && (
        <div className="relative h-[430px] mb-5">
          <Image src={image} layout="fill" alt="image" />
        </div>
      )}
      {likes ? (
        <div className="flex items-center mb-5">
          <LikeOutlined className="text-xl flex items-center mr-2" /> {likes}
        </div>
      ) : (
        <div className="flex items-center mb-5">
          <LikeOutlined className="text-xl flex items-center mr-2" />
          成為第一個按讚的朋友
        </div>
      )}
      <div className="flex mb-4">
        <div className=" mr-3">
          <Image width="40px" height="40px" src={user1} alt="User" />
        </div>
        <Input
          className="h-10"
          defaultValue={value}
          onChange={handleInputChange}
        />
        <div className="w-[128px] relative">
          <button
            type="button"
            className={`w-full h-full border-solid border-dark border-2 ${loading ? "bg-active text-dark" : "bg-primary text-white"
              }`}
            onClick={() => {
              setLoading(!loading);
            }}
          >
            留言
            {loading && (
              <span className="absolute top-2 right-5">
                <Image width="12px" height="12px" src={loadingGif} alt="Loading" />
              </span>
            )}
          </button>
        </div>
      </div>
      {comments && comments.length > 0 &&
        comments.map((comment, index) => (
          <div key={index} className="bg-c-bg/30 p-4 mb-4">
            <User
              userName={comment.userName}
              width="45px"
              height="45px"
              src={comment.userAvatar}
              date={comment.date}
              className="mb-4"
            />
            <p className="ml-16">{comment.content}</p>
          </div>
        ))}
    </div>
  );
};
