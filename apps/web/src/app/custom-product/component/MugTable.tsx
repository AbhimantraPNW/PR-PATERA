import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { priceListMug } from '../list';

export function MugTable() {
  return (
    <Table>
      <TableHeader className='bg-slate-200'>
        <TableRow>
          <TableHead className="w-[300px]">Size</TableHead>
          <TableHead className='w-[200px]'>Without Handle</TableHead>
          <TableHead className='w-[200px]'>With Handle</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {priceListMug.map((pricelist) => (
          <TableRow key={pricelist.size}>
            <TableCell className="font-medium">{pricelist.size}</TableCell>
            <TableCell>{pricelist.paymentStatus}</TableCell>
            <TableCell>{pricelist.paymentMethod}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
