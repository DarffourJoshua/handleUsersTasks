'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function Page() {
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passError, setPassError] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const router = useRouter();

  useEffect(() => {
    validatePassword(userFormData.password, userFormData.confirmPassword);
  }, [userFormData.password, userFormData.confirmPassword]);

  function validatePassword(password, confirmPassword) {
    let isValid = confirmPassword === password;
    if (!isValid) {
      setPassError(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const {email, password} = userFormData;
    let userData = {
      email,
      password,
    };

    // Make call to backend to create user
    const res = await fetch("/api/createUser", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(userData);

    if (!res.ok) {
        // registration success
        alert('Account creation failed');
    } else  {
      router.push('/');
    }


  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image 
          alt="logo" src="https://cdn-icons-png.flaticon.com/512/906/906334.png" 
          className="mx-auto h-10 w-auto" 
          width={32}
          height={32}
        />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900
            dark:text-white sm:text-3xl sm:leading-10
          ">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userFormData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userFormData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userFormData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
           Alreasdy have an account?{' '}
            <Link href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in here.
            </Link>
          </p>
        </div>
      </div>
  );
}

export default Page;