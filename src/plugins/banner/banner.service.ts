import { Injectable } from '@nestjs/common';
import { TransactionalConnection } from '@vendure/core';
import { Banner } from './entities/banner.entity';
import { BannerDataInput } from './banner-data.input';

@Injectable()
export class BannerService {
    constructor(private connection: TransactionalConnection) {}

    async createBanner(bannerData: BannerDataInput): Promise<Banner> {
        const banners = await this.connection.rawConnection.getRepository(Banner).find();
        const positions = banners.map(banner => banner.position);
        if (positions.includes(bannerData.position)) {
            throw new Error('Position already taken');
        }
        if(bannerData.position>12){
            throw new Error('Maximum number of banners reached');
        }
        const banner = new Banner();
        Object.assign(banner, bannerData);
        const savedBanner = await this.connection.rawConnection.getRepository(Banner).save(banner);
        return savedBanner;
    }

    async updateBanner(bannerId: number, bannerData: BannerDataInput): Promise<Banner> {
        const banner = await this.connection.rawConnection.getRepository(Banner).findOne({where:{id: bannerId}});
        if (!banner) {
            throw new Error('Banner not found');
        }
        Object.assign(banner, bannerData);
        return this.connection.rawConnection.getRepository(Banner).save(banner);
    }

    async getBanners(): Promise<Banner[]> {
        return this.connection.rawConnection.getRepository(Banner).find();
    }
}
