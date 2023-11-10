import axios from 'axios';
import { useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { BsBookmark, BsBookmarkCheckFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../hooks/typedReduxHooks';

import Spinner from '../components/ui/Spinner';
import { useToggleMedia } from '../hooks/useToggleMedia';

// Types
type dataType = {
	id: any;
	title: string;
	rating: number;
	releaseDate: string;
	genres: any[];
	totalRunTime: string;
	tagLine: any;
	overview: any;
	backgroundPoster: string;
	posterPath: string;
	isFavorite: boolean;
	isWatchList: boolean;
	isMovie: boolean;
};

const fetchMedia = async (id: any, mediaType: any, sessionId: any) => {
	const movieData = await axios
		.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&language=en-US`)
		.then((res) => res.data);
	// console.log(movieData);
	let title = '';
	let releaseDate = '';
	let totalRunTime = '';
	let isFavorite = false;
	let isWatchList = false;
	let isMovie = true;
	if (sessionId) {
		const isUser = await axios
			.get(
				`https://api.themoviedb.org/3/${mediaType}/${id}/account_states?api_key=${
					import.meta.env.VITE_REACT_APP_API_KEY
				}&session_id=${sessionId}`
			)
			.then((res) => {
				isFavorite = res.data.favorite;
				isWatchList = res.data.watchlist;
				return { isFavorite, isWatchList };
			});
		isFavorite = isUser.isFavorite;
		isWatchList = isUser.isWatchList;
	}
	// console.log(isFavorite);
	if (mediaType === 'movie') {
		title = movieData.title;
		releaseDate = movieData.release_date.replaceAll('-', '/');
		const runtime = movieData.runtime;
		const hours = Math.floor(runtime / 60);
		const minutes = runtime % 60;
		totalRunTime = `${hours}h ${minutes}m`;
	}
	if (mediaType === 'tv') {
		title = movieData.name;
		releaseDate = movieData.first_air_date.replaceAll('-', '/');
		totalRunTime = `${movieData.runtime}m`;
		isMovie = false;
	}
	const rating = movieData.vote_average * 10;
	let genres: any[] = [];
	movieData.genres.forEach((gen: any, index: any) => {
		// console.log(index);
		if (index <= 1) {
			genres.push(`${gen.name}`);
		}
	});

	const tagLine = movieData.tagline;
	const overview = movieData.overview;
	const posterPath = `https://image.tmdb.org/t/p/w400/${movieData.poster_path}`;
	const backgroundPoster = `https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`;
	const data: dataType = {
		id,
		title,
		rating,
		releaseDate,
		genres,
		totalRunTime,
		tagLine,
		overview,
		backgroundPoster,
		posterPath,
		isFavorite,
		isWatchList,
		isMovie,
	};
	return data;
};

const Media = () => {
	const navigateTo = useNavigate();
	const { mutate } = useToggleMedia();

	const { mediaId, mediaType } = useParams();
	const sessionId = useAppSelector((state) => state.auth.sessionId);
	const {
		data,
		isLoading: isMediaLoading,
		isSuccess: isMediaSuccess,
		isFetching,
	} = useQuery(['media', mediaId], () => fetchMedia(mediaId, mediaType, sessionId), {
		enabled: !!mediaId,
	});
	useEffect(() => {
		if (!mediaId) {
			navigateTo('/');
		}
	}, [mediaId, navigateTo]);

	let {
		id,
		title,
		rating,
		releaseDate,
		genres,
		totalRunTime,
		tagLine,
		overview,
		backgroundPoster,
		posterPath,
		isFavorite,
		isMovie,
		isWatchList,
	} = isMediaSuccess ? (data as dataType) : ({} as dataType);

	const setIsFavorites = () => {
		const body = {
			media_type: mediaType,
			media_id: id,
			favorite: !isFavorite,
		};
		mutate({ body, isFavorites: true });
	};

	const watchListHandler = () => {
		const body = {
			media_type: mediaType,
			media_id: id,
			watchlist: !isWatchList,
		};
		mutate({ body, isFavorites: false });
	};

	if (isMediaLoading) {
		return <Spinner />;
	}
	console.log(Math?.floor(rating));
	return (
		<>
			{isMediaSuccess && (
				<section className='sm:h-screen '>
					<div className='hidden sm:block'>
						<img src={backgroundPoster} alt='img' className='object-cover h-screen w-full' />
					</div>
					<div className=' absolute bg-black bg-opacity-90 top-0 left-0 sm:bottom-0 flex justify-center items-center w-full min-h-screen h-auto'>
						<div className='sm:bottom-0  w-full 	mt-16  flex flex-col sm:flex-row items-center max-w-7xl mx-auto'>
							<div className='sm:ml-10 mt-10 sm:mt-0 rounded-lg sm:overflow-hidden  '>
								<img src={posterPath} alt='imgs' width='300' className=' rounded-lg' />
							</div>
							<div className=' self-center mt-3 text-white p-10  sm:w-4/6 sm:flex-grow '>
								<h1 className='text-4xl font-bold mb-2'>
									{title} <span className='text-gray-300'>({releaseDate.slice(0, 4)})</span>
								</h1>
								<p className=''>
									<span className=' border-[2px] rounded-md px-[2px] text-gray-400 border-gray-400'>PG-13</span> &nbsp;{' '}
									{releaseDate} (IN) &nbsp; &#8226; &nbsp;{genres[0]}, {genres[1]} &nbsp; &#8226; &nbsp;{totalRunTime}
								</p>
								<div className='my-5 flex w-full items-center'>
									<div className='w-16 font-bold rating-position'>
										<CircularProgressbar
											value={rating}
											text={`${Math.round(rating) || 0}%`}
											backgroundPadding={6}
											strokeWidth={6}
											styles={buildStyles({
												textSize: '25px',
												textColor: 'white',
												backgroundColor: '#081C22',
												pathColor: '#21D07A',
											})}
											background={true}
										/>
									</div>
									<p className='font-bold ml-2'>
										User <br /> Score
									</p>
									<div
										className={`bg-primary ml-4 p-4 rounded-3xl cursor-pointer ${sessionId ? 'block' : 'hidden'} `}
										onClick={setIsFavorites}
									>
										<FaHeart className={`${isFavorite ? 'text-red-600' : 'text-white'}`} />
									</div>
									<div
										className={`bg-primary ml-4 p-4 rounded-3xl cursor-pointer ${sessionId ? 'block' : 'hidden'}`}
										onClick={watchListHandler}
									>
										{isWatchList ? <BsBookmarkCheckFill className='text-white' /> : <BsBookmark />}
									</div>
								</div>
								<p className='mb-3 italic text-gray-300'>{tagLine}</p>
								<h1 className='mb-2 text-xl font-bold'>Overview</h1>
								<p>{overview}</p>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Media;
