'use client';

import {
  Button,
  Input,
  Label,
  Select,
  Textarea,
} from '@roketid/windmill-react-ui';
import CTA from '../../example/components/CTA';
import PageTitle from '../../example/components/Typography/PageTitle';
import SectionTitle from '../../example/components/Typography/SectionTitle';
import Layout from '../../example/containers/Layout';
import { useState } from 'react';

function Forms() {
  const [check, setCheck] = useState(false)
  const handleCheck = () => {
    setCheck(!check)
  }
  
  return (
    <Layout>
      <PageTitle>Forms</PageTitle>
      <CTA />
      <SectionTitle>Create Product</SectionTitle>

      <div className="mb-8 rounded-lg bg-white px-4 py-3 shadow-md dark:bg-gray-800">
        <Label>
          <span>Type</span>
          <Select
            className="rounded-none border border-stone-300"
            style={{ maxWidth: '150px' }}
          >
            <option>Pitambari</option>
            <option>Carnelian</option>
            <option>Palmwood</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Name</span>
          <Input
            className="mt-1"
            placeholder="Cups Name"
            crossOrigin="anonymous"
          />
        </Label>

        <div className="mt-4">
          {/* TODO: Check if this label is accessible, or fallback */}
          {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
          <Label>Account Type</Label>
          <div className="mt-2">
            <Label radio>
              <Input
                type="radio"
                value="personal"
                name="accountType"
                crossOrigin="anonymous"
              />
              <span className="ml-2">Stock</span>
            </Label>
            <Label className="ml-6" radio>
              <Input
                type="radio"
                value="business"
                name="accountType"
                crossOrigin="anonymous"
              />
              <span className="ml-2">Seasonal Product</span>
            </Label>
          </div>
        </div>

        <Label className="mt-4">
          <span>Size</span>
          <Select
            className="rounded-none border border-stone-300"
            style={{ maxWidth: '150px' }}
          >
            <option>Espresso</option>
            <option>Piccolo</option>
            <option>Cappucino</option>
            <option>Latte</option>
            <option>Longblack</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Diameter</span>
          <Input className="mt-1" placeholder=".. cm" crossOrigin="anonymous" />
        </Label>

        <Label className="mt-4">
          <span>Tinggi</span>
          <Input className="mt-1" placeholder=".. cm" crossOrigin="anonymous" />
        </Label>

        <Label className="mt-4">
          <span>Message</span>
          <Textarea
            className="mt-1"
            rows={2}
            placeholder="Enter some long form content."
          />
        </Label>

        <Label className="mt-3" check>
          <Input type="checkbox" crossOrigin="anonymous" onClick={handleCheck}/>
          <span className="ml-2">
            I agree to the <span className="underline">create product</span>
          </span>
        </Label>

        <Label className="mt-3">
          <Button block className="mt-4" type="submit" disabled={!check}>
            Create product
          </Button>
        </Label>
      </div>
    </Layout>
  );
}

export default Forms;
