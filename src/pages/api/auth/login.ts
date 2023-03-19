export default async function handler(
	req: any,
	res: any
) {
	return res.status(200).json({
		statusCode: 200,
		msg: 'log in successful',
	});
}