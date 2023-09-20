import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider } from '../../Context';
import NavBar from '../../components/NavBar';
import Home from '../Home';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import MyAccount from '../MyAccount';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import CheckOutSideMenu from '../../components/CheckOutSideMenu';
import './App.css';

function App() {
  const AppRoutes = () => {
    let routes = useRoutes([
      // prettier-ignore
      { path: "/", element: <Home /> },
      { path: '/clothes', element: <Home /> },
      { path: '/electronics', element: <Home /> },
      { path: '/furnitures', element: <Home /> },
      { path: '/toys', element: <Home /> },
      { path: '/others', element: <Home /> },
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
