import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
// Components
import Navbar from "./components/navbar/Navbar";

function App() {
	return (
		<section>
			<Navbar />
			<div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/search/:id' element={<Search />} />
					<Route path='/favorites' element={<Favorites />} />
				</Routes>
			</div>
		</section>
	);
}

export default App;
