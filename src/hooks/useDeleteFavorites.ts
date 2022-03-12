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
		onMutate: async (data) => {
			await QueryClient.cancelQueries(["favorites", data.body.media_type]);
			const media_type = data.body.media_type === "movie" ? "movies" : "tv";
			const previousMedia: any = QueryClient.getQueryData(["favorites", media_type]);
			const updatedMedia = previousMedia.filter((media: any) => media.id !== data.body.media_id);
			QueryClient.setQueryData(["favorites", media_type], updatedMedia);
			console.log(previousMedia);

			console.log(data);
		},
		onSuccess: (data) => {
			QueryClient.invalidateQueries(["favorites", "movies"]);
			QueryClient.invalidateQueries(["favorites", "tv"]);
		},
	});
};

export default useDeleteFavorites;
