import React from 'react'
import { InfoRow } from './InfoRow'
import { InfoSection } from './InfoSection'
import { BookOpen, Calendar, Mail, MapPin, Phone, Shield, User } from 'lucide-react'
import { Profile } from '@/types/authType'
interface overviewType{
    profile:Profile|null
}
function Overview({profile}:overviewType) {
  return (
   <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <InfoSection title="Personal Information" icon={<User className="h-5 w-5" />}>
                  <InfoRow classname={'capitalize'} icon={<User className="h-4 w-4" />} label="Full Name" value={profile?.fullname||''} />
                  <InfoRow icon={<Mail className="h-4 w-4" />} label="Email Address" value={profile?.email||''} />
                  <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone Number" value={profile?.phone||''} />
                  <InfoRow classname={'capitalize'} icon={<User className="h-4 w-4" />} label="Gender" value={profile?.gender||''} />
                </InfoSection>

                <InfoSection title="Account Details" icon={<Shield className="h-5 w-5" />}>
                  <InfoRow classname={'capitalize'} icon={<User className="h-4 w-4" />} label="Role" value={profile?.role||''} />
                  <InfoRow icon={<Calendar className="h-4 w-4" />} label="Member Since" value={new Date(profile?.created_At||'').toLocaleDateString()||''} />
                  <InfoRow icon={<BookOpen className="h-4 w-4" />} label="Active Courses" value={`${profile?.total_enrollment}`} />
                  <InfoRow classname={'capitalize'} icon={<MapPin className="h-4 w-4" />} label="Location" value={profile?.location||''} />

                </InfoSection>
              </div>
            </div>
  )
}

export default Overview