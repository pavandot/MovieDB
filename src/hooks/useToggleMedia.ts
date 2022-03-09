import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useToggleMedia = () => {
	const sessionId = localStorage.getItem("sessionId");
	const QueryClient = useQueryClient();

	let fetcherFunction = async (data: { body: any; isFavorites: boolean }) => {
		const url = `https://api.themoviedb.org/3/account/{account_id}/${data.isFavorites ? "favorite" : "watchlist"}?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${sessionId}`;
		return axios.post(url, data.body).then((response) => {
			const id = data.body.media_id;
			return { data: response.data, id };
		});
	};

	return useMutation(fetcherFunction, {
		onSuccess: (data) => {
			console.log(data);
			QueryClient.invalidateQueries(["media", data.id]);
		},
	});
};
