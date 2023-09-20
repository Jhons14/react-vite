import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

function NavBar() {
  const activeStyle = 'underline underline-offset-4';
  const handleCheckoutSideMenu = () => {
    if (context.isCheckOutSideMenuOpen) {
      context.closeCheckOutSideMenu();
    } else {
      context.openCheckOutSideMenu();
    }
  };
  const context = useContext(ShoppingCartContext);

  return (
    <nav className='flex justify-between items-center fixed bg-white z-10 top-0 w-full px-8 py-4 font-medium text-sm'>
      <ul className='flex items-center gap-3'>
        <li className='font-bold text-lg'>
          <NavLink to='/'>KHD</NavLink>
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
        <li className='text-black/50'>jhons@123.com</li>
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
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? activeStyle : ''
            }
          >
            Sign In
          </NavLink>
        </li>
        <li className='flex items-center'>
          <ShoppingCartIcon
            className='h-6 w-6 text-black cursor-pointer'
            onClick={() => handleCheckoutSideMenu()}
          />
          <div>{context.cartProducts.length}</div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
