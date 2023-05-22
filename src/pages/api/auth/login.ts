import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '@/database/models/User';
import { IApiRes } from '@/lib/interfaces/api';
import { setCookie } from 'cookies-next';
import generateAccessToken from '@/lib/utils/generateAccessToken';

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<IApiRes>
) {
  try {
    const { email, password } = req.body;
    const SECRET = process.env.TOKEN_NAME;

    if (!SECRET) {
      return res.status(401).json({
        error: 'Api',
        statusCode: 500,
        msg: 'Token not found',
      });
    }

    if (req.method !== 'POST') {
      return res.status(500).json({
        error: 'Method not allowed',
        statusCode: 500,
        msg: 'Method not allowed',
      });
    }

    const user = await User.findOne({ email }).exec();
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      return res.status(401).json({
        error: 'Autentificación',
        statusCode: 401,
        msg: 'Contraseña o correo electrónico incorrecto',
      });
    }

    const tokenTime = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
    const token = generateAccessToken(user.email, SECRET, tokenTime);

    const userData = {
      username: user.username,
      email: user.email,
      token: token,
    };


    setCookie(SECRET, userData, { req, res, maxAge: tokenTime });

    return res.status(200).json({
      statusCode: 200,
      msg: 'Inicio de sesión correcto',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      msg: 'Server error',
      error: error,
    });
  }
}
