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
    nutritionistConsult: boolean;
    exclusiveBadges: boolean;
    earlyAccess: boolean;
    aiCoach: boolean;
    videoLibrary: boolean;
    liveClasses: boolean;
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
      nutritionistConsult: false,
      exclusiveBadges: false,
      earlyAccess: false,
      aiCoach: false,
      videoLibrary: false,
      liveClasses: false,
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
      nutritionistConsult: false,
      exclusiveBadges: false,
      earlyAccess: false,
      aiCoach: true,
      videoLibrary: true,
      liveClasses: false,
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
      nutritionistConsult: true,
      exclusiveBadges: true,
      earlyAccess: true,
      aiCoach: true,
      videoLibrary: true,
      liveClasses: true,
    },
  },
};

export function getUserPlan(): PlanType {
  if (typeof window === "undefined") return "basico";
  const plan = localStorage.getItem("user_plan") as PlanType;
  return plan || "basico";
}

export function setUserPlan(plan: PlanType) {
  if (typeof window === "undefined") return;
  localStorage.setItem("user_plan", plan);
}

export function hasFeatureAccess(feature: keyof PlanFeatures["features"]): boolean {
  const userPlan = getUserPlan();
  return PLANS[userPlan].features[feature] as boolean;
}

export function getXPBonus(): number {
  const userPlan = getUserPlan();
  return PLANS[userPlan].xpBonus;
}
