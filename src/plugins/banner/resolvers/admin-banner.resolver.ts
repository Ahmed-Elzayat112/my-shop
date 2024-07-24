import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { BannerService } from "../banner.service";
import { Banner } from "../entities/banner.entity";
import { BannerDataInput } from "../dtos/banner-data.input";
import { Allow, Ctx, Permission, RequestContext } from "@vendure/core";
import { createBanner, updateBanner } from "../banner.permission";
import { UpdateBannerInput } from "../dtos/update-banner.input";

@Resolver()
export class AdminBannerResolver {
  constructor(private bannerService: BannerService) {}

  @Query()
  @Allow(Permission.ReadCatalog)
  async banners(@Ctx() ctx: RequestContext): Promise<Banner[]> {
    console.log("-------------->", ctx.languageCode);
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
    @Args("bannerId") bannerId: number,
    @Args("bannerData") bannerData: UpdateBannerInput,
    @Ctx() ctx: RequestContext
  ): Promise<Banner> {
    return this.bannerService.updateBanner(ctx, bannerId, bannerData);
  }
}
