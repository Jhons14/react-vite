import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../components/Layout';
import OrdersCard from '../../components/OrdersCard';
import { Link } from 'react-router-dom';

function MyOrders() {
  const context = useContext(ShoppingCartContext);
  return (
    <Layout>
      <div className='flex justify-center items-center relative w-80 mb-4'>
        <h1 className=' font-medium text-lg '>My Orders</h1>
      </div>
      {context.order.map((order, index) => (
        <Link to={`/my-orders/${index}`} key={index}>
          <OrdersCard
            date={order.date}
            totalProducts={order.totalProducts}
            totalPrice={order.totalPrice}
          />
        </Link>
      ))}
    </Layout>
  );
}

export default MyOrders;
