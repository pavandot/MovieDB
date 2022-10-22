import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Types
import { moviesTypes, tvShowsTypes } from '../../hooks/useSearchMedia';

type searchCompType = {
	media: moviesTypes | tvShowsTypes;
	isMovie: boolean;
};

const SearchComp = ({ media, isMovie }: searchCompType) => {
	const navigate = useNavigate();
	const mediaType = isMovie ? 'movie' : 'tv';
	const { id, title, posterImg, overview, date } = media;
	let shortOverview = '';
	if (overview.length > 229) {
		shortOverview = overview.slice(229);
	}
	const sendID = () => {};
	return (
		<Link to={`/${mediaType}/${id}`}>
			<section className='mb-5 mx-5 w-[250px] md:w-auto  md:mx-0'>
				<div className='rounded-lg  flex flex-col md:flex-row border-2 relative'>
					<div className='relative'>
						<Link to={`/${mediaType}/${id}`}>
							<img
								src={posterImg}
								alt={title}
								width='133'
								height='200'
								className=' w-full md:hidden rounded-t-lg object-fill  cursor-pointer'
								onClick={sendID}
							/>
						</Link>
					</div>
					<Link to={`/${mediaType}/${id}`}>
						<img
							src={posterImg}
							alt={title}
							width='94'
							height=''
							className='hidden md:block rounded-tl-lg rounded-bl-lg object-cover h-full cursor-pointer'
							onClick={sendID}
						/>
					</Link>
					<div className='p-5 w-full flex flex-col justify-between'>
						<div className='flex justify-start items-start md:space-x-3 '>
							<div className=''>
								<p className=' font-bold mt-4 md:mt-0  cursor-pointer' onClick={sendID}>
									{title}
								</p>
								<p className=' text-gray-500'>{date}</p>
							</div>
						</div>
						<div className='hidden md:block md:mt-2'>
							<p className=' line-clamp-2'>{overview}</p>
						</div>
					</div>
				</div>
			</section>
		</Link>
	);
};

export default SearchComp;
