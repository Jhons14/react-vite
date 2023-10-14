import { createContext, useEffect, useReducer } from 'react';

export const ShoppingCartContext = createContext();

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem('account');
  const signOutInLocalStorage = localStorage.getItem('sign-out');

  if (!accountInLocalStorage) {
    localStorage.setItem('account', JSON.stringify({}));
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem('sign-out', JSON.stringify(false));
  }
};

export const ShoppingCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  //Shopping Cart - Cart Products
  const onOpenCheckOutSideMenu = () =>
    dispatch({ type: actionTypes.openCheckOutSideMenu });

  const onCloseCheckOutSideMenu = () =>
    dispatch({ type: actionTypes.closeCheckOutSideMenu });

  const onOpenProductDetail = () =>
    dispatch({ type: actionTypes.openProductDetail });

  const onCloseProductDetail = () =>
    dispatch({ type: actionTypes.closeProductDetail });

  const onSetItems = (items) =>
    dispatch({ type: actionTypes.setItems, payload: items });

  const onSetLoading = (state) =>
    dispatch({ type: actionTypes.setLoading, payload: state });

  const onSetFilteredItems = (items) =>
    dispatch({ type: actionTypes.setFilteredItems, payload: items });

  const onSetCartProducts = (items) =>
    dispatch({
      type: actionTypes.setCartProducts,
      payload: items,
    });

  const onSetProductToShow = (items) =>
    dispatch({
      type: actionTypes.setProductToShow,
      payload: items,
    });

  const onSetOrder = (order) =>
    dispatch({ type: actionTypes.setOrder, payload: order });

  const onSetSearchByTitle = (title) =>
    dispatch({ type: actionTypes.setSearchByTitle, payload: title });

  const onSetSearchByCategory = (category) =>
    dispatch({ type: actionTypes.setSearchByCategory, payload: category });

  const onSetAccount = (account) =>
    dispatch({ type: actionTypes.setAccount, payload: account });

  const onSetSignOut = (payload) =>
    dispatch({ type: actionTypes.setSignOut, payload: payload });

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((response) => response.json())
      .then((data) => onSetItems(data))
      .finally(() => onSetLoading(false));
  }, []);

  //getProductsByTitle

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  //getProductsByCategory

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

  const addProductsToCart = (event, product, type) => {
    event.stopPropagation();
    const isInCart =
      state.cartProducts.filter((prod) => prod.id === product.id).length > 0;
    if (isInCart) {
      let deleteItem = false;
      let newCart = state.cartProducts.map((item) => {
        if (item.id === product.id) {
          let newPrice, newQuantity;
          if (type === 'add') {
            newQuantity = item.quantity + 1;
            newPrice = item.originalPrice * newQuantity;
            return {
              ...item,
              quantity: newQuantity,
              price: newPrice,
            };
          } else if (type === 'remove') {
            if (item.quantity > 1) {
              newQuantity = item.quantity - 1;
              newPrice = item.originalPrice * newQuantity;
            } else {
              deleteItem = true;
              newQuantity = 1;
              newPrice = item.originalPrice * newQuantity;
            }
            return {
              ...item,
              quantity: newQuantity,
              price: newPrice,
            };
          }
        } else {
          return item;
        }
      });
      if (deleteItem) {
        newCart = state.cartProducts.filter((item) => item !== product);
      }
      onSetCartProducts(newCart);
    } else {
      onSetCartProducts([
        ...state.cartProducts,
        { ...product, quantity: 1, originalPrice: product.price },
      ]);
    }
    onOpenCheckOutSideMenu();
    onCloseProductDetail();
  };
  useEffect(() => {
    if (state.searchByTitle && !state.searchByCategory) {
      return onSetFilteredItems(
        filterBy(
          state.items,
          'BY_TITLE',
          state.searchByTitle,
          state.searchByCategory
        )
      );
    }
    if (state.searchByCategory && !state.searchByTitle) {
      return onSetFilteredItems(
        filterBy(
          state.items,
          'BY_CATEGORY',
          state.searchByTitle,
          state.searchByCategory
        )
      );
    }

    if (state.searchByCategory && state.searchByTitle) {
      return onSetFilteredItems(
        filterBy(
          state.items,
          'BY_TITLE_AND_CATEGORY',
          state.searchByTitle,
          state.searchByCategory
        )
      );
    }
    if (!state.searchByCategory && !state.searchByTitle) {
      return onSetFilteredItems(
        filterBy(state.items, null, state.searchByTitle, state.searchByCategory)
      );
    }
  }, [state.items, state.searchByTitle, state.searchByCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
        isProductDetailOpen: state.isProductDetailOpen,
        productToShow: state.productToShow,
        cartProducts: state.cartProducts,
        order: state.order,
        isCheckOutSideMenuOpen: state.isCheckOutSideMenuOpen,
        items: state.items,
        searchByTitle: state.searchByTitle,
        filteredItems: state.filteredItems,
        searchByCategory: state.searchByCategory,
        loading: state.loading,
        account: state.account,
        signOut: state.signOut,
        setProductToShow: onSetProductToShow,
        setSearchByTitle: onSetSearchByTitle,
        setCartProducts: onSetCartProducts,
        setOrder: onSetOrder,
        setItems: onSetItems,
        setSearchByCategory: onSetSearchByCategory,
        setLoading: onSetLoading,
        setAccount: onSetAccount,
        setSignOut: onSetSignOut,
        openProductDetail: onOpenProductDetail,
        closeProductDetail: onCloseProductDetail,
        openCheckOutSideMenu: onOpenCheckOutSideMenu,
        closeCheckOutSideMenu: onCloseCheckOutSideMenu,
        addProductsToCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
const initialState = () => {
  return {
    cartProducts: [],
    //ShoppingCart - CheckOut Side Menu
    isCheckOutSideMenuOpen: false,
    //ShoppingCart - Orders
    order: [],
    //productDetail - show Product Detail
    isProductDetailOpen: false,
    //Product Detail - choose Product to show
    productToShow: {},
    //Loading
    loading: true,
    //getProducts
    items: null,
    searchByTitle: null,
    filteredItems: null,
    searchByCategory: null,
    account: {},
    signOut: false,
  };
};

const reducerObject = (state, payload) => ({
  [actionTypes.openCheckOutSideMenu]: {
    ...state,
    isCheckOutSideMenuOpen: true,
  },
  [actionTypes.closeCheckOutSideMenu]: {
    ...state,
    isCheckOutSideMenuOpen: false,
  },
  [actionTypes.openProductDetail]: {
    ...state,
    isProductDetailOpen: true,
  },
  [actionTypes.closeProductDetail]: {
    ...state,
    isProductDetailOpen: false,
  },
  [actionTypes.setSignOut]: {
    ...state,
    signOut: payload,
  },
  [actionTypes.setItems]: {
    ...state,
    items: payload,
  },
  [actionTypes.setLoading]: {
    ...state,
    loading: payload,
  },
  [actionTypes.setCartProducts]: {
    ...state,
    cartProducts: payload,
  },
  [actionTypes.setProductToShow]: {
    ...state,
    productToShow: payload,
  },
  [actionTypes.setOrder]: {
    ...state,
    order: payload,
  },
  [actionTypes.setSearchByTitle]: {
    ...state,
    searchByTitle: payload,
  },
  [actionTypes.setSearchByCategory]: {
    ...state,
    searchByCategory: payload,
  },
  [actionTypes.setFilteredItems]: {
    ...state,
    filteredItems: payload,
  },
  [actionTypes.setAccount]: {
    ...state,
    account: payload,
  },
});
const actionTypes = {
  openCheckOutSideMenu: 'OPEN_CHECKOUT_SIDE_MENU',
  closeCheckOutSideMenu: 'CLOSE_CHECKOUT_SIDE_MENU',
  openProductDetail: 'OPEN_PRODUCT_DETAIL',
  closeProductDetail: 'CLOSE_PRODUCT_DETAIL',
  setItems: 'SET_ITEMS',
  setFilteredItems: 'SET_FILTERED_ITEMS',
  setCartProducts: 'SET_CART_PRODUCTS',
  setProductToShow: 'SET_PRODUCT_TO_SHOW',
  setOrder: 'SET_ORDER',
  setSearchByTitle: 'SET_SEARCH_BY_TITLE',
  setSearchByCategory: 'SET_SEARCH_BY_CATEGORY',
  setLoading: 'SET_LOADING',
  setAccount: 'SET_ACCOUNT',
  setSignOut: 'SET_SIGN_OUT',
};

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};
