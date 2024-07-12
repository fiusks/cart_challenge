// components/drawer.tsx
import { ReactElement, ReactNode } from 'react';

interface DrawerProps {
  onClose: () => void;
  children: ReactNode;
  title: string;
  icon?: ReactElement;
}

const Drawer = ({ onClose, children, title, icon }: DrawerProps) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 transform 'translate-x-0' : 'translate-x-full'
      transition-transform duration-300 ease-in-out w-[340px] bg-white shadow-lg z-50`}
    >
      <div className="p-4 space-x-5 justify-between text-center flex w-full">
        <div className="flex items-center space-x-2">
          <div className="text-xl">{icon}</div>
          <div className="text-sm font-semibold">{title}</div>
        </div>
        <button className="text-gray-500 text-lg" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="overflow-y-auto h-full p-4">{children}</div>
    </div>
  );
};

export default Drawer;
