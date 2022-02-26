import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Path } from "react-router-dom";

// Types
import { stateProps } from "../components/home/HomeHero";

import SearchComp from "../components/search/SearchComp";
// import "./Search.css";
const Search = () => {
	const navigateTo = useNavigate();
	const location = useLocation();
	const { movies, tv } = location.state as stateProps;
	const [isMovie, setIsMovie] = useState(true);
	useEffect(() => {
		if (!movies || !tv) {
			navigateTo("/");
		}
	}, [movies, tv, navigateTo]);
	return (
		<section className='mt-20 w-full'>
			{/* <div className='flex items-center border-2 py-3 px-10 space-x-2'>
				<BiSearch className='text-lg ' />
				<input type='text' placeholder='matrix' className='w-full outline-none italic' />
			</div> */}
			<div className='flex flex-col	md:flex-row max-w-6xl xl:mx-auto  md:justify-between md:mx-5 md:my-5 md:space-x-5'>
				<div className=' hidden md:block w-1/4 max-w-[360px] shadow-md rounded-lg self-start'>
					<h1 className='bg-blue-400 text-left h-16 p-5 font-bold  text-lg text-white rounded-t-lg'>Search Results</h1>
					<ul className=' pt-3 spa'>
						<li className={`flex justify-between px-5 py-3 ${isMovie && "bg-gray-100 "} cursor-pointer `} onClick={() => setIsMovie(true)}>
							Movies <span className=' bg-white p-1 rounded-lg'>{!!movies && movies.length}</span>
						</li>
						<li className={`flex justify-between px-5 py-3 ${!isMovie && "bg-gray-100"} cursor-pointer rounded-b-lg`} onClick={() => setIsMovie(false)}>
							Tv Shows <span className=' bg-white p-1 rounded-lg'>{!!tv && tv.length}</span>
						</li>
					</ul>
				</div>
				<div className='md:hidden'>
					<div className='mb-10 md:m-10 flex items-center'>
						<div className='flex items-center mx-5 border-2 border-primary rounded  justify-between'>
							<div className={`py-1 px-3 ${isMovie ? "bg-primary text-white " : "  bg-white text-gray-800"} cursor-pointer `} onClick={() => setIsMovie(true)}>
								<p>Movies</p>
							</div>
							<div className={`py-1 px-4 ${!isMovie ? "bg-primary text-white " : "  bg-white text-gray-800"}   cursor-pointer `} onClick={() => setIsMovie(false)}>
								<p>TV</p>
							</div>
						</div>
					</div>
				</div>
				<div className=' md:w-9/12 w-full grid  sm:grid-cols-2 md:grid-cols-1 justify-items-center md:justify-items-stretch '>
					{isMovie &&
						movies.length > 0 &&
						movies.map((movie) => {
							return (
								<div key={movie.id}>
									<SearchComp media={movie} isMovie={isMovie} />
								</div>
							);
						})}
					{!isMovie &&
						tv.length > 0 &&
						tv.map((tv) => {
							return (
								<div key={tv.id}>
									<SearchComp media={tv} isMovie={isMovie} />
								</div>
							);
						})}
				</div>
			</div>
		</section>
	);
};

export default Search;
