import { Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { CustomInput } from "../components/customInput";
import { GetProducts } from "../services/api.products";

const INITIAL_STATE = {
  id_product: "",
  name: "",
  quantity: 0,
  quantity_pay: 0,
  type_pay: "Efectivo",
  price: 0
};

export default function SellsScreen() {
  const [sellFormData, setFormData] = useState(INITIAL_STATE);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const handleInputChange = (name: string, value: string) => {
    setQuery(value);
  };
  const fetchProductSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const normalizedQuery = searchQuery.trim().toLowerCase();
    try {
      const allData = await GetProducts();
      const response = allData.data;
      const productSearch = response.filter((product: any) =>
        product.name.toLowerCase().includes(normalizedQuery)
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
    const normalizedQuery = query.toLowerCase();
    const delayDebounceFn = setTimeout(() => {
      if (normalizedQuery.length >= 3) {
        fetchProductSearch(normalizedQuery);
      } else {
        setResults([]);
        setLoading(false)
      }
    }, 200);
    return () => clearTimeout(delayDebounceFn);
  }, [query, fetchProductSearch]);
  return (
    <View style={styles.container}>
      {loading && <Text style={styles.loading}>Cargando...</Text>}
      {!loading && results.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
              <Text
                style={styles.resultItem}
                onPress={() => {
                  setFormData({ ...sellFormData, id_product: item.id, price: item.price });
                  setQuery(item.name);
                  setResults([]);
                }}
              >
                {item.id} - {item.name} - Precio: ${item.price}
              </Text>
            )}
          />
        </View>
      )}
      <CustomInput
        placeholder="Buscar producto"
        value={query}
        onChangeText={(values) => handleInputChange('search', values)}
      >

      </CustomInput>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loading: {
    color: 'blue',
    fontSize: 16,
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    maxHeight: 160,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
