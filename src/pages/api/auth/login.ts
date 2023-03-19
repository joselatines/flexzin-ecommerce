import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';
import User from '@/database/models/User';
import { IApiRes } from '@/lib/interfaces/api';

export default async function loginHandler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	return res.status(200).json({
		statusCode: 200,
		msg: 'log in successful',
	});
}