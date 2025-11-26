import React, { useState, useMemo, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, Pressable } from "react-native";
import { useCart } from "./contexts/CartContext";
import { PostSells } from "./services/api.sells";
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from "@expo/vector-icons/FontAwesome";

const IVA = 0.19;

export default function CarScreen() {
  const { sellData, setSellData, setTotalSell } = useCart();
  const [quantityPay, setQuantityPay] = useState("");
  const [typePayValue, setTypePayValue] = useState("Efectivo");
  const [openPay, setOpenPay] = useState(false);
  const payMethods = useMemo(() => [
    { label: "Efectivo", value: "Efectivo" },
    { label: "Tarjeta debito", value: "Tarjeta debito" },
    { label: "Tarjeta credito", value: "Tarjeta credito" },
    { label: "Transferencia", value: "Transferencia" },
  ], []);

  const totalSell = sellData.reduce((sum, item) => sum + item.totalSell, 0);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);
  const [change, setChange] = useState(0);

  const handleDeleteItem = (index: number) => {
    const itemToDelete = sellData[index];
    if (!itemToDelete) return;
    setSellData(prev => prev.filter((_, i) => i !== index));
    setTotalSell(prev => prev - itemToDelete.totalSell);
  };

  useEffect(() => {
    const quantityPayNum = parseFloat(quantityPay) || 0;

    if (totalSell > 0) {
      const calculatedIva = totalSell * IVA;
      const calculatedSubtotal = totalSell - calculatedIva;
      const calculatedChange = quantityPayNum - totalSell;

      setTotal(totalSell);
      setSubtotal(calculatedSubtotal);
      setIva(calculatedIva);
      setChange(calculatedChange);
    } else {
      setTotal(0);
      setSubtotal(0);
      setIva(0);
      setChange(0);
    }
  }, [totalSell, quantityPay]);

  const handleSubmit = async () => {
    if (sellData.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El carrito está vacío. Agregue productos para vender.',
      });
      return;
    }

    const dataToSend = {
      "detail_sell": sellData.map(item => ({
        ...item,
        quantity_pay: parseFloat(quantityPay) || 0,
        type_pay: typePayValue,
      })),
      "total_sale": totalSell,
    };

    try {
      const response = await PostSells(dataToSend);
      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Éxito',
          text2: 'Venta realizada con éxito!',
        });
        setSellData([]);
        setTotalSell(0);
        setQuantityPay("");
        setTypePayValue("Efectivo");
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error al realizar la venta.',
        });
      }
    } catch {
      Alert.alert("Error", "Ocurrió un error al intentar registrar la venta.");
    }
  };



  return (
    <View style={{ flex: 1, padding: 20 }}>
      {sellData.length === 0 ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
          <Text style={{ fontSize: 18, color: '#666' }}>No hay productos en el carrito.</Text>
        </View>
      ) : (
        <View>
          <View style={{ marginBottom: 20 }}>
            <FlatList
              data={sellData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={{
                  padding: 15,
                  backgroundColor: '#f9f9f9',
                  marginBottom: 5,
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',

                }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.details.name_product_sell}</Text>
                  <Text style={{ fontSize: 16, color: '#666', }}>Cantidad</Text>
                  <Text style={{ fontSize: 16, }}>{item.details.quantity_sell}</Text>
                  <Text style={{ fontSize: 14, color: '#666' }}>Total</Text>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#48bb78' }}>${item.totalSell.toFixed(2)}</Text>
                  <Pressable onPress={() => handleDeleteItem(index)} style={{ padding: 5 }}>
                    <FontAwesome name="trash" color='red' size={24} />
                  </Pressable>
                </View>
              )}
              style={{ maxHeight: 180 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' }}>Resumen de Compra</Text>
            <View style={{
              padding: 20,
              backgroundColor: '#fff',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' }}>Resumen</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <View style={{
                  backgroundColor: '#f0f9f0',
                  padding: 15,
                  borderRadius: 12,
                  marginBottom: 15,
                  width: '48%',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3
                }}>
                  <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>Subtotal</Text>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#48bb78' }}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={{
                  backgroundColor: '#f0f9f0',
                  padding: 15,
                  borderRadius: 12,
                  marginBottom: 15,
                  width: '48%',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3
                }}>
                  <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>IVA</Text>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#48bb78' }}>${iva.toFixed(2)}</Text>
                </View>
                <View style={{
                  backgroundColor: '#e6f7e6',
                  padding: 15,
                  borderRadius: 12,
                  marginBottom: 15,
                  width: '48%',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3
                }}>
                  <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>Total</Text>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#48bb78' }}>${total.toFixed(2)}</Text>
                </View>
                <View style={{
                  backgroundColor: '#fef2f2',
                  padding: 15,
                  borderRadius: 12,
                  marginBottom: 15,
                  width: '48%',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3
                }}>
                  <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>Cambio</Text>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#c53030' }}>${change.toFixed(2)}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5, textAlign: 'center', padding: 5 }}>Información de Pago</Text>
              <View style={{
                padding: 20,
                backgroundColor: '#fff',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3
              }}>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 8,
                    fontSize: 22,
                    color: '#333',
                    paddingHorizontal: 15,
                    marginBottom: 15,
                    backgroundColor: '#f9f9f9'
                  }}
                  keyboardType="numeric"
                  placeholder="Monto pagado"
                  value={quantityPay}
                  onChangeText={setQuantityPay}
                />
                <DropDownPicker
                  open={openPay}
                  value={typePayValue}
                  items={payMethods}
                  setOpen={setOpenPay}
                  setValue={setTypePayValue}
                  containerStyle={{ marginBottom: 20 }}
                  style={{ borderColor: '#ccc', borderRadius: 8 }}
                  placeholder="Seleccione método de pago"
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fbbf24',
                    padding: 15,
                    borderRadius: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 5,
                    alignItems: 'center'
                  }}
                  onPress={handleSubmit}
                >
                  <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Vender</Text>
                </TouchableOpacity>
              </View>
              <Toast />
            </View>
          </View>
        </View>
      )
      }
    </View>

  )
}



