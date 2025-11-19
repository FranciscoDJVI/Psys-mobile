import { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { GetStock } from '../services/api.stock'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";


export default function StockScreen() {

  const [stock, setStock] = useState([]);
  const router = useRouter()

  useEffect(() => {
    async function loadStock() {
      const r = await GetStock();
      setStock(r.data);
    }
    loadStock();
  }, []);

  const handleAddstock = () => {
    router.push('/addStock')
  }

  return (
    <View style={style.customTextInputContainer}>
      <View style={style.customHeaders}>
        <Text style={style.customTextHeaders}>ID</Text>
        <Text style={style.customTextHeaders} >Nombre</Text>
        <Text style={style.customTextHeaders} >Cant.</Text>
      </View>
      {stock.map((stock) => (
        <View
          key={stock.id}
          style={style.customListView}
        >

          <Text style={style.customText}>{stock.id_product_stock}</Text>
          <Text style={style.customText} >{stock.name}</Text>
          <Text style={style.customText} >{stock.quantity}</Text>
        </View>
      ))}

      <View style={style.customAddPreseble}><Pressable onPress={handleAddstock} ><FontAwesome name='plus-circle' color='brown' size={75}></FontAwesome></Pressable></View>
    </View>
  )
}

const style = StyleSheet.create({
  customTextInputContainer: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  customListView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontWeight: '500'
  },
  customTextHeaders: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff'
  },
  customPresseableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    marginBottom: 20,
  },
  customHeaders: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    marginBottom: 5,
    borderBlockColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'brown',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  customAddPreseble: {
    marginTop: 20,
    padding: 10,
    position: 'absolute',
    transform: [{ translateX: 300 }, { translateY: 600 }],
  },
  pressableIcons: {
    marginRight: 20,
  }

})
