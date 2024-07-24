import { InputType, Field } from "@nestjs/graphql";
import { BannerTranslationInput } from "./banner-translation.input";

@InputType()
export class BannerDataInput {
  @Field({ nullable: true })
  position: number;

  @Field(() => [BannerTranslationInput])
  translations: BannerTranslationInput[];
}
