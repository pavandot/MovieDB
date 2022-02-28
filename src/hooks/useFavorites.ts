import axios from "axios";
import { useQuery } from "react-query";
import { useAppSelector } from "./typedReduxHooks";

// Types
export type useFavoritesReturn = {
	id: string;
	title: string;
	posterImg: string;
	rating: number;
	date: string;
	overview: string;
	totalPage: number;
};

const useFavorites = (mediaType: string) => {
	const sessionId = useAppSelector((state) => state.auth.sessionId);
	// Fetcher function
	const getFavorites = async (mediaType: string, sessionId: string | null) => {
		const response = await axios.get(`https://api.themoviedb.org/3/account/%7Baccount_id%7D/favorite/${mediaType}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${sessionId}&language=en-US&page=1`);

		let data: useFavoritesReturn[] = [];
		if (response.data.results) {
			let totalPage = response.data.total_pages;
			response.data.results.forEach((element: any) => {
				const posterImg = `https://image.tmdb.org/t/p/w300${element.poster_path}`;
				const rating = element.vote_average * 10;
				const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				let dateSplit = "";
				let title = "";
				const overview = element.overview;
				if (mediaType === "movies") {
					dateSplit = element.release_date.split("-");
					title = element.title;
				} else {
					dateSplit = element.first_air_date.split("-");
					title = element.name;
				}

				const date = `${month_names_short[parseInt(dateSplit[1]) - 1]} ${dateSplit[2]}, ${dateSplit[0]}`;
				data = [...data, { id: element.id, title, posterImg, rating, date, overview, totalPage }];
			});
			return data;
		}
	};
	return useQuery(["favorites", mediaType], () => getFavorites(mediaType, sessionId));
};

export default useFavorites;
