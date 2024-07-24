import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class BannerDataInput {
  @Field({ nullable: true })
  position: number;
}
