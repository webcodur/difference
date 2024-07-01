// src/utils/loadImage.js
const imgExtensions = ['jpg', 'jpeg', 'png'];

const loadImage = (round, order) => {
	for (let ext of imgExtensions) {
		const path = `${process.env.PUBLIC_URL}/images/img${round}${order}.${ext}`;
		const img = new Image();
		img.src = path;
		if (img.complete || img.width > 0) {
			return path;
		}
	}
	return null; // 이미지가 없으면 null 반환
};

export default loadImage;
