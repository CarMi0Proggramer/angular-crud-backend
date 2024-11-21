import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/data-source";
import { Product } from "src/entities/product";

type UpdateProductParams = {
    name?: string;
    price?: number;
    description?: string;
    brand?: string;
    category?: string;
};

@Injectable()
export class ProductsService {
    async create(data: Product) {
        const product = await AppDataSource.getRepository(Product).save(data);
        return product;
    }

    async getAll() {
        const products = await AppDataSource.getRepository(Product).find();
        return products;
    }

    async getById(id: number) {
        const product = await AppDataSource.getRepository(Product).findOneBy({
            id,
        });
        return product;
    }

    async update(id: number, data: UpdateProductParams) {
        const product = await AppDataSource.getRepository(Product).update(
            id,
            data
        );
        return product;
    }

    async delete(id: number) {
        const result = await AppDataSource.getRepository(Product).delete({
            id,
        });
        return result;
    }
}
