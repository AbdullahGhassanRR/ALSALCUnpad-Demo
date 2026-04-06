import HeaderNavbar from '@/components/static/HeaderNavbar';
import Hero from '@/components/static/Hero';
import Pilars from '@/components/static/Pilars';
// import VisiMisi from '@/components/static/VisiMisi';
// import BoardPreview from '@/components/dynamic/BoardPreview';
// import EventPreview from '@/components/dynamic/EventPreview';
// import PublicationPreview from '@/components/dynamic/PublicationPreview';
// import Testimonies from '@/components/dynamic/Testimonies';
// import PartnersPreview from '@/components/dynamic/PartnersPreview';
// import MerchandisePreview from '@/components/dynamic/MerchandisePreview';
// import Footer from '@/components/dynamic/Footer';

export default function HomePage() {
  return (
    <>
      <HeaderNavbar />
      <Hero />
      <Pilars />
       {/*
      <BoardPreview /> 
      <VisiMisi />
      <EventPreview />
      <PublicationPreview />
      <Testimonies />
      <PartnersPreview />
      <MerchandisePreview />
      <Footer /> */}
    </>
  );
}
