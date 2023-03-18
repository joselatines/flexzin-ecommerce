import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { IApiRes } from '@/interfaces/api';
import User from '@/database/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IApiRes>) {
  const { query, method, body } = req;

  if (method !== 'GET' && method !== 'PUT') {
    return res.status(405).json({
      statusCode: 405,
      msg: 'Method not allowed',
    });
  }

  const { token } = query;

  if (!token || token.length < 5) {
    return res.status(404).json({
      statusCode: 404,
      msg: 'Token not found',
    });
  }

  let result;

  try {
    switch (method) {
      case 'GET':
        result = { statusCode: 200, msg: 'Token got successfully', data: { token } };
        break;

      case 'PUT':
        let { email, password} = body;

				if (password.length <= 8 ) {
					return res.status(400).json({
            statusCode: 400,
            msg: 'Password must be larger than 8 characters',
          });
				}

				const passwordHashed = await bcrypt.hash(password, 10);

        const updatedUser = await User.findOneAndUpdate(email, {...body, password: passwordHashed}, { new: true }).lean().exec();

        if (!updatedUser) {
          return res.status(404).json({
            statusCode: 404,
            msg: 'User not found',
          });
        }

        result = { statusCode: 200, msg: 'Password changed successfully', data: updatedUser };
        break;
    }
  } catch (error) {
    console.log('⚠️: ', { error });
    result = { statusCode: 500, msg: 'Internal Server Error', error };
  }

  res.status(result.statusCode).json(result);
}
