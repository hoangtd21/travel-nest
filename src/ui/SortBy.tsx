import { useSearchParams } from 'react-router-dom';
import Select from './Select';

export type Option = {
  value: string;
  label: string;
};

export interface OptionI {
  options: Option[];
}

function SortBy({ options }: OptionI) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      type="white"
      handleChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
