import { Injectable } from "@nestjs/common";
import {
  LanguageCode,
  RequestContext,
  TransactionalConnection,
  TranslatorService,
} from "@vendure/core";
import { Banner } from "./entities/banner.entity";
import { BannerDataInput } from "./dtos/banner-data.input";
import { BannerTranslation } from "./entities/banner-translation.entity";
import { BannerTranslationInput } from "./dtos/banner-translation.input";

@Injectable()
export class BannerService {
  constructor(
    private connection: TransactionalConnection,
    private translatorService: TranslatorService
  ) {}

  async createBanner(bannerData: BannerDataInput): Promise<Banner> {
    const banner = new Banner();
    banner.position = bannerData.position;
    banner.translations = await this.createOrUpdateTranslations(
      banner,
      bannerData.translations
    );

    const banners = await this.connection.rawConnection
      .getRepository(Banner)
      .find();
    const positions = banners.map((banner) => banner.position);
    if (positions.includes(bannerData.position)) {
      throw new Error("Position already taken");
    }
    if (bannerData.position > 12) {
      throw new Error("Maximum number of banners reached");
    }
    // const banner = new Banner();
    // Object.assign(banner, bannerData);
    const savedBanner = await this.connection.rawConnection
      .getRepository(Banner)
      .save(banner);
    return savedBanner;
  }

  async updateBanner(
    bannerId: number,
    bannerData: BannerDataInput
  ): Promise<Banner> {
    const banner = await this.connection.rawConnection
      .getRepository(Banner)
      .findOne({ where: { id: bannerId } });
    if (!banner) {
      throw new Error("Banner not found");
    }
    banner.position = bannerData.position;
    banner.translations = await this.createOrUpdateTranslations(
      banner,
      bannerData.translations
    );
    return this.connection.rawConnection.getRepository(Banner).save(banner);
  }

  async getBanner(ctx: RequestContext, bannerId: number): Promise<Banner> {
    const banner = await this.connection.rawConnection
      .getRepository(Banner)
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
    return Promise.all(
      banners.map((banner) => this.translatorService.translate(banner, ctx))
    );
  }

  private async createOrUpdateTranslations(
    banner: Banner,
    translations: BannerTranslationInput[]
  ): Promise<BannerTranslation[]> {
    const existingTranslations = await this.connection.rawConnection
      .getRepository(BannerTranslation)
      .find({
        where: { base: banner },
      });

    const updatedTranslations = translations.map((translationData) => {
      let translation = existingTranslations.find(
        (t) => t.languageCode === translationData.languageCode
      );
      if (!translation) {
        translation = new BannerTranslation({
          name: translationData.name,
          imageUrl: translationData.imageUrl,
          url: translationData.url || "",
          base: banner,
          languageCode: translationData.languageCode,
        });
      }
      return translation;
    });
    return this.connection.rawConnection
      .getRepository(BannerTranslation)
      .save(updatedTranslations);
  }
}
