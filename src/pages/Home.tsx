import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

// components
import HomeHero from "../components/home/HomeHero";
import HomeShowcase from "../components/home/HomeShowcase";
import HomePages from "../components/home/HomePages";

// Types
export type mediaType = {
	id: number;
	title: string;
	releaseDate: string;
	poster: string;
	rating: number;
};

// Fetcher Function
const fetchMovies = async (pageNumber: number) => {
	return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&page=${pageNumber}`);
};
const fetchTv = async (pageNumber: number) => {
	return axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&page=${pageNumber}`);
};

// Select Function
const selectMovie = (movies: any) => {
	const nonStructuredMovies = movies.data.results;
	const structuredMovies: mediaType[] = [];
	nonStructuredMovies.forEach((movie: any) => {
		structuredMovies.push({
			id: movie.id,
			title: movie.original_title,
			releaseDate: movie.release_date,
			poster: movie.poster_path,
			rating: movie.vote_average,
		});
	});
	return structuredMovies;
};
const selectTv = (tv: any) => {
	const nonStructuredTv = tv.data.results;
	const structuredTv: mediaType[] = [];
	nonStructuredTv.forEach((show: any) => {
		structuredTv.push({
			id: show.id,
			title: show.original_name,
			releaseDate: show.first_air_date,
			poster: show.poster_path,
			rating: show.vote_average,
		});
	});
	return structuredTv;
};

// React Component
const Home = () => {
	const [isMovie, setIsMovie] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);

	// Querying Media
	const {
		isLoading: isMovieLoading,
		data: movies,
		isSuccess: isMovieSuccess,
	} = useQuery(["movies", pageNumber], () => fetchMovies(pageNumber), {
		select: selectMovie,
		enabled: isMovie,
		keepPreviousData: true,
	});

	const {
		isLoading: isTvLoading,
		data: tv,
		isSuccess: isTvSuccess,
	} = useQuery(["tv", pageNumber], () => fetchTv(pageNumber), {
		select: selectTv,
		enabled: !isMovie,
		keepPreviousData: true,
	});

	// if (isTvSuccess || isMovieSuccess) {
	// 	console.log(movies);
	// 	console.log(tv);
	// }

	const switchToMovies = () => {
		setPageNumber(1);
		if (!isMovieLoading) {
			setIsMovie(true);
		}
	};
	const switchToTv = () => {
		setPageNumber(1);
		if (!isTvLoading) {
			setIsMovie(false);
		}
	};
	return (
		<section>
			<HomeHero />
			<div className='m-5 sm:m-10 flex items-center max-w-5xl lg:mx-auto'>
				<p className='text-2xl font-semibold'>Popular</p>
				<div className='flex items-center mx-5 border-2 border-primary rounded justify-between'>
					<div className={`py-1 px-3 ${isMovie ? " bg-primary text-white " : "bg-white text-gray-800"} cursor-pointer  transition-all duration-300 `} onClick={switchToMovies}>
						<p>Movies</p>
					</div>
					<div className={`py-1 px-4 ${!isMovie ? " bg-primary text-white " : "bg-white text-gray-800"}   cursor-pointer  transition-all duration-300 `} onClick={switchToTv}>
						<p>TV</p>
					</div>
				</div>
			</div>
			<div className='grid grid-cols-2 justify-items-center sm:grid-cols-3 lg:grid-cols-5  sm:m-6 md:mx-24 max-w-5xl lg:mx-auto min-h-[50rem] '>
				{isMovie &&
					isMovieSuccess &&
					movies.map((movie) => {
						return (
							<div key={movie.id} className='m-3'>
								<HomeShowcase media={movie} isMovie={isMovie} />
							</div>
						);
					})}
				{!isMovie &&
					isTvSuccess &&
					tv.map((tv) => {
						return (
							<div key={tv.id} className='m-3'>
								<HomeShowcase media={tv} isMovie={isMovie} />
							</div>
						);
					})}
			</div>
			<div>
				<HomePages pageNumber={pageNumber} setPageNumber={setPageNumber} isMovieSuccess={isMovieSuccess} isTvSuccess={isTvSuccess} />
			</div>
		</section>
	);
};

export default Home;
