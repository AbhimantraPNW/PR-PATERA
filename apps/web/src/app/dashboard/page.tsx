'use client';

import React, { useState, useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import CTA from './example/components/CTA';
import InfoCard from './example/components/Cards/InfoCard';
import ChartCard from './example/components/Chart/ChartCard';
import ChartLegend from './example/components/Chart/ChartLegend';
import PageTitle from './example/components/Typography/PageTitle';
import Layout from './example/containers/Layout';
import RoundIcon from './example/components/RoundIcon';
import response, { ITableData } from '@/app/dashboard/utils/demo/tableData';
import {
  ChatIcon,
  CartIcon,
  MoneyIcon,
  PeopleIcon,
} from '@/app/dashboard/icons';

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Label,
  Select,
} from '@roketid/windmill-react-ui';

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '@/app/dashboard/utils/demo/chartsData';

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

function Dashboard() {
  Chart.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const [page, setPage] = useState(1);
  const [data, setData] = useState<ITableData[]>([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p: number) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  return (
    <Layout>
      <PageTitle>Dashboard</PageTitle>

      <CTA />

      {/* <!-- Cards --> */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Products" value="79">
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Seasoning Products" value="10">
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Discount Products" value="15">
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Products</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Created Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((product, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="mr-3 hidden md:block"
                      src={product.avatar}
                      alt="User image"
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
                  <Label >
                    <Select className='border border-black rounded-none' style={{maxWidth: '150px'}}>
                      <option>{product.size}</option>
                    </Select>
                  </Label>
                </TableCell>
                <TableCell className='mr-4 whitespace-nowrap'>
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
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>

      <PageTitle>Charts</PageTitle>
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <ChartCard title="Revenue">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Traffic">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </Layout>
  );
}

export default Dashboard;
