"use client";

import { useRouter } from "next/navigation";
import { Check, ArrowLeft, Crown, Star, Sparkles, Dumbbell, Brain, Video, Zap, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { getDaysLeftInTrial, isTrialActive } from "@/lib/subscription";

export default function PlanosPage() {
  const router = useRouter();
  const [daysLeft, setDaysLeft] = useState(7);

  useEffect(() => {
    setDaysLeft(getDaysLeftInTrial());
  }, []);

  const handleSelectPlan = (plan: "basico" | "pro" | "monarca") => {
    if (plan === "basico") {
      router.push("/dashboard");
    } else {
      router.push(`/checkout?plan=${plan}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-[#3B82F6]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Voltar</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">Potencial</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Desbloqueie Seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]">Potencial Máximo</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Escolha o plano ideal para sua jornada de evolução. Ganhe mais XP, desbloqueie treinos exclusivos e acelere seus resultados.
          </p>
          {isTrialActive() && (
            <div className="mt-6 inline-block bg-yellow-500/20 border border-yellow-500/40 rounded-full px-6 py-2">
              <p className="text-yellow-500 font-semibold">
                🎁 Você tem {daysLeft} {daysLeft === 1 ? "dia" : "dias"} restantes no período gratuito
              </p>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Básico - Free Trial 7 dias */}
          <div className="bg-[#0A0A0A] rounded-2xl p-8 border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-[#3B82F6]" />
              <h3 className="text-2xl font-bold">Básico</h3>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">Grátis</p>
              <p className="text-gray-400">por 7 dias</p>
              <p className="text-sm text-yellow-500 mt-1">Depois precisa assinar Pro ou Monarca</p>
            </div>
            <ul className="space-y-3 mb-8">
              <Feature text="Treinos básicos (casa & rua)" />
              <Feature text="Sistema de XP e níveis" />
              <Feature text="Registro de dieta simples" />
              <Feature text="Tracking básico de progresso" />
              <Feature text="Suporte por email" />
            </ul>
            <button 
              onClick={() => handleSelectPlan("basico")}
              className="w-full bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 text-[#3B82F6] py-4 rounded-xl font-bold transition-all duration-300 border border-[#3B82F6]/30"
            >
              Começar Período Gratuito
            </button>
          </div>

          {/* Pro - Monthly - Highlighted */}
          <div className="bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/10 rounded-2xl p-8 border-2 border-[#3B82F6] relative hover:scale-105 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] px-6 py-2 rounded-full">
              <span className="text-sm font-bold">MAIS POPULAR</span>
            </div>
            <div className="flex items-center gap-2 mb-4 mt-2">
              <Crown className="w-6 h-6 text-[#3B82F6]" />
              <h3 className="text-2xl font-bold">Pro</h3>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">R$ 29,90</p>
              <p className="text-gray-400">por mês</p>
            </div>
            <ul className="space-y-3 mb-8">
              <Feature text="Todos os treinos desbloqueados" highlighted />
              <Feature text="XP bônus de 50%" highlighted />
              <Feature text="Planos de dieta personalizados" highlighted />
              <Feature text="Treinos com vídeos explicativos" highlighted />
              <Feature text="Análise de progresso avançada" highlighted />
              <Feature text="Coach IA personalizado" highlighted />
              <Feature text="Biblioteca de 500+ exercícios" highlighted />
              <Feature text="Suporte prioritário 24/7" highlighted />
              <Feature text="Sem anúncios" highlighted />
              <Feature text="Histórico completo de treinos" highlighted />
            </ul>
            <button 
              onClick={() => handleSelectPlan("pro")}
              className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              Assinar Pro
            </button>
          </div>

          {/* Monarca - Annual */}
          <div className="bg-[#0A0A0A] rounded-2xl p-8 border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 transition-all duration-300 hover:scale-105 relative">
            <div className="absolute -top-3 right-4 bg-green-500 px-4 py-1 rounded-full">
              <span className="text-xs font-bold">ECONOMIZE 40%</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#3B82F6]" />
              <h3 className="text-2xl font-bold">Monarca</h3>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold mb-2">R$ 179,90</p>
              <p className="text-gray-400">por ano</p>
              <p className="text-sm text-green-500 mt-1">R$ 14,99/mês</p>
            </div>
            <ul className="space-y-3 mb-8">
              <Feature text="Todos os benefícios do Pro" />
              <Feature text="XP bônus de 100%" />
              <Feature text="Treinos exclusivos Monarca" />
              <Feature text="Planos de treino 100% personalizados" />
              <Feature text="Badges e conquistas exclusivas" />
              <Feature text="Acesso antecipado a novidades" />
              <Feature text="Suporte VIP prioritário" />
              <Feature text="Comunidade exclusiva Monarca" />
              <Feature text="Relatórios completos de evolução" />
              <Feature text="Desafios e competições exclusivas" />
            </ul>
            <button 
              onClick={() => handleSelectPlan("monarca")}
              className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
            >
              Assinar Monarca
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-[#0A0A0A] rounded-2xl p-8 border border-[#3B82F6]/20 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Compare os Planos</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3B82F6]/20">
                  <th className="text-left py-4 px-4">Funcionalidade</th>
                  <th className="text-center py-4 px-4">Básico</th>
                  <th className="text-center py-4 px-4">Pro</th>
                  <th className="text-center py-4 px-4">Monarca</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow feature="Treinos básicos" basic pro monarca />
                <ComparisonRow feature="Treinos premium" basic={false} pro monarca />
                <ComparisonRow feature="Treinos exclusivos" basic={false} pro={false} monarca />
                <ComparisonRow feature="XP Bônus" basic="0%" pro="50%" monarca="100%" />
                <ComparisonRow feature="Coach IA" basic={false} pro monarca />
                <ComparisonRow feature="Vídeos explicativos" basic={false} pro monarca />
                <ComparisonRow feature="Planos personalizados" basic={false} pro monarca />
                <ComparisonRow feature="Comunidade exclusiva" basic={false} pro={false} monarca />
                <ComparisonRow feature="Sem anúncios" basic={false} pro monarca />
                <ComparisonRow feature="Suporte" basic="Email" pro="Prioritário" monarca="VIP" />
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-[#1E3A8A]/20 to-[#3B82F6]/5 rounded-2xl p-8 sm:p-12 border border-[#3B82F6]/30 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Por que escolher o Premium?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BenefitCard
              icon={Zap}
              title="Sistema de XP Turbinado"
              description="Ganhe até 100% mais XP e suba de nível mais rápido"
            />
            <BenefitCard
              icon={Video}
              title="Vídeos Explicativos"
              description="Aprenda a forma correta com vídeos profissionais"
            />
            <BenefitCard
              icon={Brain}
              title="Coach IA Personalizado"
              description="Orientação inteligente adaptada ao seu progresso"
            />
            <BenefitCard
              icon={Award}
              title="Conquistas Exclusivas"
              description="Badges e recompensas especiais para membros premium"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <FAQItem
              question="Como funciona o período gratuito?"
              answer="Você tem 7 dias de acesso gratuito ao plano Básico. Após esse período, será necessário assinar o plano Pro ou Monarca para continuar usando o app."
            />
            <FAQItem
              question="Posso cancelar a qualquer momento?"
              answer="Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. Seu acesso continuará até o fim do período pago."
            />
            <FAQItem
              question="Posso mudar de plano depois?"
              answer="Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Ajustaremos o valor proporcionalmente."
            />
            <FAQItem
              question="Há garantia de reembolso?"
              answer="Oferecemos garantia de 30 dias para planos pagos. Se não ficar satisfeito, devolvemos seu dinheiro."
            />
            <FAQItem
              question="Quais formas de pagamento aceitam?"
              answer="Aceitamos cartão de crédito (parcelado em até 12x), débito e PIX. Pagamento 100% seguro e criptografado."
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#3B82F6]/20 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>© 2024 Potencial. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ text, highlighted, disabled }: { text: string; highlighted?: boolean; disabled?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
        disabled ? "bg-gray-600" : highlighted ? "bg-[#3B82F6]" : "bg-[#3B82F6]/20"
      }`}>
        <Check className="w-3 h-3 text-white" />
      </div>
      <span className={`${highlighted ? "text-white" : disabled ? "text-gray-500 line-through" : "text-gray-300"}`}>
        {text}
      </span>
    </li>
  );
}

function BenefitCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <Icon className="w-12 h-12 text-[#3B82F6]" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

function ComparisonRow({ feature, basic, pro, monarca }: { 
  feature: string; 
  basic: boolean | string; 
  pro: boolean | string; 
  monarca: boolean | string;
}) {
  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-[#3B82F6] mx-auto" />
      ) : (
        <span className="text-gray-600">—</span>
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <tr className="border-b border-[#3B82F6]/10">
      <td className="py-4 px-4 text-gray-300">{feature}</td>
      <td className="py-4 px-4 text-center">{renderCell(basic)}</td>
      <td className="py-4 px-4 text-center">{renderCell(pro)}</td>
      <td className="py-4 px-4 text-center">{renderCell(monarca)}</td>
    </tr>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-[#0A0A0A] rounded-xl p-6 border border-[#3B82F6]/20">
      <h3 className="font-bold mb-2">{question}</h3>
      <p className="text-gray-400 text-sm">{answer}</p>
    </div>
  );
}
