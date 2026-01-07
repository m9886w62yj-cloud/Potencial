"use client";

import { TrendingUp, Calendar, Flame, Dumbbell, Apple } from "lucide-react";

interface WeeklyProgressProps {
  gameState: any;
}

export default function WeeklyProgress({ gameState }: WeeklyProgressProps) {
  // Dados simulados da semana (em produção, viriam do histórico real)
  const weekData = [
    { day: "Seg", xp: 320, workouts: 1, meals: 3, date: "06/01" },
    { day: "Ter", xp: 450, workouts: 1, meals: 4, date: "07/01" },
    { day: "Qua", xp: 280, workouts: 0, meals: 3, date: "08/01" },
    { day: "Qui", xp: 520, workouts: 2, meals: 4, date: "09/01" },
    { day: "Sex", xp: 480, workouts: 1, meals: 3, date: "10/01" },
    { day: "Sáb", xp: 220, workouts: 0, meals: 2, date: "11/01" },
    { day: "Dom", xp: 380, workouts: 1, meals: 3, date: "12/01" }
  ];

  const totalWeekXP = weekData.reduce((sum, day) => sum + day.xp, 0);
  const totalWorkouts = weekData.reduce((sum, day) => sum + day.workouts, 0);
  const totalMeals = weekData.reduce((sum, day) => sum + day.meals, 0);
  const activeDays = weekData.filter(day => day.xp > 0).length;
  const maxXP = Math.max(...weekData.map(d => d.xp));

  return (
    <div className="space-y-6">
      {/* Resumo da Semana */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#3B82F6]/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-xs text-gray-400">XP Total</span>
          </div>
          <p className="text-2xl font-bold text-[#3B82F6]">{totalWeekXP}</p>
        </div>

        <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#3B82F6]/20">
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-xs text-gray-400">Treinos</span>
          </div>
          <p className="text-2xl font-bold">{totalWorkouts}</p>
        </div>

        <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#3B82F6]/20">
          <div className="flex items-center gap-2 mb-2">
            <Apple className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-xs text-gray-400">Refeições</span>
          </div>
          <p className="text-2xl font-bold">{totalMeals}</p>
        </div>

        <div className="bg-[#0A0A0A] rounded-xl p-4 border border-[#3B82F6]/20">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-xs text-gray-400">Dias Ativos</span>
          </div>
          <p className="text-2xl font-bold">{activeDays}/7</p>
        </div>
      </div>

      {/* Gráfico de Barras Melhorado */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#3B82F6]" />
          Evolução de XP - Última Semana
        </h3>
        
        <div className="h-64 flex items-end justify-between gap-2">
          {weekData.map((day, index) => {
            const height = (day.xp / maxXP) * 100;
            const isToday = index === 1; // Simulando que terça é hoje
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                {/* Barra */}
                <div className="w-full bg-[#1A1A1A] rounded-t-lg overflow-hidden flex items-end relative group" style={{ height: "200px" }}>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 flex flex-col items-center justify-start pt-2 relative ${
                      isToday 
                        ? "bg-gradient-to-t from-[#3B82F6] to-[#60A5FA]" 
                        : "bg-gradient-to-t from-[#1E3A8A] to-[#3B82F6]"
                    }`}
                    style={{ height: `${height}%` }}
                  >
                    <span className="text-xs font-semibold">{day.xp}</span>
                    
                    {/* Tooltip ao passar o mouse */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-black border border-[#3B82F6]/30 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                      <p className="text-xs font-semibold mb-1">{day.date}</p>
                      <p className="text-xs text-gray-400">XP: {day.xp}</p>
                      <p className="text-xs text-gray-400">Treinos: {day.workouts}</p>
                      <p className="text-xs text-gray-400">Refeições: {day.meals}</p>
                    </div>
                  </div>
                </div>
                
                {/* Label do dia */}
                <div className="text-center">
                  <span className={`text-xs font-medium ${isToday ? "text-[#3B82F6]" : "text-gray-400"}`}>
                    {day.day}
                  </span>
                  {isToday && (
                    <div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full mx-auto mt-1"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="mt-6 pt-4 border-t border-[#3B82F6]/20 flex items-center justify-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-t from-[#1E3A8A] to-[#3B82F6] rounded"></div>
            <span>Dias anteriores</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-t from-[#3B82F6] to-[#60A5FA] rounded"></div>
            <span>Hoje</span>
          </div>
        </div>
      </div>

      {/* Análise da Semana */}
      <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#3B82F6]/5 rounded-2xl p-6 border border-[#3B82F6]/30">
        <h3 className="text-lg font-bold mb-4">📊 Análise da Semana</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-1.5 flex-shrink-0"></div>
            <p className="text-gray-300">
              Você esteve ativo em <span className="text-[#3B82F6] font-semibold">{activeDays} de 7 dias</span> esta semana
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-1.5 flex-shrink-0"></div>
            <p className="text-gray-300">
              Seu melhor dia foi <span className="text-[#3B82F6] font-semibold">Quinta-feira</span> com {maxXP} XP
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-1.5 flex-shrink-0"></div>
            <p className="text-gray-300">
              Média diária: <span className="text-[#3B82F6] font-semibold">{Math.round(totalWeekXP / 7)} XP</span>
            </p>
          </div>
          {activeDays < 5 && (
            <div className="flex items-start gap-3 mt-4 pt-4 border-t border-[#3B82F6]/20">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-gray-300">
                💡 <span className="text-yellow-500 font-semibold">Dica:</span> Tente manter pelo menos 5 dias ativos por semana para melhores resultados!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
