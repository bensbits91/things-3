import {
   NavigationMenu,
   List,
   Item,
   Link
} from '@radix-ui/react-navigation-menu';

export default function NavMenu() {
   return (
      <NavigationMenu
         aria-label="Main navigation"
         className="fixed top-0 right-0 left-0 z-10 border-b-1 bg-black shadow-md">
         <List className="flex h-12 items-center justify-end gap-8 px-4">
            <Item>
               <Link href="/">Home</Link>
            </Item>
            <Item>
               <Link href="/things">My Things</Link>
            </Item>
            <Item>
               <Link href="/search">Search</Link>
            </Item>
         </List>
      </NavigationMenu>
   );
}
