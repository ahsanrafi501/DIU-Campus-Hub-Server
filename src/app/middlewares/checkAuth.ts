import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import type { UserRole } from "../../generated/prisma/enums";
import { catchAsync } from "../../shared/utils/catch-async";
import { jwtUtils } from "../../shared/utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";

export interface RequestUser {
	email: string;
	name: string;
	userId: string;
	role: UserRole;
}

declare global {
	namespace Express {
		interface Request {
			user?: RequestUser;
		}
	}
}

// auth(UserRole.ADMIN, UserRole.USER, UserRole.Author)
// auth() => ...requiredRoles => [UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]
export const auth = (...requiredRoles: UserRole[]) => {
	return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
		const token = req.cookies.accessToken
			? req.cookies.accessToken
			: req.headers.authorization?.startsWith("Bearer ")
				? req.headers.authorization?.split(" ")[1]
				: req.headers.authorization;

		if (!token) {
			throw new Error(
				"You are not logged in. Please log in to access this resource.",
			);
		}

		const verifiedToken = jwtUtils.verifyToken(
			token,
			config.jwt.accessSecret as string,
		);

		if (!verifiedToken.success) {
			throw new Error(verifiedToken.error);
		}

		const { email, name, userId, role } = verifiedToken.data as JwtPayload;

		if (requiredRoles.length && !requiredRoles.includes(role)) {
			throw new Error(
				"Forbidden. You don't have permission to access this resource.",
			);
		}

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
				email,
				name,
				role,
			},
		});

		if (!user) {
			throw new Error("User not found. Please log in again.");
		}

		if (user.isActive === false) {
			throw new Error("Your account has been blocked. Please contact support.");
		}

		req.user = {
			email,
			name,
			userId,
			role,
		};

		next();
	});
};
