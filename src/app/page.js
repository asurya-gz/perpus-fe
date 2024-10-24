import Header from "./page/Header";
import Hero from "./page/Hero";
import Fitur from "./page/Fitur";
import CaraKerja from "./page/CaraKerja";
import Kontak from "./page/Kontak";
import Footer from "./page/Footer";
import WhatsAppFloating from "./page/Wa";
import Peta from "./page/Peta";
import Ruangan from "./page/Ruangan";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 scroll-smooth w-full overflow-x-hidden">
      <Header />
      <Hero />
      <div className="container mx-auto px-4">
        <Fitur />
        <CaraKerja />
        <Ruangan />
        <Peta />
      </div>
      <Kontak />
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
