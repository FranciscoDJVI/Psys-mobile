import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import CustomDescriptions from './components/customDescriptions';

interface Product {
  id: number | string;
  name: string;
  brand: string;
  model: string;
  sizes: string;
  price: number;
  description: string;
}

export default function ProductDescriptions() {

  const { product } = useLocalSearchParams();
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      try {
        const productString = Array.isArray(product) ? product[0] : product;
        const data = JSON.parse(productString);
        setProductDetails(data);
      } catch (error) {
        console.error('Error parsing product:', error);
        setProductDetails(null);
      }
    }
  }, [product]);
  if (!productDetails) {
    return <Text>Cargando o Producto no encontrado...</Text>;
  }

  return (
    <View style={styles.container}>
      <CustomDescriptions arrayData={[productDetails.description]} />
      <Text style={styles.title}>{productDetails.name}</Text>
      <Text style={styles.customText}>Marca: {productDetails.brand}</Text>
      <Text style={styles.customText}>Modelo: {productDetails.model}</Text>
      <Text style={styles.customText}>Medidas: {productDetails.sizes}</Text>
      <Text style={styles.customText}>Precio: ${productDetails.price}</Text>
      <Text style={styles.customText}>Descripcion: {productDetails.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    height: '90%'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 24,
    color: 'green',
    marginVertical: 10
  },
  description: {
    fontSize: 24,
    marginTop: 15,
    fontStyle: 'italic'
  },
  customText: {
    fontSize: 24
  }
});
