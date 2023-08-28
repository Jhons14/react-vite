import { createContext, useState } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  //Shopping cart - cart counter
  const [count, setCount] = useState(0);
  //Shopping Cart - Cart Products
  const [cartProducts, setCartProducts] = useState([]);
  //shoppingCart - CheckOut Side Menu
  const [isCheckOutSideMenuOpen, setCheckOutSideMenuOpen] = useState(false);
  const openCheckOutSideMenu = () => {
    setCheckOutSideMenuOpen(true);
  };
  const closeCheckOutSideMenu = () => {
    setCheckOutSideMenuOpen(false);
  };

  //productDetail - show Product Detail
  const [isProductDetailOpen, setProductDetailOpen] = useState(false);
  const openProductDetail = () => {
    setProductDetailOpen(true);
  };
  const closeProductDetail = () => {
    setProductDetailOpen(false);
  };
  //Product Detail - choose Product to show
  const [productToShow, setProductToShow] = useState({});

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckOutSideMenuOpen,
        openCheckOutSideMenu,
        closeCheckOutSideMenu,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
