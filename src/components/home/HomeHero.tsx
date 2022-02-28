import React, { useRef } from "react";
import { useNavigate, To } from "react-router-dom";

// Types
import { moviesTypes, tvShowsTypes } from "../../hooks/useSearchMedia";

export type stateProps = {
	movies: moviesTypes[];
	tv: tvShowsTypes[];
	searchText: string;
};

type NavigateFunction = {
	(to: To, options?: { replace?: boolean; state: stateProps }): void;
	(delta: number): void;
};

// React Component
const HomeHero = () => {
	const navigate: NavigateFunction = useNavigate();
	const searchRef = useRef<HTMLInputElement>(null);
	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		navigate("/search/" + searchRef.current!.value.replace(" ", "-"));
	};
	return (
		<section className=' h-80 relative overflow-hidden mt-16 ' id='media-top'>
			<img src='https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg' alt='img' className='w-full h-full  md:bg-cover ' />
			<div className='absolute bg-primary top-0 bottom-0 left-0 w-full bg-opacity-60 flex justify-center items-center xl:block '>
				<div className=' m-4 sm:my-6 md:my-10 max-w-5xl mx-3 md:mx-8 xl:mx-auto'>
					<div>
						<h1 className='text-4xl sm:text-4xl pb-2 md:text-6xl font-bold text-white pt-5'>Welcome.</h1>
						<p className=' text-lg sm:text-1xl md:text-3xl text-white font-bold'>Millions of movies, TV shows and people to discover. Explore now.</p>
					</div>
					<form className='flex w-full justify-center items-center pt-10' onSubmit={submitHandler}>
						<input type='text' className=' w-full p-2 md:p-3 rounded-tl-lg rounded-bl-lg outline-none' placeholder='Search for a movies, tv shows' ref={searchRef} required />
						<button className='bg-gradient-to-r from-green-400 to-secondary h-full p-2 md:p-3 rounded-tr-lg rounded-br-lg text-white font-semibold w-28 text-center ' type='submit'>
							Search
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default HomeHero;
