"use client";

import { useState } from "react";
import { Apple, Droplet, Pizza, Plus, Minus, TrendingUp } from "lucide-react";

interface DietTrackerProps {
  gameState: any;
  setGameState: any;
  addXP: any;
}

export default function DietTracker({ gameState, setGameState, addXP }: DietTrackerProps) {
  const [customCalories, setCustomCalories] = useState("");
  const [customWater, setCustomWater] = useState("");

  const dailyCaloriesGoal = 2200;
  const dailyWaterGoal = 2.5;
  const dailyProteinGoal = 150;

  const caloriesPercentage = Math.min((gameState.caloriesIntake / dailyCaloriesGoal) * 100, 100);
  const waterPercentage = Math.min((gameState.waterIntake / dailyWaterGoal) * 100, 100);

  const updateCalories = (amount: number) => {
    setGameState((prev: any) => {
      const newCalories = Math.max(0, Math.min(prev.caloriesIntake + amount, 5000));
      if (newCalories > prev.caloriesIntake) addXP(10);
      return { ...prev, caloriesIntake: newCalories };
    });
  };

  const updateWater = (amount: number) => {
    setGameState((prev: any) => {
      const newWater = Math.max(0, Math.min(prev.waterIntake + amount, 10));
      if (newWater > prev.waterIntake) addXP(10);
      return { ...prev, waterIntake: newWater };
    });
  };

  const addCustomCalories = () => {
    const amount = parseInt(customCalories);
    if (!isNaN(amount) && amount > 0) {
      updateCalories(amount);
      setCustomCalories("");
    }
  };

  const addCustomWater = () => {
    const amount = parseFloat(customWater);
    if (!isNaN(amount) && amount > 0) {
      updateWater(amount);
      setCustomWater("");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
        <Apple className="w-8 h-8 text-[#3B82F6]" />
        Dieta & Nutrição
      </h2>

      {/* Resumo Diário */}
      <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#3B82F6]/5 rounded-2xl p-6 border border-[#3B82F6]/30">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
          <h3 className="text-lg font-bold">Progresso de Hoje</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#3B82F6]">{Math.round(caloriesPercentage)}%</p>
            <p className="text-sm text-gray-400">Meta de Calorias</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#3B82F6]">{Math.round(waterPercentage)}%</p>
            <p className="text-sm text-gray-400">Meta de Hidratação</p>
          </div>
        </div>
      </div>

      {/* Tracking de Calorias */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <div className="flex items-center gap-3 mb-4">
          <Pizza className="w-6 h-6 text-[#3B82F6]" />
          <h3 className="text-lg font-bold">Calorias Consumidas</h3>
        </div>
        
        <div className="space-y-4">
          {/* Progresso */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{gameState.caloriesIntake}</span>
              <span className="text-sm text-gray-400">Meta: {dailyCaloriesGoal} kcal</span>
            </div>
            <div className="bg-[#1A1A1A] rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] h-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${caloriesPercentage}%` }}
              >
                {caloriesPercentage > 10 && (
                  <span className="text-xs font-semibold">{Math.round(caloriesPercentage)}%</span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Restam {Math.max(0, dailyCaloriesGoal - gameState.caloriesIntake)} kcal para atingir a meta
            </p>
          </div>

          {/* Botões rápidos */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => updateCalories(100)}
              className="bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              +100
            </button>
            <button
              onClick={() => updateCalories(250)}
              className="bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              +250
            </button>
            <button
              onClick={() => updateCalories(500)}
              className="bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              +500
            </button>
            <button
              onClick={() => updateCalories(-100)}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-500 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              -100
            </button>
          </div>

          {/* Input customizado */}
          <div className="flex gap-2">
            <input
              type="number"
              value={customCalories}
              onChange={(e) => setCustomCalories(e.target.value)}
              placeholder="Valor personalizado"
              className="flex-1 bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6]"
            />
            <button
              onClick={addCustomCalories}
              disabled={!customCalories}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Tracking de Água */}
      <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
        <div className="flex items-center gap-3 mb-4">
          <Droplet className="w-6 h-6 text-[#3B82F6]" />
          <h3 className="text-lg font-bold">Hidratação</h3>
        </div>
        
        <div className="space-y-4">
          {/* Progresso */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{gameState.waterIntake.toFixed(2)}L</span>
              <span className="text-sm text-gray-400">Meta: {dailyWaterGoal}L</span>
            </div>
            <div className="bg-[#1A1A1A] rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-600 to-blue-500 h-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${waterPercentage}%` }}
              >
                {waterPercentage > 10 && (
                  <span className="text-xs font-semibold">{Math.round(waterPercentage)}%</span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Restam {Math.max(0, dailyWaterGoal - gameState.waterIntake).toFixed(2)}L para atingir a meta
            </p>
          </div>

          {/* Botões rápidos */}
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={() => updateWater(0.25)}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              +250ml
            </button>
            <button
              onClick={() => updateWater(0.5)}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              +500ml
            </button>
            <button
              onClick={() => updateWater(0.75)}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              +750ml
            </button>
            <button
              onClick={() => updateWater(1)}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              +1L
            </button>
            <button
              onClick={() => updateWater(-0.25)}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-500 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            >
              -250ml
            </button>
          </div>

          {/* Input customizado */}
          <div className="flex gap-2">
            <input
              type="number"
              step="0.1"
              value={customWater}
              onChange={(e) => setCustomWater(e.target.value)}
              placeholder="Valor em litros (ex: 0.3)"
              className="flex-1 bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6]"
            />
            <button
              onClick={addCustomWater}
              disabled={!customWater}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Dicas de Nutrição */}
      <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#3B82F6]/5 rounded-2xl p-6 border border-[#3B82F6]/30">
        <h3 className="text-lg font-bold mb-4">💡 Dicas de Nutrição</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-1.5 flex-shrink-0"></div>
            <p>Beba água regularmente ao longo do dia, não apenas quando sentir sede</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-1.5 flex-shrink-0"></div>
            <p>Distribua suas calorias em 4-6 refeições menores ao longo do dia</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-1.5 flex-shrink-0"></div>
            <p>Priorize proteínas magras, carboidratos complexos e gorduras saudáveis</p>
          </div>
        </div>
      </div>
    </div>
  );
}
