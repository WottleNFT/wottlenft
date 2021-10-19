import React from "react";

import { IonButton } from "@ionic/react";
import Image from "next/image";

import wottleLogo from "../../../public/logo.png";
import { Main } from "../../templates/Main";

const Login = () => {
  // const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
  // let data = {
  //   email: email,
  //   password: password
  // }
  // e.preventDefault()
  // const response = await fetch("http://localhost:3080/login", {
  //   method:"POST",
  //   body: JSON.stringify(data),
  //   headers: {
  //    "Content-Type": "application/json"
  //   }
  // })
  // if (response.status == 200) {
  //  setSignUpMessage("Successful login")
  //  const data = await(response.json())
  //  console.log(data);
  //  console.log(data.accessToken)
  // } else {
  //  setSignUpMessage("Error logging in")
  //
  //  console.log(response)
  //  }
  // }

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
          <form className="w-full">
            <label className="pl-2 font-bold">
              Username
              <input
                type="text"
                className="w-full px-3 py-2 my-2 border border-gray-400 border-solid rounded focus:outline-none focus:ring-2"
                placeholder="Enter username"
              />
            </label>
            <label className="pl-2 font-bold">
              Password
              <input
                type="password"
                className="w-full px-3 py-2 my-2 border border-gray-400 border-solid rounded focus:outline-none focus:ring-2"
                placeholder="Enter password"
              />
            </label>
            <p className="text-sm text-right">
              <a>Forgot password?</a>
            </p>
            <div className="flex justify-center py-5">
              <IonButton className="w-40 h-10 text-lg font-bold">
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
