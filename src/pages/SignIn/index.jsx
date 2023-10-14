import { useContext, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import { Link, Navigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';

function SignIn() {
  const [view, setView] = useState('user-info');
  const form = useRef(null);

  const context = useContext(ShoppingCartContext);
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;

  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem('sign-out', stringifiedSignOut);
    context.setSignOut(false);
    return <Navigate to={'/'} replace />;
  };
  const createAccount = () => {
    //Build account data
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    //Creating account
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount);
    context.setAccount(data);

    //Sign in the new account
    handleSignIn();
  };

  const renderLogin = () => {
    return (
      <div className='flex flex-col w-80 '>
        <p className='flex flex-col'>
          <span>Email:</span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p className='flex flex-col mb-5'>
          <span>Password:</span>
          <span>{parsedAccount?.password}</span>
        </p>
        <Link to={'/'}>
          <button
            className='bg-black py-3 text-white disabled:bg-black/40 w-full rounded-lg mt-4 mb-2'
            disabled={!hasUserAnAccount}
            onClick={() => handleSignIn()}
          >
            Log In
          </button>
        </Link>
        <div className='text-center'>
          <a className='text-xs underline underline-offset-4' href='/'>
            Forgot your password?
          </a>
        </div>
        <Link>
          <button
            className='border font-bold border-black py-3 text-black disabled:bg-black/40 disabled:border-black/40 w-full rounded-lg mt-6'
            disabled={hasUserAnAccount}
            onClick={() => setView('create-user-info')}
          >
            Sign up
          </button>
        </Link>
      </div>
    );
  };

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col w-80 gap-4'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='text-sm font-bold'>
            Name
          </label>
          <input
            className='rounded-lg border border-black placeholder:text-black/60 placeholder:font-light focus:outline-none py-2 px-4'
            type='text'
            id='name'
            name='name'
            defaultValue={parsedAccount?.name}
            placeholder='peter'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='text-sm font-bold'>
            Email
          </label>
          <input
            className='rounded-lg border border-black placeholder:text-sm placeholder:text-black/60 placeholder:font-light focus:outline-none py-2 px-4'
            type='text'
            id='email'
            name='email'
            defaultValue={parsedAccount?.name}
            placeholder='tunombre@123.com'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='text-sm font-bold'>
            Password
          </label>
          <input
            className='rounded-lg border border-black placeholder:text-sm placeholder:text-black/60 placeholder:font-light focus:outline-none py-2 px-4'
            type='password'
            id='password'
            name='password'
            defaultValue={parsedAccount?.name}
            placeholder='*****'
          />
        </div>
        <Link to={'/'}>
          <button
            className='bg-black text-white rounded-lg border placeholder:text-sm border-black w-full py-3'
            onClick={() => createAccount()}
          >
            Create account
          </button>
        </Link>
      </form>
    );
  };

  const renderView = () =>
    view === 'create-user-info' ? renderCreateUserInfo() : renderLogin();

  return (
    <Layout>
      <h1 className='mb-10 text-2xl font-bold'>Welcome</h1>
      {renderView()}
    </Layout>
  );
}

export default SignIn;
