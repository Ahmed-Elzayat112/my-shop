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
import {
  createBanner,
  deleteBanner,
  readBanner,
  updateBanner,
} from "../banner.permission";
import { UpdateBannerInput } from "../dtos/update-banner.input";

@Resolver()
export class AdminBannerResolver {
  constructor(private bannerService: BannerService) {}

  @Query()
  @Allow(readBanner.Permission)
  async banners(
    @Ctx() ctx: RequestContext,
    @Args() args: any
  ): Promise<PaginatedList<Banner>> {
    const banners = await this.bannerService.getBanners(
      ctx,
      args.options || undefined
    );
    return banners;
  }

  @Query()
  @Allow(readBanner.Permission)
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

  @Mutation()
  @Allow(deleteBanner.Permission)
  async deleteBanner(
    @Args() { bannerId }: { bannerId: number },
    @Ctx() ctx: RequestContext
  ): Promise<Banner> {
    const deletedBanner = await this.bannerService.deleteBanner(ctx, bannerId);
    return deletedBanner;
  }
}
