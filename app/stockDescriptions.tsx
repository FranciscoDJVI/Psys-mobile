import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import CustomDescriptions from './components/customDescriptions';

interface StockDetails {
    id: number;
    name: string;
    quantity: number;
    id_product_stock: number;
}

export default function ProductDescriptions() {

    const { stock } = useLocalSearchParams();
    const [stockDetails, setStockDetails] = useState<StockDetails | null>(null);

    useEffect(() => {
        if (stock) {
            try {
                const stockString = Array.isArray(stock) ? stock[0] : stock;
                const data = JSON.parse(stockString);
                setStockDetails(data);
            } catch (error) {
                console.error('Error parsing stock:', error);
                setStockDetails(null);
            }
        }
    }, [stock]);
    if (!stockDetails) {
        return <Text>Cargando o Producto no encontrado...</Text>;
    }

    return (
        <View style={styles.container}>
            <CustomDescriptions arrayData={[stockDetails.name]} />
            <Text style={styles.customText}>ID: {stockDetails.id}</Text>
            <Text style={styles.title}>{stockDetails.name}</Text>
            <Text style={styles.customText}>Cantidad: {stockDetails.quantity}</Text>
            <Text style={styles.customText}>ID del Producto: {stockDetails.id_product_stock}</Text>
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
        fontSize: 24,
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
