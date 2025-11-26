import { createContext, useState, useContext, ReactNode } from "react";

interface CartContextType {
  sellData: any[];
  setSellData: React.Dispatch<React.SetStateAction<any[]>>;
  car: any;
  setCar: (car: any) => void;
  totalSell: any;
  setTotalSell: (total: any) => void;
  formData: any;
  setFormData: (data: any) => void;
  query: any;
  setQuery: (query: any) => void;
  typePayValue: any;
  setTypePayValue: (value: any) => void;
}

const InitialCartState: CartContextType = {
  sellData: [],
  setSellData: () => { },
  car: null,
  setCar: () => { },
  totalSell: 0,
  setTotalSell: () => { },
  formData: null,
  setFormData: () => { },
  query: null,
  setQuery: () => { },
  typePayValue: null,
  setTypePayValue: () => { },
};

const cartContext = createContext<CartContextType>(InitialCartState);
export const useCart = () => useContext(cartContext);
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {

  const [sellData, setSellData] = useState<any[]>([]);
  const [car, setCarState] = useState<any>(null);
  const [totalSell, setTotalSellState] = useState<any>(0);
  const [formData, setFormDataState] = useState<any>(null);
  const [query, setQueryState] = useState<any>(null);
  const [typePayValue, setTypePayValueState] = useState<any>(null);

  const setCar = (car: any) => {
    setCarState(car);
  };
  const setTotalSell = (total: any) => {
    setTotalSellState(total);
  };
  const setFormData = (data: any) => {
    setFormDataState(data);
  };
  const setQuery = (query: any) => {
    setQueryState(query);
  };
  const setTypePayValue = (value: any) => {
    setTypePayValueState(value);
  };

  const contextValue: CartContextType = {
    sellData,
    setSellData,
    car,
    setCar,
    totalSell,
    setTotalSell,
    formData,
    setFormData,
    query,
    setQuery,
    typePayValue,
    setTypePayValue,
  };
  return (
    <cartContext.Provider value={contextValue}>
      {children}
    </cartContext.Provider>
  );
};
