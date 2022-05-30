import { SearchOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../stories/modules/header/Header";
import { Input } from "../stories/modules/input/Input";
import { NoPost } from "../stories/modules/noPost/NoPost";
import { OptionList } from "../stories/modules/optionList/OptionList";
import { Select } from "../stories/modules/select/Select";
import user1 from "../public/image/user.png";
import { getPostListAPI, getPostListQueryAPI } from '../api/post'

export const NoPostPage: NextPage = () => {
  const [options, setOptions] = useState([{ name: "邊緣小杰", icon: user1 }]);
  const [sort, setTimeSort] = useState('')

  /**
   * 變動下拉選單：舊到新貼文、新到舊貼文
   * @date 2022-05-08
   * @param {string} val:string desc(舊到新貼文), asc(最新貼文)
   */
  const handleSelectChange = async (e: any) => {
    setTimeSort(e.target.value)
    const params = {
      sort,
    }

    // const { status, data } = await getPostListQueryAPI(params)
    // if (status === 1) setPostList(data)
  }

  return (
    <>
      <Header />
      <div className="flex justify-center min-h-screen h-full pt-12 bg-c-bg">
        <main className="max-w-[1200px] w-full flex justify-between px-6">
          <div className="w-3/4 pr-7">
            <div className="flex mb-4">
              <Select
                onChange={handleSelectChange}
                defaultValue={sort}
              />

              <Input onChange={() => { }} />
              <div>
                <button className="bg-primary w-12 h-12 border-2 border-dark border-solid">
                  <SearchOutlined className="text-white text-xl flex items-center justify-center" />
                </button>
              </div>
            </div>
            <NoPost />
          </div>
          <div className="w-1/4">
            <OptionList options={options} />
          </div>
        </main>
      </div>
    </>
  );
};

export default NoPostPage;
