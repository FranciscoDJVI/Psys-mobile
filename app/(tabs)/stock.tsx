import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { GetStockById, DeleteStockById, GetStock } from "../services/api.stock";

interface Stock {
  id: number;
  name: string;
}

export default function StockScreen() {

  const [stock, setStock] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const loadStock = async () => {

    try {
      const response = await GetStock()
      if (response.status !== 200) {
        throw new Error("Failed to load products")
      }
      setStock(response.data)

    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadStock()
  }, [])

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
  const handleStockInfo = (id: number) => async () => {
    try {
      const r = await GetStockById(id);
      if (r.status !== 200) {
        throw new Error("Failed to load product");
      }
      router.push({
        pathname: '/stockDescriptions' as any,
        params: { stock: JSON.stringify(r.data) }
      });
    } catch (error) {
      console.error("Error loading product:", error);
    }
  }

  const handleUpdateProduct = (id: number) => async () => {
    try {
      const r = await GetStockById(id);
      if (r.status !== 200) {
        throw new Error("Failed to load product");
      }
      router.push({
        pathname: '/updateStock',
        params: { stock: JSON.stringify(r.data) }
      });
    } catch (error) {
      console.error("Error loading product:", error);
    }
  }
  const handleDelete = (id: number) => async () => {
    try {
      const r = await DeleteStockById(id);
      if (r.status !== 204) {
        throw new Error("Failed to delete product");
      }
      loadStock()
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }


  return (
    <View style={style.customTextInputContainer}>
      {stock.map((stock) => (
        <View
          key={stock.id}
          style={style.customListView}
        >
          <Text style={style.customText} >{stock.name}</Text>
          <View style={style.customContainetIcons}>
            <FontAwesome style={style.pressableIcons} onPress={handleStockInfo(stock.id)} name='eye' color='green' size={30}></FontAwesome>
            <FontAwesome style={style.pressableIcons} onPress={handleUpdateProduct(stock.id)} name='edit' color='blue' size={30}></FontAwesome>
            <FontAwesome style={style.pressableIcons} onPress={handleDelete(stock.id)} name='trash' color='red' size={30}></FontAwesome>
          </View>
        </View>
      ))}

      <View style={style.customAddPreseble}><Pressable onPress={handleAddstock} ><FontAwesome name='plus-circle' color='brown' size={75}></FontAwesome></Pressable></View>
    </View>
  )
}

const style = StyleSheet.create({
  customTextInputContainer: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
  },
  customContainetIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    marginRight: 0
  },
})
