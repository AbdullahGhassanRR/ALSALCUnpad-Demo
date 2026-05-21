import Hero from '@/components/static/Hero';
import BoardPreview from '@/components/dynamic/BoardPreview';
import Pilars from '@/components/static/Pilars';
import VisiMisi from '@/components/static/VisiMisi';
import EventPreview from '@/components/dynamic/EventPreview';
import PublicationPreview from '@/components/dynamic/PublicationPreview';
import TestimoniesPreview from '@/components/dynamic/TestimoniesPreview';
import PartnersPreview from '@/components/dynamic/PartnersPreview';
import MerchandisePreview from '@/components/dynamic/MerchandisePreview';
import FooterPreview from '@/components/dynamic/FooterPreview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BoardPreview /> 
      <Pilars />
      <VisiMisi />
      <EventPreview />
      <PublicationPreview />
      <TestimoniesPreview />
      <PartnersPreview />
      <MerchandisePreview />
    </>

  );
}
