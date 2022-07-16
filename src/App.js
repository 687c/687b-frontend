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
import Create from "./pages/Create";

import './App.css';
import { WalletStore } from "./store";

function App() {

	return (
		<div className="App">
			<WalletStore>
				<BrowserRouter>
					<header className="AppHeader">
						<Nav />
					</header>

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="marketplace" element={<Marketplace />} />
						<Route path="create" element={<Create />} >
							{/* <Route index element="product" /> */}
							<Route index path="product" />
							<Route path="nft" />
						</Route>

						<Route path="profile" element={<Profile />} />
						<Route path="*" element={<>Nothing to see here</>} /> {/* 404 route matches nothing */}
						{/* </Route> */}
					</Routes>
				</BrowserRouter>
			</WalletStore>
		</div>
	);
}

export default App;


// the first e-commerce site built on top of solana