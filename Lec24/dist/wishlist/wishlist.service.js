"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
let WishlistService = class WishlistService {
    wishlist = {
        ge: ['ლეპტოპი', 'ტელეფონი', 'ყურსასმენები'],
        ru: ['ноутбук', 'телефон', 'наушники'],
        en: ['laptop', 'phone', 'headphones'],
        de: ['Laptop', 'Telefon', 'Kopfhörer'],
        fr: ['ordinateur portable', 'téléphone', 'écouteurs'],
        it: ['laptop', 'telefono', 'cuffie'],
    };
    getWishlist(lang) {
        if (!lang) {
            throw new common_1.BadRequestException('Language parameter is required');
        }
        const wishes = this.wishlist[lang];
        if (!wishes) {
            throw new common_1.BadRequestException('Invalid language. Supported languages: ge, ru, en, de, fr, it');
        }
        return wishes;
    }
    addWish(lang, wish) {
        if (!lang) {
            throw new common_1.BadRequestException('Language parameter is required');
        }
        if (!this.wishlist[lang]) {
            throw new common_1.BadRequestException('Invalid language. Supported languages: ge, ru, en, de, fr, it');
        }
        this.wishlist[lang].push(wish);
        return this.wishlist[lang];
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)()
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map