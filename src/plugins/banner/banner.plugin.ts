import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';

import { BANNER_PLUGIN_OPTIONS } from './constants';
import { PluginInitOptions } from './types';
import { BannerService } from './banner.service';
import { Banner } from './entities/banner.entity';
import { BannerResolver } from './banner.resolver';
import { adminApiExtensions } from './extensions/admin-api-extensions';
import { createBanner, updateBanner } from './banner.permission';
import { shopApiExtensions } from './extensions/shop-api-extensions';

@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [Banner],
    providers: [{ provide: BANNER_PLUGIN_OPTIONS, useFactory: () => BannerPlugin.options },BannerService],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [BannerResolver],
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [BannerResolver],
    },
    configuration: config => {
        config.authOptions.customPermissions.push(createBanner);
        config.authOptions.customPermissions.push(updateBanner);
        return config;
    },
    compatibility: '^3.0.0',
})
export class BannerPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<BannerPlugin> {
        this.options = options;
        return BannerPlugin;
    }
}
