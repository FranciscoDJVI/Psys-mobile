import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { PostProducts } from "./services/api.products";
import { useState } from "react";
import { customInput } from "./components/customInput";

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
                <customInput
                    placeholder="Nombre"
                    value={productData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <customInput
                    placeholder="Marca"
                    value={productData.brand}
                    onChangeText={(text) => handleInputChange('brand', text)}
                />
                <customInput
                    placeholder="Modelo"
                    value={productData.model}
                    onChangeText={(text) => handleInputChange('model', text)}
                />
                <customInput
                    placeholder="Medidas"
                    value={productData.sizes}
                    onChangeText={(text) => handleInputChange('sizes', text)}
                />
                <customInput
                    placeholder="Precio"
                    value={productData.price}
                    onChangeText={(text) => handleInputChange('price', text)}
                    keyboardType="numeric"
                />
                <customInput
                    placeholder="Descripción"
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
    customPresseableContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
        marginBottom: 20,
    }
})