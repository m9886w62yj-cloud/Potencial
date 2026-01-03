"use client";

import { useState, useEffect } from "react";
import { 
  Home, 
  Dumbbell, 
  TrendingUp, 
  Settings, 
  Utensils,
  Play,
  Award,
  Flame,
  Target,
  Calendar,
  Clock,
  ChevronRight,
  Trophy,
  Star,
  Moon,
  MapPin,
  CreditCard,
  Brain,
  Apple,
  Beef,
  Check,
  X,
  Droplet,
  Pizza,
  User,
  HelpCircle,
  Shield,
  Info
} from "lucide-react";
import { useRouter } from "next/navigation";

type Tab = "dashboard" | "treinos" | "dieta" | "progresso" | "configuracoes";
type SettingsView = "main" | "profile" | "privacy" | "support" | "about";

// Sistema de gamificação com localStorage
interface GameState {
  xp: number;
  level: number;
  waterIntake: number;
  caloriesIntake: number;
  completedWorkouts: string[];
  completedMeals: string[];
  sleepLogged: boolean;
  badges: string[];
  streak: number;
}

const XP_PER_LEVEL = 1000;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const router = useRouter();

  // Estado de gamificação
  const [gameState, setGameState] = useState<GameState>({
    xp: 0,
    level: 1,
    waterIntake: 0,
    caloriesIntake: 0,
    completedWorkouts: [],
    completedMeals: [],
    sleepLogged: false,
    badges: [],
    streak: 0
  });

  // Carregar estado do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("potencial_game_state");
    if (saved) {
      setGameState(JSON.parse(saved));
    }
  }, []);

  // Salvar estado no localStorage
  useEffect(() => {
    localStorage.setItem("potencial_game_state", JSON.stringify(gameState));
  }, [gameState]);

  // Função para adicionar XP
  const addXP = (amount: number) => {
    setGameState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      
      // Verificar conquistas
      const newBadges = [...prev.badges];
      if (newLevel >= 5 && !newBadges.includes("level5")) newBadges.push("level5");
      if (newLevel >= 10 && !newBadges.includes("level10")) newBadges.push("level10");
      if (prev.completedWorkouts.length >= 7 && !newBadges.includes("7workouts")) newBadges.push("7workouts");
      if (prev.streak >= 7 && !newBadges.includes("7streak")) newBadges.push("7streak");

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        badges: newBadges
      };
    });
  };

  // Função para resetar progresso diário
  const resetDaily = () => {
    setGameState(prev => ({
      ...prev,
      waterIntake: 0,
      caloriesIntake: 0,
      completedMeals: [],
      sleepLogged: false
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-[#3B82F6]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Potencial</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-[#3B82F6]/20 px-4 py-2 rounded-full border border-[#3B82F6]/30">
                <Flame className="w-4 h-4 text-[#3B82F6]" />
                <span className="text-sm font-semibold text-[#3B82F6]">{gameState.streak} dias de sequência</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "dashboard" && <Dashboard gameState={gameState} setGameState={setGameState} addXP={addXP} />}
        {activeTab === "treinos" && <Treinos gameState={gameState} addXP={addXP} setGameState={setGameState} />}
        {activeTab === "dieta" && <Dieta gameState={gameState} setGameState={setGameState} addXP={addXP} />}
        {activeTab === "progresso" && <Progresso gameState={gameState} />}
        {activeTab === "configuracoes" && <Configuracoes gameState={gameState} router={router} resetDaily={resetDaily} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-[#3B82F6]/20 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <NavButton
              icon={Home}
              label="Início"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <NavButton
              icon={Dumbbell}
              label="Treinos"
              active={activeTab === "treinos"}
              onClick={() => setActiveTab("treinos")}
            />
            <NavButton
              icon={Utensils}
              label="Dieta"
              active={activeTab === "dieta"}
              onClick={() => setActiveTab("dieta")}
            />
            <NavButton
              icon={TrendingUp}
              label="Progresso"
              active={activeTab === "progresso"}
              onClick={() => setActiveTab("progresso")}
            />
            <NavButton
              icon={Settings}
              label="Config"
              active={activeTab === "configuracoes"}
              onClick={() => setActiveTab("configuracoes")}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavButton({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
        active 
          ? "text-[#3B82F6] bg-[#3B82F6]/20" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${active ? "scale-110" : ""}`} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function Dashboard({ gameState, setGameState, addXP }: any) {
  const xpForNextLevel = (gameState.level * XP_PER_LEVEL) - gameState.xp;
  const xpProgress = ((gameState.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  const updateWater = (amount: number) => {
    setGameState((prev: GameState) => {
      const newWater = Math.max(0, Math.min(prev.waterIntake + amount, 5));
      if (newWater > prev.waterIntake) addXP(10);
      return { ...prev, waterIntake: newWater };
    });
  };

  const updateCalories = (amount: number) => {
    setGameState((prev: GameState) => {
      const newCalories = Math.max(0, Math.min(prev.caloriesIntake + amount, 5000));
      if (newCalories > prev.caloriesIntake) addXP(10);
      return { ...prev, caloriesIntake: newCalories };
    });
  };

  const logSleep = () => {
    if (!gameState.sleepLogged) {
      setGameState((prev: GameState) => ({ ...prev, sleepLogged: true }));
      addXP(75);
      alert("✅ Sono registrado! +75 XP");
    }
  };

  return (
    <div className="space-y-6">
      {/* XP Progress Card */}
      <div className="bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/10 rounded-2xl p-6 sm:p-8 border border-[#3B82F6]/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">Nível {gameState.level}</h2>
            <p className="text-gray-400">Guerreiro em Evolução</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[#3B82F6]">{gameState.xp} XP</p>
            <p className="text-sm text-gray-400">{xpForNextLevel} XP para próximo nível</p>
          </div>
        </div>
        <div className="bg-[#0A0A0A] rounded-full h-4 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] h-full transition-all duration-500" style={{ width: `${xpProgress}%` }} />
        </div>
      </div>

      {/* Daily Tracking */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="w-6 h-6 text-[#3B82F6]" />
            <h3 className="text-lg font-bold">Água Hoje</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{gameState.waterIntake.toFixed(2)}L</span>
              <span className="text-sm text-gray-400">Meta: 2.5L</span>
            </div>
            <div className="bg-[#1A1A1A] rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] h-full transition-all duration-500"
                style={{ width: `${Math.min((gameState.waterIntake / 2.5) * 100, 100)}%` }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateWater(0.25)}
                className="flex-1 bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-2 rounded-lg font-semibold transition-all duration-300"
              >
                + 250ml
              </button>
              <button
                onClick={() => updateWater(-0.25)}
                className="px-4 bg-red-500/20 hover:bg-red-500/30 text-red-500 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                -
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
          <div className="flex items-center gap-3 mb-4">
            <Pizza className="w-6 h-6 text-[#3B82F6]" />
            <h3 className="text-lg font-bold">Calorias Hoje</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{gameState.caloriesIntake}</span>
              <span className="text-sm text-gray-400">Meta: 2200 kcal</span>
            </div>
            <div className="bg-[#1A1A1A] rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] h-full transition-all duration-500"
                style={{ width: `${Math.min((gameState.caloriesIntake / 2200) * 100, 100)}%` }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateCalories(100)}
                className="flex-1 bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-2 rounded-lg font-semibold transition-all duration-300"
              >
                + 100 kcal
              </button>
              <button
                onClick={() => updateCalories(-100)}
                className="px-4 bg-red-500/20 hover:bg-red-500/30 text-red-500 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Dumbbell} label="Treinos" value={gameState.completedWorkouts.length} unit="completos" color="text-[#3B82F6]" />
        <StatCard icon={Target} label="Refeições" value={gameState.completedMeals.length} unit="registradas" color="text-[#3B82F6]" />
        <StatCard icon={Trophy} label="Conquistas" value={gameState.badges.length} unit="badges" color="text-[#3B82F6]" />
        <StatCard icon={Flame} label="Sequência" value={gameState.streak} unit="dias" color="text-[#3B82F6]" />
      </div>

      {/* Daily Tasks */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#3B82F6]" />
          Missões Diárias
        </h3>
        <div className="space-y-3">
          <DailyTask title="Completar treino" xp={100} completed={gameState.completedWorkouts.length > 0} />
          <DailyTask title="Registrar 3 refeições" xp={50} completed={gameState.completedMeals.length >= 3} />
          <DailyTask title="8h de sono" xp={75} completed={gameState.sleepLogged} />
          <DailyTask title="Beber 2L de água" xp={25} completed={gameState.waterIntake >= 2} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <QuickActionCard
          icon={Dumbbell}
          title="Treino Rápido"
          description="15 min HIIT"
          xp="+120 XP"
          onClick={() => {}}
        />
        <QuickActionCard
          icon={Apple}
          title="Registrar Refeição"
          description="Ganhe XP"
          xp="+50 XP"
          onClick={() => {}}
        />
        <QuickActionCard
          icon={Moon}
          title="Registrar Sono"
          description="Descanso é evolução"
          xp="+75 XP"
          onClick={logSleep}
        />
      </div>
    </div>
  );
}

function Treinos({ gameState, addXP, setGameState }: any) {
  const [location, setLocation] = useState<"casa" | "rua">("casa");
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const workouts = {
    casa: [
      {
        id: "hiit-iniciante",
        title: "HIIT Iniciante",
        duration: "15 min",
        level: "Nível 1-5",
        xp: 120,
        icon: Flame,
        exercises: [
          { 
            name: "Polichinelos", 
            duration: "30s", 
            rest: "15s", 
            reps: 3,
            instructions: "Fique em pé com os pés juntos e braços ao lado do corpo. Pule abrindo as pernas e levantando os braços acima da cabeça simultaneamente. Retorne à posição inicial. Mantenha o core contraído e aterrisse suavemente."
          },
          { 
            name: "Agachamento", 
            duration: "30s", 
            rest: "15s", 
            reps: 3,
            instructions: "Fique em pé com os pés na largura dos ombros. Desça como se fosse sentar em uma cadeira, mantendo o peso nos calcanhares. Desça até as coxas ficarem paralelas ao chão. Suba empurrando pelos calcanhares. Mantenha as costas retas e o peito para cima."
          },
          { 
            name: "Flexões (joelhos)", 
            duration: "30s", 
            rest: "15s", 
            reps: 3,
            instructions: "Apoie as mãos no chão na largura dos ombros e os joelhos no chão. Mantenha o corpo em linha reta dos joelhos aos ombros. Desça o peito até quase tocar o chão, depois empurre para cima. Mantenha o core contraído durante todo o movimento."
          },
          { 
            name: "Mountain Climbers", 
            duration: "30s", 
            rest: "15s", 
            reps: 3,
            instructions: "Comece em posição de prancha alta. Traga um joelho em direção ao peito, depois alterne rapidamente com a outra perna, como se estivesse correndo no lugar. Mantenha os quadris baixos e o core contraído. Movimento deve ser rápido mas controlado."
          },
          { 
            name: "Prancha", 
            duration: "30s", 
            rest: "15s", 
            reps: 3,
            instructions: "Apoie os antebraços e dedos dos pés no chão. Mantenha o corpo em linha reta da cabeça aos pés. Não deixe os quadris caírem ou subirem. Contraia o abdômen e glúteos. Respire normalmente e mantenha a posição pelo tempo determinado."
          }
        ]
      },
      {
        id: "forca-corporal",
        title: "Força Corporal",
        duration: "30 min",
        level: "Nível 5-10",
        xp: 200,
        icon: Dumbbell,
        exercises: [
          { 
            name: "Flexões", 
            duration: "45s", 
            rest: "20s", 
            reps: 4,
            instructions: "Posição de prancha alta com mãos na largura dos ombros. Desça o corpo até o peito quase tocar o chão, mantendo os cotovelos próximos ao corpo. Empurre para cima até os braços ficarem estendidos. Mantenha o corpo reto da cabeça aos pés."
          },
          { 
            name: "Agachamento Búlgaro", 
            duration: "45s", 
            rest: "20s", 
            reps: 4,
            instructions: "Coloque um pé atrás em uma cadeira ou banco. Com o outro pé à frente, desça dobrando o joelho da frente até formar 90 graus. Suba empurrando pelo calcanhar da frente. Mantenha o tronco ereto. Faça todas as repetições de um lado, depois troque."
          },
          { 
            name: "Prancha Lateral", 
            duration: "30s cada lado", 
            rest: "15s", 
            reps: 3,
            instructions: "Deite de lado apoiando o antebraço no chão. Empilhe os pés um sobre o outro. Levante os quadris formando uma linha reta do ombro aos pés. Mantenha o core contraído e não deixe os quadris caírem. Segure a posição e depois troque de lado."
          },
          { 
            name: "Burpees", 
            duration: "45s", 
            rest: "20s", 
            reps: 4,
            instructions: "Comece em pé. Agache e coloque as mãos no chão. Jogue os pés para trás em posição de prancha. Faça uma flexão (opcional). Puxe os pés de volta para as mãos. Pule para cima com os braços acima da cabeça. Movimento deve ser fluido e contínuo."
          },
          { 
            name: "Tríceps no Chão", 
            duration: "45s", 
            rest: "20s", 
            reps: 4,
            instructions: "Sente no chão com as mãos atrás do corpo, dedos apontando para você. Dobre os joelhos e levante os quadris do chão. Dobre os cotovelos para descer o corpo, depois empurre para cima. Mantenha os cotovelos próximos ao corpo e não trave os cotovelos no topo."
          },
          { 
            name: "Afundo", 
            duration: "45s", 
            rest: "20s", 
            reps: 4,
            instructions: "Fique em pé e dê um passo grande à frente. Desça dobrando ambos os joelhos até formarem 90 graus. O joelho de trás deve quase tocar o chão. Empurre pelo calcanhar da frente para voltar à posição inicial. Alterne as pernas a cada repetição."
          }
        ]
      },
      {
        id: "core-power",
        title: "Core Power",
        duration: "20 min",
        level: "Nível 3-8",
        xp: 150,
        icon: Target,
        exercises: [
          { 
            name: "Prancha Frontal", 
            duration: "45s", 
            rest: "15s", 
            reps: 4,
            instructions: "Apoie os antebraços e dedos dos pés no chão. Corpo em linha reta da cabeça aos pés. Contraia abdômen e glúteos. Não deixe os quadris caírem ou subirem. Olhe para o chão mantendo o pescoço neutro. Respire normalmente durante toda a execução."
          },
          { 
            name: "Bicicleta no Ar", 
            duration: "45s", 
            rest: "15s", 
            reps: 4,
            instructions: "Deite de costas com as mãos atrás da cabeça. Levante as pernas e ombros do chão. Leve o cotovelo direito em direção ao joelho esquerdo enquanto estende a perna direita. Alterne os lados em movimento de pedalada. Mantenha o core contraído e não puxe o pescoço."
          },
          { 
            name: "Prancha com Toque no Ombro", 
            duration: "45s", 
            rest: "15s", 
            reps: 4,
            instructions: "Comece em posição de prancha alta. Mantenha os quadris estáveis e toque o ombro esquerdo com a mão direita. Volte à posição e repita do outro lado. Evite rotação dos quadris. Mantenha o core bem contraído durante todo o movimento."
          },
          { 
            name: "Russian Twist", 
            duration: "45s", 
            rest: "15s", 
            reps: 4,
            instructions: "Sente no chão com os joelhos dobrados e pés levantados. Incline o tronco para trás mantendo as costas retas. Junte as mãos e gire o tronco de um lado para o outro, tocando o chão ao lado dos quadris. Mantenha o core contraído e o movimento controlado."
          },
          { 
            name: "Dead Bug", 
            duration: "45s", 
            rest: "15s", 
            reps: 4,
            instructions: "Deite de costas com braços estendidos para cima e joelhos dobrados a 90 graus. Estenda o braço direito acima da cabeça enquanto estende a perna esquerda. Volte ao centro e alterne os lados. Mantenha as costas coladas no chão durante todo o movimento."
          }
        ]
      }
    ],
    rua: [
      {
        id: "corrida-intervalada",
        title: "Corrida Intervalada",
        duration: "30 min",
        level: "Nível 5-10",
        xp: 250,
        icon: Flame,
        exercises: [
          { 
            name: "Aquecimento (caminhada)", 
            duration: "5 min", 
            rest: "0s", 
            reps: 1,
            instructions: "Caminhe em ritmo moderado para preparar o corpo. Movimente os braços naturalmente. Respire profundamente. Use este tempo para mentalizar o treino. Aumente gradualmente o ritmo nos últimos 2 minutos."
          },
          { 
            name: "Corrida Moderada", 
            duration: "2 min", 
            rest: "1 min caminhada", 
            reps: 8,
            instructions: "Corra em ritmo confortável onde você consegue manter uma conversa. Mantenha a postura ereta, ombros relaxados. Aterrisse com o meio do pé. Braços dobrados a 90 graus balançando naturalmente. Respire ritmicamente (2 passos inspirando, 2 expirando)."
          },
          { 
            name: "Sprint", 
            duration: "30s", 
            rest: "1 min caminhada", 
            reps: 5,
            instructions: "Corra o mais rápido que conseguir mantendo a forma. Incline ligeiramente o corpo para frente. Levante os joelhos mais alto. Braços bombeando com força. Respire profundamente. Dê tudo de si nos 30 segundos. Use a caminhada para recuperar completamente."
          },
          { 
            name: "Desaquecimento (caminhada)", 
            duration: "5 min", 
            rest: "0s", 
            reps: 1,
            instructions: "Caminhe em ritmo lento para normalizar a frequência cardíaca. Respire profundamente. Relaxe os ombros e braços. Use este tempo para refletir sobre o treino. Nos últimos 2 minutos, diminua ainda mais o ritmo."
          }
        ]
      },
      {
        id: "treino-parque",
        title: "Treino em Parque",
        duration: "40 min",
        level: "Nível 8+",
        xp: 300,
        icon: Dumbbell,
        exercises: [
          { 
            name: "Corrida até o parque", 
            duration: "10 min", 
            rest: "2 min", 
            reps: 1,
            instructions: "Corra em ritmo moderado até o parque. Use como aquecimento. Mantenha postura ereta e respiração controlada. Aproveite para mentalizar os exercícios que virão. Chegando ao parque, caminhe por 2 minutos para recuperar."
          },
          { 
            name: "Pull-ups (barra)", 
            duration: "até a falha", 
            rest: "2 min", 
            reps: 4,
            instructions: "Segure a barra com as palmas para frente, mãos um pouco mais largas que os ombros. Puxe o corpo até o queixo passar da barra. Desça controladamente até os braços ficarem estendidos. Se não conseguir, faça negativas (pule para cima e desça devagar) ou use banda elástica."
          },
          { 
            name: "Dips (banco)", 
            duration: "até a falha", 
            rest: "2 min", 
            reps: 4,
            instructions: "Sente na borda de um banco com as mãos ao lado dos quadris. Deslize o bumbum para fora do banco. Dobre os cotovelos para descer o corpo, depois empurre para cima. Mantenha os cotovelos próximos ao corpo. Para facilitar, dobre os joelhos; para dificultar, estenda as pernas."
          },
          { 
            name: "Step-ups (banco)", 
            duration: "1 min", 
            rest: "1 min", 
            reps: 4,
            instructions: "Fique de frente para um banco. Suba colocando um pé completamente no banco. Empurre pelo calcanhar para subir completamente. Desça controladamente. Alterne as pernas a cada repetição. Mantenha o tronco ereto e o core contraído."
          },
          { 
            name: "Sprints curtos", 
            duration: "50m", 
            rest: "1 min", 
            reps: 6,
            instructions: "Marque uma distância de aproximadamente 50 metros. Corra o mais rápido possível mantendo a forma. Incline o corpo para frente, levante os joelhos, bombeie os braços. Desacelere gradualmente no final. Caminhe de volta para recuperar."
          },
          { 
            name: "Corrida de volta", 
            duration: "10 min", 
            rest: "0s", 
            reps: 1,
            instructions: "Corra em ritmo leve de volta para casa. Use como desaquecimento. Mantenha a respiração controlada. Relaxe o corpo. Aproveite para refletir sobre o treino completo. Diminua o ritmo gradualmente nos últimos 3 minutos."
          }
        ]
      },
      {
        id: "caminhada-ativa",
        title: "Caminhada Ativa",
        duration: "45 min",
        level: "Todos",
        xp: 150,
        icon: Target,
        exercises: [
          { 
            name: "Caminhada Rápida", 
            duration: "10 min", 
            rest: "0s", 
            reps: 1,
            instructions: "Caminhe em ritmo acelerado, mais rápido que o normal. Mantenha a postura ereta, ombros para trás. Balance os braços naturalmente. Respire profundamente pelo nariz. Mantenha um ritmo constante que seja desafiador mas sustentável."
          },
          { 
            name: "Caminhada com Passadas Longas", 
            duration: "5 min", 
            rest: "2 min", 
            reps: 3,
            instructions: "Aumente o comprimento das suas passadas sem correr. Empurre com força pela perna de trás. Mantenha o tronco ereto. Este exercício trabalha mais os glúteos e posteriores de coxa. Mantenha os braços balançando ativamente. Após 5 minutos, caminhe normalmente por 2 minutos."
          },
          { 
            name: "Subida de Escadas/Ladeira", 
            duration: "5 min", 
            rest: "2 min", 
            reps: 2,
            instructions: "Encontre uma escada ou ladeira. Suba em ritmo constante e desafiador. Incline ligeiramente o corpo para frente. Use os braços para ajudar no impulso. Respire profundamente. Ao chegar no topo, desça devagar e descanse por 2 minutos antes de repetir."
          },
          { 
            name: "Caminhada Moderada", 
            duration: "10 min", 
            rest: "0s", 
            reps: 1,
            instructions: "Caminhe em ritmo moderado para desaquecer. Mantenha a postura mas relaxe o ritmo. Respire profundamente. Use este tempo para alongar mentalmente. Aproveite o ambiente ao redor. Diminua gradualmente o ritmo nos últimos 3 minutos."
          }
        ]
      }
    ]
  };

  const currentWorkouts = workouts[location];

  if (selectedWorkout) {
    const workout = currentWorkouts.find(w => w.id === selectedWorkout);
    if (workout) {
      return <WorkoutDetail workout={workout} onBack={() => setSelectedWorkout(null)} gameState={gameState} addXP={addXP} setGameState={setGameState} />;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold">Treinos</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setLocation("casa")}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              location === "casa"
                ? "bg-[#3B82F6] text-white"
                : "bg-[#0A0A0A] text-gray-400 border border-[#3B82F6]/20"
            }`}
          >
            <Home className="w-4 h-4" />
            Casa
          </button>
          <button
            onClick={() => setLocation("rua")}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              location === "rua"
                ? "bg-[#3B82F6] text-white"
                : "bg-[#0A0A0A] text-gray-400 border border-[#3B82F6]/20"
            }`}
          >
            <MapPin className="w-4 h-4" />
            Rua
          </button>
        </div>
      </div>

      {/* Workout Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            location={location === "casa" ? "Casa" : "Rua"}
            onClick={() => setSelectedWorkout(workout.id)}
            completed={gameState.completedWorkouts.includes(workout.id)}
          />
        ))}
      </div>
    </div>
  );
}

function WorkoutDetail({ workout, onBack, gameState, addXP, setGameState }: any) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(new Array(workout.exercises.length).fill(false));
  const [isStarted, setIsStarted] = useState(false);

  const handleComplete = () => {
    const newCompleted = [...completedExercises];
    newCompleted[currentExercise] = true;
    setCompletedExercises(newCompleted);

    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      // Treino completo
      addXP(workout.xp);
      setGameState((prev: GameState) => ({
        ...prev,
        completedWorkouts: [...prev.completedWorkouts, workout.id]
      }));
      alert(`🎉 Parabéns! Treino completo! Você ganhou ${workout.xp} XP`);
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        <span>Voltar aos treinos</span>
      </button>

      <div className="bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/10 rounded-2xl p-6 sm:p-8 border border-[#3B82F6]/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">{workout.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {workout.duration}
              </span>
              <span className="text-[#3B82F6] font-semibold">+{workout.xp} XP</span>
            </div>
          </div>
          <workout.icon className="w-12 h-12 text-[#3B82F6]" />
        </div>

        {!isStarted ? (
          <button
            onClick={() => setIsStarted(true)}
            className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Iniciar Treino
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-[#0A0A0A] rounded-xl p-6 border border-[#3B82F6]/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">
                  Exercício {currentExercise + 1} de {workout.exercises.length}
                </span>
                <span className="text-sm font-semibold text-[#3B82F6]">
                  {completedExercises[currentExercise] ? "Completo" : "Em andamento"}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {workout.exercises[currentExercise].name}
              </h3>
              <p className="text-gray-400 mb-4">
                {workout.exercises[currentExercise].duration} • Descanso: {workout.exercises[currentExercise].rest} • {workout.exercises[currentExercise].reps}x
              </p>
              
              {/* Instruções detalhadas */}
              <div className="bg-[#1A1A1A] rounded-lg p-4 mb-4">
                <h4 className="text-sm font-bold text-[#3B82F6] mb-2">Como executar:</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {workout.exercises[currentExercise].instructions}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleComplete}
                  className="flex-1 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  {currentExercise < workout.exercises.length - 1 ? "Concluir e Próximo" : "Finalizar Treino"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <h3 className="text-xl font-bold mb-4">Lista de Exercícios</h3>
        <div className="space-y-3">
          {workout.exercises.map((exercise: any, index: number) => (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                index === currentExercise && isStarted
                  ? "bg-[#3B82F6]/20 border-[#3B82F6]/40"
                  : completedExercises[index]
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-white/5 border-[#3B82F6]/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold">{exercise.name}</p>
                  <p className="text-sm text-gray-400">
                    {exercise.duration} • Descanso: {exercise.rest} • {exercise.reps}x
                  </p>
                </div>
                {completedExercises[index] && (
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dieta({ gameState, setGameState, addXP }: any) {
  const meals = [
    { id: "breakfast", title: "Café da Manhã", time: "08:00", calories: 450, xp: 50 },
    { id: "lunch", title: "Almoço", time: "12:30", calories: 650, xp: 50 },
    { id: "snack", title: "Lanche", time: "16:00", calories: 200, xp: 25 },
    { id: "dinner", title: "Jantar", time: "19:30", calories: 550, xp: 50 }
  ];

  const registerMeal = (mealId: string, calories: number, xp: number) => {
    if (!gameState.completedMeals.includes(mealId)) {
      setGameState((prev: GameState) => ({
        ...prev,
        completedMeals: [...prev.completedMeals, mealId],
        caloriesIntake: prev.caloriesIntake + calories
      }));
      addXP(xp);
      alert(`✅ Refeição registrada! +${xp} XP`);
    }
  };

  const updateWater = (amount: number) => {
    setGameState((prev: GameState) => {
      const newWater = Math.max(0, Math.min(prev.waterIntake + amount, 5));
      if (newWater > prev.waterIntake) addXP(10);
      return { ...prev, waterIntake: newWater };
    });
  };

  const updateCalories = (amount: number) => {
    setGameState((prev: GameState) => {
      const newCalories = Math.max(0, Math.min(prev.caloriesIntake + amount, 5000));
      if (newCalories > prev.caloriesIntake) addXP(10);
      return { ...prev, caloriesIntake: newCalories };
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
        <Apple className="w-8 h-8 text-[#3B82F6]" />
        Dieta & Nutrição
      </h2>

      {/* Daily Nutrition with Tracking */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <h3 className="text-xl font-bold mb-4">Hoje</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-400 mb-2">Calorias</p>
            <p className="text-2xl font-bold mb-1">{gameState.caloriesIntake}<span className="text-sm text-gray-400">/2200</span></p>
            <p className="text-xs text-gray-500">kcal</p>
            <div className="bg-[#1A1A1A] rounded-full h-2 overflow-hidden mt-2 mb-3">
              <div
                className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] h-full transition-all duration-500"
                style={{ width: `${Math.min((gameState.caloriesIntake / 2200) * 100, 100)}%` }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateCalories(100)}
                className="flex-1 bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-1 px-2 rounded text-xs font-semibold transition-all duration-300"
              >
                +100
              </button>
              <button
                onClick={() => updateCalories(-100)}
                className="px-3 bg-red-500/20 hover:bg-red-500/30 text-red-500 py-1 rounded text-xs font-semibold transition-all duration-300"
              >
                -
              </button>
            </div>
          </div>

          <NutritionStat label="Proteínas" current={120} target={150} unit="g" />

          <div>
            <p className="text-sm text-gray-400 mb-2">Água</p>
            <p className="text-2xl font-bold mb-1">{gameState.waterIntake.toFixed(2)}<span className="text-sm text-gray-400">/2.5</span></p>
            <p className="text-xs text-gray-500">L</p>
            <div className="bg-[#1A1A1A] rounded-full h-2 overflow-hidden mt-2 mb-3">
              <div
                className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] h-full transition-all duration-500"
                style={{ width: `${Math.min((gameState.waterIntake / 2.5) * 100, 100)}%` }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateWater(0.25)}
                className="flex-1 bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-1 px-2 rounded text-xs font-semibold transition-all duration-300"
              >
                +250ml
              </button>
              <button
                onClick={() => updateWater(-0.25)}
                className="px-3 bg-red-500/20 hover:bg-red-500/30 text-red-500 py-1 rounded text-xs font-semibold transition-all duration-300"
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-4">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            title={meal.title}
            time={meal.time}
            calories={meal.calories}
            xp={meal.xp}
            registered={gameState.completedMeals.includes(meal.id)}
            onRegister={() => registerMeal(meal.id, meal.calories, meal.xp)}
          />
        ))}
      </div>

      {/* Meal Suggestions */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Beef className="w-5 h-5 text-[#3B82F6]" />
          Sugestões de Refeições
        </h3>
        <div className="space-y-3">
          <SuggestionCard
            title="Frango com Batata Doce"
            calories={520}
            protein={45}
            carbs={50}
          />
          <SuggestionCard
            title="Omelete com Aveia"
            calories={380}
            protein={28}
            carbs={35}
          />
          <SuggestionCard
            title="Salada com Atum"
            calories={320}
            protein={35}
            carbs={20}
          />
        </div>
      </div>
    </div>
  );
}

function Progresso({ gameState }: any) {
  const allBadges = [
    { id: "level5", icon: Star, label: "Nível 5", unlocked: gameState.level >= 5 },
    { id: "level10", icon: Trophy, label: "Nível 10", unlocked: gameState.level >= 10 },
    { id: "7workouts", icon: Dumbbell, label: "7 Treinos", unlocked: gameState.completedWorkouts.length >= 7 },
    { id: "7streak", icon: Flame, label: "7 Dias", unlocked: gameState.streak >= 7 },
    { id: "firstWorkout", icon: Target, label: "1º Treino", unlocked: gameState.completedWorkouts.length >= 1 },
    { id: "firstMeal", icon: Apple, label: "1ª Refeição", unlocked: gameState.completedMeals.length >= 1 },
    { id: "water", icon: Droplet, label: "Hidratado", unlocked: gameState.waterIntake >= 2.5 },
    { id: "sleep", icon: Moon, label: "Descansado", unlocked: gameState.sleepLogged },
    { id: "dedication", icon: Award, label: "Dedicação", unlocked: gameState.completedWorkouts.length >= 3 },
    { id: "nutrition", icon: Pizza, label: "Nutrição", unlocked: gameState.completedMeals.length >= 10 },
    { id: "warrior", icon: Brain, label: "Guerreiro", unlocked: gameState.level >= 15 },
    { id: "champion", icon: Trophy, label: "Campeão", unlocked: gameState.xp >= 5000 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
        <Brain className="w-8 h-8 text-[#3B82F6]" />
        Seu Progresso
      </h2>

      {/* XP Chart */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <h3 className="text-xl font-bold mb-4">Evolução de XP - Última Semana</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          <ChartBar height={60} label="Seg" xp="320" />
          <ChartBar height={75} label="Ter" xp="450" />
          <ChartBar height={55} label="Qua" xp="280" />
          <ChartBar height={90} label="Qui" xp="520" />
          <ChartBar height={80} label="Sex" xp="480" />
          <ChartBar height={45} label="Sáb" xp="220" />
          <ChartBar height={70} label="Dom" xp="380" />
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#3B82F6]" />
          Conquistas ({allBadges.filter(b => b.unlocked).length}/{allBadges.length})
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {allBadges.map((badge) => (
            <Badge key={badge.id} icon={badge.icon} label={badge.label} unlocked={badge.unlocked} />
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
          <h3 className="text-lg font-semibold mb-4">Estatísticas Atuais</h3>
          <div className="space-y-3">
            <StatRow label="Treinos Completos" value={gameState.completedWorkouts.length} />
            <StatRow label="XP Total" value={gameState.xp} />
            <StatRow label="Nível Atual" value={gameState.level} />
            <StatRow label="Refeições Registradas" value={gameState.completedMeals.length} />
          </div>
        </div>
        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
          <h3 className="text-lg font-semibold mb-4">Recordes Pessoais</h3>
          <div className="space-y-3">
            <StatRow label="Maior Sequência" value={`${gameState.streak} dias`} />
            <StatRow label="Conquistas" value={`${allBadges.filter(b => b.unlocked).length}/${allBadges.length}`} />
            <StatRow label="Água Máxima" value={`${gameState.waterIntake.toFixed(1)}L`} />
            <StatRow label="Nível Máximo" value={`Nível ${gameState.level}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Configuracoes({ gameState, router, resetDaily }: any) {
  const [view, setView] = useState<SettingsView>("main");
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Usuário Potencial",
    email: "usuario@email.com"
  });

  if (view === "profile") {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setView("main")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Voltar</span>
        </button>

        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
          <h3 className="text-xl font-bold mb-6">Editar Perfil</h3>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] px-4 py-2 rounded-lg font-semibold transition-all duration-300">
              Alterar Foto
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Nome</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                disabled={!editMode}
                className="w-full bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!editMode}
                className="w-full bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6] disabled:opacity-50"
              />
            </div>

            <div className="pt-4">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Editar Informações
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditMode(false);
                      alert("✅ Perfil atualizado com sucesso!");
                    }}
                    className="flex-1 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 bg-red-500/20 hover:bg-red-500/30 text-red-500 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "privacy") {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setView("main")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Voltar</span>
        </button>

        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#3B82F6]" />
            Privacidade
          </h3>
          <div className="space-y-4 text-gray-300">
            <p>O Potencial respeita sua privacidade e segurança dos seus dados.</p>
            <div className="space-y-3">
              <div className="bg-[#1A1A1A] rounded-lg p-4">
                <h4 className="font-semibold mb-2">Dados Coletados</h4>
                <p className="text-sm text-gray-400">Coletamos apenas informações necessárias para o funcionamento do app: progresso de treinos, refeições e estatísticas de uso.</p>
              </div>
              <div className="bg-[#1A1A1A] rounded-lg p-4">
                <h4 className="font-semibold mb-2">Armazenamento</h4>
                <p className="text-sm text-gray-400">Seus dados são armazenados localmente no seu dispositivo e criptografados.</p>
              </div>
              <div className="bg-[#1A1A1A] rounded-lg p-4">
                <h4 className="font-semibold mb-2">Compartilhamento</h4>
                <p className="text-sm text-gray-400">Não compartilhamos seus dados com terceiros sem seu consentimento explícito.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "support") {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setView("main")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Voltar</span>
        </button>

        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#3B82F6]" />
            Ajuda e Suporte
          </h3>
          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <h4 className="font-semibold mb-2">Como funciona o sistema de XP?</h4>
              <p className="text-sm text-gray-400">Você ganha XP completando treinos, registrando refeições e cumprindo suas metas diárias. A cada 1000 XP você sobe de nível!</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <h4 className="font-semibold mb-2">Como desbloquear conquistas?</h4>
              <p className="text-sm text-gray-400">Conquistas são desbloqueadas automaticamente ao atingir marcos específicos, como completar 7 treinos ou manter uma sequência de 7 dias.</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <h4 className="font-semibold mb-2">Precisa de mais ajuda?</h4>
              <p className="text-sm text-gray-400 mb-3">Entre em contato conosco:</p>
              <button className="w-full bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-2 rounded-lg font-semibold transition-all duration-300">
                suporte@potencial.app
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "about") {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setView("main")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span>Voltar</span>
        </button>

        <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-[#3B82F6]" />
            Sobre o Potencial
          </h3>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-2xl flex items-center justify-center">
                <Dumbbell className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-2">Potencial</h4>
              <p className="text-sm text-gray-400 mb-4">Versão 1.0.0</p>
            </div>
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                O Potencial é um app de fitness gamificado que transforma sua jornada de saúde em uma aventura épica. 
                Complete treinos, registre refeições, ganhe XP, suba de nível e desbloqueie conquistas enquanto evolui 
                para a melhor versão de si mesmo.
              </p>
            </div>
            <div className="bg-[#1A1A1A] rounded-lg p-4">
              <h4 className="font-semibold mb-2">Missão</h4>
              <p className="text-sm text-gray-400">
                Ajudar pessoas a alcançarem seu máximo potencial através de hábitos saudáveis e consistência.
              </p>
            </div>
            <div className="text-center text-sm text-gray-500 pt-4">
              <p>© 2024 Potencial. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold">Configurações</h2>

      {/* Profile Section */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <h3 className="text-lg font-semibold mb-4">Perfil</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <p className="font-semibold">{profileData.name}</p>
            <p className="text-sm text-gray-400">{profileData.email}</p>
            <p className="text-sm text-[#3B82F6] font-semibold mt-1">Nível {gameState.level} - {gameState.xp} XP</p>
          </div>
        </div>
        <button 
          onClick={() => setView("profile")}
          className="w-full bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-3 rounded-xl font-semibold transition-all duration-300 border border-[#3B82F6]/30"
        >
          Editar Perfil
        </button>
      </div>

      {/* Subscription */}
      <div className="bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/10 rounded-2xl p-6 border border-[#3B82F6]/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#3B82F6]" />
              Plano Atual
            </h3>
            <p className="text-sm text-gray-400 mt-1">Plano Gratuito</p>
          </div>
          <Star className="w-8 h-8 text-[#3B82F6]" />
        </div>
        <button 
          onClick={() => router.push("/planos")}
          className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          Ver Planos Premium
        </button>
      </div>

      {/* Settings Options */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20 space-y-4">
        <h3 className="text-lg font-semibold mb-4">Preferências</h3>
        <SettingItem label="Notificações" active />
        <SettingItem label="Lembretes de Treino" active />
        <SettingItem label="Lembretes de Refeição" />
        <SettingItem label="Sons e Vibração" active />
      </div>

      {/* Account Options */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20 space-y-3">
        <h3 className="text-lg font-semibold mb-4">Conta</h3>
        <button 
          onClick={() => setView("privacy")}
          className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-between"
        >
          <span>Privacidade</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={() => setView("support")}
          className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-between"
        >
          <span>Ajuda e Suporte</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={() => setView("about")}
          className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 transition-all duration-300 flex items-center justify-between"
        >
          <span>Sobre o Potencial</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          onClick={() => {
            if (confirm("Tem certeza que deseja resetar todo o progresso?")) {
              localStorage.removeItem("potencial_game_state");
              resetDaily();
              alert("✅ Progresso resetado!");
              window.location.reload();
            }
          }}
          className="w-full text-left py-3 px-4 rounded-xl hover:bg-yellow-500/10 text-yellow-500 transition-all duration-300"
        >
          Resetar Progresso
        </button>
        <button 
          onClick={() => {
            if (confirm("Tem certeza que deseja sair?")) {
              router.push("/login");
            }
          }}
          className="w-full text-left py-3 px-4 rounded-xl hover:bg-red-500/10 text-red-500 transition-all duration-300"
        >
          Sair da Conta
        </button>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ icon: Icon, label, value, unit, color }: any) {
  return (
    <div className="bg-[#0A0A0A] rounded-xl p-4 sm:p-6 border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 transition-all duration-300 hover:scale-105">
      <Icon className={`w-6 h-6 ${color} mb-2`} />
      <p className="text-2xl sm:text-3xl font-bold">{value}</p>
      <p className="text-xs text-gray-400">{unit}</p>
      <p className="text-sm text-gray-300 mt-1">{label}</p>
    </div>
  );
}

function DailyTask({ title, xp, completed }: any) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
      completed ? "bg-[#3B82F6]/10 border border-[#3B82F6]/30" : "bg-white/5 border border-[#3B82F6]/10"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          completed ? "bg-[#3B82F6] border-[#3B82F6]" : "border-gray-600"
        }`}>
          {completed && <Check className="w-4 h-4 text-white" />}
        </div>
        <span className={completed ? "text-white" : "text-gray-400"}>{title}</span>
      </div>
      <span className="text-sm font-semibold text-[#3B82F6]">+{xp} XP</span>
    </div>
  );
}

function QuickActionCard({ icon: Icon, title, description, xp, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="bg-[#0A0A0A] hover:bg-[#1A1A1A] rounded-2xl p-6 border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 transition-all duration-300 hover:scale-105 text-left group"
    >
      <Icon className="w-8 h-8 text-[#3B82F6] mb-3 group-hover:scale-110 transition-transform duration-300" />
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-2">{description}</p>
      <p className="text-sm font-semibold text-[#3B82F6]">{xp}</p>
    </button>
  );
}

function WorkoutCard({ workout, location, onClick, completed }: any) {
  const Icon = workout.icon;
  return (
    <div 
      onClick={onClick}
      className={`bg-[#0A0A0A] rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105 group cursor-pointer ${
        completed ? "border-green-500/40 bg-green-500/5" : "border-[#3B82F6]/20 hover:border-[#3B82F6]/40"
      }`}
    >
      <div className="bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/10 h-32 flex items-center justify-center relative">
        <Icon className="w-16 h-16 text-[#3B82F6]" />
        {completed && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-xs text-[#3B82F6]">{location}</span>
        </div>
        <h3 className="font-bold text-lg mb-2">{workout.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {workout.duration}
          </span>
          <span className="text-[#3B82F6] font-semibold">+{workout.xp} XP</span>
        </div>
        <div className="pt-3 border-t border-[#3B82F6]/20">
          <span className="text-xs bg-[#3B82F6]/20 text-[#3B82F6] px-3 py-1 rounded-full">
            {workout.level}
          </span>
        </div>
      </div>
    </div>
  );
}

function NutritionStat({ label, current, target, unit }: any) {
  const percentage = (current / target) * 100;
  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-2xl font-bold mb-1">{current}<span className="text-sm text-gray-400">/{target}</span></p>
      <p className="text-xs text-gray-500">{unit}</p>
      <div className="bg-[#1A1A1A] rounded-full h-2 overflow-hidden mt-2">
        <div
          className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] h-full transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

function MealCard({ title, time, calories, xp, registered, onRegister }: any) {
  return (
    <div className={`rounded-xl p-4 border transition-all duration-300 ${
      registered 
        ? "bg-[#3B82F6]/10 border-[#3B82F6]/30" 
        : "bg-[#0A0A0A] border-[#3B82F6]/20 hover:border-[#3B82F6]/40"
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold mb-1">{title}</h4>
          <p className="text-sm text-gray-400">{time}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-[#3B82F6]">{calories} kcal</p>
          <p className="text-xs text-gray-400">+{xp} XP</p>
        </div>
      </div>
      {!registered && (
        <button 
          onClick={onRegister}
          className="w-full mt-3 bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-2 rounded-lg text-sm font-semibold transition-all duration-300"
        >
          Registrar
        </button>
      )}
    </div>
  );
}

function SuggestionCard({ title, calories, protein, carbs }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
      <div>
        <p className="font-semibold mb-1">{title}</p>
        <p className="text-xs text-gray-400">P: {protein}g | C: {carbs}g</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-[#3B82F6]">{calories} kcal</p>
      </div>
    </div>
  );
}

function ChartBar({ height, label, xp }: any) {
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className="w-full bg-[#1A1A1A] rounded-t-lg overflow-hidden flex items-end" style={{ height: "200px" }}>
        <div
          className="w-full bg-gradient-to-t from-[#1E3A8A] to-[#3B82F6] rounded-t-lg transition-all duration-500 flex items-start justify-center pt-2"
          style={{ height: `${height}%` }}
        >
          <span className="text-xs font-semibold">{xp}</span>
        </div>
      </div>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

function Badge({ icon: Icon, label, unlocked }: any) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
        unlocked
          ? "bg-[#3B82F6]/20 border-[#3B82F6]/40 hover:scale-110"
          : "bg-[#0A0A0A] border-[#3B82F6]/10 opacity-40"
      }`}
    >
      <Icon className={`w-8 h-8 ${unlocked ? "text-[#3B82F6]" : "text-gray-600"}`} />
      <span className="text-xs text-center">{label}</span>
    </div>
  );
}

function StatRow({ label, value }: any) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-[#3B82F6]">{value}</span>
    </div>
  );
}

function SettingItem({ label, active }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
      <span>{label}</span>
      <div
        className={`w-12 h-6 rounded-full transition-all duration-300 ${
          active ? "bg-[#3B82F6]" : "bg-gray-600"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
            active ? "translate-x-6" : "translate-x-0.5"
          } mt-0.5`}
        />
      </div>
    </div>
  );
}
