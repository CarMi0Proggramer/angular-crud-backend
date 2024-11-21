import {
    BadRequestException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
} from "@nestjs/common";
import { Request } from "express";
import { ProductsService } from "./products.service";
import { validatePartialProduct, validateProduct } from "src/schemas/product";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAll() {
        const products = await this.productsService.getAll();

        if (products.length == 0) {
            throw new NotFoundException({ message: "No products found" });
        }

        return products;
    }

    @Get(":id")
    async getById(@Param("id", ParseIntPipe) id: number) {
        const product = await this.productsService.getById(id);

        if (!product) {
            throw new NotFoundException({ message: "Product not found" });
        }

        return product;
    }

    @Post()
    async create(@Req() req: Request) {
        const result = validateProduct(req.body);
        if (!result.success) {
            throw new BadRequestException(result.data);
        }

        const product = await this.productsService.create(result.data);
        return product;
    }

    @Patch(":id")
    async update(@Param("id", ParseIntPipe) id: number, @Req() req: Request) {
        const result = validatePartialProduct(req.body);
        if (!result.success) {
            throw new BadRequestException(result.data);
        }

        const updateResult = await this.productsService.update(id, result.data);
        if (!updateResult.affected) {
            throw new NotFoundException({ message: "Product not found" });
        }

        const product = await this.productsService.getById(id);
        return product;
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number) {
        const result = await this.productsService.delete(id);

        if (!result.affected) {
            throw new NotFoundException({ message: "Product not found" });
        }

        return { message: "OK" };
    }
}
