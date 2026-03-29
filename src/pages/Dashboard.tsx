import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Layers, 
  MousePointer2, 
  Type, 
  Filter,
  ChevronDown,
  Search,
  Plus,
  X,
  MessageSquare,
  User,
  Layout,
  Star,
  Sparkles,
  Upload,
  Check,
  AlertTriangle
} from 'lucide-react';

interface Component {
  nome: string;
  categoria: string;
  status: string;
  qualityScore: number | null;
}

const componentsData: Component[] = [
  { "nome": "Button", "categoria": "Ação", "status": "Pronto", "qualityScore": 4.5 },
  { "nome": "Input Field", "categoria": "Formulário", "status": "Pronto", "qualityScore": 4.2 },
  { "nome": "Modal", "categoria": "Overlay", "status": "Em revisão", "qualityScore": 3.8 },
  { "nome": "Tooltip", "categoria": "Feedback", "status": "Em revisão", "qualityScore": null },
  { "nome": "Dropdown", "categoria": "Formulário", "status": "Pendente", "qualityScore": null },
  { "nome": "Toast", "categoria": "Feedback", "status": "Pendente", "qualityScore": null },
  { "nome": "Avatar", "categoria": "Identidade", "status": "Pronto", "qualityScore": 4.8 },
  { "nome": "Checkbox", "categoria": "Formulário", "status": "Pendente", "qualityScore": null }
];

const categoryIcons: Record<string, any> = {
  "Ação": MousePointer2,
  "Formulário": Type,
  "Overlay": Layers,
  "Feedback": MessageSquare,
  "Identidade": User,
  "Layout": Layout
};

