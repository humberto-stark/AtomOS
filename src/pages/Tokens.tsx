import { motion } from 'motion/react';
import { Palette, Type, Square, Layout, Box } from 'lucide-react';

const tokens = {
  colors: [
    { name: 'Primary', hex: '#1A1C1E', label: 'Dark Zinc' },
    { name: 'Background', hex: '#F0F4F8', label: 'Light Blue Gray' },
    { name: 'Surface', hex: '#FFFFFF', label: 'White' },
    { name: 'Border', hex: 'rgba(0,0,0,0.05)', label: 'Black 5%' },
    { name: 'Text', hex: '#1A1C1E', label: 'Dark Zinc' },
    { name: 'Muted', hex: 'rgba(26,28,30,0.4)', label: 'Dark Zinc 40%' },
  ],
  typography: [
    { name: 'Display', size: '64px', weight: 'Bold', family: 'Inter' },
    { name: 'Heading 1', size: '32px', weight: 'Bold', family: 'Inter' },
    { name: 'Heading 2', size: '24px', weight: 'Semibold', family: 'Inter' },
    { name: 'Body Large', size: '18px', weight: 'Regular', family: 'Inter' },
    { name: 'Body Base', size: '16px', weight: 'Regular', family: 'Inter' },
    { name: 'Caption', size: '12px', weight: 'Medium', family: 'Inter' },
  ],
  spacing: [
    { name: 'xs', value: '4px', rem: '0.25rem' },
    { name: 'sm', value: '8px', rem: '0.5rem' },
    { name: 'md', value: '16px', rem: '1rem' },
    { name: 'lg', value: '24px', rem: '1.5rem' },
    { name: 'xl', value: '32px', rem: '2rem' },
    { name: '2xl', value: '48px', rem: '3rem' },
  ]
};

export default function Tokens() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 max-w-6xl"
    >
      <header className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-2 text-[#1A1C1E]">Design Tokens</h2>
        <p className="text-[#1A1C1E]/40 font-medium">Os blocos de construção fundamentais da interface DesignOps.</p>
      </header>

      <div className="space-y-16">
        {/* Colors */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Palette size={20} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A1C1E]">Cores</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tokens.colors.map((color) => (
              <div key={color.name} className="bg-white p-4 rounded-2xl group border border-black/5 shadow-sm">
                <div 
                  className="aspect-square rounded-xl mb-4 shadow-inner border border-black/5" 
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-bold text-sm mb-1 text-[#1A1C1E]">{color.name}</p>
                <p className="text-xs text-[#1A1C1E]/40 font-mono uppercase">{color.hex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Type size={20} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A1C1E]">Tipografia</h3>
          </div>
          <div className="bg-white rounded-[2rem] overflow-hidden border border-black/5 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 text-[#1A1C1E]/40 text-xs uppercase tracking-widest">
                  <th className="p-6 font-semibold">Estilo</th>
                  <th className="p-6 font-semibold">Exemplo</th>
                  <th className="p-6 font-semibold text-right">Tamanho</th>
                </tr>
              </thead>
              <tbody>
                {tokens.typography.map((type) => (
                  <tr key={type.name} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                    <td className="p-6">
                      <p className="font-bold text-sm mb-1 text-[#1A1C1E]">{type.name}</p>
                      <p className="text-xs text-[#1A1C1E]/30 font-medium">{type.weight} • {type.family}</p>
                    </td>
                    <td className="p-6">
                      <span className="text-[#1A1C1E]" style={{ fontSize: type.size, fontWeight: type.weight === 'Bold' ? 700 : type.weight === 'Semibold' ? 600 : 400 }}>
                        DesignOps
                      </span>
                    </td>
                    <td className="p-6 text-right font-mono text-xs text-[#1A1C1E]/40 font-medium">
                      {type.size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Box size={20} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A1C1E]">Espaçamento</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tokens.spacing.map((space) => (
              <div key={space.name} className="bg-white p-6 rounded-2xl flex items-center justify-between border border-black/5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-600 rounded-sm" style={{ width: space.value, height: space.value }} />
                  <div>
                    <p className="font-bold text-sm text-[#1A1C1E]">{space.name}</p>
                    <p className="text-xs text-[#1A1C1E]/30 font-medium">{space.rem}</p>
                  </div>
                </div>
                <p className="font-mono text-xs text-[#1A1C1E]/40 font-medium">{space.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
