import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Pressable } from "react-native";
import { GetProducts } from "../services/api.products";
import Toast from 'react-native-toast-message';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useCart } from "../contexts/CartContext";

const INITIAL_STATE = {
  id_product: "",
  name: "",
  quantity: 0,
  quantity_pay: 0,
  type_pay: "Efectivo",
  price: 0
};

function SellForm() {
  const [sellFormData, setFormData] = useState(INITIAL_STATE);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sellData, setSellData, setTotalSell } = useCart();

  const router = useRouter()


  const handleChangeSearch = (text: string) => {
    setQuery(text);
  };

  const fetchProductSearch = useCallback(async (searchQuery: any) => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const normalizedQuery = searchQuery.trim().toLowerCase();

    try {
      const allData = await GetProducts();
      const res = allData.data;

      const productSearch = res.filter((producto: any) =>
        producto.name.toLowerCase().includes(normalizedQuery)
      );

      setResults(productSearch);
    } catch (error) {
      console.error("Error al obtener o filtrar productos:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const normaliceQuery = query.toLowerCase();
    const delayDebounceFn = setTimeout(() => {
      if (normaliceQuery.length >= 3) {
        fetchProductSearch(normaliceQuery);
      } else {
        setResults([]);
      }
    }, 200);
    return () => clearTimeout(delayDebounceFn);
  }, [query, fetchProductSearch]);


  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




  const handleAddCar = () => {
    if (!sellFormData.id_product || sellFormData.quantity <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Debe seleccionar un producto y especificar una cantidad válida.',
      });
      return;
    }

    const id = sellFormData.id_product;
    const quantity = (sellFormData.quantity);
    const productName = query;
    const total = sellFormData.price * quantity;

    const sellData = {
      "details": {
        "id_product_sell": id,
        'name_product_sell': productName,
        "quantity_sell": quantity,
        'total': total,
      },
      "totalSell": total
    };

    setSellData(prev => [...prev, sellData]);
    setTotalSell(prevTotal => prevTotal + sellData.totalSell);
    setFormData(INITIAL_STATE);
    setQuery("");

  };
  const handleCarScreen = () => {
    router.push('/cartScreen')
  }





  const renderSearchResult = ({ item: product }: any) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        setFormData({ ...sellFormData, id_product: product.id, price: product.price });
        setQuery(product.name);
        setResults([]);
      }}
    >
      <Text style={styles.resultText}>
        {product.id} - {product.name} - Precio: ${product.price}
      </Text>
    </TouchableOpacity>
  );



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ zIndex: 10 }}>
        {loading && <ActivityIndicator size="small" color="#4299e1" />}
        {!loading && results.length > 0 && (
          <View style={styles.resultsListContainer}>
            <FlatList
              data={results}
              renderItem={renderSearchResult}
              keyExtractor={(item) => item.id.toString()}
              style={styles.resultsList}
            />
          </View>
        )}
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar producto..."
            value={query}
            onChangeText={handleChangeSearch}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Cantidad"
            value={sellFormData.quantity.toString()}
            onChangeText={(text) => handleChange("quantity", text)}
          />


          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#fbbf24', paddingHorizontal: 15 }]}
              onPress={handleAddCar}
            >
              <FontAwesome name="shopping-bag" size={40} color="#fff" />
              <Text style={styles.buttonText}> + </Text>
            </TouchableOpacity>
          </View>
        </View>



        <View style={styles.carContainer}>
          <View style={styles.carHeader}>
            <Pressable onPress={handleCarScreen}>
              <FontAwesome name="shopping-cart" size={70} color="#fbbf24" />
            </Pressable>
            <Text style={styles.carTitle}>{sellData.length}</Text>
          </View>
        </View>
      </View>
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexGrow: 1,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  resultsListContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    maxHeight: 160,
    marginBottom: 10,
    zIndex: 10,
    elevation: 5,
  },
  resultsList: {
    flexGrow: 0,
  },
  resultItem: {
    padding: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  resultText: {
    color: '#333',
    fontSize: 20
  },
  formContainer: {
    flex: 1,
    minWidth: 300,
    alignItems: 'center',
    marginBottom: 15,
    padding: 5,
    borderRadius: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    height: 70,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 24,
    color: '#333',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a5568',
    marginTop: 10,
    marginBottom: 5,
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dropdownStyle: {
    borderColor: '#ccc',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 5,
  },
  asideContainer: {
    width: '80%',
    minWidth: 150,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 10,
    marginLeft: 10,
  },
  asideText: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#48bb78',
  },
  carContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    position: 'absolute',
    transform: [{ translateX: 140 }, { translateY: 640 }],

  },
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  carTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fbbf24',
  },
  carList: {
    maxHeight: 180,
  },
  carItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  carItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 5,
  },
  totalSellText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#2d3748',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  emptyCarText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 10,
  },
  FontIcon: {
    fontSize: 30,
  }
});

export default SellForm;
