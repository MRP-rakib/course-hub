import InputField from '@/components/ui/InputField'
import { StepType1 } from '@/types/auth'
import { LoadingDots } from '../LoadingDots'

function Step1({form,handleChange,nextStep1,api}:StepType1) {
  return (
        <div className="space-y-5">
                      <InputField
                        variant="dark"
                        label="Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                      />
                      <InputField
                        variant="dark"
                        label="Full Name"
                        name="fullname"
                        value={form.fullname}
                        onChange={handleChange}
                      />
                      <InputField
                        variant="dark"
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={nextStep1}
                        disabled={api.loading}
                        className="relative mt-2 w-full overflow-hidden rounded-lg bg-linear-to-r from-violet-600 to-purple-600 px-4 py-3 font-display text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {api.loading ? <LoadingDots /> : "Send verification code →"}
                      </button>
                    </div>
  
  )
}

export default Step1