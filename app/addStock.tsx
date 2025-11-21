import { Text, Pressable, View, StyleSheet, TextInput } from 'react-native';
import { PostStock } from './services/api.stock';
import { useRouter, Href } from 'expo-router';
import { useState } from 'react';
import { CustomInput } from './components/customInput';

const INITIAL_STATE = {
  id_product_stock: "",
  name: "",
  quantity: "",
}

export default function AddStockScreen() {

  const [stock, setStock] = useState(INITIAL_STATE);
  const router = useRouter();

  const handleInputChange = (name: string, value: any) => {
    setStock(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addStock = async () => {
    const dataStock = {
      quantity: parseInt(stock.quantity),
      name: stock.name,
      id_product_stock: parseInt(stock.id_product_stock),
    }

    try {
      const r = await PostStock(dataStock);

      router.push('/stock' as Href);

    } catch (error) {
      console.error("Error al agregar stock:", error);
    }

  }

  const cancel = () => {
    router.push('/stock' as Href);
  }

  return (
    <View style={style.container}>
      <CustomInput
        placeholder="Nombre"
        value={stock.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <CustomInput
        placeholder="ID"
        value={stock.id_product_stock}
        onChangeText={(text) => handleInputChange("id_product_stock", text)}
        keyboardType="numeric"
      />
      <CustomInput
        placeholder="Cantidad"
        value={stock.quantity}
        onChangeText={(text) => handleInputChange("quantity", text)}
        keyboardType="numeric"
      />
      <View style={style.customPresseableContainer}>
        <Pressable onPress={addStock} style={style.pressable}>
          <Text style={style.pressableText}>Registrar</Text>
        </Pressable>
        <Pressable onPress={cancel} style={style.pressableCancel}>
          <Text style={style.pressableText}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    borderWidth: 1,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontSize: 30,
  },
  pressable: {
    backgroundColor: 'brown',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  pressableText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center'
  },
  pressableCancel: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  customPresseableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    marginBottom: 20,
    gap: 5,
  }
})
