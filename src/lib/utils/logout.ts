import axios from 'axios';
const APP_URI = process.env.NEXT_PUBLIC_APP_URI;

export default async function logout() {
	return await axios.get(`${APP_URI}/api/auth/logout`);
}
