"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone,
  Check,
  Lock,
  Dumbbell,
  Crown,
  Sparkles
} from "lucide-react";
import { PLANS, setUserPlan, type PlanType } from "@/lib/subscription";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") as PlanType || "pro";
  
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "debit" | "pix">("credit");
  const [installments, setInstallments] = useState(1);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [processing, setProcessing] = useState(false);

  const plan = PLANS[planParam];
  const installmentValue = plan.price / installments;

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Salvar plano do usuário
    setUserPlan(planParam);
    
    setProcessing(false);
    
    // Redirecionar para dashboard com mensagem de sucesso
    router.push("/dashboard?payment=success");
  };

  const PlanIcon = planParam === "basico" ? Check : planParam === "pro" ? Crown : Sparkles;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-[#3B82F6]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/planos")}
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Finalizar Assinatura</h1>
              <p className="text-gray-400">Complete o pagamento para desbloquear seu potencial</p>
            </div>

            {/* Plano Selecionado */}
            <div className="bg-gradient-to-br from-[#1E3A8A]/30 to-[#3B82F6]/10 rounded-2xl p-6 border border-[#3B82F6]/30">
              <div className="flex items-center gap-3 mb-4">
                <PlanIcon className="w-8 h-8 text-[#3B82F6]" />
                <div>
                  <h3 className="text-xl font-bold">Plano {plan.name}</h3>
                  <p className="text-sm text-gray-400">{plan.period === "mensal" ? "Cobrança mensal" : "Cobrança anual"}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Valor do plano</span>
                  <span className="font-semibold">R$ {plan.price.toFixed(2)}</span>
                </div>
                {plan.period === "anual" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Economia mensal</span>
                    <span className="font-semibold text-green-500">R$ 14,99/mês</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#3B82F6]/20">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-[#3B82F6]">
                    R$ {plan.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Benefícios */}
            <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
              <h3 className="font-bold mb-4">O que você ganha:</h3>
              <div className="space-y-3">
                <BenefitItem text={`XP Bônus de ${plan.xpBonus}%`} />
                <BenefitItem text="Treinos exclusivos desbloqueados" />
                <BenefitItem text="Análise de progresso avançada" />
                <BenefitItem text="Suporte prioritário 24/7" />
                {planParam === "monarca" && (
                  <>
                    <BenefitItem text="Consultas com nutricionista" />
                    <BenefitItem text="Badges exclusivos Monarca" />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="space-y-6">
            {/* Método de Pagamento */}
            <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
              <h3 className="font-bold mb-4">Método de Pagamento</h3>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod("credit")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === "credit"
                      ? "border-[#3B82F6] bg-[#3B82F6]/10"
                      : "border-[#3B82F6]/20 hover:border-[#3B82F6]/40"
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#3B82F6]" />
                  <p className="text-xs font-semibold">Crédito</p>
                </button>
                
                <button
                  onClick={() => setPaymentMethod("debit")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === "debit"
                      ? "border-[#3B82F6] bg-[#3B82F6]/10"
                      : "border-[#3B82F6]/20 hover:border-[#3B82F6]/40"
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-[#3B82F6]" />
                  <p className="text-xs font-semibold">Débito</p>
                </button>
                
                <button
                  onClick={() => setPaymentMethod("pix")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    paymentMethod === "pix"
                      ? "border-[#3B82F6] bg-[#3B82F6]/10"
                      : "border-[#3B82F6]/20 hover:border-[#3B82F6]/40"
                  }`}
                >
                  <Smartphone className="w-6 h-6 mx-auto mb-2 text-[#3B82F6]" />
                  <p className="text-xs font-semibold">PIX</p>
                </button>
              </div>

              {paymentMethod === "pix" ? (
                <div className="text-center py-8">
                  <div className="w-48 h-48 mx-auto bg-white rounded-xl mb-4 flex items-center justify-center">
                    <p className="text-black text-xs">QR Code PIX</p>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Escaneie o QR Code com seu app de banco</p>
                  <p className="text-xs text-gray-500">Pagamento confirmado instantaneamente</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Número do Cartão */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      maxLength={19}
                      className="w-full bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>

                  {/* Nome no Cartão */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Nome no Cartão</label>
                    <input
                      type="text"
                      placeholder="NOME COMPLETO"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                      className="w-full bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>

                  {/* Validade e CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        maxLength={5}
                        className="w-full bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        maxLength={4}
                        className="w-full bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>

                  {/* Parcelamento (apenas crédito) */}
                  {paymentMethod === "credit" && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Parcelamento</label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(Number(e.target.value))}
                        className="w-full bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option value={1}>1x de R$ {plan.price.toFixed(2)} sem juros</option>
                        <option value={2}>2x de R$ {(plan.price / 2).toFixed(2)} sem juros</option>
                        <option value={3}>3x de R$ {(plan.price / 3).toFixed(2)} sem juros</option>
                        <option value={4}>4x de R$ {(plan.price / 4).toFixed(2)} sem juros</option>
                        <option value={6}>6x de R$ {(plan.price / 6).toFixed(2)} sem juros</option>
                        {plan.price >= 100 && (
                          <>
                            <option value={10}>10x de R$ {(plan.price / 10).toFixed(2)} sem juros</option>
                            <option value={12}>12x de R$ {(plan.price / 12).toFixed(2)} sem juros</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Botão de Pagamento */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Confirmar Pagamento
                </>
              )}
            </button>

            {/* Segurança */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Pagamento 100% seguro e criptografado</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3 text-white" />
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}
