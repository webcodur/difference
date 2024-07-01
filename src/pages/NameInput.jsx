// src/pages/NameInput.js
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { Container, TextField, Button } from '@mui/material';
import { userNameAtom } from '../store';
import RankingList from '../components/RankingList';

function NameInput() {
	const [, setName] = useAtom(userNameAtom);
	const [localName, setLocalName] = useState(''); // useState로 로컬 상태 관리

	const handleChange = (event) => {
		setLocalName(event.target.value);
	};

	const handleValueToGlobal = () => {
		setName(localName);
	};

	return (
		<Container maxWidth="sm">
			<h1>이름을 입력하세요</h1>
			<TextField
				label="이름"
				variant="outlined"
				fullWidth
				value={localName}
				onChange={handleChange}
				margin="normal"
				autoComplete="off"
			/>
			<Link to="/game">
				<Button
					variant="contained"
					color="primary"
					fullWidth
					onClick={handleValueToGlobal}>
					게임 시작
				</Button>
			</Link>

			<RankingList />
		</Container>
	);
}

export default NameInput;
