import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

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
				</Routes>
			</div>
		</section>
	);
}

export default App;
