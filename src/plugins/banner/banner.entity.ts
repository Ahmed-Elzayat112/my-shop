import {Entity,Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Banner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    position: number;

    @Column()
    imageUrlEn: string;

    @Column()
    imageUrlAr: string;

    @Column()
    urlEn: string;

    @Column()
    urlAr: string;
}
