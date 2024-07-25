import {
  Entity,
  Column,
  OneToMany,
  DeepPartial,
  ManyToMany,
  JoinTable,
} from "typeorm";
import {
  VendureEntity,
  Translatable,
  Translation,
  LocaleString,
  Asset,
  ChannelAware,
  Channel,
} from "@vendure/core";
import { BannerTranslation } from "./banner-translation.entity";
import { OrderableAsset } from "@vendure/core/dist/entity/asset/orderable-asset.entity";

// ChannelAware
@Entity()
export class Banner
  extends VendureEntity
  implements Translatable, ChannelAware
{
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  @Column()
  position: number;

  @Column()
  page: number;

  title?: LocaleString;
  url?: LocaleString;
  image: Asset;

  @OneToMany((type) => BannerTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations: Array<Translation<Banner>>;

  @ManyToMany((type) => Channel)
  @JoinTable()
  channels: Channel[];
}