const statusConfig = {
  "Pronto": { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", icon: CheckCircle2, glow: "status-glow-ready" },
  "Em revisão": { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", icon: Clock, glow: "status-glow-review" },
  "Pendente": { color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-100", icon: AlertCircle, glow: "status-glow-pending" }
};

export default function Dashboard() {
  const [components, setComponents] = useState(componentsData);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiLoading, setAILoading] = useState(false);
  const [aiResult, setAIResult] = useState<any>(null);
  const [analyzingComponent, setAnalyzingComponent] = useState<Component | null>(null);
  const [newComponent, setNewComponent] = useState<Omit<Component, 'qualityScore'> & { qualityScore: number | null }>({ nome: '', categoria: '', status: 'Pendente', qualityScore: null });

  const stats = useMemo(() => {
    const ready = components.filter(c => c.status === 'Pronto').length;
    const review = components.filter(c => c.status === 'Em revisão').length;
    const pending = components.filter(c => c.status === 'Pendente').length;
    const total = components.length;
    const progress = total > 0 ? Math.round((ready / total) * 100) : 0;
    
    const componentsWithScore = components.filter(c => c.qualityScore !== null);
    const avgQuality = componentsWithScore.length > 0 
      ? (componentsWithScore.reduce((acc, c) => acc + (c.qualityScore || 0), 0) / componentsWithScore.length).toFixed(1)
      : null;

    return { ready, review, pending, total, progress, avgQuality };
  }, [components]);

  const categories = useMemo(() => [...new Set(components.map(c => c.categoria))], [components]);

  const filteredComponents = useMemo(() => {
    return components.filter(c => {
      const statusMatch = statusFilter === 'all' || c.status === statusFilter;
      const categoryMatch = categoryFilter === 'all' || c.categoria === categoryFilter;
      const searchMatch = c.nome.toLowerCase().includes(searchQuery.toLowerCase());
      return statusMatch && categoryMatch && searchMatch;
    });
  }, [components, statusFilter, categoryFilter, searchQuery]);

  const handleAddComponent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComponent.nome || !newComponent.categoria) return;
    
    setComponents([...components, newComponent]);
    setNewComponent({ nome: '', categoria: '', status: 'Pendente', qualityScore: null });
    setIsModalOpen(false);
  };

  const handleAnalyzeAI = () => {
    setAILoading(true);
    setAIResult(null);
    
    setTimeout(() => {
      const mockResult = {
        score: 4.2,
        sentiment: '🚀',
        recommendation: 'APROVADO',
        criteria: [
          { label: 'Identidade Visual', value: 4.5 },
          { label: 'Clareza', value: 4.0 },
          { label: 'Estética', value: 4.8 },
          { label: 'Formato', value: 3.5 },
        ],
        strengths: ['Excelente contraste de cores', 'Tipografia legível', 'Espaçamento consistente'],
        improvements: ['Ajustar raio da borda no mobile', 'Otimizar peso do ícone'],
      };
      setAIResult(mockResult);
      setAILoading(false);
    }, 2000);
  };

  const saveAIResult = () => {
    if (!analyzingComponent || !aiResult) return;
    
    setComponents(prev => prev.map(c => 
      c.nome === analyzingComponent.nome ? { ...c, qualityScore: aiResult.score } : c
    ));
    setIsAIModalOpen(false);
    setAIResult(null);
    setAnalyzingComponent(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10"
    >
      {/* Bento Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 card-soft p-8 relative overflow-hidden group"
        >
          <div className="relative z-10">
            <p className="text-[#1A1C1E]/40 text-sm font-semibold uppercase tracking-wider mb-2">Progresso Geral</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-6xl font-bold tracking-tighter text-[#1A1C1E]">{stats.progress}%</h2>
              <span className="text-emerald-600 text-sm font-medium">concluído</span>
            </div>
            <div className="mt-8 w-full bg-[#F0F4F8] rounded-full h-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stats.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
              />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity text-[#1A1C1E]">
            <CheckCircle2 size={160} />
          </div>
        </motion.div>

        {[
          { label: 'Prontos', value: stats.ready, config: statusConfig['Pronto'], subValue: stats.avgQuality ? `Média: ${stats.avgQuality} ★` : null },
          { label: 'Em Revisão', value: stats.review, config: statusConfig['Em revisão'] },
          { label: 'Pendentes', value: stats.pending, config: statusConfig['Pendente'] }
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
            className="card-soft p-8 flex flex-col justify-between group transition-all"
          >
            <div className={`w-12 h-12 ${stat.config.bg} ${stat.config.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.config.icon size={24} />
            </div>
            <div>
              <h3 className="text-4xl font-bold tracking-tight mb-1 text-[#1A1C1E]">{stat.value}</h3>
              <div className="flex items-center justify-between">
                <p className="text-[#1A1C1E]/40 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                {stat.subValue && (
                  <span className="text-[10px] font-bold text-emerald-600/80 uppercase tracking-widest">{stat.subValue}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30" />
            <input 
              type="text" 
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-black/5 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all w-full md:w-48 shadow-sm"
            />
          </div>
          
          <div className="relative group">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-black/5 rounded-xl px-4 py-2 pr-10 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all cursor-pointer shadow-sm"
            >
              <option value="all">Status</option>
              <option value="Pronto">Pronto</option>
              <option value="Em revisão">Em revisão</option>
              <option value="Pendente">Pendente</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30 pointer-events-none" />
          </div>

          <div className="relative group">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-white border border-black/5 rounded-xl px-4 py-2 pr-10 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all cursor-pointer shadow-sm"
            >
              <option value="all">Categorias</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30 pointer-events-none" />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            <Plus size={18} />
            <span>Novo Componente</span>
          </button>
        </div>

        <p className="text-[#1A1C1E]/30 text-sm font-medium">
          <span className="text-[#1A1C1E]">{filteredComponents.length}</span> de {stats.total} componentes
        </p>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredComponents.map((comp, i) => {
            const config = statusConfig[comp.status as keyof typeof statusConfig];
            const CategoryIcon = categoryIcons[comp.categoria] || Layers;
            
            return (
              <motion.div
                key={comp.nome}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="card-soft p-6 group transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-[#F0F4F8] rounded-2xl flex items-center justify-center text-[#1A1C1E]/40 group-hover:text-[#1A1C1E]/80 transition-colors">
                    <CategoryIcon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${config.bg} ${config.color} ${config.border} ${config.glow}`}>
                      {comp.status}
                    </div>
                    {comp.qualityScore !== null ? (
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={10} 
                            className={i < Math.floor(comp.qualityScore || 0) ? "text-amber-400 fill-amber-400" : "text-[#1A1C1E]/10"} 
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A1C1E]/40">Sem avaliações</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-1 group-hover:text-[#1A1C1E] transition-colors text-[#1A1C1E]">{comp.nome}</h4>
                  <p className="text-[#1A1C1E]/30 text-sm font-medium">{comp.categoria}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-black/5 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="w-6 h-6 rounded-full border-2 border-white bg-[#F0F4F8]" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setAnalyzingComponent(comp);
                        setIsAIModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-600 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border border-violet-100"
                    >
                      <Sparkles size={12} />
                      <span>IA</span>
                    </button>
                    <button className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/20 hover:text-[#1A1C1E] transition-colors">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add Component Modal */}
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
              className="relative w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-2xl border border-white/60"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-[#1A1C1E]">Novo Componente</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full text-[#1A1C1E]/40 hover:text-[#1A1C1E] transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddComponent} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40">Nome do Componente</label>
                  <input 
                    autoFocus
                    type="text" 
                    required
                    value={newComponent.nome}
                    onChange={(e) => setNewComponent({ ...newComponent, nome: e.target.value })}
                    placeholder="Ex: DatePicker"
                    className="w-full bg-[#F0F4F8] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all text-[#1A1C1E]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40">Categoria</label>
                  <input 
                    type="text" 
                    required
                    value={newComponent.categoria}
                    onChange={(e) => setNewComponent({ ...newComponent, categoria: e.target.value })}
                    placeholder="Ex: Formulário"
                    className="w-full bg-[#F0F4F8] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all text-[#1A1C1E]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40">Status Inicial</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Pendente', 'Em revisão', 'Pronto'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setNewComponent({ ...newComponent, status })}
                        className={`py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                          newComponent.status === status 
                            ? 'bg-[#1A1C1E] border-[#1A1C1E] text-white' 
                            : 'bg-[#F0F4F8] border-black/5 text-[#1A1C1E]/40 hover:border-black/10'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="btn-primary w-full mt-4"
                >
                  Criar Componente
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AI Analysis Modal */}
      <AnimatePresence>
        {isAIModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!aiLoading) {
                  setIsAIModalOpen(false);
                  setAIResult(null);
                }
              }}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white p-10 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[90vh] border border-white/60"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1A1C1E]">Análise DesignOps-IA</h3>
                    <p className="text-[#1A1C1E]/40 text-xs uppercase tracking-widest font-bold">Componente: {analyzingComponent?.nome}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsAIModalOpen(false);
                    setAIResult(null);
                  }}
                  className="p-2 hover:bg-black/5 rounded-full text-[#1A1C1E]/40 hover:text-[#1A1C1E] transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {!aiResult && !aiLoading ? (
                <div className="space-y-8">
                  <div className="border-2 border-dashed border-black/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:border-violet-500/30 transition-all cursor-pointer group bg-[#F0F4F8]/50">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#1A1C1E]/20 mb-4 group-hover:text-violet-500 group-hover:shadow-lg transition-all">
                      <Upload size={32} />
                    </div>
                    <h4 className="text-lg font-bold mb-1 text-[#1A1C1E]">Upload de Referência</h4>
                    <p className="text-[#1A1C1E]/40 text-sm">Arraste uma imagem ou clique para selecionar</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40">Contexto de Uso</label>
                    <textarea 
                      placeholder="Descreva o uso deste componente no sistema..."
                      className="w-full bg-[#F0F4F8] border border-black/5 rounded-2xl px-6 py-4 text-sm outline-none focus:border-violet-500/30 transition-all min-h-[120px] resize-none text-[#1A1C1E]"
                    />
                  </div>

                  <button 
                    onClick={handleAnalyzeAI}
                    className="btn-primary w-full bg-violet-600 hover:bg-violet-700 shadow-violet-600/20"
                  >
                    <Sparkles size={20} />
                    <span>Iniciar Análise Inteligente</span>
                  </button>
                </div>
              ) : aiLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <div className="relative w-24 h-24 mb-8">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-violet-100 border-t-violet-600 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-violet-600">
                      <Sparkles size={32} className="animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-[#1A1C1E]">Processando Visão Computacional</h4>
                  <p className="text-[#1A1C1E]/40 text-sm max-w-xs">A IA está analisando cores, tipografia, contraste e alinhamento do componente...</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-10"
                >
                  {/* Top Result */}
                  <div className="flex items-center justify-between bg-[#F0F4F8] p-8 rounded-3xl border border-black/5">
                    <div className="flex items-center gap-6">
                      <div className="text-6xl">{aiResult.sentiment}</div>
                      <div>
                        <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${aiResult.recommendation === 'APROVADO' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {aiResult.recommendation}
                        </div>
                        <div className="text-4xl font-black text-[#1A1C1E]">{aiResult.score.toFixed(1)} <span className="text-lg text-[#1A1C1E]/20 font-medium">/ 5.0</span></div>
                      </div>
                    </div>
                    <button 
                      onClick={saveAIResult}
                      className="btn-primary"
                    >
                      <Check size={18} />
                      <span>Salvar Nota</span>
                    </button>
                  </div>

                  {/* Criteria Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {aiResult.criteria.map((c: any) => (
                      <div key={c.label} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#1A1C1E]/40">
                          <span>{c.label}</span>
                          <span className="text-[#1A1C1E]/80">{c.value.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#F0F4F8] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(c.value / 5) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-violet-600 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                        <Check size={14} />
                        Pontos Fortes
                      </h5>
                      <ul className="space-y-2">
                        {aiResult.strengths.map((s: string, idx: number) => (
                          <li key={idx} className="text-sm text-[#1A1C1E]/60 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-emerald-600 mt-2 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h5 className="text-xs font-bold uppercase tracking-widest text-rose-600 flex items-center gap-2">
                        <AlertTriangle size={14} />
                        Melhorias
                      </h5>
                      <ul className="space-y-2">
                        {aiResult.improvements.map((im: string, idx: number) => (
                          <li key={idx} className="text-sm text-[#1A1C1E]/60 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-rose-600 mt-2 shrink-0" />
                            {im}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
