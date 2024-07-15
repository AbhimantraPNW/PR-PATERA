import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { priceListBowl } from '../list';

export function BowlTable() {
  return (
    <Table>
      <TableHeader className='bg-slate-200'>
        <TableRow>
          <TableHead className="w-[300px]">Diameter</TableHead>
          <TableHead className='w-[200px]'>Harga</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {priceListBowl.map((pricelist) => (
          <TableRow key={pricelist.diameter}>
            <TableCell className="font-medium">{pricelist.diameter}</TableCell>
            <TableCell>{pricelist.harga}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
