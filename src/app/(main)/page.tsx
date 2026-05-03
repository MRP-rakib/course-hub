import Categories from '@/components/categories/Categories'
import FeatureCourse from '@/components/courses/FeatureCourse'
import FeatureInstructor from '@/components/instructors/FeatureInstructor'
import Hero from '@/components/hero/Hero'

async function home() {

  return (
    <>
      <Hero />
      <Categories/>
      <FeatureCourse />
      <FeatureInstructor />
    </>
  )
}

export default home