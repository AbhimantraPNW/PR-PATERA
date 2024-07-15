'use client';

import { appConfig } from '@/utils/config';
import { Button } from '@roketid/windmill-react-ui';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from './CartContext';
import { Separator } from './ui/separator';
import ModalConfirmation from './ModalConfirmationCart';

const CartDetailsPage = () => {
  const [closeButton, setCloseButton] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount, cartItem, removeCartItem, clearCartItem } = useCart() || {
    cartCount: 0,
    cartItem: [],
    removeCartItem: () => {},
    clearCartItem: () => {},
  };

  const handleCloseButton = () => {
    setCloseButton(!closeButton);
  };

  // Total price
  const totalPriceAmount = cartItem.reduce((total, curVal) => {
    return total + curVal.totalPrice;
  }, 0);

  // Number format
  const formatPrice = (value: number) => {
    if (!value) return '';
    return `${parseFloat(value.toString()).toLocaleString('id-ID')}`;
  };

  // Generate WhatsApp message
  const generateWhatsappMessage = () => {
    const message =
      `Order Details:\n\n` +
      cartItem
        .map(
          (item, index) =>
            `Item ${index + 1}:\n` +
            `Tipe: ${item.type}\n` +
            `Status: ${item.status}\n` +
            `Nama Cup: ${item.name}\n` +
            `Total Stok: ${item.totalStock}\n` +
            `Total Harga: ${formatPrice(item.totalPrice)}\n` +
            `Link Gambar:\n` +
            `${appConfig.baseUrl}/assets/${item.image}\n\n`,
        )
        .join('') +
      `Total Harga Pembelian: ${formatPrice(totalPriceAmount)}`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '6281328869619';
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');

    clearCartItem();
  };

  return (
    <>
      {!closeButton && (
        <div className="absolute right-5 top-20 mt-2 w-80 rounded-lg border border-gray-300 bg-white p-4 shadow-lg md:right-12">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Cart</h2>
            <h2 className="cursor-pointer text-xl" onClick={handleCloseButton}>
              <CircleX />
            </h2>
          </div>
          <Separator className="mt-2" />
          {cartCount > 0 ? (
            <div className="mt-2">
              <p className="text-gray-600">
                Ada {cartCount} items di keranjang
              </p>
              <div className="max-h-52 overflow-y-auto">
                {cartItem.map((item, index) => (
                  <div
                    key={index}
                    className="mt-4 flex items-center gap-4 border-b border-gray-200 pb-2"
                  >
                    <Image
                      src={appConfig.baseUrl + `/assets/${item.image}`}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-700">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.type}</p>
                      <p className="text-sm text-gray-500">{item.status}</p>
                      <p className="text-sm text-gray-500">
                        Jumlah: {item.totalStock}
                      </p>
                      <p className="text-sm text-gray-500">
                        Harga: {formatPrice(item.totalPrice)}
                      </p>
                    </div>
                    <button
                      className="ml-auto text-red-500 hover:text-red-700"
                      onClick={() => removeCartItem(index)}
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between font-medium text-gray-700">
                <span>Total:</span>
                <span>{formatPrice(totalPriceAmount)}</span>
              </div>
              <Button className="mt-4 w-full">
                <ModalConfirmation
                  setOpen={setOpen}
                  generateWhatsapp={generateWhatsappMessage}
                />
              </Button>
            </div>
          ) : (
            <p className="mt-2 text-gray-600">Keranjang belanjaan kosong</p>
          )}
        </div>
      )}
    </>
  );
};

export default CartDetailsPage;
