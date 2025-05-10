
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  Calendar, 
  FileText, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Patients', href: '/patients', icon: Users },
    { name: 'Doctors', href: '/doctors', icon: UserRound },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Medical Records', href: '/records', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const NavLink = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;
    
    return (
      <Link
        to={item.href}
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
          isActive 
            ? "bg-hospital-600 text-white" 
            : "hover:bg-hospital-100 hover:text-hospital-700"
        )}
      >
        <Icon className="h-5 w-5" />
        {item.name}
      </Link>
    );
  };

  const renderNavItems = () => (
    <div className="space-y-1">
      {navigation.map((item) => (
        <NavLink key={item.name} item={item} />
      ))}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r pt-5 overflow-y-auto">
            <div className="flex items-center justify-center px-4">
              <h1 className="text-xl font-bold text-hospital-700">HMS</h1>
            </div>
            <div className="mt-8 flex flex-col flex-1 px-4">
              {renderNavItems()}
            </div>
            <div className="p-4">
              <div className="bg-hospital-50 p-3 rounded-lg">
                <p className="text-sm text-hospital-700 font-medium">Hospital Management System</p>
                <p className="text-xs text-hospital-500 mt-1">v1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content area */}
      <div className={cn("flex flex-col flex-1", !isMobile && "md:pl-64")}>
        {/* Mobile top navigation */}
        <div className="md:hidden bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-hospital-700">HMS</h1>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold text-hospital-700">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4 flex-1 overflow-y-auto">
                  {renderNavItems()}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 overflow-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
