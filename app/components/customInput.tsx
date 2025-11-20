import { TextInput, StyleSheet } from "react-native";

interface CustomInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: string;
    multiline?: boolean;
}

export const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry }: CustomInputProps) => {
    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            style={styles.customTextInput}
        />
    );
};
const styles = StyleSheet.create({
    customTextInput: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        fontSize: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
})