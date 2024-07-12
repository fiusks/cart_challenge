import { ReactElement, ReactNode } from 'react';

interface DrawerProps {
  onClose: () => void;
  children: ReactNode;
  title?: string;
  position?: string;
  icon?: ReactNode;
}

const Drawer = ({
  onClose,
  children,
  title,
  icon,
  position = 'right',
}: DrawerProps) => {
  const positionClass = position === 'left' ? 'left-0' : 'right-0';

  return (
    <div
      className={`fixed inset-y-0 ${positionClass} transform transition-transform duration-300 ease-in-out
      translate-x-0 w-full sm:w-1/2 md:w-1/3 lg:w-25 bg-white shadow-lg z-50`}
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
