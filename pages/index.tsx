// Next
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
// Component
import loginSvg from "../public/image/login.svg";
import { Button } from "../stories/modules/button/Button";
import { Input } from "../stories/modules/input/Input";
// Utils
import { showSuccess } from '../utils/resHandle'
import { setToken } from '../utils/auth'
// API
import { signInAPI } from '../api/user.js'

const Home: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("tinazx056@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [isError, setError] = useState(false);

  const handleSetEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const handleSetPassword = (e: any) => {
    setPassword(e.target.value)
  }

  // 請求登入 API
  const login = async () => {
    const params = {
      email,
      password
    }
    const { status, data } = await signInAPI(params)

    if (status === 1) {
      showSuccess('登入成功', () => {
        router.push('/post')
        setToken(data.token)
      })
    }
  }

  return (
    <div>
      <Head>
        <title>MetaWall</title>
        <meta name="description" content="MetaWall" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center h-full min-h-screen bg-c-bg px-6">
        <div className="flex max-w-[869px] max-h-[535px] min-w-[600px] border-2 border-solid border-dark py-[70px] px-12 bg-c-bg shadow-main">
          <div className="w-1/2 pr-6">
            <Image src={loginSvg} objectFit="cover" alt="Login"></Image>
          </div>
          <div className="w-1/2 flex flex-col items-center pl-6">
            <h1 className="text-6xl text-primary font-paytone font-black leading-1.4">
              MetaWall
            </h1>
            <h2 className="text-2xl text-dark font-helvetica font-bold leading-snug mb-9">
              到元宇宙展開全新社交圈
            </h2>
            <Input
              defaultValue={email}
              onChange={handleSetEmail}
              placeholder="Email"
              className="mb-4"
            />
            <Input
              defaultValue={password}
              onChange={handleSetPassword}
              placeholder="Password"
              className="mb-4"
            />
            {isError && (
              <p className="text-error text-sm">帳號或密碼錯誤，請重新輸入！</p>
            )}
            <Button
              label="登入"
              className="my-4"
              onButtonClick={login}
            />
            <Link href="/register" passHref>
              <span className="text-dark">註冊帳號</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
