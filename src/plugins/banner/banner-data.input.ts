import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BannerDataInput {
    @Field()
    position: number;

    @Field()
    imageUrlEn: string;

    @Field()
    imageUrlAr: string;

    @Field({ nullable: true })
    urlEn?: string;

    @Field({ nullable: true })
    urlAr?: string;
}
