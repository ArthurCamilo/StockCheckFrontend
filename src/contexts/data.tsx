import React, { createContext, useState, useEffect, useContext } from 'react';
import Movement from '../models/movement';
import Product from '../models/product';
import Vendor from '../models/vendor';
import Notification from '../models/notifications';
import { ProductsRequester } from '../requesters/productsRequester';
import { MovementsRequester } from '../requesters/movementsRequester';
import { NotificationsRequester } from '../requesters/notificationsRequester';
import { VendorsRequester } from '../requesters/vendorsRequester';

interface DataContextProps {
    products: Product[];
    product: Product | null;
    handleProductEdit: Function;
    handleProductDelete: Function;
    editProduct: Function;
    movements: Movement[];
    movement: Movement | null;
    handleMovementEdit: Function;
    handleMovementDelete: Function;
    editMovement: Function;
    vendors: Vendor[];
    vendor: Vendor | null;
    handleVendorEdit: Function;
    handleVendorDelete: Function;
    editVendor: Function;
    returnToList: Function;
    deleteNotification: Function;
    notifications: Notification[];
}

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const DataProvider: React.FC = ({children}) => {


    const productsRequester = new ProductsRequester();
    const movementsRequester = new MovementsRequester();
    const notificationsRequester = new NotificationsRequester();
    const vendorsRequester = new VendorsRequester();


    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
   
    const [movements, setMovements] = useState<Movement[]>([]);
    const [movement, setMovement] = useState<Movement | null>(null);

    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [vendor, setVendor] = useState<Vendor | null>(null);

    const [notifications, setNotifications] = useState<Notification[]>([]);

    async function loadData() {
        const products = await productsRequester.getProducts();
        setProducts(products);
        const movements = await movementsRequester.getMovements();
        setMovements(movements);
        const notifications = await notificationsRequester.getNotifications();
        setNotifications(notifications);
        const vendors = await vendorsRequester.getVendors();
        setVendors(vendors);
    }

    useEffect(() => {
        loadData();
    }, [])

    async function handleProductEdit(editedProduct: Product) {
        if (editedProduct._id) {
            await productsRequester.editProduct(editedProduct);
        } else {
            await productsRequester.addProduct(editedProduct);
        }
        returnToList();
        loadData();
    }

    async function handleProductDelete() {
        if (product) {
            await productsRequester.deleteProduct(product);
            returnToList();
            loadData();
        }
    }

    function deleteNotification(notification: Notification) {
        if (notification) {
            notificationsRequester.deleteNotification(notification);
            loadData();
        }
    }

    function editProduct(product: Product | null) {
        if (product === null) {
            setProduct({ _id: null, name: '', quantity: 0, value: 0, minQuantity: 0, maxQuantity: 0 });
        } else {
            setProduct(product);
        }
    }

    async function handleMovementEdit(editedMovement: Movement) {
        if (editedMovement._id) {
            await movementsRequester.editMovement(editedMovement);
        } else {
            await movementsRequester.addMovement(editedMovement);
        }
        returnToList();
        loadData();
    }

    async function handleMovementDelete() {
        if (movement) {
            await movementsRequester.deleteMovement(movement);
            returnToList();
            loadData();
        }
    }

    function editMovement(movement: Movement | null) {
        if (movement === null) {
            setMovement({  _id: null, date: new Date(), quantity: 0, product: new Product(), vendor: new Vendor(), type: 'Entrada' });
        } else {
            setMovement(movement);
        }
    }
    
    async function handleVendorEdit(editedVendor: Vendor) {
        if (editedVendor._id) {
            await vendorsRequester.editVendor(editedVendor);
        } else {
            await vendorsRequester.addVendor(editedVendor);
        }
        returnToList();
        loadData();
    }

    async function handleVendorDelete() {
        if (vendor) {
            await vendorsRequester.deleteVendor(vendor);
            returnToList();
            loadData();
        }
    }

    function editVendor(vendor: Vendor | null) {
        if (vendor === null) {
            setVendor({  _id: null, type: '', email: '', name: '', phone: '' });
        } else {
            setVendor(vendor);
        }
    }

    function returnToList() {
        setVendor(null);
        setProduct(null);
        setMovement(null);
    }
   
    return (
        <DataContext.Provider value={{ 
                products, product, handleProductEdit, handleProductDelete, editProduct,
                movements, movement, handleMovementEdit, handleMovementDelete, editMovement,
                vendors, vendor, handleVendorEdit, handleVendorDelete, editVendor,
                returnToList, notifications, deleteNotification
            }}>
            {children}
        </DataContext.Provider>
    );
};

export function useData() {
    const context = useContext(DataContext);
    return context;
}