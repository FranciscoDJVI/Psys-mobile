import { Text, View, StyleSheet } from "react-native";

interface Props {
    arrayData: [string];
}

export default function CustomDescriptions({ arrayData }: Props) {
    return (
        <View>
            {arrayData.map((element, index) => (
                <View key={index}>
                </View>
            ))}
        </View>
    )
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

    customText: {
        fontSize: 24
    }
});
