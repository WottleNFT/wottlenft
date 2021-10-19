import { IonCardTitle, IonButton } from "@ionic/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Main } from "../templates/Main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
   let data = {
     email: email,
     password: password
   }
   e.preventDefault()
   const response = await fetch("http://localhost:3080/login", {
     method:"POST",
     body: JSON.stringify(data),
     headers: {
      "Content-Type": "application/json"
     }
   })
   if (response.status == 200) {
    setSignUpMessage("Successful login")
    const data = await(response.json())
    console.log(data);
    console.log(data.accessToken)
   } else {
    setSignUpMessage("Error logging in")
     
    console.log(response)
    }
  }

  const router = useRouter();
  return (
    <Main>
      <div className="flex flex-col justify-center items-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter your email"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" onChange={e => setPassword(e.target.value)} placeholder="Username"/>
          </div>
         <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit"> Sign In
        </button>
        </div>
        </form>
        {
          signUpMessage != "" ? <h5>{signUpMessage}</h5>:<div></div>
        }
      </div>
      <div className="p-10" />
    </Main>
  );
};
export default Login;