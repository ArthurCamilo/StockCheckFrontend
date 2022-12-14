import Product from "./product";

class Notification {
    '_id': string | null;
    "product": Product;
    "msg": string;
    "type": string;
}

export default Notification;