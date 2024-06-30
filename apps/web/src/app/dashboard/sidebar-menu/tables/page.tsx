'use client';

import React, { useState, useEffect } from 'react';
import PageTitle from '../../example/components/Typography/PageTitle';
import SectionTitle from '../../example/components/Typography/SectionTitle';
import CTA from '../../example/components/CTA';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
  Label,
  Select,
} from '@roketid/windmill-react-ui';
import { EditIcon, TrashIcon } from '@/app/dashboard/icons';

import response, { ITableData } from '../../utils/demo/tableData';
import Layout from '../../example/containers/Layout';
// make a copy of the data, for the second table
const response2 = response.concat([]);

function Tables() {
  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1);
  const [pageTable2, setPageTable2] = useState(1);

  // setup data for every table
  const [dataTable1, setDataTable1] = useState<ITableData[]>([]);
  const [dataTable2, setDataTable2] = useState<ITableData[]>([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChangeTable1(p: number) {
    setPageTable1(p);
  }

  // pagination change control
  function onPageChangeTable2(p: number) {
    setPageTable2(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(
      response.slice(
        (pageTable1 - 1) * resultsPerPage,
        pageTable1 * resultsPerPage,
      ),
    );
  }, [pageTable1]);

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(
      response2.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage,
      ),
    );
  }, [pageTable2]);

  return (
    <Layout>
      <PageTitle>Tables</PageTitle>

      <CTA />

      <SectionTitle>All Products</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Product</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Created Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable1.map((product, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="mr-3 hidden md:block"
                      src={product.avatar}
                      alt="User avatar"
                    />
                    <div>
                      <p className="font-semibold">{product.type}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {product.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{product.stock}</span>
                </TableCell>
                <TableCell>
                  <Label>
                    <Select
                      className="rounded-none border border-black"
                      style={{ maxWidth: '150px' }}
                    >
                      <option>{product.size}</option>
                    </Select>
                  </Label>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(product.date).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      <SectionTitle>Product table with actions</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Product</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Size</TableCell>
              <TableCell className='hidden md:flex'>Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((product, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="mr-3 hidden md:block"
                      src={product.avatar}
                      alt="User avatar"
                    />
                    <div>
                      <p className="font-semibold">{product.type}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {product.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{product.stock}</span>
                </TableCell>
                <TableCell>
                  <Label>
                    <Select
                      className="rounded-none border border-black w-12 md:w-36"
                    >
                      <option>{product.size}</option>
                    </Select>
                  </Label>
                </TableCell>
                <TableCell className='hidden md:flex'>
                  <span className="text-sm mt-2 hidden md:flex">
                    {new Date(product.date).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center md:space-x-4 space-x-0">
                    <Button layout="link" size="small" aria-label="Edit">
                      <EditIcon className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="small" aria-label="Delete">
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
}

export default Tables;
