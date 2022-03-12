import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type bodyType = {
	media_type: string;
	media_id: string;
	watchlist: boolean;
};

const useDeleteWatchList = () => {
	const QueryClient = useQueryClient();
	// Delete favorites
	const deleteFavorites = async (data: { body: bodyType; sessionId: string | null }) => {
		return axios.post(`https://api.themoviedb.org/3/account/11236813/watchlist?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${data.sessionId}`, data.body);
	};
	return useMutation(deleteFavorites, {
		onSuccess: (data) => {
			QueryClient.invalidateQueries(["watchlist", "movies"]);
			QueryClient.invalidateQueries(["watchlist", "tv"]);
		},
	});
};

export default useDeleteWatchList;
