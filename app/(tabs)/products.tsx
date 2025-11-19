import { Text, View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { GetProducts, DeleteProduct, GetProductById } from "../services/api.products";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

export default function ProdductsScreen() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const router = useRouter();

    const loadProducts = async () => {

        try {
            const r = await GetProducts()
            if (r.status !== 200) {
                throw new Error("Failed to load products")
            }
            setProducts(r.data)

        } catch (error) {
            console.error("Error loading products:", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadProducts()
    }, [])

    const handleAddProduct = () => {
        router.push('/addProducts');
    }
    const handleUpdateProducts = (id: number) => async () => {
        try {
            const r = await GetProductById(id);
            if (r.status !== 200) {
                throw new Error("Failed to load product");
            }
            router.push({
                pathname: '/updateProducts',
                params: { product: JSON.stringify(r.data) }
            });
        } catch (error) {
            console.error("Error loading product:", error);
        }
    }

    const handleViewProdcutInformation = (id: number) => async () => {
        try {
            const r = await GetProductById(id);
            if (r.status !== 200) {
                throw new Error("Failed to load product");
            }
            router.push({
                pathname: '/productDescriptions',
                params: { product: JSON.stringify(r.data) }
            });
        } catch (error) {
            console.error("Error loading product:", error);
        }
    }

    const handleDeletePresseable = (id: number) => async () => {
        try {
            const r = await DeleteProduct(id);
            if (r.status !== 204) {
                throw new Error("Failed to delete product");
            }
            loadProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
    return (
        <View style={styles.customView}>
            {products.map((product: any) => (
                <View key={product.id} >
                    <View style={styles.customListView}>
                        <Text style={styles.customText}>{product.name}</Text>
                        <FontAwesome style={styles.pressableIcons} onPress={handleViewProdcutInformation(product.id)} name='eye' color='green' size={30}></FontAwesome>
                        <FontAwesome style={styles.pressableIcons} onPress={handleUpdateProducts(product.id)} name='edit' color='blue' size={30}></FontAwesome>
                        <FontAwesome style={styles.pressableIcons} onPress={handleDeletePresseable(product.id)} name='trash' color='red' size={30}></FontAwesome>
                    </View>
                </View>
            ))}
            <View style={styles.customAddPreseble}><Pressable onPress={handleAddProduct}><FontAwesome name='plus-circle' color='green' size={75}></FontAwesome></Pressable></View>
        </View>
    )
}

const styles = StyleSheet.create({
    customView: {
        margin: 10,
        marginTop: 20,
    },
    customListView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: 60,
        marginBottom: 5,
        borderBlockColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

    },
    customText: {
        fontSize: 24,
        minWidth: 250,
        fontWeight: '500'
       },
    customAddPreseble: {
        marginTop: 20,
        padding: 10,
        position: 'absolute',
        transform: [{ translateX: 300 }, { translateY: 600 }],
    },
    pressableIcons:{
        marginRight: 20,
    }

})