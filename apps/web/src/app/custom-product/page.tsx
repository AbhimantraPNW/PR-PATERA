'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { BowlTable } from './component/BowlTable';
import { MugTable } from './component/MugTable';
import { PlateTable } from './component/PlateTable';

const CustomProduct = () => {
  return (
    <main>
      {/* HEADER START */}
      <div className="relative h-[620px] w-full">
        <Image
          src="/patera-hero.JPG"
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* header description */}
        <div className="container absolute inset-0 flex flex-col items-start justify-center space-y-4 text-center">
          <h1 className="text-5xl font-bold text-white">Custom Product</h1>
          <p className="mt-4 w-1/2 text-left text-lg text-white">
            Create your own personalized products with our custom product
            service. Choose from a variety of designs, sizes, and quantities to
            make your products truly unique. Whether it's for personal use or
            for your business, we have got you covered.
          </p>
          <a href="#procedure">
            <Button className="sliding-button">
              <span>Learn More</span>
            </Button>
          </a>
        </div>
      </div>
      {/* HEADER END */}

      {/* PROCEDURE START */}
      <div id="procedure">
        <div className="container mt-28 flex flex-col items-start text-[#152C5B]">
          <h1 className="text-5xl font-bold">Procedure on How To Custom</h1>
          <div className="mt-10 space-y-4 text-xl">
            <p className="flex gap-3">
              <span>1.</span> Patera pottery akan membuatkan sampel product dan
              dikirimkan ke customer. Dengan waktu pengerjaan pembuatan sampel
              adalah 1-2 minggu dari pembayaran biaya sampel oleh customer.
              Ongkir pengiriman sampel akan ditanggung oleh customer.
            </p>
            <p className="flex gap-3">
              <span>2.</span> Setelah sampel diterima oleh customer. Customer
              berhak untuk melakukan revisi sebanyak 1x, dan patera pottery akan
              kembali membuatkan sampel. Sampel ke-2 dapat dikirimkan / tidak
              dikirimkan ke customer sesuai dengan kehendak customer, dengan
              ongkir menjadi tanggungan customer.
            </p>
            <p className="flex gap-3">
              <span>3.</span> Pada proses ini, customer dapat menimbang kembali
              apakah akan melanjutkan proses kerja sama dengan patera pottery.
              Apabila proses kerja sama berlanjut. Maka customer berkewajiban
              untuk membayarkan DP 70% dari total harga produk ke patera pottery
              dengan ketentuan sebagai berikut. Biaya engrave/gravir logo
              6.000/pcs, untuk pemesanan diatas 100 pcs diskon 50% untuk biaya
              logo grafir di gelas.
            </p>
            <p className="flex gap-3">
              <span>4.</span> Pembuatan produk berkisar antara 5 - 8 minggu
              bergantung dari banyaknya produk yang akan dibuat.
            </p>
            <p className="flex gap-3">
              <span>5.</span> Customer wajib melakukan pelunasan sebelum produk
              dikirim.
            </p>
            <p className="flex gap-3">
              <span>6.</span> Seluruh biaya pengiriman merupakan tanggung jawab
              dari customer. Packaging yang dilakukan oleh patera pottery
              meliputi pemberian single phase, bubble wrap, dan kardus sifatnya
              adalah free. Biaya packaging tidak meliputi packaging kayu. Secara
              umum pengiriman custom produk menggunakan jasa pengiriman kargo /
              regular sesuai request customer.
            </p>
            <p className="flex gap-3">
              <span>7.</span> Klik link berikut untuk melihat prosedur lebih
              lengkap:{' '}
              <Link
                href="/Catalogue/Patera Catalogue Ceramic.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Lihat lebih banyak
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* PROCEDURE END */}

      {/* PRICELIST START */}
      <div className="container mt-28 flex flex-col items-start text-[#152C5B]">
        <h1 className="text-5xl font-bold">Pricelist</h1>

        {/* Mug Pricelist */}
        <div className="my-5 flex w-full items-center justify-between">
          <div className="relative mt-10 h-[500px] w-[500px]">
            <Card className="relative h-full w-full rounded-lg">
              <Image
                src="/Collection/Vase_Cup.jpg"
                alt="Image"
                layout="fill"
                objectFit="cover"
                className="absolute rounded-lg"
              />

              {/* gradient overlay */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black opacity-65"></div>

              <div className="container absolute inset-0 mb-7 flex flex-col items-start justify-end">
                <h1 className="text-5xl font-medium tracking-wide text-white">
                  Mug
                </h1>
              </div>
            </Card>
          </div>
          <div className="w-1/2">
            <MugTable />
          </div>
        </div>

        {/* Plate Pricelist */}
        <div className="my-5 flex w-full flex-row-reverse items-center justify-between">
          <div className="relative mt-10 h-[500px] w-[500px]">
            <Card className="relative h-full w-full rounded-lg">
              <Image
                src="/Collection/Plate.jpeg"
                alt="Image"
                layout="fill"
                objectFit="cover"
                className="absolute rounded-lg"
              />

              {/* gradient overlay */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black opacity-65"></div>

              <div className="container absolute inset-0 mb-7 flex flex-col items-start justify-end">
                <h1 className="text-5xl font-medium tracking-wide text-white">
                  Plate
                </h1>
              </div>
            </Card>
          </div>
          <div className="w-1/2">
            <PlateTable />
          </div>
        </div>

        {/* Bowl Pricelist */}
        <div className="my-5 flex w-full items-center justify-between">
          <div className="relative mt-10 h-[500px] w-[500px]">
            <Card className="relative h-full w-full rounded-lg">
              <Image
                src="/Collection/Bowl.png"
                alt="Image"
                layout="fill"
                objectFit="cover"
                className="absolute rounded-lg"
              />

              {/* gradient overlay */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black opacity-65"></div>

              <div className="container absolute inset-0 mb-7 flex flex-col items-start justify-end">
                <h1 className="text-5xl font-medium tracking-wide text-white">
                  Bowl
                </h1>
              </div>
            </Card>
          </div>
          <div className="w-1/2">
            <BowlTable />
          </div>
        </div>
      </div>
      {/* PRICELIST END */}

      {/* TRIGGER TO WHATSAPP START */}
      <div className="container my-10 flex h-[600px] flex-row-reverse items-center justify-between rounded-xl bg-slate-200 px-20">
        <div className="relative h-[500px] w-[450px]">
          <Card className="relative h-full w-full rounded-lg">
            <Image
              src="/patera-custom.jpeg"
              alt="Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </Card>
        </div>
        <div className="flex w-1/2 flex-col gap-5">
          <h1 className="text-5xl font-bold leading-snug text-[#152C5B]">
            Now start customing your own Patera products !
          </h1>
          <p className="text-slate-500">
            Click the button below to custom your products
          </p>
          <Link
            href="https://wa.me/628156611688?text=Hi%20!.%20Saya%20ingin%20custom%20product"
            passHref
          >
            <Button className="flex w-1/2 items-center justify-center gap-2">
              <Image
                src="/whatsapp.svg"
                alt="WhatsApp Logo"
                width={20}
                height={20}
              />
              Custom Now
            </Button>
          </Link>

          <p className="text-slate-500">Catalog below as your preferences</p>
          <Link
            href="/Catalogue/Patera Catalogue Ceramic.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-1/2">See catalogue pdf</Button>
          </Link>
        </div>
      </div>
      {/* TRIGGER TO WHATSAPP END */}
    </main>
  );
};

export default CustomProduct;
