import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../OrderCard';
import './styles.css';

function CheckOutSideMenu() {
  const context = useContext(ShoppingCartContext);
  return (
    <aside
      className={`${
        context.isCheckOutSideMenuOpen ? 'flex' : 'hidden'
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>CheckOutSideMenu</h2>
        <div>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            onClick={() => context.closeCheckOutSideMenu()}
          ></XMarkIcon>
        </div>
      </div>
      <div className='px-6'>
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            imgUrl={product.images}
            price={product.price}
          />
        ))}
      </div>
    </aside>
  );
}

export default CheckOutSideMenu;
