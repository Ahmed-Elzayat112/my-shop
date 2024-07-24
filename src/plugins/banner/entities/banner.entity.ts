import { Entity, Column, OneToMany, DeepPartial, ManyToOne } from "typeorm";
import {
  VendureEntity,
  Translatable,
  Translation,
  LocaleString,
  Asset,
} from "@vendure/core";
import { BannerTranslation } from "./banner-translation.entity";

@Entity()
export class Banner extends VendureEntity implements Translatable {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  name: LocaleString;
  url?: LocaleString;
  asset?: Asset;

  // @ManyToOne((type) => Asset, {
  //   nullable: true,
  // })

  @Column()
  position: number;

  @Column()
  page: number;

  @OneToMany((type) => BannerTranslation, (translation) => translation.base, {
    eager: true,
  })
  translations: Array<Translation<Banner>>;
}
