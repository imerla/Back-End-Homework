import { Injectable, BadRequestException } from '@nestjs/common';

interface Wishlist {
  ge: string[];
  ru: string[];
  en: string[];
  de: string[];
  fr: string[];
  it: string[];
}

@Injectable()
export class WishlistService {
  private wishlist: Wishlist = {
    ge: ['ლეპტოპი', 'ტელეფონი', 'ყურსასმენები'],
    ru: ['ноутбук', 'телефон', 'наушники'],
    en: ['laptop', 'phone', 'headphones'],
    de: ['Laptop', 'Telefon', 'Kopfhörer'],
    fr: ['ordinateur portable', 'téléphone', 'écouteurs'],
    it: ['laptop', 'telefono', 'cuffie'],
  };

  getWishlist(lang: string): string[] {
    if (!lang) {
      throw new BadRequestException('Language parameter is required');
    }

    const wishes = this.wishlist[lang as keyof Wishlist];
    if (!wishes) {
      throw new BadRequestException('Invalid language. Supported languages: ge, ru, en, de, fr, it');
    }

    return wishes;
  }

  addWish(lang: string, wish: string): string[] {
    if (!lang) {
      throw new BadRequestException('Language parameter is required');
    }

    if (!this.wishlist[lang as keyof Wishlist]) {
      throw new BadRequestException('Invalid language. Supported languages: ge, ru, en, de, fr, it');
    }

    this.wishlist[lang as keyof Wishlist].push(wish);
    return this.wishlist[lang as keyof Wishlist];
  }
}
