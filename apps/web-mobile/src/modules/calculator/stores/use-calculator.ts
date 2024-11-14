import { create } from 'zustand';

interface CalculatorInputsStoreType {
  target?: string;
  company_type?: string;
  employees_quantity?: number;
}

interface CalculatorStoreType {
  inputs: CalculatorInputsStoreType;
  currentStep: number;
  setInputs: (inputs: CalculatorInputsStoreType) => void;
  setNextStep: () => void;
  setPreviousStep: () => void;
  setStep: (step: number) => void;
}

const DEFAULT_STEP = 1;

export const useCalculatorStore = create<CalculatorStoreType>((set) => ({
  currentStep: DEFAULT_STEP,
  inputs: {
    company_type: '',
    employees_quantity: 0,
    user: '',
  },
  setInputs: (inputs: CalculatorInputsStoreType) => set({ inputs }),
  setStep: (step: number) => set({ currentStep: step }),
  setNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  setPreviousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));
