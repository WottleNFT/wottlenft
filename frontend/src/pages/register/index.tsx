import React from "react";

import { IonButton } from "@ionic/react";
import Image from "next/image";
import { useForm } from "react-hook-form";

import wottleLogo from "../../../public/logo.png";
import { Main } from "../../templates/Main";

interface FormInputs {
  email: string;
  username: string;
  password: string;
  confirm: string;
}

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormInputs>();
  const enteredPassword = watch("password", "");

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <Main title="Register">
      <div className="flex flex-col items-center justify-center h-full bg-cover bg-background-seascape bg-primary-default">
        <div className="flex flex-col items-center p-10 bg-gray-200 border border-gray-500 border-solid rounded-md shadow-lg w-450">
          <Image
            src={wottleLogo}
            alt="WottleNFT logo"
            layout="fixed"
            height={100}
            width={100}
          />
          <p className="py-5 text-2xl font-bold">Create an Account</p>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <label className="pl-2 font-bold">
              Email
              <input
                type="email"
                className={`w-full px-3 py-2 my-2 border border-gray-400 border-solid rounded focus:outline-none focus:ring-2 ${
                  errors.email ? "ring-2 ring-red-500" : ""
                }`}
                placeholder="Enter email address"
                {...register("email", { required: true })}
              />
            </label>
            <label className="pl-2 font-bold">
              Username
              <input
                type="text"
                className={`w-full px-3 py-2 my-2 border border-gray-400 border-solid rounded focus:outline-none focus:ring-2 ${
                  errors.username ? "ring-2 ring-red-500" : ""
                }`}
                placeholder="Enter username"
                {...register("username", { required: true })}
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
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                })}
              />
            </label>
            {errors.password?.type === "pattern" && (
              <span className="block text-sm text-red-500">
                Password does not conform to required pattern
              </span>
            )}
            <label className="pl-2 font-bold">
              Confirm Password
              <input
                type="password"
                className={`w-full px-3 py-2 my-2 border border-gray-400 border-solid rounded focus:outline-none focus:ring-2 ${
                  errors.confirm ? "ring-2 ring-red-500" : ""
                }`}
                placeholder="Confirm password"
                {...register("confirm", {
                  required: true,
                  validate: (value) => value === enteredPassword,
                })}
              />
            </label>
            {errors.confirm?.type === "validate" && (
              <span className="block text-sm text-red-500">
                Passwords entered do not match
              </span>
            )}
            <div className="flex justify-center py-5">
              <IonButton className="h-10 text-lg font-bold" type="submit">
                Create account
              </IonButton>
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
};
export default Register;
