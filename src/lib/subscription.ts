// Sistema de gerenciamento de assinaturas e planos

export type PlanType = "basico" | "pro" | "monarca";

export interface PlanFeatures {
  name: string;
  price: number;
  period: "mensal" | "anual";
  xpBonus: number;
  features: {
    basicWorkouts: boolean;
    premiumWorkouts: boolean;
    exclusiveWorkouts: boolean;
    dietTracking: "basic" | "advanced" | "personalized";
    progressAnalytics: "basic" | "advanced" | "complete";
    support: "email" | "priority" | "vip";
    noAds: boolean;
    customPlans: boolean;
    exclusiveBadges: boolean;
    earlyAccess: boolean;
    aiCoach: boolean;
    videoLibrary: boolean;
  };
}

export const PLANS: Record<PlanType, PlanFeatures> = {
  basico: {
    name: "Básico",
    price: 0,
    period: "mensal",
    xpBonus: 0,
    features: {
      basicWorkouts: true,
      premiumWorkouts: false,
      exclusiveWorkouts: false,
      dietTracking: "basic",
      progressAnalytics: "basic",
      support: "email",
      noAds: false,
      customPlans: false,
      exclusiveBadges: false,
      earlyAccess: false,
      aiCoach: false,
      videoLibrary: false,
    },
  },
  pro: {
    name: "Pro",
    price: 29.90,
    period: "mensal",
    xpBonus: 50,
    features: {
      basicWorkouts: true,
      premiumWorkouts: true,
      exclusiveWorkouts: false,
      dietTracking: "advanced",
      progressAnalytics: "advanced",
      support: "priority",
      noAds: true,
      customPlans: true,
      exclusiveBadges: false,
      earlyAccess: false,
      aiCoach: true,
      videoLibrary: true,
    },
  },
  monarca: {
    name: "Monarca",
    price: 179.90,
    period: "anual",
    xpBonus: 100,
    features: {
      basicWorkouts: true,
      premiumWorkouts: true,
      exclusiveWorkouts: true,
      dietTracking: "personalized",
      progressAnalytics: "complete",
      support: "vip",
      noAds: true,
      customPlans: true,
      exclusiveBadges: true,
      earlyAccess: true,
      aiCoach: true,
      videoLibrary: true,
    },
  },
};

// Sistema de trial de 7 dias
export function getTrialEndDate(): Date | null {
  if (typeof window === "undefined") return null;
  const trialStart = localStorage.getItem("trial_start_date");
  if (!trialStart) return null;
  
  const startDate = new Date(trialStart);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);
  return endDate;
}

export function initializeTrial() {
  if (typeof window === "undefined") return;
  const trialStart = localStorage.getItem("trial_start_date");
  if (!trialStart) {
    localStorage.setItem("trial_start_date", new Date().toISOString());
  }
}

export function isTrialActive(): boolean {
  const endDate = getTrialEndDate();
  if (!endDate) return true; // Se não tem data de início, considera trial ativo
  return new Date() < endDate;
}

export function isTrialExpired(): boolean {
  return !isTrialActive();
}

export function getUserPlan(): PlanType {
  if (typeof window === "undefined") return "basico";
  const plan = localStorage.getItem("user_plan") as PlanType;
  return plan || "basico";
}

export function setUserPlan(plan: PlanType) {
  if (typeof window === "undefined") return;
  localStorage.setItem("user_plan", plan);
  
  // Quando usuário assina um plano pago, marca como pago
  if (plan !== "basico") {
    localStorage.setItem("has_paid_plan", "true");
  }
}

export function hasPaidPlan(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("has_paid_plan") === "true";
}

export function hasFeatureAccess(feature: keyof PlanFeatures["features"]): boolean {
  const userPlan = getUserPlan();
  
  // Se tem plano pago, tem acesso a tudo do plano
  if (hasPaidPlan()) {
    return PLANS[userPlan].features[feature] as boolean;
  }
  
  // Se está no trial, tem acesso básico
  if (isTrialActive()) {
    return PLANS["basico"].features[feature] as boolean;
  }
  
  // Trial expirado e sem plano pago - sem acesso
  return false;
}

export function getXPBonus(): number {
  const userPlan = getUserPlan();
  
  // Se tem plano pago, recebe o bônus do plano
  if (hasPaidPlan()) {
    return PLANS[userPlan].xpBonus;
  }
  
  // Trial ou sem plano - sem bônus
  return 0;
}

export function getDaysLeftInTrial(): number {
  const endDate = getTrialEndDate();
  if (!endDate) return 7;
  
  const now = new Date();
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}
