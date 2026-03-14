import type { InsurancePlanData } from "@/types";

export const insurancePlans: InsurancePlanData[] = [
  { id: "1", provider: "Aetna", planName: "Aetna Choice POS II", planType: "POS", accepted: true, departments: ["all"], phone: "1-800-872-3862", website: "https://www.aetna.com" },
  { id: "2", provider: "Aetna", planName: "Aetna Open Access", planType: "HMO", accepted: true, departments: ["all"], phone: "1-800-872-3862", website: "https://www.aetna.com" },
  { id: "3", provider: "Blue Cross Blue Shield", planName: "BCBS PPO", planType: "PPO", accepted: true, departments: ["all"], phone: "1-800-262-2583", website: "https://www.bcbs.com" },
  { id: "4", provider: "Blue Cross Blue Shield", planName: "Blue Choice HMO", planType: "HMO", accepted: true, departments: ["all"], phone: "1-800-262-2583", website: "https://www.bcbs.com" },
  { id: "5", provider: "Cigna", planName: "Cigna Open Access Plus", planType: "PPO", accepted: true, departments: ["all"], phone: "1-800-244-6224", website: "https://www.cigna.com" },
  { id: "6", provider: "UnitedHealthcare", planName: "UHC Choice Plus", planType: "PPO", accepted: true, departments: ["all"], phone: "1-800-328-5979", website: "https://www.uhc.com" },
  { id: "7", provider: "UnitedHealthcare", planName: "UHC Navigate", planType: "HMO", accepted: true, departments: ["all"], phone: "1-800-328-5979", website: "https://www.uhc.com" },
  { id: "8", provider: "Humana", planName: "Humana Gold Plus", planType: "HMO", accepted: true, departments: ["all"], phone: "1-800-448-6262", website: "https://www.humana.com" },
  { id: "9", provider: "Medicare", planName: "Medicare Parts A & B", planType: "Government", accepted: true, departments: ["all"], phone: "1-800-633-4227", website: "https://www.medicare.gov" },
  { id: "10", provider: "Medicaid", planName: "State Medicaid", planType: "Government", accepted: true, departments: ["all"], notes: "Coverage varies by state plan", phone: "1-800-633-4227" },
  { id: "11", provider: "Tricare", planName: "Tricare Prime", planType: "Government", accepted: true, departments: ["all"], phone: "1-800-874-2273", website: "https://www.tricare.mil" },
  { id: "12", provider: "Kaiser Permanente", planName: "Kaiser HMO", planType: "HMO", accepted: false, departments: [], notes: "Not accepted - Kaiser operates a closed network" },
];

export const insuranceProviders = [...new Set(insurancePlans.map((p) => p.provider))];
