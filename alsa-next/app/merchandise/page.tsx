import MerchandiseDirectory from '@/components/dynamic/MerchandiseDirectory';
import HeaderNavbar from '@/components/static/HeaderNavbar';

export default function MerchandisePage() {
  return (
    <>
      <HeaderNavbar />
      <main>
        <MerchandiseDirectory />
      </main>
    </>
  );
}
