import { Shield } from 'lucide-react'
import InputField from '../ui/InputField'

function SecurityTab() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Security Settings</h2>
                <p className="text-white/60 text-sm">Update your password to keep your account secure</p>
              </div>

              <InputField label="Current Password" type="password" icon={<Shield className="h-4 w-4" />} />
              <InputField label="New Password" type="password" icon={<Shield className="h-4 w-4" />} />
              <InputField label="Confirm New Password" type="password" icon={<Shield className="h-4 w-4" />} />

              <div className="pt-4">
                <button className="w-full rounded-xl bg-linear-to-r from-violet-600 to-purple-600 py-3.5 font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300">
                  Update Password
                </button>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <h4 className="font-semibold text-sm mb-2 text-violet-300">Password Requirements</h4>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div>
            </div>
  )
}

export default SecurityTab