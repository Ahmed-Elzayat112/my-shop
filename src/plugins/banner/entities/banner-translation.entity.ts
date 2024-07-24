import {
  Entity,
  Column,
  ManyToOne,
  DeepPartial,
  Index,
  JoinColumn,
} from "typeorm";
import { Banner } from "./banner.entity";
import {
  Asset,
  ID,
  LanguageCode,
  Translation,
  VendureEntity,
} from "@vendure/core";

@Entity()
export class BannerTranslation
  extends VendureEntity
  implements Translation<Banner>
{
  constructor(input?: DeepPartial<BannerTranslation>) {
    super(input);
  }

  @Column() name: string;

  @ManyToOne((type) => Banner, (base) => base.translations, {
    onDelete: "CASCADE",
  })
  base: Banner;

  @Column("varchar")
  languageCode: LanguageCode;

  @Column({ nullable: true })
  assetId: ID;

  @Index()
  @ManyToOne((type) => Asset, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "assetId" })
  asset: Asset;

  @Column({ nullable: true })
  url?: string;
}
