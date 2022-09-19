import { SessionDocument } from "./../models/session.model";
import { Response, Request } from "express";
import {
	createSession,
	findSessions,
	updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJWT } from "../utils/jwt.utils";
import config from "config";

export async function createSessionHandler(req: Request, res: Response) {
	//validate the user's password
	const user = await validatePassword(req.body);

	if (!user) {
		return res.status(401).send("Invalid email or password");
	}
	//create a session
	const session = await createSession(user._id, req.get("user-agent") || "");
	//create a access token
	const accessToken = signJWT(
		{ ...user, session: session._id },
		// "accessTokenPrivateKey",
		{ expiresIn: config.get("accessTokenTtl") } // 15 minutes,
	);

	const refreshToken = signJWT(
		{ ...user, session: session._id },
		// "refreshTokenPrivateKey",
		{ expiresIn: config.get("accessTokenTtl") }
	);
	//return accessa and refresh token
	return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
	const userId = res.locals.user._id;

	const session = await findSessions({ user: userId, valid: true });
	console.log("the session are", session);
	return res.send(session);
}

export async function deleteSessionHandler(req: Request, res: Response) {
	const sessionId = res.locals.user.session;

	await updateSession({ _id: sessionId }, { valid: false });

	return res.send({
		accessToken: null,
		refreshToken: null,
	});
}
