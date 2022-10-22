import { useState } from 'react';
import FavoritesComp from '../components/favorites/FavoritesComp';
import useFavorites from '../hooks/useFavorites';
import Spinner from '../components/ui/Spinner';

const Favorites = () => {
	const { data: movies } = useFavorites('movies');
	const { data: tv } = useFavorites('tv');

	const [isMovie, setIsMovie] = useState(true);
	const switchToMovies = () => {
		setIsMovie(true);
	};
	const switchToTv = () => {
		setIsMovie(false);
	};

	return (
		<div className=' min-h-screen'>
			<p className='m-10'>1</p>
			<div className=' m-10  flex items-center max-w-7xl  2xl:mx-auto mx-5 md:mx-10'>
				<p className=' text-xl md:text-2xl font-semibold'>My Favorites</p>
				<div className='flex items-center mx-5 border-2 border-primary  rounded justify-between'>
					<div
						className={`py-1 px-3 ${
							isMovie ? ' bg-primary text-white ' : ' bg-white text-gray-800'
						} transition-all duration-300 cursor-pointer `}
						onClick={switchToMovies}
					>
						<p>Movies</p>
					</div>
					<div
						className={`py-1 px-4 ${
							!isMovie ? ' bg-primary text-white ' : ' bg-white text-gray-800'
						} transition-all duration-300   cursor-pointer `}
						onClick={switchToTv}
					>
						<p>TV</p>
					</div>
				</div>
			</div>
			{movies && tv ? (
				<div className='grid grid-cols-1 m-10'>
					{isMovie && movies.length === 0 && <h1 className='text-3xl text-center font-semibold'>No Favorites</h1>}
					{isMovie &&
						movies.map((movie) => {
							return (
								<div key={movie.id} className='m-3'>
									<FavoritesComp media={movie} isMovie={isMovie} />
								</div>
							);
						})}
					{!isMovie && tv.length === 0 && <h1 className='text-3xl text-center font-semibold'>No Favorites</h1>}
					{!isMovie &&
						tv.map((tvItem) => {
							return (
								<div key={tvItem.id} className='m-3'>
									<FavoritesComp media={tvItem} isMovie={isMovie} />
								</div>
							);
						})}
				</div>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default Favorites;
