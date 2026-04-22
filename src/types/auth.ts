interface FormType {
  username: string;
  fullname: string;
  email: string;
  code:string
  password:string
  confirmPassword:string
}

interface ApiType {
  loading: boolean;
}

export interface StepType1 {
  form: FormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep1: () => void;
  api: ApiType;
}
export interface StepType2 {
  form: FormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStep: (step:number) => void;

  verifyCode?: () => void;
  api: ApiType;
}
export interface StepType3 {
  form: FormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStep: (step:number) => void;
  handleSubmit:(e: React.SubmitEvent<HTMLFormElement>) => void | Promise<void>
  verifyCode?: () => void;
  api: ApiType;
}