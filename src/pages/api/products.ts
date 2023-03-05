// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IApiRes } from '@/interfaces/api';
import type { NextApiRequest, NextApiResponse } from 'next';

const d = [{}];

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	res.status(200).json({ statusCode: 200, data: 'John Doe' });
}
