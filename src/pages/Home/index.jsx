import { useContext } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import ProductDetail from '../../components/ProductDetail';
import { ShoppingCartContext } from '../../Context';

function Home() {
  const context = useContext(ShoppingCartContext);

  const currentPath = window.location.pathname;
  const activeTitle = currentPath.substring(1);

  const formatText = (text) => {
    const textWords = text.split(' ');
    const formatedTitle = textWords.map((word) =>
      /[A-Z]{2,}/.test(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return formatedTitle;
  };

  let titleFormated;
  if (currentPath !== '/') {
    titleFormated = formatText(activeTitle);
  } else {
    titleFormated = 'Home';
  }

  const renderView = () => {
    if (!context.loading) {
      if (context.filteredItems?.length > 0) {
        const items = context.filteredItems?.map((item) => {
          return <Card key={item.id} data={item} />;
        });
        return items;
      } else {
        return <div>We dont found matches</div>;
      }
    } else {
      setTimeout(() => {
        const displayLoading = () => {
          return <h1>Cargando</h1>;
        };
        return displayLoading();
      }, 0);
    }
  };

  return (
    <Layout>
      <section className='flex left-0 w-full items-center justify-around transform -skew-x-6'>
        <h1 className='text-white w-1/3 bg-gradient-to-r from-orange-500/80 to-white font-extrabold text-5xl p-4 '>
          {titleFormated}
        </h1>
        <input
          className='rounded-lg border w-1/3 border-black p-4 focus:outline-none '
          type='text'
          placeholder='Search a product'
          onChange={(event) => {
            context.setSearchByTitle(event.target.value);
          }}
        />
      </section>
      <div className='flex flex-col justify-center items-center'>
        <span className='grid gap-10 grid-cols-4 w-full max-w-screen-xl mt-8'>
          {renderView()}
        </span>
        <ProductDetail />
      </div>
    </Layout>
  );
}

export default Home;
