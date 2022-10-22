import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';

// Function component
const Footer = () => {
	const scrollTo = () => {
		// scroll to top of page
		window.scrollTo(0, 0);
	};
	return (
		<div className='bg-primary text-white flex justify-between px-6  sm:px-10 items-center h-16'>
			<Link to='/'>
				<h1 className='logo pointer text-2xl font-bold text-style  '>M D B</h1>
			</Link>
			{/* <h1>Made with ❤️ by pavan</h1> */}
			<p
				className='hover:bg-white rounded h-7 w-7 flex justify-center items-center hover:text-primary transition duration-300 cursor-pointer'
				onClick={() => scrollTo()}
			>
				<FaArrowUp />
			</p>
		</div>
	);
};
export default Footer;
