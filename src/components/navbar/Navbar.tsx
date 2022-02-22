import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../hooks/typedReduxHooks";
import { logOut, getUserWithSessionId } from "../../app/features/authSlice";
import { setProgressBar } from "../../app/features/uiSlice";

// Components
import ProgressLine from "../loader/ProgressLine";
const Navbar = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { isAuthenticated, user, sessionId, isLoading } = useAppSelector((state) => state.auth);
	const { percentage, isLoader } = useAppSelector((state) => state.ui.progressBar);

	const handelLogout = () => {
		dispatch(logOut());
	};

	// Refetch user data when browser is refreshed
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
		if (sessionId && !user) {
			console.log("lol");

			dispatch(getUserWithSessionId(sessionId));
		}
	}, [isAuthenticated, navigate, sessionId, dispatch, user]);

	// Update progress bar when user is logged in
	if (isLoading) {
		dispatch(setProgressBar(60));
	}
	if (!isLoading) {
		dispatch(setProgressBar(90));
	}

	return (
		<div className='fixed z-50 w-full top-0'>
			<section className='bg-primary text-white flex justify-between px-10 items-center h-16  ' id='navbarId'>
				<div className='left flex space-x-10 items-center'>
					<Link to='/'>
						<h1 className='logo pointer text-3xl font-bold text-style  '>MDB</h1>
					</Link>
				</div>
				<div className='right flex sm:space-x-10 items-center text-lg '>
					{isAuthenticated ? (
						<div onClick={handelLogout} className='cursor-pointer'>
							<h1 className='pointer font-semibold'>Logout</h1>
						</div>
					) : (
						<Link to='/login'>
							<h1 className='pointer font-semibold'>Login</h1>
						</Link>
					)}
				</div>
			</section>
			{isLoader && (
				<ProgressLine
					// label='Full progressbar'
					visualParts={[
						{
							percentage: `${percentage}%`,
							color: "#2DBBD0",
						},
					]}
				/>
			)}
		</div>
	);
};

export default Navbar;
