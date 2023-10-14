import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

import Layout from '../../components/Layout';
import OrderCard from '../../components/OrderCard';

import { ShoppingCartContext } from '../../Context';

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  if (index === 'last') {
    index = context.order?.length - 1;
  }
  return (
    <Layout>
      <div className='w-80'>
        <div className='flex relative items-center justify-center mb-10'>
          <Link to='/my-orders' className='absolute left-0 '>
            <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
          </Link>
          <h1>My Order</h1>
        </div>
        <div className='px-6 flex-1 mb-10'>
          {context.order?.[index]?.products.map((product) => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imgUrl={product.images[0]}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
        <p className='flex justify-between '>
          <span className='font-light text-base'>Total price: </span>
          <span className='font-bold text-lg'>
            ${context.order?.[index]?.totalPrice}
          </span>
        </p>
      </div>
    </Layout>
  );
}

export default MyOrder;
