import { XMarkIcon } from '@heroicons/react/24/solid';

function OrderCard(props) {
  const { id, title, imgUrl, price, handleDelete } = props;
  let renderXMarkIcon;
  if (handleDelete) {
    renderXMarkIcon = (
      <XMarkIcon
        onClick={() => handleDelete(id)}
        className='h-6 w-6 text-black cursor-pointer'
      ></XMarkIcon>
    );
  }
  return (
    <div className='flex justify-between mb-3'>
      <div className='flex items-center gap-1 w-60'>
        <figure className='w-20 h-20'>
          <img className='w-15 h-15 rounded-lg' src={imgUrl} alt={title} />
        </figure>
        <p className='text-sm font-light'>{title}</p>
      </div>
      <div className='flex items-center gap-1'>
        <p className='text-lg font-medium'>${price}</p>
        {renderXMarkIcon}
      </div>
    </div>
  );
}

export default OrderCard;
