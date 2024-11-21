import { ColumnNumericTransformer } from "src/column-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    brand: string;

    @Column()
    description: string;

    @Column({ transformer: new ColumnNumericTransformer() })
    price: number;
}
