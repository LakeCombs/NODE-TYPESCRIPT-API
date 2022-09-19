import { object, number, string, TypeOf } from "zod";

const payload = {
	body: object({
		title: string({
			required_error: "Title is required",
		}),
		description: string({
			required_error: "Description is required",
		}).min(100, "Description should be at least 100 character long"),
		price: number({
			required_error: "Price is required",
		}),
		image: string({
			required_error: "Image is required",
		}),
	}),
};

const params = {
	params: object({
		productId: string({
			required_error: "productID id requried",
		}),
	}),
};

export const createProductSchena = object({
	...payload,
});

export const updateProductSchena = object({
	...params,
});
export const deleteProductSchena = object({
	...params,
});

export const getProductSchema = object({
	...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchena>;
export type UpdateProductInput = TypeOf<typeof updateProductSchena>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchena>;
