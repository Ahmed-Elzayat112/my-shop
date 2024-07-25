import { InputType, Field } from "@nestjs/graphql";
import { BannerTranslationInput } from "./banner-translation.input";

@InputType()
export class BannerDataInput {
  @Field()
  position: number;

  @Field()
  page: number;

  @Field({ nullable: true })
  url?: string;

  @Field(() => [BannerTranslationInput])
  translations: BannerTranslationInput[];
}
