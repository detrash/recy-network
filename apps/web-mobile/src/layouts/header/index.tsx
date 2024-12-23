import { Outlet } from 'react-router-dom';

import { Menu } from './menu';

export function Header() {
  return (
    <>
      <header className="sticky top-0 mx-auto flex w-full items-center justify-between border-b bg-white p-4">
        <div className="container">
          <Menu />
        </div>
      </header>
      <Outlet />
    </>
  );
}
