import React from 'react'
import { InfoRow } from './InfoRow'
import { InfoSection } from './InfoSection'
import { BookOpen, Calendar, Link, Mail, MapPin, Phone, Shield, User } from 'lucide-react'
import { Profile } from '@/types/authType'
interface overviewType{
    profile:Profile|null
}
function Overview({profile}:overviewType) {
  return (
   <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <InfoSection title="Personal Information" icon={<User className="h-5 w-5" />}>
                  <InfoRow icon={<User className="h-4 w-4 capitalize" />} label="Full Name" value={profile?.fullname||''} />
                  <InfoRow icon={<Mail className="h-4 w-4" />} label="Email Address" value={profile?.email||''} />
                  <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone Number" value={profile?.phone||''} />
                  <InfoRow icon={<MapPin className="h-4 w-4 capitalize" />} label="Location" value={profile?.location||''} />
                  <InfoRow icon={<User className="h-4 w-4 capitalize" />} label="Gender" value={profile?.gender||''} />
                </InfoSection>

                <InfoSection title="Account Details" icon={<Shield className="h-5 w-5" />}>
                  <InfoRow icon={<User className="h-4 w-4 capitalize" />} label="Role" value={profile?.role||''} />
                  <InfoRow icon={<Calendar className="h-4 w-4" />} label="Member Since" value={new Date(profile?.created_At||'').toLocaleDateString()||''} />
                  <InfoRow icon={<BookOpen className="h-4 w-4" />} label="Active Courses" value={`${profile?.total_enrollment}`} />
                  <InfoRow icon={<Link className="h-4 w-4" />} label="Github" value={`${profile?.github_url}`} />
                  <InfoRow icon={<Link className="h-4 w-4" />} label="Linkedin" value={`${profile?.linkedin_url}`} />
                </InfoSection>
              </div>
            </div>
  )
}

export default Overview