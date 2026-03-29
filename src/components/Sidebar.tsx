import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Palette, 
  Users, 
  Settings, 
  ChevronRight,
  Atom,
  Image,
  Building2
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Layers, label: 'Componentes', path: '/components' },
  { icon: Palette, label: 'Design Tokens', path: '/tokens' },
  { icon: Image, label: 'Peças', path: '/pecas' },
  { icon: Users, label: 'Time', path: '/team' },
  { icon: Building2, label: 'Clientes', path: '/clientes' },
];

export default function Sidebar() {
  return (
    <aside className="w-20 h-screen sticky top-0 border-r border-black/5 bg-white flex flex-col items-center py-8">
      <div className="mb-10">
        <div className="w-12 h-12 bg-[#1A1C1E] rounded-2xl flex items-center justify-center shadow-lg shadow-black/10">
          <Atom className="text-white w-6 h-6" />
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.label}
            className={({ isActive }) => `
              w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300
              ${isActive 
                ? 'bg-[#E2E8F0] text-[#1A1C1E]' 
                : 'text-[#1A1C1E]/40 hover:text-[#1A1C1E] hover:bg-black/5'}
            `}
          >
            <item.icon size={22} strokeWidth={1.5} />
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <button className="w-12 h-12 flex items-center justify-center rounded-2xl text-[#1A1C1E]/40 hover:text-[#1A1C1E] hover:bg-black/5 transition-all">
          <Settings size={22} strokeWidth={1.5} />
        </button>
        
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </div>
    </aside>
  );
}
