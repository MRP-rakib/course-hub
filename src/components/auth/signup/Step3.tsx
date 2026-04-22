import InputField from '@/components/ui/InputField'
import { StepType3 } from '@/types/auth'
import { LoadingDots } from '../LoadingDots'

export function Step3({form,handleChange,setStep, handleSubmit,api}:StepType3) {
  return (
       <form onSubmit={handleSubmit} className="space-y-5">
                     <InputField
                       variant="dark"
                       label="Password"
                       name="password"
                       type="password"
                       value={form.password}
                       onChange={handleChange}
                     />
                     <InputField
                       variant="dark"
                       label="Confirm password"
                       name="confirmPassword"
                       type="password"
                       value={form.confirmPassword}
                       onChange={handleChange}
                     />
                     <button
                       type="submit"
                       disabled={api.loading}
                       className="mt-2 w-full rounded-lg bg-linear-to-r from-violet-600 to-emerald-600 px-4 py-3 font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                     >
                       {api.loading ? <LoadingDots /> : "Create account →"}
                     </button>
                     <button
                       type="button"
                       onClick={() => setStep(2)}
                       className="w-full rounded-lg border border-white/8 bg-white/4 px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:border-white/12 hover:bg-white/6 hover:text-white/90"
                     >
                       ← Back
                     </button>
                   </form>
  )
}
