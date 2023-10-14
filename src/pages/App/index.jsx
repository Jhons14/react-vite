import { useRoutes, BrowserRouter } from 'react-router-dom';
import {
  ShoppingCartContext,
  ShoppingCartProvider,
  initializeLocalStorage,
} from '../../Context';
import NavBar from '../../components/NavBar';
import Home from '../Home';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import MyAccount from '../MyAccount';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import CheckOutSideMenu from '../../components/CheckOutSideMenu';
import './App.css';
import { useContext } from 'react';

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext);

  //Account
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  //State
  const signOut = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(signOut);

  //Has an account
  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount) === 0
    : true;
  const noAccountInLocalState = Object.keys(context.account).length === 0;
  const hasUserAnAccount = !noAccountInLocalState || !noAccountInLocalStorage;
  const isUserSignOut = context.signOut || parsedSignOut;

  let routes = useRoutes([
    // prettier-ignore
    { path: "/", element: hasUserAnAccount && !isUserSignOut ? <Home /> : <SignIn />  },
    {
      path: '/clothes',
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <SignIn />,
    },
    {
      path: '/electronics',
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <SignIn />,
    },
    {
      path: '/furnitures',
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <SignIn />,
    },
    {
      path: '/toys',
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <SignIn />,
    },
    {
      path: '/others',
      element: hasUserAnAccount && !isUserSignOut ? <Home /> : <SignIn />,
    },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/*', element: <NotFound /> },
    { path: '/sign-in', element: <SignIn /> },
  ]);
  return routes;
};

function App() {
  initializeLocalStorage();
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <NavBar />
        <CheckOutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}
export default App;
