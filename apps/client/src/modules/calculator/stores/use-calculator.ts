import { create } from 'zustand';

interface CalculatorInputsStoreType {
  company_type?: string;
  employees_quantity?: number;
}

interface CalculatorStoreType {
  inputs: CalculatorInputsStoreType;
  currentStep: number;
  setInputs: (inputs: CalculatorInputsStoreType) => void;
  setNextStep: () => void;
  setPreviousStep: () => void;
}

const DEFAULT_STEP = 1;

export const useCalculatorStore = create<CalculatorStoreType>((set) => ({
  currentStep: DEFAULT_STEP,
  inputs: {
    company_type: '',
    employees_quantity: 0,
  },
  setInputs: (inputs: CalculatorInputsStoreType) => set({ inputs }),
  setNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  setPreviousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));
