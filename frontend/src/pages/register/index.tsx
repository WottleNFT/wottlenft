import React from "react";

import { IonButton, IonIcon, useIonPopover } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import wottleLogo from "../../../public/logo.png";
import { Status } from "../../features/wallet/walletSlice";
import useWallet from "../../hooks/useWallet";
import { Main } from "../../templates/Main";

interface FormInputs {
  email: string;
  username: string;
  password: string;
  confirm: string;
}

const Register = () => {
  const router = useRouter();
  const wallet = useWallet();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormInputs>();
  const enteredPassword = watch("password", "");

  const [present, dismiss] = useIonPopover(
    <div className="py-3 pr-5 pl-7">
      <p className="font-bold text-center">Password requirements</p>
      <ul className="list-disc">
        <li>Contains UpperCase (A-Z)</li>
        <li>Contains LowerCase (a-z)</li>
        <li>Contains Numbers (0-9)</li>
        <li>At least 8 characters in length</li>
      </ul>
    </div>,
    { onHide: () => dismiss() }
  );

  const onSubmit = async (data: FormInputs) => {
    const response = await fetch("http://localhost:3080/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      alert("Account successfully created!");
      router.push("/login");
    }
  };

  return (
    <Main title="Register">
      <div className="flex flex-col items-center justify-center min-h-full bg-cover bg-background-seascape bg-primary-default">
        {(wallet.status === Status.NoExtension ||
          wallet.status === Status.NotEnabled) && (
          <p className="text-xl font-bold">
            Please connect to Nami Wallet first before registering for an
            account
          </p>
        )}
        {wallet.status === Status.Enabled && (
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
                Password{" "}
                <IonIcon
                  onClick={(e) =>
                    present({
                      event: e.nativeEvent,
                    })
                  }
                  icon={informationCircleOutline}
                  size="small"
                  className="relative bottom-0 left-0"
                />
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
        )}
      </div>
    </Main>
  );
};
export default Register;
