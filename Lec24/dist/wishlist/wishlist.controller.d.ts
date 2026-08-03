import { WishlistService } from './wishlist.service';
import { AddWishDto } from '../DTO/wishlist.dto';
declare enum Language {
    ge = "ge",
    ru = "ru",
    en = "en",
    de = "de",
    fr = "fr",
    it = "it"
}
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(lang: Language): string[];
    addWish(lang: Language, addWishDto: AddWishDto): string[];
}
export {};
