import { Stack } from "expo-router";
import { CartProvider } from "./contexts/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='addProducts' options={{ title: 'Agregar productos' }} />
        <Stack.Screen name='addStock' options={{ title: 'Agregar stock' }} />
        <Stack.Screen name='productDescriptions' options={{ title: 'product-information' }} />
        <Stack.Screen name='stockDescriptions' options={{ title: 'stock-information' }} />
        <Stack.Screen name='carScreen' options={{ title: 'car-information' }} />
      </Stack>
    </CartProvider>
  );
}
