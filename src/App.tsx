import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Media from "./pages/Media";
// Components
import Navbar from "./components/navbar/Navbar";

function App() {
	return (
		<section className=' font-Poppins'>
			<Navbar />
			<div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/search/:id' element={<Search />} />
					<Route path='/:mediaType/:mediaId' element={<Media />} />
					<Route path='/favorites' element={<Favorites />} />
				</Routes>
			</div>
		</section>
	);
}

export default App;
