import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { UpdateProduct} from "./services/api.products";

const INITIAL_PRODUCT_STATE = {
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

            try {
                const parsedProduct = JSON.parse(product);
                productId = parsedProduct.id;

                setProductData({
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

    const handleInputChange = (name, value) => {
        setProductData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateProductHandler = async () => {

        try {
            const parsedProduct = JSON.parse(product);
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
                <TextInput
                    placeholder="Nombre"
                    style={style.customTextInput}
                    value={productData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <TextInput
                    placeholder="Marca"
                    style={style.customTextInput}
                    value={productData.brand}
                    onChangeText={(text) => handleInputChange('brand', text)}
                />
                <TextInput
                    placeholder="Modelo"
                    style={style.customTextInput}
                    value={productData.model}
                    onChangeText={(text) => handleInputChange('model', text)}
                />
                <TextInput
                    placeholder="Medidas"
                    style={style.customTextInput}
                    value={productData.sizes}
                    onChangeText={(text) => handleInputChange('sizes', text)}
                />
                <TextInput
                    placeholder="Precio"
                    style={style.customTextInput}
                    value={productData.price}
                    onChangeText={(text) => handleInputChange('price', text)}
                    keyboardType="numeric"
                />
                <TextInput
                    placeholder="Descripción"
                    style={style.customTextInput}
                    value={productData.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    multiline={true}
                />

                <View style={style.customPresseableContainer}>
                    <Pressable
                        onPress={updateProductHandler} // 👈 Cambiar a la nueva función
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
    customTextInput: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        fontSize: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    customPresseableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
        marginBottom: 20,
    }
});