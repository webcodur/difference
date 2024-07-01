// src/pages/NameInput.js
import React from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { Container, TextField, Button } from '@mui/material';
import { userNameAtom } from '../store';
import RankingList from '../components/RankingList';

function NameInput() {
	const [name, setName] = useAtom(userNameAtom);

	const handleChange = (event) => {
		setName(event.target.value);
	};

	return (
		<Container maxWidth="sm">
			<h1>이름을 입력하세요</h1>
			<TextField
				label="이름"
				variant="outlined"
				fullWidth
				value={name}
				onChange={handleChange}
				margin="normal"
				autoComplete="off" // 자동완성 비활성화
			/>
			<Link to="/game">
				<Button variant="contained" color="primary" fullWidth>
					게임 시작
				</Button>
			</Link>
			<RankingList />
		</Container>
	);
}

export default NameInput;
