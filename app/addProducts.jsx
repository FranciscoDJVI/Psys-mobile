import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { PostProducts} from "./services/api.products";
import React, { useState, useEffect } from "react";

const INITIAL_PRODUCT_STATE = {
    name: "",
    brand: "",
    model: "",
    sizes: "",
    price: "",
    description: ""
}

export default function AddProductsScreen() {

    const [productData, setProductData] = useState(INITIAL_PRODUCT_STATE);

    const router = useRouter();

    const handleInputChange = (name, value) => {
        setProductData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addProduct = async () => {
        try {
            const r = await PostProducts(productData);
        
            router.push('/products'); 

        } catch (error) {
            console.error("Error al agregar producto:", error);
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
                        onPress={addProduct} 
                        style={{ backgroundColor: '#22c55e', padding: 10, width: '50%', margin: 5, borderRadius: 5 }}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 24 }}>Agregar</Text>
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
})