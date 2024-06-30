'use client';

import {
  CartIcon,
  MoneyIcon,
  PeopleIcon
} from '@/app/dashboard/icons';
import CTA from '../../example/components/CTA';
import InfoCard from '../../example/components/Cards/InfoCard';
import RoundIcon from '../../example/components/RoundIcon';
import PageTitle from '../../example/components/Typography/PageTitle';
import SectionTitle from '../../example/components/Typography/SectionTitle';
import Layout from '../../example/containers/Layout';

function Products() {
  return (
    <Layout>
      <PageTitle>Products</PageTitle>

      <CTA />

      <SectionTitle>Total products</SectionTitle>

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="All Products" value="15">
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Seasoning Products" value="8">
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Discount Products" value="8">
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
    </Layout>
  );
}

export default Products;
