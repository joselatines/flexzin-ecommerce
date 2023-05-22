import axios from 'axios';

export default async function logout() {
	return await axios.get(`/api/auth/logout`);
}
