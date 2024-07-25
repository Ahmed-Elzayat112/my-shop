import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { BannerService } from "../banner.service";
import { Banner } from "../entities/banner.entity";
import {
  Allow,
  Ctx,
  ListQueryOptions,
  PaginatedList,
  Permission,
  RequestContext,
} from "@vendure/core";
import { BannerListOptions } from "../dtos/banner-options.input";

@Resolver()
export class ShopBannerResolver {
  constructor(private bannerService: BannerService) {}

  @Query()
  @Allow(Permission.ReadCatalog)
  async banners(
    @Ctx() ctx: RequestContext,
    @Args("options", { type: () => BannerListOptions, nullable: true })
    options?: ListQueryOptions<Banner>
  ): Promise<PaginatedList<Banner>> {
    const banners = await this.bannerService.getBanners(ctx);
    return banners;
  }

  @Query()
  @Allow(Permission.Public)
  async banner(
    @Args() { bannerId }: { bannerId: number },
    @Ctx() ctx: RequestContext
  ): Promise<Banner> {
    return this.bannerService.getBanner(ctx, bannerId);
  }
}
