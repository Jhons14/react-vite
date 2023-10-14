import { useContext } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

import { ShoppingCartContext } from '../../Context';

function Card(data) {
  const context = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
    context.closeCheckOutSideMenu();
  };

  const shoppingCartRender = (productChoosed) => {
    const checked = (
      <ShoppingCartIcon
        className='h-7 w-7 bg-white/60 text-orange-500/80 flex flex-col text-center justify-center items-center absolute top-0 right-0 m-2 gap-1  p-1 rounded-sm'
        onClick={(event) => {
          context.addProductsToCart(event, data.data, 'add');
        }}
      />
    );
    const unChecked = (
      <ShoppingCartIcon
        className='h-7 w-7 bg-white/60 text-black flex flex-col text-center justify-center items-center absolute top-0 right-0 m-2 gap-1  p-1 rounded-sm'
        onClick={(event) => {
          context.addProductsToCart(event, data.data, 'add');
        }}
      />
    );
    if (context.cartProducts.length > 0) {
      const isInCart =
        context.cartProducts.filter(
          (product) => productChoosed.id === product.id
        ).length > 0;
      if (isInCart) {
        return checked;
      } else {
        return unChecked;
      }
    } else {
      return unChecked;
    }
  };

  return (
    <div
      className='bg-orange-300/20 p-4 w-72 cursor-pointer  rounded-lg'
      onClick={() => showProduct(data.data)}
    >
      <figure className='relative w-full h-52 mb-3'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>
          {data.data.category.name}
        </span>
        <img
          className='w-full h-full object-cover rounded-lg'
          src={data.data.images[0]}
          alt={data.data.title}
        />
        {shoppingCartRender(data.data)}
      </figure>
      <section className='flex flex-col p-2 '>
        <div className='flex mb-4  items-center justify-between'>
          <span className='text-sm font-medium leading-4 pr-4  '>
            {data.data.title}
          </span>
          <span className='text-lg font-medium'>${data.data.price}</span>
        </div>
        <p className='text-xs font-light leading-3 h-full'>
          {data.data.description}
        </p>
      </section>
    </div>
  );
}

export default Card;
