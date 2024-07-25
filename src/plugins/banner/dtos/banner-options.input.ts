import { InputType, Field, Int } from "@nestjs/graphql";
import { FilterParameter, SortOrder, NumberOperators } from "@vendure/core";
import { Banner } from "../entities/banner.entity";

export enum LogicalOperator {
  AND = "AND",
  OR = "OR",
}

@InputType()
class BannerPositionFilterParameter implements NumberOperators {
  @Field((type) => Int, { nullable: true })
  eq?: number;
  @Field((type) => Int, { nullable: true })
  notEq?: number;
  @Field((type) => Int, { nullable: true })
  lt?: number;
  @Field((type) => Int, { nullable: true })
  lte?: number;
  @Field((type) => Int, { nullable: true })
  gt?: number;
  @Field((type) => Int, { nullable: true })
  gte?: number;
  @Field((type) => [Int], { nullable: true })
  in?: number[];
  @Field((type) => [Int], { nullable: true })
  notIn?: number[];
}

@InputType()
class BannerFilterParameter {
  @Field((type) => BannerPositionFilterParameter, { nullable: true })
  position?: BannerPositionFilterParameter;

  @Field((type) => BannerPositionFilterParameter, { nullable: true })
  page?: BannerPositionFilterParameter;
}

@InputType()
class BannerSortParameter {
  @Field({ nullable: true })
  position?: SortOrder;

  @Field({ nullable: true })
  page?: SortOrder;
}

@InputType()
export class BannerListOptions {
  @Field((type) => Int, { nullable: true })
  skip?: number;

  @Field((type) => Int, { nullable: true })
  take?: number;

  @Field({ nullable: true })
  sort?: BannerSortParameter;

  @Field({ nullable: true })
  filter?: FilterParameter<Banner>;

  @Field({ nullable: true })
  filterOperator?: LogicalOperator;
}
