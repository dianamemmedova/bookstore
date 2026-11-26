import { HeroBand } from '../components/home/HeroBand'
import { CategoryTiles } from '../components/home/CategoryTiles'
import { ScrollRow } from '../components/home/ScrollRow'
import { PromoCardGrid } from '../components/home/PromoCardGrid'
import { PromoSplit } from '../components/home/PromoSplit'
import { ServiceNav } from '../components/home/ServiceNav'
import { AboutSection } from '../components/home/AboutSection'
import { homeSections } from '../data/sections'
import AudiobooksSlider from '../components/home/AudiobooksSlider'

export default function HomePage() {
  return (
    <div className="bg-surface">
      <HeroBand />
      <CategoryTiles />

      {homeSections.map((section, i) => (
        <div key={section.key}>
          <div className="mx-auto max-w-[1480px] px-4 lg:px-6">
            <ScrollRow section={section} />
          </div>
          {section.cards && <PromoCardGrid cards={section.cards} />}
          {i === 0 && <PromoSplit />}
        </div>
      ))}

      <AudiobooksSlider />
      <ServiceNav />
      <AboutSection />
    </div>
  )
}