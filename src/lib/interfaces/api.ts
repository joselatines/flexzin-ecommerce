interface IApiRes {
	data?: [] | {} | null;
	statusCode: number;
	msg: string;
	error?: any;
}

export type { IApiRes };
