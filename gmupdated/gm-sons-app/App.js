import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { CartProvider } from './contexts/CartContext';

const App = () => {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
};

export default App;
