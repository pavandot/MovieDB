import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsFillBookmarkCheckFill, BsBookmark, BsThreeDots } from 'react-icons/bs';

import 'react-circular-progressbar/dist/styles.css';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { fetchMediaDetails, clearIsFavorite, toggleFavorites, toggleWatchList } from '../../app/features/mediaDetailsSlice';
// Types
import { mediaType } from '../../pages/Home';
import { Link } from 'react-router-dom';

type HomeShowcasePropsType = {
	media: mediaType;
	isMovie: boolean;
};

const HomeShowcase = ({ media, isMovie }: HomeShowcasePropsType) => {
	const [isMovieMenu, setIsMovieMenu] = useState(false);
	const mediaType = isMovie ? 'movie' : 'tv';
	const dispatch = useAppDispatch();
	const sessionId = useAppSelector((state) => state.auth.sessionId);
	const { isFavorite, isLoading, isWatchlist } = useAppSelector((state) => state.mediaDetails);
	const { title, poster, rating, releaseDate, id } = media;
	const favoriteHandler = () => {
		const body = {
			media_type: mediaType,
			media_id: media.id,
			favorite: !isFavorite,
			watchlist: isWatchlist,
		};
		dispatch(toggleFavorites(body));
	};
	const watchListHandler = () => {
		const body = {
			media_type: mediaType,
			media_id: media.id,
			favorite: isFavorite,
			watchlist: !isWatchlist,
		};
		dispatch(toggleWatchList(body));
	};
	const getMediaDetails = () => {
		setIsMovieMenu(!isMovieMenu);
		const payLoad = { mediaId: media.id, mediaType };
		if (!isMovieMenu) {
			dispatch(fetchMediaDetails(payLoad));
		}
		if (isMovieMenu) {
			dispatch(clearIsFavorite());
		}
	};
	return (
		<motion.section
			className='inline-block h-72  w-[160px]  sm:w-[170px] md:w-[180px] '
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<div className='rounded-lg  relative h-full '>
				<Link to={`${mediaType}/${id}`}>
					<img
						src={`https://image.tmdb.org/t/p/w300${poster}`}
						alt={title}
						className='rounded-lg bg-gray-300  h-full w-full object-fill cursor-pointer'
					/>
				</Link>
				{!!sessionId && (
					<div
						className='absolute top-3 right-3 cursor-pointer hover:bg-secondary transition duration-300 p-1 bg-gray-300 rounded-full '
						onClick={getMediaDetails}
					>
						<BsThreeDots />
					</div>
				)}
				<AnimatePresence>
					{isMovieMenu && isLoading && (
						<>
							<motion.div
								className='absolute movie-menu top-[40px] right-[0px] bg-white w-[130px] h-[68px] flex flex-col justify-around items-center  rounded border-2'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.25 }}
							>
								<div className='w-[95%]  bg-gray-300 h-[40%] rounded animate-pulse'></div>
								<div className='w-[95%]  bg-gray-300 h-[40%] rounded  animate-pulse'></div>
							</motion.div>
						</>
					)}
					{isMovieMenu && !isLoading && (
						<motion.div
							className='absolute movie-menu top-[40px] right-[0px] bg-white rounded border-2'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
						>
							<div className='px-3 py-1 hover:bg-gray-200 '>
								<p className=' flex justify-start items-center cursor-pointer' onClick={favoriteHandler}>
									<span className='pr-2'>
										{!isFavorite && <AiOutlineHeart />}
										{isFavorite && <AiFillHeart className=' text-red-500 cursor-pointer' />}
									</span>
									Favorite
								</p>
							</div>
							<div className=' px-3 py-1 hover:bg-gray-200 '>
								<p className=' flex justify-start items-center cursor-pointer' onClick={watchListHandler}>
									<span className='pr-2'>
										{!isWatchlist && <BsBookmark />}
										{isWatchlist && <BsFillBookmarkCheckFill className='cursor-pointer' />}
									</span>
									Watch List
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
				<div className='w-10 font-bold absolute z-40  bottom-[-18px] left-[10px]'>
					<CircularProgressbar
						value={rating * 10}
						text={`${Math.round(rating * 10)}%`}
						backgroundPadding={6}
						strokeWidth={6}
						styles={buildStyles({
							textSize: '27px',
							textColor: 'white',
							backgroundColor: '#081C22',
							pathColor: '#21D07A',
						})}
						background={true}
					/>
				</div>
			</div>
			<div className='sm:mx-3 my-3 mt-7'>
				<p className=' font-bold'>{title}</p>
				<p className=' text-gray-500'>{releaseDate}</p>
			</div>
		</motion.section>
	);
};

export default HomeShowcase;
