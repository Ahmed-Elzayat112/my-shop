import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { BannerService } from "../banner.service";
import { Banner } from "../entities/banner.entity";
import { BannerDataInput } from "../dtos/banner-data.input";
import {
  Allow,
  Ctx,
  ListQueryOptions,
  PaginatedList,
  Permission,
  RequestContext,
} from "@vendure/core";
import { createBanner, updateBanner } from "../banner.permission";
import { UpdateBannerInput } from "../dtos/update-banner.input";
import { BannerListOptions } from "../dtos/banner-options.input";

@Resolver()
export class AdminBannerResolver {
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
  @Allow(Permission.ReadCatalog)
  async banner(
    @Args() { bannerId }: { bannerId: number },
    @Ctx() ctx: RequestContext
  ): Promise<Banner> {
    return this.bannerService.getBanner(ctx, bannerId);
  }

  @Mutation()
  @Allow(createBanner.Permission)
  async createBanner(
    @Args("bannerData") bannerData: BannerDataInput,
    @Ctx() ctx: RequestContext
  ): Promise<Banner> {
    return this.bannerService.createBanner(ctx, bannerData);
  }

  @Mutation()
  @Allow(updateBanner.Permission)
  async updateBanner(
    @Args("updateBannerData") updateBannerData: UpdateBannerInput,
    @Ctx() ctx: RequestContext
  ): Promise<Banner> {
    return this.bannerService.updateBanner(ctx, updateBannerData);
  }
}
