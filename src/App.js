// import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";


import Nav from './components/Nav';
import Home from "./pages/Home";
import About from "./pages/About";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";

import './App.css';
import { WalletProvider } from "./store";


function App() {




	return (
		<div className="App">
			<WalletProvider>
				<BrowserRouter>
					<header className="AppHeader">
						<Nav />
					</header>

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="marketplace" element={<Marketplace />} />
						<Route path="profile" element={<Profile />} />
						<Route path="*" element={<>Nothing to see here</>} /> {/* 404 route matches nothing */}
						{/* </Route> */}
					</Routes>
				</BrowserRouter>
			</WalletProvider>
		</div>
	);
}

export default App;
