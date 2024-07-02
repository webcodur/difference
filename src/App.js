// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import NameInput from './pages/NameInput';
import Game from './pages/Game';
import Ranking from './pages/Ranking';

import Layout from './components/Layout';
import './App.css'; // App.css 임포트
import 'swiper/css'; // Swiper CSS 임포트
import 'swiper/css/navigation'; // Swiper Navigation CSS 임포트

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/name-input" element={<NameInput />} />
				<Route path="/game" element={<Game />} />
				<Route path="/ranking" element={<Ranking />} />
			</Routes>
		</Layout>
	);
}

export default App;
