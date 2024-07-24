import { InputType, Field } from "@nestjs/graphql";
import { LanguageCode } from "@vendure/core";

@InputType()
export class BannerTranslationInput {
  @Field(() => LanguageCode)
  languageCode: LanguageCode;

  @Field()
  assetId: number;

  @Field({ nullable: true })
  url?: string;

  @Field()
  name: string;
}
