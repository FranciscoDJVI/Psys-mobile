import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useRouter, useLocalSearchParams, Href } from "expo-router";
import React, { useState, useEffect } from "react";
import { UpdateStock } from "./services/api.stock";
import { CustomInput } from "./components/customInput";

const INITIAL_STATE = {
    id: 0,
    id_product_stock: "",
    name: "",
    quantity: "",
}

export default function UpdateProducts() {
    const [stockData, setStockData] = useState(INITIAL_STATE);


    const router = useRouter();
    const { stock } = useLocalSearchParams();


    useEffect(() => {
        const fetchProductData = async () => {
            if (!stock) return;

            try {
                const stockString = Array.isArray(stock) ? stock[0] : stock;
                const parsedStock = JSON.parse(stockString);

                setStockData({
                    name: parsedStock.name || "",
                    id: parsedStock.id || 0,
                    id_product_stock: parsedStock.id_product_stock ? String(parsedStock.id_product_stock) : "",
                    quantity: parsedStock.quantity ? String(parsedStock.quantity) : "",
                })

            } catch (error) {
                console.error('Error al cargar datos del producto:', error);
            }
        };

        fetchProductData();
    }, [stock]);

    const handleInputChange = (name: string, value: string) => {
        setStockData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateStockHandler = async () => {

        try {
            const stockString = Array.isArray(stock) ? stock[0] : stock;
            const parsedStock = JSON.parse(stockString);

            const dataStock = {
                quantity: parseInt(stockData.quantity),
                name: stockData.name,
                id_product_stock: parseInt(stockData.id_product_stock),
            }

            const r = await UpdateStock(parsedStock.id, dataStock);
            setStockData(INITIAL_STATE);
            router.push('/stock' as Href);

        } catch (error: any) {
            console.error("Error al actualizar producto:", error);
            console.error("Error details:", error.response?.data);
        }
    }

    const handleCancelPresseable = () => {
        router.push('/stock' as Href);
    }

    return (
        <View>
            <View style={style.customTextInputCotainer}>
                <CustomInput
                    placeholder="Nombre"
                    value={stockData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <CustomInput
                    placeholder="ID Producto"
                    value={stockData.id_product_stock}
                    onChangeText={(text) => handleInputChange('id_product_stock', text)}
                    keyboardType="numeric"
                />
                <CustomInput
                    placeholder="Cantidad"
                    value={stockData.quantity}
                    onChangeText={(text) => handleInputChange('quantity', text)}
                    keyboardType="numeric"
                />
                <View style={style.customPresseableContainer}>
                    <Pressable
                        onPress={updateStockHandler}
                        style={{ backgroundColor: 'brown', padding: 10, width: '50%', margin: 5, borderRadius: 5 }}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 24 }}>Actualizar</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleCancelPresseable}
                        style={{ backgroundColor: 'gray', padding: 10, width: '50%', margin: 5, borderRadius: 5 }}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 24 }}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    customTextInputCotainer: {
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    customPresseableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
        marginBottom: 20,
    }
});