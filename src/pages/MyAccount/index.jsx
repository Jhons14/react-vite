import { useContext, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import { ShoppingCartContext } from '../../Context';

function MyAccount() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState('account-info');
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);
  const form = useRef(null);

  const editAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount);
    context.setAccount(data);
  };

  const renderAccounInfo = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span>Name: </span>
          <span className='font-bold'>{parsedAccount?.name}</span>
        </p>
        <p>
          <span>Email: </span>
          <span className='font-bold'>{parsedAccount?.email}</span>
        </p>
        <button
          className='border border-black rounded-lg mt-6 py-3'
          onClick={() => setView('edit-account-info')}
        >
          Edit
        </button>
      </div>
    );
  };

  const renderEditUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-light text-sm'>
            Your name:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            defaultValue={parsedAccount.name}
            placeholder='Peter'
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-light text-sm'>
            Your email:
          </label>
          <input
            type='text'
            id='email'
            name='email'
            defaultValue={parsedAccount.email}
            placeholder='hi@helloworld.com'
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='font-light text-sm'>
            Your password:
          </label>
          <input
            type='text'
            id='password'
            name='password'
            defaultValue={parsedAccount.password}
            placeholder='******'
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <button
          className='bg-black text-white w-full rounded-lg py-3'
          onClick={() => {
            setView('user-info'), editAccount();
          }}
        >
          Confirm
        </button>
      </form>
    );
  };

  const renderView = () =>
    view === 'account-info' ? renderAccounInfo() : renderEditUserInfo();
  return (
    <Layout>
      <h1 className='font-bold text-lg mb-8'>My Account</h1>
      {renderView()}
    </Layout>
  );
}

export default MyAccount;
