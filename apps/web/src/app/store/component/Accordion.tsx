import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Clock, MapPin } from 'lucide-react';

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full text-white">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="ml-4 flex gap-1">
            <MapPin />
            <h2 className="text-xl font-medium tracking-wider">Address</h2>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <p className="ml-10 w-[450px] line-clamp-3 text-lg ">
            Gg. Ledok Tukangan Blok DN 2 No.243, RT.02/RW.01, Tegal Panggung,
            Kec. Danurejan, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55212
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <span className="ml-4 flex gap-1">
            <Clock />
            <h2 className="text-xl font-medium tracking-wider">Open Hour</h2>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="ml-10 flex text-lg">
            <ul>
              <li>Monday</li>
              <li>Tuesday</li>
              <li>Wednesday</li>
              <li>Thursday</li>
              <li>Friday</li>
              <li>Saturday</li>
              <li>Sunday</li>
            </ul>

            <ul>
              <li>9.00 am–4.30 pm</li>
              <li>9.00 am–4.30 pm</li>
              <li>9.00 am–4.30 pm</li>
              <li>9.00 am–4.30 pm</li>
              <li>9.00 am–4.30 pm</li>
              <li>8.00 am–12.00 pm</li>
              <li className="text-red-500">Closed</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
