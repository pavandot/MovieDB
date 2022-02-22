type HomePagePropsType = {
	pageNumber: number;
	setPageNumber: (page: number) => void;
	isTvSuccess: boolean;
	isMovieSuccess: boolean;
};
const HomePages = ({ pageNumber, setPageNumber, isTvSuccess, isMovieSuccess }: HomePagePropsType) => {
	const btnHandler = (number: string) => {
		const page = parseInt(number);
		setPageNumber(page);
		if (isTvSuccess || isMovieSuccess) {
			window.scrollTo(0, 0);
		}
	};
	return (
		<div className='flex items-center justify-center mb-4 group'>
			<button
				className={` ${
					pageNumber === 1 ? "bg-primary text-white" : "text-primary"
				}  border-l border-t border-b border-primary hover:bg-primary hover:text-white  font-bold uppercase text-xs px-4 py-2 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150  `}
				type='button'
				onClick={(e) => btnHandler(e.currentTarget.innerHTML)}>
				1
			</button>
			<button
				className={` ${
					pageNumber === 2 ? "bg-primary text-white" : "text-primary"
				}    border border-solid border-primary hover:bg-primary hover:text-white  font-bold uppercase text-xs px-4 py-2 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
				type='button`}
				onClick={(e) => btnHandler(e.currentTarget.innerHTML)}>
				2
			</button>
			<button
				className={`${
					pageNumber === 3 ? "bg-primary text-white" : "text-primary"
				}   border-t border-b border-r border-primary hover:bg-primary hover:text-white  font-bold uppercase text-xs px-4 py-2 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150`}
				type='button'
				onClick={(e) => btnHandler(e.currentTarget.innerHTML)}>
				3
			</button>
		</div>
	);
};

export default HomePages;
