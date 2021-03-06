// React, Next
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useForm } from 'react-hook-form'
// Components
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import userDefault from "../../../public/image/user_default.png";

// API
import { getMyProfileAPI, updateMyProfileAPI, updatePasswordAPI } from '../../../api/user'
import { uploadImageAPI } from '../../../api/other'
// Utils
import { showSuccess } from '../../../utils/resHandle'
import { uploadImage } from '../../../utils/upload'

interface TagProps { }

interface Image {
  imageFile: any;
  imagePreview: string;
  imageSize: number;
}

/**
 * Primary UI component for user interaction
 */
export const Tag = ({ }: TagProps) => {
  const [mode, setMode] = useState("updateName");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [isError, setIsError] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  // 表單
  const {
    register,
    watch,
    formState: { errors, isValid }
  } = useForm({ mode: 'onChange' })

  const defaultImage = {
    imageFile: "",
    imagePreview: "",
    imageSize: 0,
  }
  const [image, setImage] = useState<Image>(defaultImage);

  const updatePassword = async () => {
    await updatePasswordAPI()
  }

  // 取得個人資料
  const getMyProfile = async () => {
    const { data } = await getMyProfileAPI()
    const { name, sex, avatar } = data
    if (name) setUserName(name)
    if (sex) setGender(sex)
    if (avatar) setAvatar(avatar)
  }

  const submitForm = async () => {
    const formData = new FormData()
    formData.append('name', userName)
    formData.append('sex', gender)
    formData.append('avatar', image.imageFile)
    const res = await updateMyProfileAPI(formData)

    if (res?.status === 1) {
      showSuccess('修改成功', () => {
        getMyProfile()
      })
    }
  }

  const fetchResetPassword = async () => {
    const params = {
      password,
      confirmPassword: repeatPassword
    }
    const res = await updatePasswordAPI(params)

    if (res?.status === 1) {
      showSuccess('修改成功', () => {
        setRepeatPassword('')
        getMyProfile()
      })
    }
  }

  useEffect(() => {
    // 取得個人資料
    getMyProfileAPI().then(({ data }) => {
      const { name, sex, avatar } = data
      if (name) setUserName(name)
      if (sex) setGender(sex)
      if (avatar) setAvatar(avatar)
    })
  }, [])

  return (
    <div className={`flex flex-col min-w-[500px]`}>
      <div>
        <button
          type="button"
          className={`${mode === "updateName"
            ? "bg-dark text-white"
            : "border-2 border-solid border-dark border-b-0"
            } bg-white px-6 py-2 rounded-t-lg ml-4`}
          onClick={() => setMode("updateName")}
        >
          暱稱修改
        </button>
        <button
          type="button"
          className={`${mode === "updatePassword"
            ? "bg-dark text-white"
            : "border-2 border-solid border-dark border-b-0"
            } bg-white px-6 py-2 rounded-t-lg`}
          onClick={() => setMode("updatePassword")}
        >
          重設密碼
        </button>
      </div>
      <div className="flex flex-col items-center bg-white border-2 border-solid border-dark py-8">
        {mode === "updateName" ? (
          <>
            <div className="mb-4">
              <Image
                width="107px"
                height="107px"
                src={image.imagePreview || avatar || userDefault}
                alt="Avatar"
              />
            </div>
            <label
              htmlFor="uploadAvatar"
              className="bg-dark w-[128px] h-10 text-white py-2 px-6 mb-3"
            >
              <span>上傳大頭照</span>
              <input
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                id="uploadAvatar"
                className="h-0"
                onChange={e => uploadImage(e, setIsError, setImage)}
              />
            </label>
            <div className="w-3/5 flex flex-col ">
              <p className="text-dark mb-1">暱稱</p>
              <Input
                className="mb-1"
                defaultValue={userName}
                onChange={e => setUserName(e.target.value)}
                register={register('userName', { required: true })}
                error={{
                  errors: errors.userName,
                  requiredError: '請輸入暱稱'
                }}
              />
              <p className="text-dark mb-1">性別</p>
              <div className="flex items-center mb-9">
                <input
                  {...register('gender', { required: true })}
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={e => setGender(e.target.value)}
                  className={`${gender === "male" &&
                    "after:w-2.5 after:h-2.5 after:bg-dark after:absolute after:top-[3px] after:left-[3.5px] after:rounded-full"
                    } relative w-5 h-5 border-2 border-solid border-dark rounded-full mr-3 appearance-none`}
                />
                <span className="mr-6">男性</span>
                <input
                  {...register('gender', { required: true })}
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={e => setGender(e.target.value)}
                  className={`${gender === "female" &&
                    "after:w-2.5 after:h-2.5 after:bg-dark after:absolute after:top-[3px] after:left-[3.5px] after:rounded-full"
                    } relative w-5 h-5 border-2 border-solid border-dark rounded-full mr-3 appearance-none`}
                />
                女性
              </div>
              {isError && (
                <div className="mb-4 flex flex-col justify-center items-center">
                  <p className="text-error text-sm">
                    1.圖片寬高比必需為 1:1,請重新輸入
                  </p>
                  <p className="text-error text-sm">
                    2.解析度寬度至少 300像素以上,請重新輸入
                  </p>
                </div>
              )}
              <Button
                label="送出更新"
                active={!isError}
                onButtonClick={submitForm}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-3/5">
              <p className="text-dark mb-1">輸入新密碼</p>
              <Input
                className="mb-1"
                defaultValue={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="請輸入新密碼"
                register={register("password", { required: true, minLength: 6 })}
                error={{
                  errors: errors.password,
                  requiredError: "請輸入密碼",
                  minLengthError: "密碼長度應大於6個字元",
                }}
              />
              <p className="text-dark mb-1">再次輸入</p>
              <Input
                className="mb-1"
                defaultValue={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                type="password"
                placeholder="再次輸入新密碼"
                register={register("repeatPassword", { required: true, minLength: 6 })}
                error={{
                  errors: errors.repeatPassword,
                  requiredError: "請重新輸入密碼",
                  minLengthError: "密碼長度應大於6個字元",
                }}
              />
              {watch("password") !== watch("repeatPassword") &&
                <p className="w-full text-sm text-error mt-1">
                  密碼不一致
                </p>
              }
              <Button
                className="mt-6 cursor-pointer"
                type="submit"
                label="重設密碼"
                disable={!isValid || watch('password') !== watch('repeatPassword')}
                onButtonClick={fetchResetPassword}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
