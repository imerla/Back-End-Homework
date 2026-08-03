import { Controller, Get, Post, Query, Body, BadRequestException, DefaultValuePipe, ParseEnumPipe } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddWishDto } from '../DTO/wishlist.dto';

enum Language {
  ge = 'ge',
  ru = 'ru',
  en = 'en',
  de = 'de',
  fr = 'fr',
  it = 'it',
}

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getWishlist(
    @Query('lang', new DefaultValuePipe('en'), new ParseEnumPipe(Language)) lang: Language,
  ) {
    return this.wishlistService.getWishlist(lang);
  }

  @Post()
  addWish(
    @Query('lang', new DefaultValuePipe('en'), new ParseEnumPipe(Language)) lang: Language,
    @Body() addWishDto: AddWishDto,
  ) {
    return this.wishlistService.addWish(lang, addWishDto.wish);
  }
}
