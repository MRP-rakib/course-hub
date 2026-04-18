import Categories from '@/components/categories/Categories'
import FeatureCourse from '@/components/courses/FeatureCourse'
import FeatureInstructor from '@/components/instructors/FeatureInstructor'
import Hero from '@/components/hero/Hero'

function home() {
  return (
    <div>
      <Hero />
      <Categories/>
      <FeatureCourse />
      <FeatureInstructor />
    </div>
  )
}

export default home