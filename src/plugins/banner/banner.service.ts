import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import {
  assertFound,
  AssetService,
  ChannelService,
  EntityWithAssets,
  ListQueryBuilder,
  ListQueryOptions,
  PaginatedList,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  TranslatorService,
} from "@vendure/core";
import { Banner } from "./entities/banner.entity";
import { BannerDataInput } from "./dtos/banner-data.input";
import { BannerTranslation } from "./entities/banner-translation.entity";
import { UpdateBannerInput } from "./dtos/update-banner.input";
import { BannerListOptions } from "./dtos/banner-options.input";

@Injectable()
export class BannerService {
  constructor(
    private connection: TransactionalConnection,
    private translatorService: TranslatorService,
    private translatableSaver: TranslatableSaver,
    private channelService: ChannelService,
    private listQueryBuilder: ListQueryBuilder
  ) {}

  private async validateInput(
    ctx: RequestContext,
    bannerData: BannerDataInput
  ) {
    // input validation
    if (bannerData.position > 12) {
      throw new Error("Maximum number of banners reached");
    }

    const existingBanner = await this.connection
      .getRepository(ctx, Banner)
      .findOne({
        where: { page: bannerData.page, position: bannerData.position },
      });

    if (existingBanner) {
      throw new Error("Position already taken");
    }
  }

  async createBanner(
    ctx: RequestContext,
    bannerData: BannerDataInput
  ): Promise<Banner> {
    // validation
    await this.validateInput(ctx, bannerData);

    const banner = new Banner();
    banner.position = bannerData.position;

    console.log("----------> banner", banner);

    const savedBanner = await this.translatableSaver.create({
      ctx,
      input: bannerData,
      entityType: Banner,
      translationType: BannerTranslation,
      beforeSave: async (f) => {
        await this.channelService.assignToCurrentChannel(f, ctx);
      },
    });
    const bannerWithAsset = await assertFound(
      this.getBanner(ctx, +savedBanner.id)
    );
    return this.translatorService.translate(bannerWithAsset, ctx, [
      "translations.image",
    ]);
  }

  async updateBanner(
    ctx: RequestContext,
    updateBannerData: UpdateBannerInput
  ): Promise<Banner> {
    // validation
    await this.validateInput(ctx, updateBannerData);

    const banner = await this.connection
      .getRepository(ctx, Banner)
      .findOne({ where: { id: updateBannerData.id } });

    if (!banner) {
      throw new Error("Banner not found");
    }

    banner.position = updateBannerData.position;

    const savedBanner = await this.translatableSaver.update({
      ctx,
      input: updateBannerData,
      entityType: Banner,
      translationType: BannerTranslation,
      beforeSave: async (f) => {},
    });

    const bannerWithAsset = await assertFound(
      this.getBanner(ctx, +savedBanner.id)
    );
    return this.translatorService.translate(bannerWithAsset, ctx);
  }

  async getBanner(ctx: RequestContext, bannerId: number): Promise<Banner> {
    const banner = await this.connection
      .getRepository(ctx, Banner)
      .findOne({ where: { id: bannerId } });

    if (!banner) {
      throw new Error("Banner not found");
    }

    return this.translatorService.translate(banner, ctx);
  }

  async getBanners(
    ctx: RequestContext,
    options?: ListQueryOptions<Banner>
  ): Promise<PaginatedList<Banner>> {
    return await this.listQueryBuilder
      .build(Banner, options, { ctx })
      .getManyAndCount()
      .then(async ([banners, totalItems]) => {
        const items = banners.map((banner) =>
          this.translatorService.translate(banner, ctx)
        );
        return {
          items,
          totalItems,
        };
      });
  }
}
