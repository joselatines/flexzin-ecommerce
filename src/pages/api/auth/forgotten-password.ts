import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '@/database/models/User';
import { IApiRes } from '@/interfaces/api';
import { serialize } from 'cookie';

const sendEmail = async (
	userEmail: string,
	username: string,
	token: string | null
) => {
	const appEmail = process.env.EMAIL;
	const appPassword = process.env.EMAIL_PASSWORD;
	const APP_URI = process.env.NEXT_PUBLIC_APP_URI;

	try {
		if (!token) throw new Error('Token does not exists');

		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: appEmail,
				pass: appPassword,
			},
		});

		const message = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Document</title>
		</head>
		<body>
			<p style="font-size: 16px; color: #333; background-color: #f5f5f5; padding: 10px;">
				Por favor, cambia tu contraseña haciendo clic en el siguiente enlace:
				<a href="${APP_URI}/auth/change-password/${token}" style="color: #007bff; text-decoration: none;">Cambiar contraseña</a>.
				Este enlace sólo estará disponible durante 24 horas.
			</p>
		</body>
		</html>
	`;

		const config = {
			from: appEmail,
			to: userEmail,
			subject: `Recover your password from ${username}`,
			html: message,
		};

		const info = await transporter.sendMail(config);

		return info;
	} catch (error) {
		console.error(error);
		return error;
	}
};

const createTemporalToken = (userEmail: string, tokenName: string) => {
	// Create JWT token
	const token = sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // expire in 24 hours
			email: userEmail,
		},
		'secret'
	);

	// Set cookie with token
	const serialized = serialize(tokenName, token.toString(), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 60 * 60 * 24, // expire in 24 hours
		path: '/',
	});

	console.log({ token });
	return token;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({
			statusCode: 405,
			msg: 'Method not allowed',
		});
	}

	const { email } = req.body;

	try {
		const user = await User.findOne({ email }).exec();

		if (!user) {
			return res.status(404).json({
				statusCode: 404,
				error: 'Invalid credentials',
				msg: 'User not found',
			});
		}

		const tokenName = process.env.JWT_CHANGE_PASSWORD_NAME;

		if (!tokenName) {
			return res.status(404).json({
				statusCode: 404,
				msg: 'Token name not found',
			});
		}

		const temporalToken = createTemporalToken(email, tokenName);
		const emailSent = await sendEmail(email, user.username, temporalToken);
		console.log('emailSent: ', emailSent);

		if (emailSent) {
			return res.status(200).json({
				statusCode: 200,
				msg: `Reset password instructions sent to ${email}`,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: 'Server error',
			statusCode: 500,
			msg: error.message,
		});
	}
}
