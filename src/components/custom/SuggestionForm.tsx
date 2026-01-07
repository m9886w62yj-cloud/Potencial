"use client";

import { useState } from "react";
import { Send, Lightbulb, Check } from "lucide-react";

export default function SuggestionForm() {
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;

    // Salvar sugestão no localStorage
    const suggestions = JSON.parse(localStorage.getItem("user_suggestions") || "[]");
    suggestions.push({
      text: suggestion,
      date: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem("user_suggestions", JSON.stringify(suggestions));

    // Mostrar feedback
    setSubmitted(true);
    setSuggestion("");

    // Resetar feedback após 3 segundos
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-[#3B82F6]/20">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-6 h-6 text-[#3B82F6]" />
        <h3 className="text-xl font-bold">Sugestões de Melhorias</h3>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">
        Sua opinião é muito importante! Compartilhe suas ideias para melhorar o app.
      </p>

      {submitted ? (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
          <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-500">Sugestão enviada com sucesso!</p>
            <p className="text-sm text-gray-400">Obrigado pelo seu feedback.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Digite sua sugestão aqui... (ex: Gostaria de ter um modo escuro, adicionar mais treinos de yoga, melhorar o sistema de notificações, etc.)"
            rows={4}
            className="w-full bg-[#1A1A1A] border border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3B82F6] resize-none"
          />
          
          <button
            type="submit"
            disabled={!suggestion.trim()}
            className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E40AF] hover:to-[#2563EB] text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar Sugestão
          </button>
        </form>
      )}

      <div className="mt-4 pt-4 border-t border-[#3B82F6]/20">
        <p className="text-xs text-gray-500 text-center">
          Todas as sugestões são analisadas pela nossa equipe
        </p>
      </div>
    </div>
  );
}
