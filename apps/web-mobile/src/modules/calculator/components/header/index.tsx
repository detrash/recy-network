import { Outlet } from 'react-router-dom';

import LocaleToggler from '@/components/locale-toggler';

export function HeaderSimple() {
  return (
    <>
      <header className="f sticky top-0 w-full border-b bg-white py-3">
        <div className="container flex items-center justify-between gap-4">
          <div className="w-14 flex justify-center items-center">
            <a href="https://site.recy.life">
              <img
                src="/assets/brand/recy-logo.png"
                alt="Recy Network"
              />
            </a>
          </div>

          <div className="w-14 flex justify-center items-center">
            <a href="/calculator">
              <img
                src="/assets/brand/recy-certificate-logo.png"
                alt="Recy Network"
              />
            </a>
          </div>

          <div className="w-14 flex justify-center items-center">
            <LocaleToggler />
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
