// Load your product data
const products = [
    {"brand": "Samsung", "model": "Galaxy F05", "price": 7999, "back_cover": "Silicone Soft Case", "back_cover_price": 299, "front_glass": "Tempered Glass 9H", "front_glass_price": 199},
    {"brand": "Samsung", "model": "Galaxy M05", "price": 7999, "back_cover": "Silicone Soft Case", "back_cover_price": 299, "front_glass": "Tempered Glass 9H", "front_glass_price": 199},
    {"brand": "Samsung", "model": "Galaxy F15 5G", "price": 10999, "back_cover": "Spazy Rubber Case", "back_cover_price": 349, "front_glass": "OpenTech Tempered Glass", "front_glass_price": 249},
    {"brand": "Samsung", "model": "Galaxy M15 5G", "price": 12999, "back_cover": "TheGiftKart Liquid Silicon", "back_cover_price": 399, "front_glass": "POPIO Tempered Glass", "front_glass_price": 249},
    {"brand": "Samsung", "model": "Galaxy M35 5G", "price": 13999, "back_cover": "Kapaver Hybrid Clear", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Samsung", "model": "Galaxy A15 5G", "price": 17999, "back_cover": "Casekaro Printed Case", "back_cover_price": 399, "front_glass": "OpenTech Tempered Glass", "front_glass_price": 249},
    {"brand": "Samsung", "model": "Galaxy M36 5G", "price": 17499, "back_cover": "Silicone Soft Case", "back_cover_price": 349, "front_glass": "Tempered Glass 9H", "front_glass_price": 249},
    {"brand": "Samsung", "model": "Galaxy A25 5G", "price": 18999, "back_cover": "myCaseCovers Shockproof", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Samsung", "model": "Galaxy A35 5G", "price": 19999, "back_cover": "Golden Sand Clear Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Samsung", "model": "Galaxy M55 5G", "price": 24999, "back_cover": "Kapaver Rugged Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Samsung", "model": "Galaxy A55 5G", "price": 27999, "back_cover": "myCaseCovers Wallet Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Samsung", "model": "Galaxy S23 FE", "price": 32999, "back_cover": "Casekaro Stylish Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Samsung", "model": "Galaxy S24 FE", "price": 36290, "back_cover": "Kapaver Clear Hybrid", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Samsung", "model": "Galaxy A56 5G", "price": 38999, "back_cover": "Flipkart Front & Back Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "Samsung", "model": "Galaxy S24", "price": 64999, "back_cover": "Casekaro Premium Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "Samsung", "model": "Galaxy S24+", "price": 84999, "back_cover": "Golden Sand Translucent", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "Samsung", "model": "Galaxy S24 Ultra", "price": 104999, "back_cover": "Kapaver Shockproof Case", "back_cover_price": 899, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "Samsung", "model": "Galaxy Z Flip6", "price": 109999, "back_cover": "Kapaver Clear Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "Samsung", "model": "Galaxy S25 Ultra", "price": 117999, "back_cover": "Golden Sand Premium Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "Samsung", "model": "Galaxy Z Fold6", "price": 164999, "back_cover": "Kapaver Foldable Case", "back_cover_price": 1499, "front_glass": "Tempered Glass 9H", "front_glass_price": 799},
    {"brand": "Vivo", "model": "Vivo Y03", "price": 8999, "back_cover": "Silicone Soft Case", "back_cover_price": 299, "front_glass": "Tempered Glass 9H", "front_glass_price": 199},
    {"brand": "Vivo", "model": "Vivo Y18e", "price": 10999, "back_cover": "Silicone Soft Case", "back_cover_price": 299, "front_glass": "Tempered Glass 9H", "front_glass_price": 199},
    {"brand": "Vivo", "model": "Vivo Y18", "price": 12999, "back_cover": "Silicone Soft Case", "back_cover_price": 349, "front_glass": "Tempered Glass 9H", "front_glass_price": 249},
    {"brand": "Vivo", "model": "Vivo Y28s 5G", "price": 13999, "back_cover": "Silicone Soft Case", "back_cover_price": 349, "front_glass": "Tempered Glass 9H", "front_glass_price": 249},
    {"brand": "Vivo", "model": "Vivo T4X", "price": 14999, "back_cover": "Zapvi Printed Case", "back_cover_price": 399, "front_glass": "Tempered Glass 9H", "front_glass_price": 249},
    {"brand": "Vivo", "model": "Vivo Y58 5G", "price": 18999, "back_cover": "Silicone Soft Case", "back_cover_price": 399, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Vivo", "model": "Vivo Y28 5G", "price": 19999, "back_cover": "Silicone Soft Case", "back_cover_price": 399, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Vivo", "model": "Vivo T4", "price": 24999, "back_cover": "Zapvi Printed Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Vivo", "model": "Vivo V30e", "price": 27999, "back_cover": "Sirphire Matte Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Vivo", "model": "Vivo V30", "price": 33999, "back_cover": "Sirphire Matte Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Vivo", "model": "Vivo V50", "price": 34999, "back_cover": "Silicone Soft Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Vivo", "model": "Vivo T3 Ultra", "price": 36999, "back_cover": "Silicone Soft Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "Vivo", "model": "Vivo V40e", "price": 39999, "back_cover": "Sirphire Matte Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "Vivo", "model": "Vivo V40", "price": 46999, "back_cover": "Sirphire Matte Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "Vivo", "model": "Vivo V40 Pro", "price": 49999, "back_cover": "Zapvi Premium Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "Vivo", "model": "Vivo X200 FE", "price": 49999, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "Vivo", "model": "Vivo X100", "price": 59999, "back_cover": "Sirphire Matte Case", "back_cover_price": 899, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "Vivo", "model": "Vivo X100 Pro", "price": 69999, "back_cover": "Zapvi Premium Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "Vivo", "model": "Vivo X200", "price": 69999, "back_cover": "Silicone Soft Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "Vivo", "model": "Vivo X200 Pro", "price": 79999, "back_cover": "Sirphire Premium Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "Realme", "model": "Realme C61", "price": 8499, "back_cover": "Silicone Soft Case", "back_cover_price": 299, "front_glass": "Tempered Glass 9H", "front_glass_price": 199},
    {"brand": "Realme", "model": "Realme Narzo N63", "price": 8799, "back_cover": "Silicone Soft Case", "back_cover_price": 299, "front_glass": "Tempered Glass 9H", "front_glass_price": 199},
    {"brand": "Realme", "model": "Realme C65 5G", "price": 9999, "back_cover": "Silicone Soft Case", "back_cover_price": 349, "front_glass": "Tempered Glass 9H", "front_glass_price": 249},
    {"brand": "Realme", "model": "Realme Narzo N65 5G", "price": 11499, "back_cover": "Zapvi Printed Case", "back_cover_price": 349, "front_glass": "Tempered Glass 9H", "front_glass_price": 249},
    {"brand": "Realme", "model": "Realme C63", "price": 12999, "back_cover": "Silicone Soft Case", "back_cover_price": 349, "front_glass": "Tempered Glass 9H", "front_glass_price": 249},
    {"brand": "Realme", "model": "Realme Narzo 70x 5G", "price": 15499, "back_cover": "Silicone Soft Case", "back_cover_price": 399, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Realme", "model": "Realme Narzo 70 Turbo", "price": 17999, "back_cover": "Zapvi Printed Case", "back_cover_price": 399, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Realme", "model": "Realme Narzo 70 Pro", "price": 19999, "back_cover": "Sirphire Matte Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "Realme", "model": "Realme 13", "price": 21999, "back_cover": "Silicone Soft Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Realme", "model": "Realme 14T", "price": 22999, "back_cover": "Silicone Soft Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Realme", "model": "Realme P3", "price": 24999, "back_cover": "Zapvi Printed Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Realme", "model": "Realme 13+", "price": 26999, "back_cover": "Sirphire Matte Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "Realme", "model": "Realme 14x 5G", "price": 27999, "back_cover": "Silicone Soft Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "Realme", "model": "Realme 14 Pro", "price": 29999, "back_cover": "Zapvi Premium Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "Realme", "model": "Realme Narzo 70", "price": 32999, "back_cover": "Silicone Soft Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "Realme", "model": "Realme 13 Pro", "price": 34999, "back_cover": "Sirphire Matte Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "Realme", "model": "Realme GT 6", "price": 39999, "back_cover": "Zapvi Premium Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "Realme", "model": "Realme 13 Pro+", "price": 62999, "back_cover": "Sirphire Premium Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "Realme", "model": "Realme GT 7", "price": 49999, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "Realme", "model": "Realme GT 7 Pro", "price": 59999, "back_cover": "Sirphire Premium Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "OnePlus", "model": "OnePlus Nord CE 4 Lite", "price": 17999, "back_cover": "Kapaver Clear Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "OnePlus", "model": "OnePlus Nord CE 4", "price": 19999, "back_cover": "Kapaver Clear Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "OnePlus", "model": "OnePlus Nord CE 5 Lite", "price": 20999, "back_cover": "Silicone Soft Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "OnePlus", "model": "OnePlus Nord CE 5 5G", "price": 22999, "back_cover": "Kapaver Clear Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OnePlus", "model": "OnePlus Nord 4", "price": 27999, "back_cover": "Kapaver Clear Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OnePlus", "model": "OnePlus Nord 5", "price": 31999, "back_cover": "Silicone Soft Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OnePlus", "model": "OnePlus 12R", "price": 39999, "back_cover": "Kapaver Rugged Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OnePlus", "model": "OnePlus 13R", "price": 42997, "back_cover": "Kapaver Clear Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OnePlus", "model": "OnePlus 12", "price": 49999, "back_cover": "Kapaver Premium Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "OnePlus", "model": "OnePlus 13s", "price": 54998, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "OnePlus", "model": "OnePlus 13", "price": 64999, "back_cover": "Kapaver Premium Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "OnePlus", "model": "OnePlus Open", "price": 139999, "back_cover": "Kapaver Foldable Case", "back_cover_price": 1499, "front_glass": "Tempered Glass 9H", "front_glass_price": 799},
    {"brand": "OnePlus", "model": "OnePlus Nord 3", "price": 28999, "back_cover": "Kapaver Clear Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OnePlus", "model": "OnePlus Nord 3 Lite", "price": 21999, "back_cover": "Silicone Soft Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "OnePlus", "model": "OnePlus 11", "price": 44999, "back_cover": "Kapaver Premium Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OnePlus", "model": "OnePlus 11R", "price": 36999, "back_cover": "Kapaver Clear Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OnePlus", "model": "OnePlus Nord 2T", "price": 25999, "back_cover": "Silicone Soft Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OnePlus", "model": "OnePlus Nord CE 3", "price": 23999, "back_cover": "Kapaver Clear Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OnePlus", "model": "OnePlus 10 Pro", "price": 42999, "back_cover": "Kapaver Premium Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OnePlus", "model": "OnePlus 10T", "price": 39999, "back_cover": "Kapaver Clear Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OPPO", "model": "OPPO A3x 5G", "price": 12999, "back_cover": "Silicone Soft Case", "back_cover_price": 349, "front_glass": "Tempered Glass 9H", "front_glass_price": 249},
    {"brand": "OPPO", "model": "OPPO A58 5G", "price": 14999, "back_cover": "Silicone Soft Case", "back_cover_price": 349, "front_glass": "Tempered Glass 9H", "front_glass_price": 249},
    {"brand": "OPPO", "model": "OPPO A79 5G", "price": 17999, "back_cover": "Zapvi Printed Case", "back_cover_price": 399, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "OPPO", "model": "OPPO K13", "price": 17999, "back_cover": "Silicone Soft Case", "back_cover_price": 399, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "OPPO", "model": "OPPO A59 5G", "price": 18999, "back_cover": "Silicone Soft Case", "back_cover_price": 399, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "OPPO", "model": "OPPO K12x 5G", "price": 19999, "back_cover": "Zapvi Printed Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 299},
    {"brand": "OPPO", "model": "OPPO A78 5G", "price": 20999, "back_cover": "Silicone Soft Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OPPO", "model": "OPPO A38", "price": 21999, "back_cover": "Sirphire Matte Case", "back_cover_price": 499, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OPPO", "model": "OPPO Reno12", "price": 32999, "back_cover": "Sirphire Matte Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OPPO", "model": "OPPO Reno12 Pro", "price": 36999, "back_cover": "Zapvi Premium Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OPPO", "model": "OPPO Reno14", "price": 37999, "back_cover": "Silicone Soft Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OPPO", "model": "OPPO K12 5G", "price": 24999, "back_cover": "Silicone Soft Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OPPO", "model": "OPPO F27 Pro+", "price": 29999, "back_cover": "Sirphire Matte Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OPPO", "model": "OPPO Reno11", "price": 27999, "back_cover": "Zapvi Printed Case", "back_cover_price": 599, "front_glass": "Tempered Glass 9H", "front_glass_price": 349},
    {"brand": "OPPO", "model": "OPPO Reno11 Pro", "price": 34999, "back_cover": "Sirphire Matte Case", "back_cover_price": 699, "front_glass": "Tempered Glass 9H", "front_glass_price": 399},
    {"brand": "OPPO", "model": "OPPO Find N3 Flip", "price": 79999, "back_cover": "Sirphire Premium Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "OPPO", "model": "OPPO Reno14 Pro", "price": 49999, "back_cover": "Zapvi Premium Case", "back_cover_price": 799, "front_glass": "Tempered Glass 9H", "front_glass_price": 499},
    {"brand": "OPPO", "model": "OPPO Find X8", "price": 79999, "back_cover": "Sirphire Premium Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "OPPO", "model": "OPPO Find X8 Pro", "price": 99999, "back_cover": "Zapvi Premium Case", "back_cover_price": 999, "front_glass": "Tempered Glass 9H", "front_glass_price": 599},
    {"brand": "OPPO", "model": "OPPO Find N5", "price": 129999, "back_cover": "Sirphire Foldable Case", "back_cover_price": 1499, "front_glass": "Tempered Glass 9H", "front_glass_price": 799},
    {"brand": "Apple", "model": "iPhone SE (3rd Gen)", "price": 39900, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 499},
    {"brand": "Apple", "model": "iPhone 12", "price": 44900, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 499},
    {"brand": "Apple", "model": "iPhone 13", "price": 49900, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 499},
    {"brand": "Apple", "model": "iPhone 13 Mini", "price": 54900, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 499},
    {"brand": "Apple", "model": "iPhone 14", "price": 59900, "back_cover": "Silicone Soft Case", "back_cover_price": 899, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 599},
    {"brand": "Apple", "model": "iPhone 14 Plus", "price": 69900, "back_cover": "Silicone Soft Case", "back_cover_price": 899, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 599},
    {"brand": "Apple", "model": "iPhone 15", "price": 69900, "back_cover": "Silicone Soft Case", "back_cover_price": 999, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 599},
    {"brand": "Apple", "model": "iPhone 15 Plus", "price": 79900, "back_cover": "Silicone Soft Case", "back_cover_price": 999, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 599},
    {"brand": "Apple", "model": "iPhone 16", "price": 79900, "back_cover": "Silicone Soft Case", "back_cover_price": 999, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 599},
    {"brand": "Apple", "model": "iPhone 16 Plus", "price": 89900, "back_cover": "Silicone Soft Case", "back_cover_price": 999, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 599},
    {"brand": "Apple", "model": "iPhone 15 Pro", "price": 99900, "back_cover": "Silicone Soft Case", "back_cover_price": 1199, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 699},
    {"brand": "Apple", "model": "iPhone 15 Pro Max", "price": 119900, "back_cover": "Silicone Soft Case", "back_cover_price": 1199, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 699},
    {"brand": "Apple", "model": "iPhone 16 Pro", "price": 119900, "back_cover": "Silicone Soft Case", "back_cover_price": 1199, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 699},
    {"brand": "Apple", "model": "iPhone 16 Pro Max", "price": 144900, "back_cover": "Silicone Soft Case", "back_cover_price": 1199, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 699},
    {"brand": "Apple", "model": "iPhone 14 Pro", "price": 109900, "back_cover": "Silicone Soft Case", "back_cover_price": 999, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 599},
    {"brand": "Apple", "model": "iPhone 14 Pro Max", "price": 129900, "back_cover": "Silicone Soft Case", "back_cover_price": 999, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 599},
    {"brand": "Apple", "model": "iPhone 13 Pro", "price": 89900, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 499},
    {"brand": "Apple", "model": "iPhone 13 Pro Max", "price": 99900, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 499},
    {"brand": "Apple", "model": "iPhone 12 Pro", "price": 79900, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 499},
    {"brand": "Apple", "model": "iPhone 12 Pro Max", "price": 89900, "back_cover": "Silicone Soft Case", "back_cover_price": 799, "front_glass": "CrystalPlay Tempered Glass", "front_glass_price": 499}
];

// Global filter state
let currentFilters = {
    brand: 'all',
    minPrice: 0,
    maxPrice: 200000,
    sort: 'default'
};

let filteredProducts = [...products];

// Dark Theme Management
class ThemeManager {
    constructor() {
        this.initTheme();
        this.setupToggle();
    }

    initTheme() {
        // Check for saved theme or default to light mode
        const savedTheme = localStorage.getItem('samal-mobile-theme') || 'light';
        this.setTheme(savedTheme);
    }

    setupToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('samal-mobile-theme', theme);
        
        // Update toggle button icon
        const toggleIcon = document.querySelector('#theme-toggle i');
        if (toggleIcon) {
            toggleIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Mobile Navigation Management
class MobileNavManager {
    constructor() {
        this.setupMobileNav();
    }

    setupMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
}

// Contact Form Management
class ContactFormManager {
    constructor() {
        this.setupContactForm();
        this.setupPhoneValidation();
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            updates: formData.get('updates') ? true : false
        };
        
        try {
            // Simulate form submission
            await this.simulateFormSubmission(data);
            
            // Success feedback
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            e.target.reset();
            
            // WhatsApp option
            setTimeout(() => {
                if (confirm('Would you like to also send this message via WhatsApp for faster response?')) {
                    const whatsappMessage = this.formatWhatsAppMessage(data);
                    window.open(`https://wa.me/919938008008?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                }
            }, 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Failed to send message. Please try calling us directly at +91-9938008008.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    formatWhatsAppMessage(data) {
        return `Hi Samal Mobile,

Name: ${data.name}
Phone: ${data.phone}
Subject: ${data.subject}

Message: ${data.message}

Please get back to me at your earliest convenience.`;
    }

    simulateFormSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', data);
                resolve();
            }, 2000);
        });
    }

    setupPhoneValidation() {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 10) value = value.slice(0, 10);
                e.target.value = value;
            });
            
            phoneInput.addEventListener('blur', (e) => {
                const value = e.target.value;
                if (value.length > 0 && value.length < 10) {
                    e.target.setCustomValidity('Please enter a valid 10-digit phone number');
                } else {
                    e.target.setCustomValidity('');
                }
            });
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            ${message}
        `;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            zIndex: '10001',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '600',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => document.body.contains(notification) && document.body.removeChild(notification), 300);
        }, 5000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Samal Mobile Website Loading...');
    
    // Initialize all managers
    new ThemeManager();
    new MobileNavManager();
    new ContactFormManager();
    
    // Initialize existing functionality
    setupEventListeners();
    initializePriceRange();
    renderProducts(products);
    updateResultsCount();
    
    console.log('Samal Mobile Website Loaded Successfully!');
});

// Set up all event listeners
function setupEventListeners() {
    // Brand filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleBrandFilter);
    });

    // Price range slider
    const priceRange = document.getElementById('priceRange');
    const currentMaxPrice = document.getElementById('currentMaxPrice');
    
    if (priceRange && currentMaxPrice) {
        priceRange.addEventListener('input', (e) => {
            currentMaxPrice.textContent = `₹${parseInt(e.target.value).toLocaleString()}`;
        });
    }

    // Apply price filter button
    const applyFilterBtn = document.querySelector('.apply-filter-btn');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyPriceFilter);
    }

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // Clear filters button
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // Price input fields
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    
    if (minPriceInput) {
        minPriceInput.addEventListener('change', handlePriceInputs);
    }
    if (maxPriceInput) {
        maxPriceInput.addEventListener('change', handlePriceInputs);
    }
}

// Initialize price range based on product data
function initializePriceRange() {
    const prices = products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    const priceRange = document.getElementById('priceRange');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const currentMaxPriceDisplay = document.getElementById('currentMaxPrice');
    
    if (priceRange) {
        priceRange.min = minPrice;
        priceRange.max = maxPrice;
        priceRange.value = maxPrice;
    }
    
    if (minPriceInput) {
        minPriceInput.placeholder = minPrice.toString();
    }
    if (maxPriceInput) {
        maxPriceInput.placeholder = maxPrice.toString();
    }
    
    currentFilters.minPrice = minPrice;
    currentFilters.maxPrice = maxPrice;
    
    if (currentMaxPriceDisplay) {
        currentMaxPriceDisplay.textContent = `₹${maxPrice.toLocaleString()}`;
    }
}

// Handle brand filtering
function handleBrandFilter(e) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentFilters.brand = e.target.dataset.brand;
    applyAllFilters();
}

// Handle price filter application
function applyPriceFilter() {
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceRange = document.getElementById('priceRange');
    
    const minPrice = parseInt(minPriceInput?.value) || 0;
    const maxPrice = parseInt(maxPriceInput?.value) || parseInt(priceRange?.value) || 200000;
    
    currentFilters.minPrice = minPrice;
    currentFilters.maxPrice = maxPrice;
    
    applyAllFilters();
}

// Handle price input changes
function handlePriceInputs() {
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceRange = document.getElementById('priceRange');
    const currentMaxPrice = document.getElementById('currentMaxPrice');
    
    const minPrice = parseInt(minPriceInput?.value) || 0;
    const maxPrice = parseInt(maxPriceInput?.value) || 200000;
    
    if (priceRange) priceRange.value = maxPrice;
    if (currentMaxPrice) currentMaxPrice.textContent = `₹${maxPrice.toLocaleString()}`;
}

// Handle sorting
function handleSort(e) {
    currentFilters.sort = e.target.value;
    applyAllFilters();
}

// Apply all filters and sorting
function applyAllFilters() {
    let filtered = [...products];
    
    if (currentFilters.brand !== 'all') {
        filtered = filtered.filter(product => product.brand === currentFilters.brand);
    }
    
    filtered = filtered.filter(product => 
        product.price >= currentFilters.minPrice && 
        product.price <= currentFilters.maxPrice
    );
    
    switch (currentFilters.sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-az':
            filtered.sort((a, b) => a.model.localeCompare(b.model));
            break;
        case 'name-za':
            filtered.sort((a, b) => b.model.localeCompare(a.model));
            break;
    }
    
    filteredProducts = filtered;
    renderProducts(filtered);
    updateResultsCount();
}

// Render products to the grid
function renderProducts(productsToRender) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more products.</p>
                <button onclick="clearAllFilters()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">Clear Filters</button>
            </div>
        `;
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create individual product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-header">
            <div class="product-brand">${product.brand}</div>
            <div class="product-price">₹${product.price.toLocaleString()}</div>
        </div>
        
        <h3 class="product-title">${product.model}</h3>
        
        <div class="accessories-info">
            <h4>Available Accessories:</h4>
            <div class="accessory-item">
                <span>${product.back_cover}</span>
                <span class="accessory-price">₹${product.back_cover_price}</span>
            </div>
            <div class="accessory-item">
                <span>${product.front_glass}</span>
                <span class="accessory-price">₹${product.front_glass_price}</span>
            </div>
        </div>
        
        <button class="add-to-cart" onclick="addToCart('${product.model}', '${product.brand}', ${product.price})">
            Add to Cart
        </button>
    `;
    
    return card;
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = filteredProducts.length;
    }
}

// Clear all filters
function clearAllFilters() {
    const prices = products.map(p => p.price);
    const maxPrice = Math.max(...prices);
    
    currentFilters = {
        brand: 'all',
        minPrice: 0,
        maxPrice: maxPrice,
        sort: 'default'
    };
    
    const allBrandBtn = document.querySelector('.filter-btn[data-brand="all"]');
    if (allBrandBtn) allBrandBtn.classList.add('active');
    
    document.querySelectorAll('.filter-btn:not([data-brand="all"])').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceRange = document.getElementById('priceRange');
    const currentMaxPrice = document.getElementById('currentMaxPrice');
    const sortSelect = document.getElementById('sortSelect');
    
    if (minPriceInput) minPriceInput.value = '';
    if (maxPriceInput) maxPriceInput.value = '';
    if (priceRange) priceRange.value = maxPrice;
    if (currentMaxPrice) currentMaxPrice.textContent = `₹${maxPrice.toLocaleString()}`;
    if (sortSelect) sortSelect.value = 'default';
    
    renderProducts(products);
    filteredProducts = [...products];
    updateResultsCount();
}

// Add to cart functionality
function addToCart(productModel, productBrand, productPrice) {
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Added! ✓';
    button.style.background = '#10b981';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.disabled = false;
    }, 2000);
    
    console.log(`Added ${productBrand} ${productModel} (₹${productPrice}) to cart`);
    
    setTimeout(() => {
        if (confirm(`Product added to cart! Would you like to inquire about ${productBrand} ${productModel} via WhatsApp?`)) {
            const message = `Hi Samal Mobile, I'm interested in ${productBrand} ${productModel} priced at ₹${productPrice}. Please provide more details.`;
            window.open(`https://wa.me/919938008008?text=${encodeURIComponent(message)}`, '_blank');
        }
    }, 1000);
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to products function
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }
    }
});
