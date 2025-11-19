import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Fontawesome from "@expo/vector-icons/FontAwesome";

export default function Sections() {
    return (
        <View style={styles.sectionsContainer}>
            <View style={styles.customSecctions}>
                <Link href="/products" style={styles.customLink}>
                    <Text>Productos <Fontawesome name="cube" color="green" size={36}></Fontawesome></Text>
                </Link>
                <Link href="/sells" style={styles.customLink}>
                    <Text>Ventas <Fontawesome name="shopping-cart" color="yellow" size={36}></Fontawesome></Text>
                </Link>
                <Link href="/stock" style={styles.customLink}>
                    <Text>Stock <Fontawesome name="cubes" color='brown' size={36}></Fontawesome></Text>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: 20,
        gap: 10,
        backgroundColor: '#dddddd',
    },
    customSecctions:{
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center', 
        width: '100%'
    },
    customLink: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        textAlign: 'center'
    }
});