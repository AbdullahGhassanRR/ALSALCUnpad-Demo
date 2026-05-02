import MerchandisePreview from '@/components/dynamic/MerchandisePreview';
import HeaderNavbar from '@/components/static/HeaderNavbar';

export default function MerchandisePage() {
  return (
    <>
      <HeaderNavbar />
      <main>
        <MerchandisePreview />
      </main>
    </>
  );
}
