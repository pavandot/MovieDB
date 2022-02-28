import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type bodyType = {
	media_type: string;
	media_id: string;
	favorite: boolean;
};

const useDeleteFavorites = () => {
	const QueryClient = useQueryClient();
	// Delete favorites
	const deleteFavorites = async (data: { body: bodyType; sessionId: string | null }) => {
		return axios.post(`https://api.themoviedb.org/3/account/11236813/favorite?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${data.sessionId}`, data.body);
	};
	return useMutation(deleteFavorites, {
		onSuccess: (data) => {
			QueryClient.invalidateQueries(["favorites", "movies"]);
			QueryClient.invalidateQueries(["favorites", "tv"]);
		},
	});
};

export default useDeleteFavorites;
