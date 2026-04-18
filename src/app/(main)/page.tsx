import Categories from '@/components/categories/Categories'
import FeatureCourse from '@/components/courses/FeatureCourse'
import Hero from '@/components/hero/Hero'

function home() {
  return (
    <div>
      <Hero />
      <Categories/>
      <FeatureCourse />
    </div>
  )
}

export default home