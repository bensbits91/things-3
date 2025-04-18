import { NavigationMenu, List, Item, Link } from '@radix-ui/react-navigation-menu';
import { FC } from 'react';

type NavMenuProps = {};

const NavMenu: FC<NavMenuProps> = () => {
   return (
      <NavigationMenu
         aria-label='Main navigation'
         className='fixed top-0 left-0 right-0 shadow-md z-10 border-b-1 border-white bg-black'>
         <List className='flex items-center justify-end gap-8 h-12 px-4'>
            <Item>
               <Link href='/'>Home</Link>
            </Item>
            <Item>
               <Link href='/things'>My Things</Link>
            </Item>
            <Item>
               <Link href='/search'>Search</Link>
            </Item>
         </List>
      </NavigationMenu>
   );
};

export default NavMenu;
