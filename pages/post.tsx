import { SearchOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { Input } from "../stories/modules/input/Input";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Post } from "../stories/modules/Post/Post";
import { Select } from "../stories/modules/select/Select";
import bg from "../public/image/image.png";
import user1 from "../public/image/user.png";
import user4 from "../public/image/user4.png";
import user5 from "../public/image/user5.png";
import user51 from "../public/image/user5-1.png";
import dayjs from "dayjs";
import { Toolbar } from "../stories/modules/toolbar/Toolbar";
import { getPostListAPI, getPostListQueryAPI } from '../api/post'
import postStories from "../stories/modules/Post/post.stories";

interface PostList {
  _id: string,
  user: {
    _id: string,
    name: string,
    avatar: string
  },
  content: string;
  createdAt: number;
  image: string;
  likes: number;
  comments?: any[];
}

export const PostPage: NextPage = () => {
  const [options, setOptions] = useState([{ name: "邊緣小杰", icon: user1 }]);
  const [query, setQuery] = useState('')
  const [sort, setTimeSort] = useState('')
  const [postList, setPostList] = useState<PostList[]>([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    getPostListAPI().then((res) => {
      if (res.status === 1) setPostList(res.data)
    })
  }, [])

  /**
   * 變動下拉選單：舊到新貼文、新到舊貼文
   * @date 2022-05-08
   * @param {string} val:string desc(舊到新貼文), asc(最新貼文)
   */
  const handleSelectChange = async (e: any) => {
    setTimeSort(e.target.value)
    const params = {
      sort,
      q: query
    }

    const { status, data } = await getPostListQueryAPI(params)
    if (status === 1) setPostList(data)
  }

  const handleInputChange = (e: any) => {
    setQuery(e.target.value)
  }

  const searchData = async () => {
    const params = {
      sort,
      q: query
    }

    const { status, data } = await getPostListQueryAPI(params)
    if (status === 1) setPostList(data)
  }

  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-4 px-6 pb-20 md:px-6 md:pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between">
          <div className="w-full md:w-3/4 md:pr-7">
            <div className="flex flex-col md:flex-row mb-4">
              <Select
                onChange={handleSelectChange}
                defaultValue={sort}
                className="mb-1.5 md:mb-0 md:mr-3"
              />
              <div className="flex w-full">
                <Input onChange={handleInputChange} />
                <div>
                  <button
                    onClick={searchData}
                    className="bg-primary w-12 h-12 border-2 border-dark border-solid
                  ">
                    <SearchOutlined className="text-white text-xl flex items-center justify-center" />
                  </button>
                </div>
              </div>
            </div>

            {postList.length > 0 ? postList.map(post =>
              <div key={post._id}>
                <Post
                  userName={post?.user?.name}
                  userAvatar={post?.user?.avatar || 'https://i.imgur.com/ebhxV0n.jpeg'}
                  content={post?.content}
                  date={dayjs(post?.createdAt).format("YYYY/MM/DD HH:mm")}
                  image={post?.image}
                  likes={post?.likes}
                  className="mb-4"
                  comments={post?.comments}
                />
              </div>
            ) : <div>目前尚無動態，新增一則貼文吧</div>
            }
          </div>
          <div className="hidden md:block md:w-1/4">
            <OptionList options={options} />
          </div>
          <Toolbar className="md:hidden fixed bottom-10 left-2/4 transform -translate-x-1/2" />
        </main>
      </div >
    </>
  );
};

export default PostPage;
