import { useContext } from 'react';
import SidebarContext, { SidebarProvider } from '../../context/SidebarContext';
import Header from '../../example/components/Header';
import Sidebar from '../../example/components/Sidebar';
import Main from './Main';

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <SidebarProvider>
      <div
        className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
          isSidebarOpen && 'overflow-hidden'
        }`}
      >
        <Sidebar />
        <div className="flex w-full flex-1 flex-col">
          <Header />
          <Main>{children}</Main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
