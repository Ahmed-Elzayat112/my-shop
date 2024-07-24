import { InputType, Field } from "@nestjs/graphql";
import { LanguageCode } from "@vendure/core";

@InputType()
export class BannerTranslationInput {
  @Field(() => LanguageCode)
  languageCode: LanguageCode;

  @Field()
  imageUrl: string;

  @Field({ nullable: true })
  url?: string;

  @Field()
  name: string;
}
