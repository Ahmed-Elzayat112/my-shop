import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BannerDataInput {
    @Field({ nullable: true })
    position: number;

    @Field({ nullable: true })
    imageUrlEn: string;

    @Field({ nullable: true })
    imageUrlAr: string;

    @Field({ nullable: true })
    urlEn?: string;

    @Field({ nullable: true })
    urlAr?: string;
}
