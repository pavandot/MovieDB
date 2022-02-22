import { Link } from "react-router-dom";
const Navbar = () => {
	return (
		<div className='fixed z-50 w-full top-0'>
			<section className='bg-primary text-white flex justify-between px-10 items-center h-16  ' id='navbarId'>
				<div className='left flex space-x-10 items-center'>
					<Link to='/'>
						<h1 className='logo pointer text-3xl font-bold text-style  '>MDB</h1>
					</Link>
				</div>
				<div className='right flex sm:space-x-10 items-center text-lg '>
					<Link to='/login'>
						<h1 className='pointer font-semibold'>Login</h1>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Navbar;
