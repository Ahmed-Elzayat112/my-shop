import {
  Entity,
  Column,
  OneToMany,
  DeepPartial,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import {
  VendureEntity,
  Translatable,
  Translation,
  LocaleString,
  Asset,
  ChannelAware,
  Channel,
  EntityWithAssets,
} from "@vendure/core";
import { BannerTranslation } from "./banner-translation.entity";
import { OrderableAsset } from "@vendure/core/dist/entity/asset/orderable-asset.entity";

// ChannelAware, EntityWithAssets
@Entity()
export class Banner
  extends VendureEntity
  implements Translatable, ChannelAware, EntityWithAssets
{
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  name: LocaleString;
  url?: LocaleString;

  // @ManyToMany((type) => Asset)
  // @JoinTable()
  assets: OrderableAsset[];

  @ManyToOne((type) => Asset, { nullable: true })
  @JoinColumn()
  featuredAsset: Asset;

  @Column()
  position: number;

  @Column()
  page: number;

  @OneToMany((type) => BannerTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations: Array<Translation<Banner>>;

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
