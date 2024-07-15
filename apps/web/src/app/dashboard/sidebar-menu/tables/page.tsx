'use client';

import { EditIcon, TrashIcon } from '@/app/dashboard/icons';
import useDeleteProduct from '@/hooks/api/admin/product/useDeleteProduct';
import useGetProducts from '@/hooks/api/admin/product/useGetProducts';
import { useAppSelector } from '@/redux/hooks';
import { Product } from '@/types/product.types';
import { appConfig } from '@/utils/config';
import {
  Avatar,
  Button,
  Label,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from '@roketid/windmill-react-ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CTA from '../../example/components/CTA';
import PageTitle from '../../example/components/Typography/PageTitle';
import SectionTitle from '../../example/components/Typography/SectionTitle';
import Layout from '../../example/containers/Layout';
import useGetProduct from '@/hooks/api/admin/product/useGetProduct';
import { productType } from '../../utils/demo/formProductData';
import ModalConfirmationDeleteProduct from './components/ModalConfirmationDeleteProduct';

function Tables({ params }: { params: { id: string } }) {
  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */

  // const { id } = useAppSelector((state) => state.user);
  const { deleteProduct } = useDeleteProduct();

  //utils
  const router = useRouter();

  // setup pages control for every table
  const [stockPage, setStockPage] = useState<number>(1);
  const [seasonalPage, setSeasonalPage] = useState<number>(1);
  const [stockFilterType, setStockFilterType] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  // state to store selected sizes
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>(
    {},
  );

  // setup data for every table
  const { stockData, stockMeta } = useGetProducts({
    page: stockPage,
    take: 10,
  });
  const { seasonalData, seasonalMeta } = useGetProducts({
    page: seasonalPage,
    take: 10,
  });

  //filter by type
  const filteredStockData = stockFilterType
    ? stockData.filter((product) => product.type === stockFilterType)
    : stockData;

  //group by type and name
  const groupByTypeAndName = (data: Product[]) => {
    const groupedProducts: { [key: string]: Product } = {};
    data.forEach((product) => {
      const key = `${product.type}-${product.name}`;
      if (!groupedProducts[key]) {
        groupedProducts[key] = product;
      }
    });
    return Object.values(groupedProducts);
  };

  // get selected size product
  const getProductBySize = (
    type: string,
    name: string,
    size: string,
    data: Product[],
  ) => {
    return data.find(
      (product) =>
        product.type === type && product.name === name && product.size === size,
    );
  };

  //handle delete
  const onDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  // handler for size selection
  const handleSizeChange = (type: string, name: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [`${type}-${name}`]: size }));
  };

  // pagination change control
  function onStockPageChange(p: number) {
    setStockPage(p);
  }

  function onSeasonalPageChange(p: number) {
    setSeasonalPage(p);
  }

  const displayedStockData = groupByTypeAndName(filteredStockData);
  const displayedSeasonalData = groupByTypeAndName(seasonalData);

  return (
    <Layout>
      <PageTitle>Tables Action</PageTitle>

      <CTA />

      {/* Filter Controls */}
      <Label>
        <span>Filter Stock Products</span>
        <Select
          className="mt-1"
          value={stockFilterType}
          onChange={(e) => setStockFilterType(e.target.value)}
        >
          <option value="">All</option>
          {/* Replace with actual types */}
          {productType.map((product, i) => (
            <option key={i} value={product.type}>{product.type}</option>
          ))}
        </Select>
      </Label>

      {/* Stock Products */}
      <SectionTitle>Stock Products</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Product</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Size</TableCell>
              <TableCell className="hidden md:flex">Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedStockData.map((product, i) => {
              const selectedSizeProduct = getProductBySize(
                product.type,
                product.name,
                selectedSizes[`${product.type}-${product.name}`] ||
                  product.size,
                stockData,
              );
              return (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="mr-3"
                        src={
                          appConfig.baseUrl +
                          `/assets${selectedSizeProduct!.images?.[0]?.url}`
                        }
                        alt="product image"
                      />
                      <div id={selectedSizeProduct!.id}>
                        <p className="font-semibold">
                          {selectedSizeProduct!.type}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {selectedSizeProduct!.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {selectedSizeProduct!.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Label>
                      <Select
                        className="rounded-none border border-black"
                        style={{ maxWidth: '150px' }}
                        value={
                          selectedSizes[
                            `${selectedSizeProduct!.type}-${
                              selectedSizeProduct!.name
                            }`
                          ] || ''
                        }
                        onChange={(e) =>
                          handleSizeChange(
                            product.type,
                            product.name,
                            e.target.value,
                          )
                        }
                      >
                        {stockData
                          .filter(
                            (p) =>
                              p.type === product.type &&
                              p.name === product.name,
                          )
                          .map((p) => (
                            <option key={p.size} value={p.size}>
                              {p.size}
                            </option>
                          ))}
                      </Select>
                    </Label>
                  </TableCell>
                  <TableCell className="mr-4 whitespace-nowrap">
                    <span className="text-sm">
                      {new Date(
                        selectedSizeProduct!.createdAt,
                      ).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-0 md:space-x-4">
                      <Button
                        layout="link"
                        size="small"
                        aria-label="Edit"
                        onClick={() =>
                          router.push(
                            `/dashboard/sidebar-menu/forms/edit/${selectedSizeProduct?.id}`,
                          )
                        }
                      >
                        <EditIcon className="h-5 w-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="small" aria-label="Delete">
                        <ModalConfirmationDeleteProduct
                          setOpen={setOpen}
                          onDeleteProduct={() =>
                            onDeleteProduct(selectedSizeProduct!.id)
                          }
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={stockMeta?.total}
            resultsPerPage={stockMeta?.take}
            onChange={onStockPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      <SectionTitle>Seasoning Products</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Product</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Size</TableCell>
              <TableCell className="hidden md:flex">Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedSeasonalData.map((product, i) => {
              const selectedSizeProduct = getProductBySize(
                product.type,
                product.name,
                selectedSizes[`${product.type}-${product.name}`] ||
                  product.size,
                seasonalData,
              );
              return (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="mr-3"
                        src={
                          appConfig.baseUrl +
                          `/assets${selectedSizeProduct?.images?.[0]?.url}`
                        }
                        alt="product image"
                      />
                      <div id={selectedSizeProduct?.id}>
                        <p className="font-semibold">
                          {selectedSizeProduct?.type}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {selectedSizeProduct?.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {selectedSizeProduct?.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Label>
                      <Select
                        className="rounded-none border border-black"
                        style={{ maxWidth: '150px' }}
                        value={
                          selectedSizes[
                            `${selectedSizeProduct?.type}-${selectedSizeProduct?.name}`
                          ] || ''
                        }
                        onChange={(e) =>
                          handleSizeChange(
                            product.type,
                            product.name,
                            e.target.value,
                          )
                        }
                      >
                        {seasonalData
                          .filter(
                            (p) =>
                              p.type === product.type &&
                              p.name === product.name,
                          )
                          .map((p) => (
                            <option key={p.size} value={p.size}>
                              {p.size}
                            </option>
                          ))}
                      </Select>
                    </Label>
                  </TableCell>
                  <TableCell className="mr-4 whitespace-nowrap">
                    <span className="text-sm">
                      {new Date(
                        selectedSizeProduct!.createdAt,
                      ).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-0 md:space-x-4">
                      <Button
                        layout="link"
                        size="small"
                        aria-label="Edit"
                        onClick={() =>
                          router.push(
                            `/dashboard/sidebar-menu/forms/edit/${selectedSizeProduct?.id}`,
                          )
                        }
                      >
                        <EditIcon className="h-5 w-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="small" aria-label="Delete">
                        <ModalConfirmationDeleteProduct
                          setOpen={setOpen}
                          onDeleteProduct={() =>
                            onDeleteProduct(selectedSizeProduct!.id)
                          }
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={seasonalMeta?.total}
            resultsPerPage={seasonalMeta?.take}
            onChange={onSeasonalPageChange}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default Tables;
