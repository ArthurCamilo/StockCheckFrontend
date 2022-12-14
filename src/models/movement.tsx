import Product from "./product";
import Vendor from "./vendor";

class Movement {
    '_id': string | null;
    "type": string;
    "product": Product;
    "vendor": Vendor;
    "quantity": number;
    "date": Date;
}

export default Movement;