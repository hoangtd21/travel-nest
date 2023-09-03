import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabins from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

export interface CabinI {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('discount') || 'all';
  console.log(filterValue);

  let filteredCabins: CabinI[] | undefined;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount') {
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === 'with-discount') {
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  }

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins ? filteredCabins : []}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
