import { createContext, useState, useEffect } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  //Shopping Cart - Cart Products
  const [cartProducts, setCartProducts] = useState([]);
  //ShoppingCart - CheckOut Side Menu
  const [isCheckOutSideMenuOpen, setCheckOutSideMenuOpen] = useState(false);
  const openCheckOutSideMenu = () => {
    setCheckOutSideMenuOpen(true);
  };
  const closeCheckOutSideMenu = () => {
    setCheckOutSideMenuOpen(false);
  };
  //ShoppingCart - Orders
  const [order, setOrder] = useState([]);

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

  //getProducts
  const [items, setItems] = useState(null);
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  //getProductsByTitle
  const [searchByTitle, setSearchByTitle] = useState(null);

  const [filteredItems, setFilteredItems] = useState(null);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  //getProductsByCategory
  const [searchByCategory, setSearchByCategory] = useState(null);

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter((item) =>
      item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = (items, filterType, searchByTitle, searchByCategory) => {
    if (filterType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle);
    }
    if (filterType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory);
    }
    if (filterType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }
    if (!filterType) {
      return items;
    }
  };

  useEffect(() => {
    if (searchByTitle && !searchByCategory) {
      return setFilteredItems(
        filterBy(items, 'BY_TITLE', searchByTitle, searchByCategory)
      );
    }
    if (searchByCategory && !searchByTitle) {
      return setFilteredItems(
        filterBy(items, 'BY_CATEGORY', searchByTitle, searchByCategory)
      );
    }

    if (searchByCategory && searchByTitle) {
      return setFilteredItems(
        filterBy(
          items,
          'BY_TITLE_AND_CATEGORY',
          searchByTitle,
          searchByCategory
        )
      );
    }
    if (!searchByCategory && !searchByTitle) {
      return setFilteredItems(
        filterBy(items, null, searchByTitle, searchByCategory)
      );
    }
  }, [items, searchByTitle, searchByCategory]);
  return (
    <ShoppingCartContext.Provider
      value={{
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
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
