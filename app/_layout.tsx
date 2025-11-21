import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    <Stack.Screen name='addProducts' options={{ title: 'Agregar productos' }} />
    <Stack.Screen name='addStock' options={{ title: 'Agregar stock' }} />
    <Stack.Screen name='productDescriptions' options={{ title: 'product-information' }} />
    <Stack.Screen name='stockDescriptions' options={{ title: 'stock-information' }} />
  </Stack>;
}
