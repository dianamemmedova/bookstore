import { ImageSlider } from '../components/home/ImageSlider'
import { ScrollRow   } from '../components/home/ScrollRow'
import { PromoCardGrid } from '../components/home/PromoCardGrid'
import { GenreNav }     from '../components/home/GenreNav'
import { ServiceNav }   from '../components/home/ServiceNav'
import { AboutSection }  from '../components/home/AboutSection'
import { Link }      from 'react-router-dom'
import { homeSections } from '../data/sections'
import  AudiobooksSlider from '../components/home/AudiobooksSlider'
import { DARK_ALT } from '../constants/theme'


export default function HomePage() {
  return (
    <div>  
      <Link to="/membership" className="block w-full mb-[10px]"  style={{ backgroundColor: DARK_ALT }}>
        <img  src="/header_img1.jpg"  alt="Premium Üzvlük"
          className="w-full block max-h-[120px] object-contain object-center" />
      </Link>

      <ImageSlider />

      {homeSections.map((section) => (
        <div key={section.key}>
          <div className="max-w-7xl mx-auto px-4 border-b border-gray-100">
            <ScrollRow section={section} />
          </div>
          {section.cards && <PromoCardGrid cards={section.cards} />}
        </div>
      ))}

      <GenreNav />
      <AudiobooksSlider />
      <AboutSection />
      <ServiceNav />   
    </div>
  )
}