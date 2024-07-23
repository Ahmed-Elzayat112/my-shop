import {
    Entity,
    Column,
    OneToMany,
    DeepPartial,
  } from 'typeorm';
  import { VendureEntity, Translatable, Translation, LocaleString, Facet } from '@vendure/core';
  import { BannerTranslation } from './banner-translation.entity';
  
  @Entity()
  export class Banner extends VendureEntity implements Translatable {
    constructor(input?: DeepPartial<Banner>){
      super()
    }

    name: LocaleString;

    @Column()
    position: number;
  
    @OneToMany(type => BannerTranslation, translation => translation.base, { eager: true })
    translations: Array<Translation<Facet>>;
  }
  
  
  