import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import {
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

    const banners = await this.connection.getRepository(ctx, Banner).find({
      where: { page: bannerData.page },
    });
    const existingBanner = banners.find(
      (b) => b.position == bannerData.position
    );

    if (existingBanner) {
      throw new HttpException("Position already taken", HttpStatus.AMBIGUOUS);
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
        // await this.assetService.updateEntityAssets(ctx, f, bannerData); error.entity-must-have-an-id
      },
    });

    // const bannerAsserts = await this.assetService.getEntityAssets(
    //   ctx,
    //   savedBanner
    // );
    // console.log("------------->", bannerAsserts);

    console.log(savedBanner);

    // look at vendur way to save asset
    return this.translatorService.translate(
      await this.getBanner(ctx, +savedBanner.id!),
      // savedBanner,
      ctx
    );
  }

  async updateBanner(
    ctx: RequestContext,
    bannerId: number,
    updateBannerData: UpdateBannerInput
  ): Promise<Banner> {
    // validation
    this.validateInput(ctx, updateBannerData);

    const banner = await this.connection
      .getRepository(ctx, Banner)
      .findOne({ where: { id: bannerId } });

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
    return this.translatorService.translate(
      await this.getBanner(ctx, +savedBanner.id!),
      ctx
    );
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
