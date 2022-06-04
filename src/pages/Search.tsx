import { useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

// Types
type SearchParams = {
	id: string;
};

// Hooks
import useSearchMedia from '../hooks/useSearchMedia';

// Components
import SearchComp from '../components/search/SearchComp';
import Spinner from '../components/ui/Spinner';

const Search = () => {
	const navigateTo = useNavigate();
	const searchRef = useRef<HTMLInputElement>(null);
	const params = useParams<keyof SearchParams>() as SearchParams;
	const searchText = params.id.replace('-', ' ');
	const { data } = useSearchMedia(searchText);

	const movies = data?.moviesResults.movies;
	const tv = data?.tvShowsResult.tvShows;

	const [isMovie, setIsMovie] = useState(true);
	useEffect(() => {
		if (!params.id) {
			navigateTo('/');
		}
	}, [movies, tv, navigateTo]);

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		navigateTo('/search/' + searchRef.current!.value.replace(' ', '-'));
	};

	return (
		<>
			{movies && tv ? (
				<section className='mt-20 w-full min-h-screen'>
					<form
						onSubmit={submitHandler}
						className='flex items-center border-2 py-3 px-10 space-x-2 max-w-6xl mx-5 md:mx-10 xl:mx-auto'
					>
						<BiSearch className='text-lg ' />
						<input type='text' placeholder={searchText} ref={searchRef} required className='w-full outline-none italic' />
					</form>
					<div className='flex flex-col	md:flex-row max-w-6xl xl:mx-auto  md:justify-between md:mx-5 md:my-5 md:space-x-5'>
						<div className=' hidden md:block w-1/4 max-w-[360px] shadow-md rounded-lg self-start'>
							<h1 className='bg-blue-400 text-left h-16 p-5 font-bold  text-lg text-white rounded-t-lg'>Search Results</h1>
							<ul>
								<li
									className={`flex justify-between px-5 py-3 ${isMovie && 'bg-gray-200 '} cursor-pointer `}
									onClick={() => setIsMovie(true)}
								>
									Movies <span className=' bg-white p-1 rounded-lg'>{!!movies && movies.length}</span>
								</li>
								<li
									className={`flex justify-between px-5 py-3 ${!isMovie && 'bg-gray-200'} cursor-pointer rounded-b-lg`}
									onClick={() => setIsMovie(false)}
								>
									Tv Shows <span className=' bg-white p-1 rounded-lg'>{!!tv && tv.length}</span>
								</li>
							</ul>
						</div>
						<div className='md:hidden'>
							<div className='mb-10 md:m-10 flex items-center'>
								<div className='flex items-center mx-5 border-2 border-primary rounded  justify-between'>
									<div
										className={`py-1 px-3 ${
											isMovie ? 'bg-primary text-white ' : '  bg-white text-gray-800'
										} cursor-pointer `}
										onClick={() => setIsMovie(true)}
									>
										<p>Movies</p>
									</div>
									<div
										className={`py-1 px-4 ${
											!isMovie ? 'bg-primary text-white ' : '  bg-white text-gray-800'
										}   cursor-pointer `}
										onClick={() => setIsMovie(false)}
									>
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
			) : (
				<Spinner />
			)}
		</>
	);
};

export default Search;
