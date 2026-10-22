import { NextFunction, Request, Response } from "express";
import z from "zod";
import { catchAsync } from "../../shared/utils/catch-async";


export const validateRequest = (zodSchema: z.ZodObject) => {
    return catchAsync(
        (req: Request, _res: Response, next: NextFunction) => {


            // const payload = req.body ? req.body : {}
            const payload = req.body ?? {}

            const result = zodSchema.safeParse(payload);

            if (!result.success) {
                console.log(result.error);
                console.log(result.error.issues);

                throw new Error(result.error.issues[0].message)
            }

            req.body = result.data

            next()

        }
    )
}

export const validateQuery = (zodSchema: z.ZodObject) => {
    return catchAsync(
        (req: Request, _res: Response, next: NextFunction) => {
            const result = zodSchema.safeParse(req.query);

            if (!result.success) {
                throw new Error(result.error.issues[0].message);
            }

            for (const key of Object.keys(req.query)) {
                delete req.query[key];
            }
            Object.assign(req.query, result.data);
            next();
        },
    );
};

export const validateParams = (zodSchema: z.ZodObject) => {
    return catchAsync(
        (req: Request, _res: Response, next: NextFunction) => {
            const result = zodSchema.safeParse(req.params);

            if (!result.success) {
                throw new Error(result.error.issues[0].message);
            }

            req.params = result.data;
            next();
        },
    );
};
