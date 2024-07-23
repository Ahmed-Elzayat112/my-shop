import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BannerService } from './banner.service';
import { Banner } from './entities/banner.entity';
import { BannerDataInput } from './banner-data.input';
import { Allow, Ctx, Permission, RequestContext } from '@vendure/core';
import { createBanner, updateBanner } from './banner.permission';

@Resolver()
export class BannerResolver {
    constructor(private bannerService: BannerService) {}

    @Query()
    @Allow(Permission.ReadCatalog)
    async banners(@Ctx() context:RequestContext): Promise<Banner[]> {
        console.log('-------------->',context.languageCode);
        
        const language = context.languageCode || 'en';
        const banners = await this.bannerService.getBanners();
        return banners.map(banner => ({
            ...banner,
            imageUrl: language === 'ar' ? banner.imageUrlAr : banner.imageUrlEn,
            url: language === 'ar' ? banner.urlAr : banner.urlEn,
        }));
    }

    @Mutation()
    @Allow(createBanner.Permission)
    async createBanner(@Args('bannerData') bannerData: BannerDataInput): Promise<Banner> {
        return this.bannerService.createBanner(bannerData);
    }

    @Mutation()
    @Allow(updateBanner.Permission)
    async updateBanner(
        @Args('bannerId') bannerId: number,
        @Args('bannerData') bannerData: BannerDataInput
    ): Promise<Banner> {
        return this.bannerService.updateBanner(bannerId, bannerData);
    }
}
