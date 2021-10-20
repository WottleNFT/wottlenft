import React from "react";

import { IonButton } from "@ionic/react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import wottleLogo from "../../../public/logo.png";
import { Main } from "../../templates/Main";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const response = await fetch("http://localhost:3080/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const res = await response.json();
      console.log(res);
      console.log(res.accessToken);
    }
  };

  return (
    <Main title="Login">
      <div className="flex flex-col items-center justify-center h-full bg-cover bg-background-seascape bg-primary-default">
        <div className="flex flex-col items-center p-10 bg-gray-200 border border-gray-500 border-solid rounded-md shadow-lg w-450 h-3/4">
          <Image
            src={wottleLogo}
            alt="WottleNFT logo"
            layout="fixed"
            height={150}
            width={150}
          />
          <p className="py-5 text-2xl font-bold">Sign in</p>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <label className="pl-2 font-bold">
              Email
              <input
                type="email"
                className={`w-full px-3 py-2 my-2 border border-gray-400 border-solid rounded focus:outline-none focus:ring-2 ${
                  errors.email ? "ring-2 ring-red-500" : ""
                }`}
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
            </label>
            <label className="pl-2 font-bold">
              Password
              <input
                type="password"
                className={`w-full px-3 py-2 my-2 border border-gray-400 border-solid rounded focus:outline-none focus:ring-2 ${
                  errors.password ? "ring-2 ring-red-500" : ""
                }`}
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
            </label>
            <p className="text-sm text-right">
              <a>Forgot password?</a>
            </p>
            <div className="flex justify-center py-5">
              <IonButton className="w-40 h-10 text-lg font-bold" type="submit">
                Sign in
              </IonButton>
            </div>
            <p className="text-center">
              Not a member? <a className="font-bold">Create an account now!</a>
            </p>
          </form>
        </div>
      </div>
    </Main>
  );
};
export default Login;
