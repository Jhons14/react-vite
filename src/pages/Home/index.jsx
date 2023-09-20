import { useContext } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import ProductDetail from '../../components/ProductDetail';
import { ShoppingCartContext } from '../../Context';

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map((item) => (
        <Card key={item.id} data={item} />
      ));
    } else {
      return <div>We dont found matches</div>;
    }
  };
  return (
    <Layout>
      <div className='flex justify-center items-center relative w-80 mb-4'>
        <h1 className=' font-medium text-lg '>Exotic products</h1>
      </div>
      <input
        type='text'
        placeholder='Search a product'
        className='rounded-lg border border-black p-4 mb-4 focus:outline-none'
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-xl mt-8'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
