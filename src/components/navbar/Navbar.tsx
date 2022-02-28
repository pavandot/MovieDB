import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// Redux
import { useAppSelector, useAppDispatch } from "../../hooks/typedReduxHooks";
import { logOut, getUserWithSessionId } from "../../app/features/authSlice";
import { setProgressBar } from "../../app/features/uiSlice";

// Components
import ProgressLine from "../ui/loader/ProgressLine";

// CSS
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

const Navbar = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { isAuthenticated, user, sessionId, isLoading, error } = useAppSelector((state) => state.auth);

	const { percentage, isLoader } = useAppSelector((state) => state.ui.progressBar);

	const handelLogout = () => {
		dispatch(logOut());
	};

	useEffect(() => {
		// If user is authenticated redirect to home page
		if (location.pathname === "/login" && isAuthenticated) {
			navigate("/");
		}
		// Refetch user data when browser is refreshed
		if (sessionId && !user) {
			dispatch(getUserWithSessionId(sessionId));
		}
	}, [isAuthenticated, navigate, sessionId, dispatch, user]);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

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
					visualParts={[
						{
							percentage: `${percentage}%`,
							color: "#2DBBD0",
						},
					]}
				/>
			)}
			{error && <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />}
		</div>
	);
};

export default Navbar;
