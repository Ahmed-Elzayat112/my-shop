import { Injectable } from "@nestjs/common";
import {
  LanguageCode,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  TranslatorService,
} from "@vendure/core";
import { Banner } from "./entities/banner.entity";
import { BannerDataInput } from "./dtos/banner-data.input";
import { BannerTranslation } from "./entities/banner-translation.entity";
import { UpdateBannerInput } from "./dtos/update-banner.input";

@Injectable()
export class BannerService {
  constructor(
    private connection: TransactionalConnection,
    private translatorService: TranslatorService,
    private translatableSaver: TranslatableSaver
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
      where: { position: bannerData.position },
    });
    if (banners.length > 0) {
      throw new Error("Position already taken");
    }
  }

  async createBanner(
    ctx: RequestContext,
    bannerData: BannerDataInput
  ): Promise<Banner> {
    // validation
    this.validateInput(ctx, bannerData);

    const banner = new Banner();
    banner.position = bannerData.position;

    const savedBanner = await this.translatableSaver.create({
      ctx,
      input: bannerData,
      entityType: Banner,
      translationType: BannerTranslation,
      beforeSave: async (f) => {},
    });
    return savedBanner;
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
    return savedBanner;
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

  async getBanners(ctx: RequestContext): Promise<Banner[]> {
    const banners = await this.connection.rawConnection
      .getRepository(Banner)
      .find();

    if (!banners) {
      throw new Error("No banners found");
    }

    console.log(banners[0].imageUrl);
    return Promise.all(
      banners.map((banner) => this.translatorService.translate(banner, ctx))
    );
  }
}
