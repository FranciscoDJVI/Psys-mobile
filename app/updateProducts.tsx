import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { UpdateProduct } from "./services/api.products";
import { CustomInput } from "./components/customInput";


const INITIAL_PRODUCT_STATE = {
    id: null as number | null,
    name: "",
    brand: "",
    model: "",
    sizes: "",
    price: "",
    description: ""
}

export default function UpdateProducts() {
    const [productData, setProductData] = useState(INITIAL_PRODUCT_STATE);


    const router = useRouter();
    const { product } = useLocalSearchParams();


    useEffect(() => {
        const fetchProductData = async () => {
            if (!product) return;

            let productId = null;
            const productString = Array.isArray(product) ? product[0] : product;

            try {
                const parsedProduct = JSON.parse(productString);
                productId = parsedProduct.id;

                setProductData({
                    id: parsedProduct.id,
                    name: parsedProduct.name || "",
                    brand: parsedProduct.brand || "",
                    model: parsedProduct.model || "",
                    sizes: parsedProduct.sizes || "",
                    price: String(parsedProduct.price) || "",
                    description: parsedProduct.description || ""
                });


            } catch (error) {
                console.error('Error al cargar datos del producto:', error);
            }
        };

        fetchProductData();
    }, [product]);

    const handleInputChange = (name: string, value: string) => {
        setProductData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateProductHandler = async () => {

        try {
            const productString = Array.isArray(product) ? product[0] : product;
            const parsedProduct = JSON.parse(productString);
            const r = await UpdateProduct(parsedProduct.id, productData);
            console.log(productData.id)

            router.push('/products');

        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    }

    const handleCancelPresseable = () => {
        router.push('/products');
    }

    return (
        <View>
            <View style={style.customTextInputCotainer}>
                <CustomInput
                    placeholder="Nombre"
                    value={productData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <CustomInput
                    placeholder="Marca"
                    value={productData.brand}
                    onChangeText={(text) => handleInputChange('brand', text)}
                />
                <CustomInput
                    placeholder="Modelo"
                    value={productData.model}
                    onChangeText={(text) => handleInputChange('model', text)}
                />
                <CustomInput
                    placeholder="Medidas"
                    value={productData.sizes}
                    onChangeText={(text) => handleInputChange('sizes', text)}
                />
                <CustomInput
                    placeholder="Precio"
                    value={productData.price}
                    onChangeText={(text) => handleInputChange('price', text)}
                    keyboardType="numeric"
                />
                <CustomInput
                    placeholder="Descripción"
                    value={productData.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    multiline={true}
                />

                <View style={style.customPresseableContainer}>
                    <Pressable
                        onPress={updateProductHandler}
                        style={{ backgroundColor: '#22c55e', padding: 10, width: '50%', margin: 5, borderRadius: 5 }}
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