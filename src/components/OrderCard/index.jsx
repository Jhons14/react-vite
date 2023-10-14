import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';

function OrderCard(props) {
  const { id, title, imgUrl, price, quantity, handleDelete } = props;
  const context = useContext(ShoppingCartContext);

  let renderMinusIcon;
  let renderPlusIcon;
  if (props.handleDelete && props.product) {
    renderMinusIcon = (
      <MinusIcon
        onClick={(event) =>
          context.addProductsToCart(event, props.product, 'remove')
        }
        className='h-4 w-4 bg-orange-400/80 text-white rounded-sm cursor-pointer hover:bg-orange-600/80 hover:h-5 hover:w-5'
      ></MinusIcon>
    );
    renderPlusIcon = (
      <PlusIcon
        onClick={(event) =>
          context.addProductsToCart(event, props.product, 'add')
        }
        className='h-4 w-4 bg-orange-400/80 text-white rounded-sm cursor-pointer hover:bg-orange-600/80 hover:h-5 hover:w-5'
      ></PlusIcon>
    );
  }
  return (
    <div className='flex justify-between relative p-3'>
      <div className='flex items-center gap-1 w-full'>
        <figure className=' relative'>
          <img className='rounded-lg w-24 h-24' src={imgUrl} alt={title} />
        </figure>
        <span className='flex  flex-col'>
          <p className='text-sm font-light'>{title}</p>
          <p className='text-lg font-bold'>${price}</p>
        </span>
      </div>
      <div className='flex items-center gap-2 right-0 bottom-3 absolute'>
        {renderMinusIcon}
        <span className='flex items-center text-xs'>{quantity}</span>
        {renderPlusIcon}
      </div>
      <XMarkIcon
        onClick={() => handleDelete(id)}
        className='text-black h-4 w-4 top-5 right-0 absolute cursor-pointer'
      />
    </div>
  );
}

export default OrderCard;
