import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Redux
import { useAppDispatch } from "../../hooks/typedReduxHooks";
import { setProgressBar } from "../../app/features/uiSlice";
import useSearchMedia from "../../hooks/useSearchMedia";

// Types
type moviesTypes = {
	id: number;
	title: string;
	posterImg: string;
	overview: string;
	date: string;
};
type tvShowsTypes = {
	id: number;
	title: string;
	posterImg: string;
	overview: string;
	date: string;
};
// Fetcher function
const getSearchMedia = async (searchText: string) => {
	// Search Movies
	const { totalPages, totalResult, movieResult } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`).then((res) => {
		// console.log(res);
		const totalPages = res.data.total_pages;
		const totalResult = res.data.total_results;
		const movieResult = res.data.results;
		return { totalPages, totalResult, movieResult };
	});
	let movies: moviesTypes[] = [];
	movieResult.forEach((movie: any) => {
		const id = movie.id;
		const title = movie.title;
		let posterImg = "";
		if (movie.poster_path) {
			posterImg = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
		} else {
			posterImg = "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
		}
		const overview = movie.overview;
		const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let dateSplit = [];
		if (movie.release_date) {
			dateSplit = movie.release_date.split("-");
		}
		const date = `${month_names_short[parseInt(dateSplit[1]) - 1]} ${dateSplit[2]}, ${dateSplit[0]}`;
		if (!!date && !!overview) {
			movies.push({ id, title, posterImg, overview, date });
		}
	});
	const moviesResults = { movies, totalPages, totalResult };

	// Search Tv Shows
	const { tvTotalPages, tvTotalResult, tvResult } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`).then((res) => {
		// console.log(res);
		const tvTotalPages = res.data.total_pages;
		const tvTotalResult = res.data.total_results;
		const tvResult = res.data.results;
		return { tvTotalPages, tvTotalResult, tvResult };
	});
	let tvShowsArr: tvShowsTypes[] = [];
	tvResult.forEach((tv: any) => {
		const id = tv.id;
		const title = tv.name;
		let posterImg = "";
		if (tv.poster_path) {
			posterImg = `https://image.tmdb.org/t/p/w300${tv.poster_path}`;
		} else {
			posterImg = "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
		}
		const overview = tv.overview;
		const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let dateSplit = [];
		if (tv.first_air_date) {
			dateSplit = tv.first_air_date.split("-");
		}
		const date = `${month_names_short[parseInt(dateSplit[1]) - 1]} ${dateSplit[2]}, ${dateSplit[0]}`;
		if (!!date && !!overview) {
			tvShowsArr.push({ id, title, posterImg, overview, date });
		}
	});
	const tvShowsResult = { tvShowsArr, tvTotalPages, tvTotalResult };
	return { moviesResults, tvShowsResult };
};

const HomeHero = () => {
	const [searchText, setSearchText] = useState("");
	const { isLoading, isError, error, isSuccess, data } = useSearchMedia(searchText);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const searchRef = useRef<HTMLInputElement>(null);
	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		setSearchText(searchRef.current!.value);
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
