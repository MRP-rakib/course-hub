import InputField from '@/components/ui/InputField'
import { StepType2 } from '@/types/auth'
import { LoadingDots } from '../LoadingDots'

export function Step2({form,handleChange,setStep,verifyCode,nextStep1,loading}:StepType2) {
  return (
        <div className="space-y-5">
                      <div>
                        <InputField
                          variant="dark"
                          label="Verification code"
                          name="code"
                          value={form.code}
                          onChange={handleChange}
                          placeholder="000000"
                        />
                        <div className='flex items-center gap-2 mt-2 text-xs text-white/30'>
                          <p className="">
                          Check your email for a 6-digit code
                        </p>
                        <button onClick={nextStep1} className='text-violet-400 transition-colors hover:text-violet-300text cursor-pointer'>resend</button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={verifyCode}
                        disabled={loading}
                        className="w-full rounded-lg bg-linear-to-r from-violet-600 to-purple-600 px-4 py-3 font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {loading ? <LoadingDots /> : "Verify code →"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full rounded-lg border border-white/8 bg-white/4 px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:border-white/12 hover:bg-white/6 hover:text-white/90"
                      >
                        ← Back
                      </button>
                    </div>
  
  )
}
