import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
	port: Number(process.env.PORT) || 3000,
	app: {
		nodeEnv: process.env.NODE_ENV,
		backendUrl: process.env.BACKEND_URL,
		frontendUrl: process.env.FRONTEND_URL,
	},
	database: {
		url: process.env.DATABASE_URL,
	},
	jwt: {
		accessSecret: process.env.JWT_ACCESS_SECRET,
		refreshSecret: process.env.JWT_REFRESH_SECRET,
		accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
		refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
	},
	bcrypt: {
		saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
	},
	google: {
		clientId: process.env.GOOGLE_CLIENT_ID,
	},
	redis: {
		username: process.env.REDDIS_USER,
		password: process.env.REDDIS_PASSWORD,
		host: process.env.REDDIS_HOST,
		port: Number(process.env.REDDIS_PORT) || undefined,
	},
	smtp: {
		user: process.env.SMTP_USER,
		sender: process.env.EMAIL_SENDER,
		password: process.env.SMTP_PASSWORD,
	},
	cloudinary: {
		cloudName: process.env.CLOUDINARY_CLOUD_NAME,
		apiKey: process.env.CLOUDINARY_API_KEY,
		apiSecret: process.env.CLOUDINARY_API_SECRET,
	},
	bkash: {
		baseUrl: process.env.BKASH_BASE_URL,
		username: process.env.BKASH_USER_NAME,
		password: process.env.BKASH_PASSWORD,
		appKey: process.env.BKASH_APP_KEY,
		appSecret: process.env.BKASH_APP_SECRET,
		callbackUrl: process.env.BKASH_CALLBACK_URL,
	},
	testerAdmin: {
		name: process.env.TESTER_ADMIN_NAME,
		email: process.env.TESTER_ADMIN_EMAIL,
		password: process.env.TESTER_ADMIN_PASSWORD,
	},
	testerDoctor: {
		name: process.env.TESTER__NAME,
		email: process.env.TESTER_DOCTOR_EMAIL,
		password: process.env.TESTER_DOCTOR_PASSWORD,
	},
};

export default config;