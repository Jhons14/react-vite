import { ChevronRightIcon } from '@heroicons/react/24/solid';

function OrdersCard(props) {
  const { totalPrice, totalProducts, date } = props;

  return (
    <div className='flex gap-5 justify-between items-center mb-3 font-light p-4 border border-black rounded-lg w-80'>
      <div className='flex justify-between w-full'>
        <p className='flex flex-col font-light'>
          <span className='font-light'>{date}</span>
          <span className='font-light'>{totalProducts} articules</span>
        </p>
        <p className='flex items-center gap-2'>
          <span className=' font-medium text-2xl'>${totalPrice}</span>
          <ChevronRightIcon className='h-6 w-6 text-black' />
        </p>
      </div>
    </div>
  );
}

export default OrdersCard;
