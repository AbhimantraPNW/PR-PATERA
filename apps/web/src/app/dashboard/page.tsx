'use client';

import { MoneyIcon, PeopleIcon } from '@/app/dashboard/icons';
import useGetProducts from '@/hooks/api/admin/product/useGetProducts';
import { Product } from '@/types/product.types';
import { useState } from 'react';
import CTA from './example/components/CTA';
import InfoCard from './example/components/Cards/InfoCard';
import RoundIcon from './example/components/RoundIcon';
import PageTitle from './example/components/Typography/PageTitle';
import Layout from './example/containers/Layout';
import { appConfig } from '@/utils/config';

import {
  Avatar,
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
import { productType } from './utils/demo/formProductData';

function Dashboard() {
  const [stockPage, setStockPage] = useState<number>(1);
  const [seasonalPage, setSeasonalPage] = useState<number>(1);
  const [stockFilterType, setStockFilterType] = useState<string>('');
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

  // state to store selected sizes
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>(
    {},
  );

  // handler for size selection
  const handleSizeChange = (type: string, name: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [`${type}-${name}`]: size }));
  };

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

  // pagination change control
  function onStockPageChange(p: number) {
    setStockPage(p);
  }

  function onSeasonalPageChange(p: number) {
    setSeasonalPage(p);
  }

  const displayedStockData = groupByTypeAndName(filteredStockData);
  const displayedSeasonalData = groupByTypeAndName(seasonalData);

  console.log(stockData)

  return (
    <Layout>
      <PageTitle>Dashboard</PageTitle>

      <CTA />

      {/* Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Stock Products" value={stockMeta?.total}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Seasoning Products" value={seasonalMeta?.total}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

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

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Stock Products</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Created Date</TableCell>
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={stockMeta?.total}
            resultsPerPage={stockMeta?.take}
            label="Table products"
            onChange={onStockPageChange}
          />
        </TableFooter>
      </TableContainer>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Seasoning Products</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Created Date</TableCell>
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
                          `/assets${selectedSizeProduct!.images?.[0]?.url}`
                        }
                        alt="product image"
                      />
                      <div>
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={seasonalMeta?.total}
            resultsPerPage={seasonalMeta?.take}
            label="Table seasoning products"
            onChange={onSeasonalPageChange}
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default Dashboard;
