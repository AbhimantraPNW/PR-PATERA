import useGetProducts from '@/hooks/api/admin/product/useGetProducts';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';

interface ProductOption {
  label: string;
  value: number;
}

const AutoComplete = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');
  const { stockData } = useGetProducts({ search });

  const loadOptions = (
    inputValue: string,
    callback: (options: ProductOption[]) => void,
  ) => {
    try {
      const options = stockData.map((product) => {
        return {
          label: product.name,
          value: product.id,
        };
      });
      callback(options);
      setSearch(inputValue);
    } catch (error) {
      callback([]);
    }
  };

  const debouncedLoadOptions = debounce(loadOptions, 750);

  return (
    <AsyncSelect
      placeholder="Search for products"
      className="mx-auto my-4 max-w-[650px]"
      loadOptions={debouncedLoadOptions}
      onChange={(product) => {
        router.push(`/dashboard/sidebar-menu/forms/edit/${product?.value}`);
      }}
    />
  );
};

export default AutoComplete;
