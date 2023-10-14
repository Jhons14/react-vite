import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

function NavBar() {
  const context = useContext(ShoppingCartContext);
  const activeStyle = 'bg-orange-500/80 text-white rounded py-1 px-2';

  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  const signOut = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = Object.keys(context.account).length === 0;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleCheckoutSideMenu = () => {
    if (context.isCheckOutSideMenuOpen) {
      context.closeCheckOutSideMenu();
    } else {
      context.openCheckOutSideMenu();
    }
  };

  const handleSignOut = () => {
    const stringfiedSignOut = JSON.stringify(true);
    localStorage.setItem('sign-out', stringfiedSignOut);
    context.setSignOut(true);
  };

  const renderView = () => {
    if (hasUserAnAccount || !context.signOut) {
      return (
        <>
          <li className='text-black/50'>{parsedAccount.email}</li>
          <li>
            <NavLink
              to='/my-orders'
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? activeStyle : ''
              }
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-account'
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? activeStyle : ''
              }
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/sign-in'
              onClick={() => handleSignOut()}
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? activeStyle : ''
              }
            >
              SignOut
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <NavLink
            to='/sign-in'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign in
          </NavLink>
        </li>
      );
    }
  };

  return (
    <nav className='flex justify-between items-center fixed bg-white z-10 top-0 w-full px-8 py-4 font-medium text-sm'>
      <ul className='flex items-center gap-3'>
        <li className='font-bold text-lg'>
          <NavLink to={`${isUserSignOut ? 'sign-in' : '/'}`}>KHD</NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            onClick={() => context.setSearchByCategory(null)}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? activeStyle : ''
            }
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/clothes'
            onClick={() => context.setSearchByCategory('clothes')}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? activeStyle : ''
            }
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            onClick={() => context.setSearchByCategory('electronics')}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? activeStyle : ''
            }
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/furnitures'
            onClick={() => context.setSearchByCategory('furnitures')}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? activeStyle : ''
            }
          >
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/toys'
            onClick={() => context.setSearchByCategory('toys')}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? activeStyle : ''
            }
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/others'
            onClick={() => context.setSearchByCategory('others')}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? activeStyle : ''
            }
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
        {renderView()}
        <li>
          <span
            className='flex items-center text-black cursor-pointer'
            onClick={handleCheckoutSideMenu}
          >
            <ShoppingCartIcon className='h-6 w-6 text-black cursor-pointer' />
            <div>{context.cartProducts.length}</div>
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
