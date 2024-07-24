import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { BannerService } from "./banner.service";
import { Banner } from "./entities/banner.entity";
import { BannerDataInput } from "./dtos/banner-data.input";
import { Allow, Ctx, Permission, RequestContext } from "@vendure/core";
import { createBanner, updateBanner } from "./banner.permission";

@Resolver()
export class BannerResolver {
  constructor(private bannerService: BannerService) {}

  @Query()
  @Allow(Permission.ReadCatalog)
  async banners(@Ctx() ctx: RequestContext): Promise<Banner[]> {
    console.log("-------------->", ctx.languageCode);

    // TODO: Handle language-specific image URLs based on the provided `languageCode` using translate service or default to English.
    // const language = ctx.languageCode || 'en';
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
    @Args("bannerData") bannerData: BannerDataInput
  ): Promise<Banner> {
    return this.bannerService.createBanner(bannerData);
  }

  @Mutation()
  @Allow(updateBanner.Permission)
  async updateBanner(
    @Args("bannerId") bannerId: number,
    @Args("bannerData") bannerData: BannerDataInput
  ): Promise<Banner> {
    return this.bannerService.updateBanner(bannerId, bannerData);
  }
}
