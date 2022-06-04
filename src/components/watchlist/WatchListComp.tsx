import { IoHeartCircle, IoCloseCircleOutline } from 'react-icons/io5';
import { BsBookmarkCheckFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useFavoritesReturn } from '../../hooks/useFavorites';
import { useAppSelector } from '../../hooks/typedReduxHooks';
import useDeleteWatchList from '../../hooks/useDeleteWatchList';
// Types
type WatchListCompType = {
	media: useFavoritesReturn;
	isMovie: boolean;
};

const WatchListComp = ({ media, isMovie }: WatchListCompType) => {
	const { id, title, posterImg, rating, date, overview } = media;
	const sessionId = useAppSelector((state) => state.auth.sessionId);
	const { mutate } = useDeleteWatchList();
	const mediaType = isMovie ? 'movie' : 'tv';

	const removeWatchList = () => {
		if (isMovie) {
			const body = {
				media_type: 'movie',
				media_id: id,
				watchlist: false,
			};
			mutate({ body, sessionId });
		} else {
			const body = {
				media_type: 'tv',
				media_id: id,
				watchlist: false,
			};
			mutate({ body, sessionId });
		}
	};

	return (
		<motion.section key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<div className='rounded-lg  h-full flex flex-col sm:flex-row border-2 relative max-w-7xl mx-auto'>
				<div className='relative'>
					<Link to={`/${mediaType}/${id}`}>
						<img
							src={posterImg}
							alt={title}
							width='133'
							height='200'
							className=' w-full sm:hidden rounded-t-lg object-fill cursor-pointer '
						/>
					</Link>
					<div className='w-10 font-bold absolute z-40  bottom-[-18px] left-[10px] sm:hidden '>
						<CircularProgressbar
							value={rating}
							text={`${rating}%`}
							backgroundPadding={6}
							strokeWidth={6}
							styles={buildStyles({
								textSize: '35px',
								textColor: 'white',
								backgroundColor: '#081C22',
								pathColor: '#21D07A',
							})}
							background={true}
						/>
					</div>
				</div>
				<Link to={`/${mediaType}/${id}`}>
					<img
						src={posterImg}
						alt={title}
						width='133'
						height='200'
						className='hidden sm:block rounded-tl-lg rounded-bl-lg object-fill cursor-pointer'
					/>
				</Link>
				<div className='p-5 w-full flex flex-col justify-between'>
					<div className='flex justify-start items-start sm:space-x-3 '>
						<div className='w-10 font-bold hidden sm:block '>
							<CircularProgressbar
								value={rating}
								text={`${rating}%`}
								backgroundPadding={6}
								strokeWidth={6}
								styles={buildStyles({
									textSize: '35px',
									textColor: 'white',
									backgroundColor: '#081C22',
									pathColor: '#21D07A',
								})}
								background={true}
							/>
						</div>
						<div className=''>
							<p className=' font-bold mt-4 sm:mt-0 cursor-pointer '>{title}</p>
							<p className=' text-gray-500'>{date}</p>
						</div>
					</div>
					<div className='hidden sm:block '>
						<p className=' line-clamp-3'>{overview}</p>
					</div>
					<div className=' flex justify-around mt-5 sm:justify-start sm:mt-0 space-x-4 '>
						<div className='flex items-center cursor-pointer'>
							<BsBookmarkCheckFill className='text-3xl text-gray-900' />
							<span>WatchList</span>
						</div>
						<div className='flex items-center cursor-pointer hover:text-[#959595] ' onClick={removeWatchList}>
							<IoCloseCircleOutline className='text-3xl ' />
							<span>Remove</span>
						</div>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default WatchListComp;
