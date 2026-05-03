
export interface AuthUser {
  id: string
  email?:string
}

export interface Profile {
  id: string
  email:string
  fullname: string
  username: string
  role: "student" | "instructor"
  created_At:string
  phone?:string
  gender?:string
  date_of_birth?:Date
  location?:string
  profile_image?: string
  total_enrollment?:number
  completed_courses?:number
  github_url:string
  linkedin_url:string
}