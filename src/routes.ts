import {
	createProductSchena,
	getProductSchema,
	updateProductSchena,
	ReadProductInput,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { Express, Request, Response } from "express";
import {
	createSessionHandler,
	deleteSessionHandler,
	getUserSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResources";
import { createUserSchema } from "./schema/user.schema";
import requireUser from "./middleware/requireUser";
import {
	createProductHandler,
	getProductHandler,
	updateProductHandler,
} from "./controller/product.controller";

function routes(app: Express) {
	app.get("/healthcheck", (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	app.post("/api/users", validateResource(createUserSchema), createUserHandler);
	app.post(
		"/api/sessions",
		validateResource(createSessionSchema),
		createSessionHandler
	);

	app.get("/api/sessions", requireUser, getUserSessionHandler);
	app.delete("/api/sessions", requireUser, deleteSessionHandler);

	app.post(
		"/api/products",
		[requireUser, validateResource(createProductSchena)],
		createProductHandler
	);

	app.put(
		"/api/products/:productId",
		[requireUser, validateResource(updateProductSchena)],
		updateProductHandler
	);

	app.delete(
		"/api/products/:productId",
		[requireUser, validateResource(getProductSchema)],
		getProductHandler
	);

	app.get(
		"/api/products/:productId",
		validateResource(getProductSchema),
		getProductHandler
	);
}

export default routes;
