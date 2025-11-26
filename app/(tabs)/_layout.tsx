import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'home', tabBarIcon: () => (
          <FontAwesome name="home" color='black' size={24} />
        ),
      }} />
      <Tabs.Screen name="products" options={{
        title: 'Productos', tabBarIcon: () => (
          <FontAwesome name="cube" color='#22c55e' size={24} />
        ),
      }} />
      <Tabs.Screen name="sells" options={{
        title: 'Ventas', tabBarIcon: () => (
          <FontAwesome name="shopping-cart" color='#fbbf24' size={24} />
        ),
      }} />
      <Tabs.Screen name="stock" options={{
        title: 'Stock', tabBarIcon: () => (
          <FontAwesome name='cubes' color='brown' size={24} />
        ),
      }} />
    </Tabs>
  )
}
