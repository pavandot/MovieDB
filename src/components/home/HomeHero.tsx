import React, { useRef } from "react";

const HomeHero = () => {
	const searchRef = useRef<HTMLInputElement>(null);
	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
	};
	return (
		<section className=' h-80 relative overflow-hidden mt-16 ' id='media-top'>
			<img src='https://image.tmdb.org/t/p/original/VuukZLgaCrho2Ar8Scl9HtV3yD.jpg' alt='img' className='w-full h-full sm:h-auto bg-contain ' />
			<div className='absolute bg-primary top-0 bottom-0 left-0 w-full bg-opacity-60 flex justify-center items-center xl:block '>
				<div className=' m-4 sm:my-6 md:my-10 max-w-5xl mx-3 md:mx-8 xl:mx-auto'>
					<div>
						<h1 className='text-4xl sm:text-4xl pb-2 md:text-6xl font-bold text-white pt-5'>Welcome.</h1>
						<p className=' text-lg sm:text-1xl md:text-3xl text-white font-bold'>Millions of movies, TV shows and people to discover. Explore now.</p>
					</div>
					<form className='flex w-full justify-center items-center pt-10' onSubmit={submitHandler}>
						<input type='text' className=' w-full p-2 md:p-3 rounded-tl-3xl rounded-bl-3xl outline-none' placeholder='Search for a movies, tv shows' ref={searchRef} required />
						<button className='bg-gradient-to-r from-green-400 to-secondary h-full p-2 md:p-3 rounded-tr-3xl rounded-br-3xl text-white font-semibold w-28 text-center ' type='submit'>
							Search
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default HomeHero;
