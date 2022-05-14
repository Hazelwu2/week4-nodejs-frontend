import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import login from "../public/image/login.svg";
import { Button } from "../stories/modules/button/Button";
import { Input } from "../stories/modules/input/Input";

const Register: NextPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const handleSetName = (e: any) => {
    setUserName(e.target.value)
  }

  const handleSetPassword = (e: any) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <Head>
        <title>MetaWall</title>
        <meta name="description" content="MetaWall" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center h-full min-h-screen bg-c-bg">
        <div className="flex max-w-[869px] max-h-[535px] min-w-[600px] border-2 border-solid border-dark py-[60px] px-12 bg-c-bg shadow-main">
          <div className="w-1/2 pr-6">
            <Image src={login} objectFit="cover" alt="image"></Image>
          </div>
          <div className="w-1/2 flex flex-col items-center pl-6">
            <h1 className="text-6xl text-primary font-paytone font-black leading-1.4">
              MetaWall
            </h1>
            <h2 className="text-2xl text-dark font-helvetica font-bold leading-snug">
              註冊
            </h2>
            <Input
              defaultValue={userName}
              onChange={handleSetName}
              placeholder="暱稱"
              className="mt-6"
            />
            <Input
              defaultValue={email}
              onChange={handleSetEmail}
              placeholder="Email"
              className="mt-4"
            />
            <Input
              defaultValue={password}
              onChange={handleSetPassword}
              placeholder="Password"
              className="mt-4"
            />
            <Button
              label="註冊"
              className="my-4"
              onButtonClick={() => {
                console.log("login");
              }}
            />
            <Link href="/register" passHref>
              <span className="text-dark">登入</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
