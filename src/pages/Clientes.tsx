import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Star, 
  Image, 
  AlertTriangle, 
  Search, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Heart, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  X,
  ChevronDown
} from 'lucide-react';

interface ClientScores {
  qualidadePecas: number;
  velocidadeAprovacao: number;
  satisfacaoCliente: number;
  volumeProducao: number;
  consistenciaMarca: number;
}

interface Cliente {
  id: number;
  nome: string;
  clinica: string;
  iniciais: string;
  cor: string;
  status: string;
  pecasAtivas: number;
  pecasAprovadas: number;
  pecasRevisao: number;
  notaMedia: number;
  tendencia: 'up' | 'down';
  ultimaAtividade: string;
  satisfacao: number;
  tempoMedioAprovacao: string;
  scores: ClientScores;
  historico: number[];
}

const initialClientesData: Cliente[] = [
  {
    id: 1,
    nome: "Dr. Paulo Salave",
    clinica: "Clínica Salave Estética",
    iniciais: "PS",
    cor: "#6C63FF",
    status: "Ativo",
    pecasAtivas: 6,
    pecasAprovadas: 14,
    pecasRevisao: 2,
    notaMedia: 4.5,
    tendencia: "up",
    ultimaAtividade: "há 2 dias",
    satisfacao: 9.2,
    tempoMedioAprovacao: "1.4 dias",
    scores: {
      qualidadePecas: 4.6,
      velocidadeAprovacao: 4.2,
      satisfacaoCliente: 4.8,
      volumeProducao: 4.3,
      consistenciaMarca: 4.6
    },
    historico: [3.8, 4.0, 4.2, 4.3, 4.5, 4.5]
  },
  {
    id: 2,
    nome: "Dra. Camila Torres",
    clinica: "Torres Plastic Surgery",
    iniciais: "CT",
    cor: "#AB47BC",
    status: "Ativo",
    pecasAtivas: 4,
    pecasAprovadas: 9,
    pecasRevisao: 3,
    notaMedia: 3.7,
    tendencia: "up",
    ultimaAtividade: "hoje",
    satisfacao: 7.8,
    tempoMedioAprovacao: "3.1 dias",
    scores: {
      qualidadePecas: 3.8,
      velocidadeAprovacao: 3.2,
      satisfacaoCliente: 4.0,
      volumeProducao: 3.5,
      consistenciaMarca: 3.9
    },
    historico: [3.0, 3.2, 3.1, 3.4, 3.6, 3.7]
  },
  {
    id: 3,
    nome: "Dr. Rafael Mendes",
    clinica: "Mendes Cirurgia Plástica",
    iniciais: "RM",
    cor: "#FF7043",
    status: "Em pausa",
    pecasAtivas: 1,
    pecasAprovadas: 5,
    pecasRevisao: 0,
    notaMedia: 2.9,
    tendencia: "down",
    ultimaAtividade: "há 12 dias",
    satisfacao: 6.1,
    tempoMedioAprovacao: "5.8 dias",
    scores: {
      qualidadePecas: 3.0,
      velocidadeAprovacao: 2.2,
      satisfacaoCliente: 3.1,
      volumeProducao: 2.5,
      consistenciaMarca: 2.8
    },
    historico: [3.5, 3.3, 3.1, 3.0, 2.8, 2.9]
  },
  {
    id: 4,
    nome: "Dra. Fernanda Lins",
    clinica: "Lins Aesthetic Clinic",
    iniciais: "FL",
    cor: "#43CBFF",
    status: "Ativo",
    pecasAtivas: 8,
    pecasAprovadas: 21,
    pecasRevisao: 1,
    notaMedia: 4.8,
    tendencia: "up",
    ultimaAtividade: "hoje",
    satisfacao: 9.7,
    tempoMedioAprovacao: "0.9 dias",
    scores: {
      qualidadePecas: 4.9,
      velocidadeAprovacao: 4.8,
      satisfacaoCliente: 5.0,
      volumeProducao: 4.7,
      consistenciaMarca: 4.8
    },
    historico: [4.2, 4.4, 4.5, 4.6, 4.7, 4.8]
  }
];

