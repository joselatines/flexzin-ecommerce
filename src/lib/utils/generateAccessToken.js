import jwt from 'jsonwebtoken';
export default function generateAccessToken(email, SECRET, tokenTime) {
	return jwt.sign(
		{
			name: email,
			exp: tokenTime, // 30 days in seconds
		},
		SECRET
	);
}
