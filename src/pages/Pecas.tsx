import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Image, 
  Plus, 
  X, 
  Search, 
  Filter, 
  ChevronDown, 
  ExternalLink, 
  Star,
  User,
  Briefcase,
  Type
} from 'lucide-react';

interface Peca {
  id: string;
  titulo: string;
  tipo: 'Post Social' | 'Story' | 'Reels' | 'Site' | 'Banner' | 'Email';
  cliente: string;
  link: string;
  designer: string;
  nota: number;
}

const initialPecas: Peca[] = [
  { id: '1', titulo: 'Campanha de Verão', tipo: 'Post Social', cliente: 'Stark Mkt', link: 'https://example.com/1', designer: 'Humberto', nota: 5 },
  { id: '2', titulo: 'Lançamento Produto X', tipo: 'Story', cliente: 'Tech Solutions', link: 'https://example.com/2', designer: 'Sarah', nota: 4 },
  { id: '3', titulo: 'Banner Black Friday', tipo: 'Banner', cliente: 'E-Shop', link: 'https://example.com/3', designer: 'Alex', nota: 5 },
  { id: '4', titulo: 'Newsletter Mensal', tipo: 'Email', cliente: 'Global Corp', link: 'https://example.com/4', designer: 'Elena', nota: 3 },
  { id: '5', titulo: 'Redesign Landing Page', tipo: 'Site', cliente: 'Startup Inc', link: 'https://example.com/5', designer: 'Humberto', nota: 5 },
  { id: '6', titulo: 'Video Teaser Reels', tipo: 'Reels', cliente: 'Fitness Club', link: 'https://example.com/6', designer: 'Sarah', nota: 4 },
];

const typeConfig = {
  'Post Social': { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  'Story': { color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  'Reels': { color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100' },
  'Site': { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  'Banner': { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  'Email': { color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
};

export default function Pecas() {
  const [pecas, setPecas] = useState<Peca[]>(initialPecas);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPeca, setNewPeca] = useState<Omit<Peca, 'id' | 'nota'>>({
    titulo: '',
    tipo: 'Post Social',
    cliente: '',
    link: '',
    designer: '',
  });

  const filteredPecas = useMemo(() => {
    return pecas.filter(p => {
      const searchMatch = p.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.designer.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = typeFilter === 'all' || p.tipo === typeFilter;
      return searchMatch && typeMatch;
    });
  }, [pecas, searchQuery, typeFilter]);

  const handleAddPeca = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Peca = {
      ...newPeca,
      id: Math.random().toString(36).substr(2, 9),
      nota: 5, // Default rating for new pieces
    };
    setPecas([p, ...pecas]);
    setIsModalOpen(false);
    setNewPeca({
      titulo: '',
      tipo: 'Post Social',
      cliente: '',
      link: '',
      designer: '',
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10"
    >
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2 text-[#1A1C1E]">Peças de Design</h2>
          <p className="text-[#1A1C1E]/40 font-medium">Gerencie e visualize as peças criadas pelo time.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={18} />
          <span>Nova Peça</span>
        </button>
      </header>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30" />
            <input 
              type="text" 
              placeholder="Buscar peça, cliente ou designer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-black/5 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all w-full md:w-64 text-[#1A1C1E]"
            />
          </div>
          
          <div className="relative group">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none bg-white border border-black/5 rounded-xl px-4 py-2 pr-10 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all cursor-pointer text-[#1A1C1E]"
            >
              <option value="all">Todos os Tipos</option>
              {Object.keys(typeConfig).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30 pointer-events-none" />
          </div>
        </div>

        <p className="text-[#1A1C1E]/30 text-sm font-medium">
          Mostrando <span className="text-[#1A1C1E] font-bold">{filteredPecas.length}</span> de {pecas.length} peças
        </p>
      </div>

      {/* Pieces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredPecas.map((peca, i) => {
            const config = typeConfig[peca.tipo];
            
            return (
              <motion.div
                key={peca.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="bg-white p-6 rounded-[2.5rem] group hover:shadow-xl transition-all flex flex-col border border-black/5 shadow-sm"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-[#F0F4F8] rounded-2xl flex items-center justify-center text-[#1A1C1E]/20 group-hover:text-[#1A1C1E]/60 transition-colors">
                    <Image size={24} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${config.bg} ${config.color} ${config.border}`}>
                    {peca.tipo}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-4 text-[#1A1C1E] group-hover:text-emerald-600 transition-colors">{peca.titulo}</h4>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-[#1A1C1E]/40 text-sm">
                      <Briefcase size={14} />
                      <span className="font-medium text-[#1A1C1E]/60">{peca.cliente}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1A1C1E]/40 text-sm">
                      <User size={14} />
                      <span className="font-medium text-[#1A1C1E]/60">{peca.designer}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < peca.nota ? "text-amber-600 fill-amber-600" : "text-[#1A1C1E]/10"} 
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                  <a 
                    href={peca.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-500 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Ver Peça
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add Piece Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[90vh] border border-white/60"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-[#1A1C1E]">Nova Peça</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full text-[#1A1C1E]/40 hover:text-[#1A1C1E] transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddPeca} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40">Título da Peça</label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30" />
                    <input 
                      autoFocus
                      type="text" 
                      required
                      value={newPeca.titulo}
                      onChange={(e) => setNewPeca({ ...newPeca, titulo: e.target.value })}
                      placeholder="Ex: Campanha de Natal"
                      className="w-full bg-[#F0F4F8] border border-black/5 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all text-[#1A1C1E]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40">Tipo de Peça</label>
                  <div className="relative group">
                    <select 
                      required
                      value={newPeca.tipo}
                      onChange={(e) => setNewPeca({ ...newPeca, tipo: e.target.value as any })}
                      className="w-full appearance-none bg-[#F0F4F8] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all cursor-pointer text-[#1A1C1E]"
                    >
                      {Object.keys(typeConfig).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40">Cliente</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30" />
                    <input 
                      type="text" 
                      required
                      value={newPeca.cliente}
                      onChange={(e) => setNewPeca({ ...newPeca, cliente: e.target.value })}
                      placeholder="Ex: Coca-Cola"
                      className="w-full bg-[#F0F4F8] border border-black/5 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all text-[#1A1C1E]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40">Designer Responsável</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30" />
                    <input 
                      type="text" 
                      required
                      value={newPeca.designer}
                      onChange={(e) => setNewPeca({ ...newPeca, designer: e.target.value })}
                      placeholder="Ex: Humberto"
                      className="w-full bg-[#F0F4F8] border border-black/5 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all text-[#1A1C1E]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40">Link Externo</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30" />
                    <input 
                      type="url" 
                      required
                      value={newPeca.link}
                      onChange={(e) => setNewPeca({ ...newPeca, link: e.target.value })}
                      placeholder="https://behance.net/..."
                      className="w-full bg-[#F0F4F8] border border-black/5 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all text-[#1A1C1E]"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="btn-primary w-full mt-4"
                >
                  Cadastrar Peça
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
