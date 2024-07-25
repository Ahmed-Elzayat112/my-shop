import { InputType, Field } from "@nestjs/graphql";
import { BannerTranslationInput } from "./banner-translation.input";

@InputType()
export class BannerDataInput {
  @Field({ nullable: true })
  position: number;

  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  assetId: number;

  @Field({ nullable: true })
  featuredAssetId?: number;

  @Field(() => [BannerTranslationInput])
  translations: BannerTranslationInput[];
}
