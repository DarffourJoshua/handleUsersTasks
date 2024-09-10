'use client';
import { useEffect, useState } from "react";
import {validateEmail}  from "../lib/utils";
import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";


function Login() {
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState("");
  const [emailInPutError, setEmailInputError] = useState(false);
  const [passwordInPutError, setPasswordInputError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    validate();
  }, [userFormData.email, userFormData.password]);

  const handleChange = e => {
    e.preventDefault();
    setUserFormData(prevData => {
        const {name, value} = e.target;
        return {
            ...prevData,
            [name]: value,
        }
    })
  }

  const router = useRouter();
  

  async function handleSubmit(e) {
    e.preventDefault();

    const {email, password} = userFormData;
    console.log(email, password);

    setIsLoading(true);
    let res = await signIn("credentials", {
      email,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user`,
      redirect: false,
    });

    setIsLoading(false)

    if (res?.ok) {
      // toast success
      router.push('/protectedRoute');
      console.log("success");
      
    } else {
      // Toast failed
      setError("Failed! Check your input and try again.");
      // return;
      console.log("Failed", res);
    }
    return res;
  }

  function validate() {
    let emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      setEmailInputError(true);
    }
    if (password.length < 6) {
      setPasswordInputError(true);
    } else {
      setEmailInputError(false);
      setPasswordInputError(false);
    }
  }
  return (
      <div className="flex justify-center items-center m-auto p-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
                className={`border-${
                        emailInPutError ? "red-500" : ""
                    } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline`
                }
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              value={userFormData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
                className={` border-${
                        passwordInPutError ? "red-500" : ""
                    } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                    mb-3 leading-tight focus:outline-none focus:shadow-outline`
                }
                id="password"
                type="password"
                placeholder="******************"
                name="password"
                value={userFormData.password}
                onChange={handleChange}
                required
            />
            <p className="text-red-500 text-xs italic">
              {passwordInPutError && "Password must be at least 6 characters long."}
            </p>

          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2  px-4 rounded  focus:outline-none  focus:shadow-outline"
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
  );
}

export default Login;