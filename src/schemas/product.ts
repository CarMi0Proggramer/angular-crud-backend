import z from "zod";

const productSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    price: z.number().positive({ message: "Price must be positive" }),
    description: z.string().min(1, { message: "Description is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    category: z.string().min(1, { message: "Category is required" }),
});

export function validateProduct(data: any) {
    const result = productSchema.safeParse(data);
    if (!result.success) {
        return { success: false, data: JSON.parse(result.error.message) };
    }

    return { success: true, data: result.data };
}

export function validatePartialProduct(data: any) {
    const result = productSchema.partial().safeParse(data);
    if (!result.success) {
        return { success: false, data: JSON.parse(result.error.message) };
    }

    return { success: true, data: result.data };
}
