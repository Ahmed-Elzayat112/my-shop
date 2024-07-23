import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
import { Banner } from './banner.entity';
import { LanguageCode, Translation, VendureEntity } from '@vendure/core';


@Entity()
  export class BannerTranslation extends VendureEntity implements Translation<Banner> {
    @Column() name: string;
  
    @ManyToOne(type => Banner, base => base.translations, { onDelete: 'CASCADE' })
    base: Banner;
  
    @Column('varchar') 
    languageCode: LanguageCode;
  
    @Column()
    imageUrl: string;
  
    @Column({ nullable: true })
    url?: string;
  }