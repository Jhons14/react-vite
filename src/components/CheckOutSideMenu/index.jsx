import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { totalPrice } from '../../utils';
import OrderCard from '../OrderCard';
import './styles.css';

function CheckOutSideMenu() {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleTimeString(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };
    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.closeCheckOutSideMenu();
    context.setSearchByTitle(null);
  };
  return (
    <aside
      className={`${
        context.isCheckOutSideMenuOpen ? 'flex' : 'hidden'
      } checkout-side-menu flex-col fixed right-0 border rounded-lg bg-white`}
    >
      <div className='flex justify-between items-center p-6 mb-1'>
        <h2 className='font-medium text-xl'>Checkout</h2>
        <div>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            onClick={() => context.closeCheckOutSideMenu()}
          ></XMarkIcon>
        </div>
      </div>

      <div className={`overflow-y-scroll px-6 flex-1`}>
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imgUrl={product.images[0]}
            price={product.price}
            quantity={product.quantity}
            product={product}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className='px-6 mb-6'>
        <p className='flex px-3 py-3 justify-between items-center border rounded-lg border-black/20 mb-2'>
          <span className='text-base'>Total price: </span>
          <span className='font-bold text-xl'>
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to='/my-orders/last'>
          <button
            className='w-full bg-black text-white rounded-lg py-3'
            onClick={() => handleCheckout()}
          >
            CheckOut
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default CheckOutSideMenu;
