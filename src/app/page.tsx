"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a página de boas-vindas
    router.push("/welcome");
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Dumbbell className="w-12 h-12 text-white" />
        </div>
        <p className="text-white text-lg">Carregando Potencial...</p>
      </div>
    </div>
  );
}
