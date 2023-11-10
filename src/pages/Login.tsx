import React from 'react';
import { useState } from 'react';
import { getUser } from '../app/features/authSlice';
import { useAppDispatch } from '../hooks/typedReduxHooks';
const Login = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();
	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		const userData = {
			userName,
			password,
		};
		dispatch(getUser(userData));
	};
	const guestUserHandler = () => {
		const userData = {
			userName: 'muwofi',
			password: 'Pass@123',
		};
		dispatch(getUser(userData));
	};
	return (
		<section className='mt-16 mb-28 sm:mb-0 max-w-7xl mx-auto min-h-screen '>
			<section className='px-4 sm:px-10 py-7 max-w-lg mx-auto '>
				<h1 className='text-2xl font-semibold pb-1'>Login to your account</h1>

				{/* <p className='mt-5 font-semibold'>Demo Account:</p>
				<p>UserName: pavandot</p>
				<p>Password: 0850</p> */}

				<form onSubmit={submitHandler}>
					<div className='mb-6 mt-5'>
						<label htmlFor='text' className='block mb-2  font-medium text-gray-900 '>
							User Name
						</label>
						<input
							type='text'
							id='text'
							className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
							placeholder='username'
							required
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					<div className='mb-6'>
						<label htmlFor='password' className='block mb-2  font-medium text-gray-900'>
							Password
						</label>
						<input
							type='password'
							id='password'
							className='bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
							required
							value={password}
							placeholder='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type='submit'
						className='text-white  bg-secondary hover:opacity-95 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  w-full  px-5 py-2.5 text-center '
					>
						Submit
					</button>
				</form>
				<div className=' mt-5 '>
					<button className=' text-secondary text-center w-full hover:underline mb-5 ' onClick={guestUserHandler}>
						Continue as Guest
					</button>
					<div className='flex justify-center w-full space-x-2'>
						<span>Don't have an account?</span>
						<a href='https://www.themoviedb.org/signup' className=' text-secondary text-center  hover:underline '>
							Sign Up
						</a>
					</div>
				</div>
			</section>
		</section>
	);
};

export default Login;
