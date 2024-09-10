'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className="flex justify-center items-center m-auto p-3">
        <form
          onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"  htmlFor="email"  >
              Email
            </label>
            <input
                className={`
                    shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline
                `}  
                id="email" 
                type="email" 
                placeholder="example@email.com"
                name="email"
                value={userFormData.email}
                onChange={handleChange}
                required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password" >
              Password
            </label>
            <input
                className={`
                    shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                    mb-3 leading-tight focus:outline-none focus:shadow-outline
                `} 
                id="password" 
                type="password"  
                placeholder="***********"
                name="password"
                value={userFormData.password}
                onChange={handleChange}
                required
            />
          </div>
          <div className="mb-6">
            <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
                className={`
                    shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 
                    leading-tight focus:outline-none focus:shadow-outline
                `} 
                id="confirmPassword"  
                type="password" 
                placeholder="***********"
                name="confirmPassword"
                value={userFormData.confirmPassword}
                onChange={handleChange}
                required
            />
            {passError && (
              <p className="text-red-500 text-xs italic">
                Password do not match!
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button    
                className="
                  bg-blue-500  hover:bg-blue-700 text-white font-bold py-2  px-4 rounded  
                  focus:outline-none  focus:shadow-outline" 
            >
                Sign Up
            </button>

            <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href='/'
            >
              Have an account?, Sign in
            </Link>
          </div>
        </form>
      </div>
  );
}

export default Page;