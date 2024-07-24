import { Entity, Column, ManyToOne, DeepPartial } from "typeorm";
import { Banner } from "./banner.entity";
import { LanguageCode, Translation, VendureEntity } from "@vendure/core";

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

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  url?: string;
}