const getNotaColor = (nota: number) => {
  if (nota >= 4.5) return "#22c55e";
  if (nota >= 3.5) return "#eab308";
  return "#ef4444";
};

const Sparkline = ({ data, width = 80, height = 32, color = "#22c55e" }: { data: number[], width?: number, height?: number, color?: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

const ScoreBar = ({ label, value, max = 5 }: { label: string, value: number, max?: number }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#1A1C1E]/40">
        <span>{label}</span>
        <span className="text-[#1A1C1E]/60">{value.toFixed(1)}</span>
      </div>
      <div className="h-1.5 w-full bg-[#1A1C1E]/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-emerald-500 origin-left"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('Maior nota');
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

  const globalMetrics = useMemo(() => {
    const ativos = clientes.filter(c => c.status === 'Ativo').length;
    const notaMedia = clientes.reduce((acc, c) => acc + c.notaMedia, 0) / clientes.length;
    const pecasAtivas = clientes.reduce((acc, c) => acc + c.pecasAtivas, 0);
    const emRisco = clientes.filter(c => c.notaMedia < 3.5).length;
    return { ativos, notaMedia, pecasAtivas, emRisco };
  }, [clientes]);

  const filteredAndSortedClientes = useMemo(() => {
    let result = clientes.filter(c => {
      const matchesSearch = c.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.clinica.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    switch (sortBy) {
      case 'Maior nota':
        result.sort((a, b) => b.notaMedia - a.notaMedia);
        break;
      case 'Menor nota':
        result.sort((a, b) => a.notaMedia - b.notaMedia);
        break;
      case 'Nome A-Z':
        result.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'Mais recente':
        // Mocking recent based on ID for this example
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [clientes, searchQuery, statusFilter, sortBy]);

  const getSuggestedActions = (cliente: Cliente) => {
    const actions = [];
    if (cliente.scores.velocidadeAprovacao < 3.5) {
      actions.push("Revisar processo de aprovação com o cliente");
    }
    if (cliente.scores.consistenciaMarca < 4.0) {
      actions.push("Agendar alinhamento de identidade visual");
    }
    if (cliente.notaMedia < 3.5) {
      actions.push("Realizar reunião de alinhamento estratégico urgente");
    }
    if (actions.length === 0) {
      actions.push("Manter acompanhamento semanal");
      actions.push("Explorar novas oportunidades de peças");
    }
    return actions;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10 min-h-screen text-[#1A1C1E] font-inter"
    >
      {/* 1. Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2 text-[#1A1C1E]">Clientes</h2>
          <p className="text-[#1A1C1E]/40 font-medium">Acompanhe o desempenho global de cada cliente</p>
        </div>
        <button 
          onClick={() => {}}
          className="btn-primary"
        >
          <Plus size={18} />
          <span>Novo Cliente</span>
        </button>
      </header>

      {/* 2. Bento Grid Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Clientes Ativos', value: globalMetrics.ativos, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Nota Média Global', value: globalMetrics.notaMedia.toFixed(1), icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Peças Ativas', value: globalMetrics.pecasAtivas, icon: Image, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Clientes em Risco', value: globalMetrics.emRisco, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm"
          >
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={20} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight mb-1 text-[#1A1C1E]">{stat.value}</h3>
            <p className="text-[#1A1C1E]/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* 3. Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30" />
            <input 
              type="text" 
              placeholder="Buscar cliente ou clínica..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-black/5 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all w-full md:w-64 text-[#1A1C1E]"
            />
          </div>
          
          <div className="relative group">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-white border border-black/5 rounded-xl px-4 py-2 pr-10 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all cursor-pointer text-[#1A1C1E]"
            >
              <option value="Todos">Status</option>
              <option value="Ativo">Ativo</option>
              <option value="Em pausa">Em pausa</option>
              <option value="Inativo">Inativo</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30 pointer-events-none" />
          </div>

          <div className="relative group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-black/5 rounded-xl px-4 py-2 pr-10 text-sm outline-none focus:border-[#1A1C1E]/20 transition-all cursor-pointer text-[#1A1C1E]"
            >
              <option value="Maior nota">Maior nota</option>
              <option value="Menor nota">Menor nota</option>
              <option value="Mais recente">Mais recente</option>
              <option value="Nome A-Z">Nome A-Z</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1C1E]/30 pointer-events-none" />
          </div>
        </div>

        <p className="text-[#1A1C1E]/30 text-sm font-medium">
          <span className="text-[#1A1C1E] font-bold">{filteredAndSortedClientes.length}</span> clientes encontrados
        </p>
      </div>

      {/* 4. Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredAndSortedClientes.map((cliente, i) => (
            <motion.div
              key={cliente.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="bg-white p-8 rounded-[2.5rem] border border-black/5 hover:shadow-xl transition-all duration-300 group relative flex flex-col shadow-sm"
            >
              {/* Topo do card */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner"
                    style={{ backgroundColor: cliente.cor }}
                  >
                    {cliente.iniciais}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold leading-tight text-[#1A1C1E]">{cliente.nome}</h4>
                    <p className="text-[#1A1C1E]/50 text-sm font-medium">{cliente.clinica}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                  cliente.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  cliente.status === 'Em pausa' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-slate-50 text-slate-600 border-slate-100'
                }`}>
                  {cliente.status}
                </div>
              </div>

              {/* Nota de Desempenho */}
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1C1E]/40 mb-1">Desempenho</p>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-black" style={{ color: getNotaColor(cliente.notaMedia) }}>
                      {cliente.notaMedia.toFixed(1)}
                    </span>
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center"
                    >
                      {cliente.tendencia === 'up' ? (
                        <TrendingUp className="text-emerald-600" size={24} />
                      ) : (
                        <TrendingDown className="text-rose-600" size={24} />
                      )}
                    </motion.div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1C1E]/40 mb-2">Histórico (6p)</p>
                  <Sparkline data={cliente.historico} color={getNotaColor(cliente.notaMedia)} />
                </div>
              </div>

              {/* Grid de sub-métricas */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Peças Ativas', value: cliente.pecasAtivas, icon: Layers },
                  { label: 'Satisfação', value: `${(cliente.satisfacao / 10 * 100).toFixed(0)}%`, icon: Heart },
                  { label: 'Tempo Aprovação', value: cliente.tempoMedioAprovacao, icon: Clock },
                  { label: 'Total Aprovadas', value: cliente.pecasAprovadas, icon: CheckCircle2 },
                ].map((item) => (
                  <div key={item.label} className="bg-[#F0F4F8] p-3 rounded-xl flex items-center gap-3 border border-black/5">
                    <div className="text-[#1A1C1E]/20">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1C1E]/30">{item.label}</p>
                      <p className="text-sm font-bold text-[#1A1C1E]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown de scores */}
              <div className="space-y-4 mb-8 flex-1">
                <ScoreBar label="Qualidade das Peças" value={cliente.scores.qualidadePecas} />
                <ScoreBar label="Velocidade de Aprovação" value={cliente.scores.velocidadeAprovacao} />
                <ScoreBar label="Satisfação do Cliente" value={cliente.scores.satisfacaoCliente} />
                <ScoreBar label="Volume de Produção" value={cliente.scores.volumeProducao} />
                <ScoreBar label="Consistência de Marca" value={cliente.scores.consistenciaMarca} />
              </div>

              {/* Footer */}
              <div className="flex justify-end pt-6 border-t border-black/5">
                <button 
                  onClick={() => setSelectedCliente(cliente)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A1C1E]/40 hover:text-emerald-600 transition-colors"
                >
                  <span>Ver Detalhes</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 5. Modal de Detalhes */}
      <AnimatePresence>
        {selectedCliente && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCliente(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white p-10 rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[90vh] border border-white/60 text-[#1A1C1E]"
            >
              {/* Header Modal */}
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-6">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-inner"
                    style={{ backgroundColor: selectedCliente.cor }}
                  >
                    {selectedCliente.iniciais}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-[#1A1C1E]">{selectedCliente.nome}</h3>
                    <p className="text-[#1A1C1E]/50 text-lg font-medium">{selectedCliente.clinica}</p>
                    <div className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      selectedCliente.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      selectedCliente.status === 'Em pausa' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                      {selectedCliente.status}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCliente(null)}
                  className="p-3 hover:bg-black/5 rounded-full text-[#1A1C1E]/40 hover:text-[#1A1C1E] transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Nota em Destaque */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-6 mb-12 bg-[#F0F4F8] p-8 rounded-3xl border border-black/5"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1C1E]/40 mb-1">Nota Geral</span>
                  <span className="text-7xl font-black" style={{ color: getNotaColor(selectedCliente.notaMedia) }}>
                    {selectedCliente.notaMedia.toFixed(1)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#1A1C1E]/60 leading-relaxed font-medium">
                    O desempenho deste cliente está <span className="text-[#1A1C1E] font-bold">{selectedCliente.notaMedia >= 4.5 ? 'Excelente' : selectedCliente.notaMedia >= 3.5 ? 'Estável' : 'Abaixo do esperado'}</span>. 
                    A tendência atual é de <span className="text-[#1A1C1E] font-bold">{selectedCliente.tendencia === 'up' ? 'Crescimento' : 'Queda'}</span>.
                  </p>
                </div>
              </motion.div>

              {/* Evolução da Nota */}
              <section className="mb-12">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#1A1C1E]">
                  <TrendingUp size={20} className="text-emerald-600" />
                  Evolução da Nota
                </h4>
                <div className="bg-[#F0F4F8] p-8 rounded-3xl border border-black/5">
                  <div className="flex justify-center mb-6">
                    <Sparkline data={selectedCliente.historico} width={400} height={100} color={getNotaColor(selectedCliente.notaMedia)} />
                  </div>
                  <div className="flex justify-between px-2">
                    {['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5', 'Mês 6'].map(label => (
                      <span key={label} className="text-[10px] font-bold uppercase tracking-widest text-[#1A1C1E]/20">{label}</span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Breakdown por Critério */}
              <section className="mb-12">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#1A1C1E]">
                  <Layers size={20} className="text-blue-600" />
                  Breakdown por Critério
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ScoreBar label="Qualidade das Peças" value={selectedCliente.scores.qualidadePecas} />
                  <ScoreBar label="Velocidade de Aprovação" value={selectedCliente.scores.velocidadeAprovacao} />
                  <ScoreBar label="Satisfação do Cliente" value={selectedCliente.scores.satisfacaoCliente} />
                  <ScoreBar label="Volume de Produção" value={selectedCliente.scores.volumeProducao} />
                  <ScoreBar label="Consistência de Marca" value={selectedCliente.scores.consistenciaMarca} />
                </div>
              </section>

              {/* Peças Recentes */}
              <section className="mb-12">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#1A1C1E]">
                  <Image size={20} className="text-violet-600" />
                  Peças Recentes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { tipo: 'Post Social', nota: 4.8, status: 'Aprovado' },
                    { tipo: 'Story', nota: 4.5, status: 'Aprovado' },
                    { tipo: 'Reels', nota: 3.9, status: 'Em revisão' },
                  ].map((peca, idx) => (
                    <div key={idx} className="bg-[#F0F4F8] p-4 rounded-2xl border border-black/5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1C1E]/30 mb-2">{peca.tipo}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={12} className="text-amber-600 fill-amber-600" />
                        <span className="text-sm font-bold text-[#1A1C1E]">{peca.nota}</span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${peca.status === 'Aprovado' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {peca.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Próximas ações sugeridas */}
              <section>
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#1A1C1E]">
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  Próximas ações sugeridas
                </h4>
                <div className="space-y-3">
                  {getSuggestedActions(selectedCliente).map((action, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <p className="text-sm font-medium text-[#1A1C1E]/80">{action}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
