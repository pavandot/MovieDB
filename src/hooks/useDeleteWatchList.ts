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
	const deleteWatchList = async (data: { body: bodyType; sessionId: string | null }) => {
		return axios.post(`https://api.themoviedb.org/3/account/11236813/watchlist?api_key=${import.meta.env.VITE_REACT_APP_API_KEY}&session_id=${data.sessionId}`, data.body);
	};
	return useMutation(deleteWatchList, {
		onMutate: async (data) => {
			await QueryClient.cancelQueries(["watchlist", data.body.media_type]);
			const media_type = data.body.media_type === "movie" ? "movies" : "tv";
			const previousMedia: any = QueryClient.getQueryData(["watchlist", media_type]);
			const updatedMedia = previousMedia.filter((media: any) => media.id !== data.body.media_id);
			QueryClient.setQueryData(["watchlist", media_type], updatedMedia);
			console.log(previousMedia);

			console.log(data);
		},
		onSuccess: (data) => {
			QueryClient.invalidateQueries(["watchlist", "movies"]);
			QueryClient.invalidateQueries(["watchlist", "tv"]);
		},
	});
};

export default useDeleteWatchList;
