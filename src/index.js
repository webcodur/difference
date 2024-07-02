// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

// BrowserRouter에 basename 속성을 추가하여 /difference 경로를 설정
root.render(
	<BrowserRouter basename="/difference">
		<App />
	</BrowserRouter>
);
