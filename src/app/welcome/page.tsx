"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Target, ChevronRight, Dumbbell, Brain, Apple } from "lucide-react";
import Image from "next/image";

export default function WelcomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: null,
      title: "Bem-vindo ao Potencial",
      description: "Transforme sua rotina em um jogo de evolução. Ganhe XP, suba de nível e desbloqueie seu verdadeiro potencial físico.",
      showHero: true
    },
    {
      icon: Target,
      title: "Sistema de XP e Níveis",
      description: "Cada treino, refeição saudável e descanso adequado te dá XP. Evolua como em um RPG e acompanhe sua jornada.",
      showHero: false
    },
    {
      icon: Dumbbell,
      title: "Treinos Casa & Rua",
      description: "Escolha treinar em casa ou ao ar livre. Exercícios adaptados para qualquer lugar, sem necessidade de equipamentos.",
      showHero: false
    },
    {
      icon: Brain,
      title: "Dieta, Treino e Descanso",
      description: "Sistema completo que equilibra alimentação, exercícios e recuperação. Tudo integrado para maximizar seus resultados.",
      showHero: false
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push("/login");
    }
  };

  const handleSkip = () => {
    router.push("/login");
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/20 via-black to-black z-0" />

      {/* Header */}
      <header className="p-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-xl flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold">Potencial</h1>
        </div>
        <button
          onClick={handleSkip}
          className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium"
        >
          Pular
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20 relative z-10">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Hero Image or Icon */}
          {slides[currentSlide].showHero ? (
            <div className="flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-[#3B82F6] shadow-2xl shadow-[#3B82F6]/50">
                <Image
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/4699406f-9890-4676-a665-85e12ffd4387.png"
                  alt="Sung Jin-Woo - Potencial Hero"
                  fill
                  className="object-cover object-[center_20%] scale-150"
                  priority
                />
                {/* Blue fire effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-l from-[#3B82F6]/40 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/10 rounded-3xl flex items-center justify-center border border-[#3B82F6]/30 animate-pulse">
                {CurrentIcon && <CurrentIcon className="w-16 h-16 text-[#3B82F6]" />}
              </div>
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {slides[currentSlide].title}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed">
            {slides[currentSlide].description}
          </p>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-[#3B82F6]"
                    : "w-2 bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="p-6 space-y-4 relative z-10">
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group shadow-lg shadow-[#3B82F6]/30"
        >
          <span>{currentSlide === slides.length - 1 ? "Começar" : "Próximo"}</span>
          {currentSlide === slides.length - 1 ? (
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          ) : (
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          )}
        </button>

        {currentSlide < slides.length - 1 && (
          <div className="text-center">
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Pular introdução
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
