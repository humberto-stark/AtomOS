import { motion } from 'motion/react';
import { Users, Activity, MessageSquare, History, Star, Sparkles, Image } from 'lucide-react';

const activities = [
  { user: 'Humberto', action: 'recebeu nota', target: 'Post Antes e Depois', time: '1h atrás', type: 'feedback', score: 4.5 },
  { user: 'AtomBot', action: 'avaliou', target: 'Banner Google Ads — resultado: APROVADO', time: '3h atrás', type: 'avaliacao_ia' },
  { user: 'Time', action: 'tem', target: '3 peças aguardando avaliação', time: '5h atrás', type: 'peca' },
  { user: 'Sarah', action: 'recebeu nota', target: 'Story Promocional', time: '6h atrás', type: 'feedback', score: 3.8 },
  { user: 'Humberto', action: 'atualizou o status de', target: 'Button', time: '2h atrás', type: 'status' },
  { user: 'Sarah', action: 'adicionou documentação para', target: 'Modal', time: '5h atrás', type: 'doc' },
  { user: 'Alex', action: 'corrigiu bug visual em', target: 'Input Field', time: 'Ontem', type: 'fix' },
  { user: 'AtomBot', action: 'gerou novos tokens de', target: 'Cores', time: 'Ontem', type: 'system' },
];

const team = [
  { name: 'Humberto', role: 'Lead Designer', status: 'Online', color: 'bg-emerald-500' },
  { name: 'Sarah', role: 'UI Engineer', status: 'Offline', color: 'bg-blue-500' },
  { name: 'Alex', role: 'Frontend Dev', status: 'Em reunião', color: 'bg-amber-500' },
  { name: 'Elena', role: 'UX Researcher', status: 'Online', color: 'bg-purple-500' },
];

export default function Team() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 md:p-10"
    >
      <header className="mb-12">
        <h2 className="text-4xl font-bold tracking-tight mb-2 text-[#1A1C1E]">Time & Atividade</h2>
        <p className="text-[#1A1C1E]/40 font-medium">Acompanhe quem está construindo o futuro do DesignOps.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-emerald-600" size={20} />
            <h3 className="text-xl font-bold text-[#1A1C1E]">Atividade Recente</h3>
          </div>
          
          <div className="space-y-4">
            {activities.map((item, i) => {
              const getActivityIcon = () => {
                switch (item.type) {
                  case 'feedback': return Star;
                  case 'avaliacao_ia': return Sparkles;
                  case 'peca': return Image;
                  default: return History;
                }
              };

              const getActivityColor = () => {
                if (item.type === 'feedback' && item.score !== undefined) {
                  if (item.score >= 4.5) return 'text-emerald-600';
                  if (item.score >= 3.5) return 'text-amber-600';
                  return 'text-rose-600';
                }
                switch (item.type) {
                  case 'avaliacao_ia': return 'text-violet-600';
                  case 'peca': return 'text-blue-600';
                  default: return 'text-[#1A1C1E]/40';
                }
              };

              const Icon = getActivityIcon();
              const colorClass = getActivityColor();

              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-5 rounded-2xl flex items-start gap-4 hover:shadow-md transition-all group border border-black/5"
                >
                  <div className={`w-10 h-10 rounded-full bg-[#F0F4F8] flex items-center justify-center ${colorClass}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1A1C1E]/80">
                      <span className="font-bold text-[#1A1C1E]">{item.user}</span>
                      <span className="text-[#1A1C1E]/40 mx-1">{item.action}</span>
                      <span className={`font-bold ${
                        item.type === 'avaliacao_ia' ? 'text-violet-600' : 
                        item.type === 'peca' ? 'text-blue-600' : 
                        item.type === 'feedback' ? colorClass :
                        'text-emerald-600'
                      }`}>{item.target}</span>
                    </p>
                    <p className="text-xs text-[#1A1C1E]/20 mt-1">{item.time}</p>
                  </div>
                  {item.type === 'feedback' && item.score && (
                    <div className={`px-2 py-1 rounded-lg text-[10px] font-bold ${colorClass} bg-[#F0F4F8] border border-black/5`}>
                      {item.score.toFixed(1)}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team List */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-blue-600" size={20} />
            <h3 className="text-xl font-bold text-[#1A1C1E]">Membros do Time</h3>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] space-y-6 border border-black/5 shadow-sm">
            {team.map((member) => (
              <div key={member.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-xs shadow-inner`}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1A1C1E]">{member.name}</p>
                    <p className="text-xs text-[#1A1C1E]/30 font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' : member.status === 'Offline' ? 'bg-black/10' : 'bg-amber-500'}`} />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#1A1C1E]/40">{member.status}</span>
                </div>
              </div>
            ))}
            
            <button className="btn-secondary w-full mt-4">
              Convidar Membro
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
