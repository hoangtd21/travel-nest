import { useEffect } from 'react';
import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  useEffect(() => {
    getCabins();
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <img src="https://rqymqhhqkphfjopjsxoq.supabase.co/storage/v1/object/public/cabin-images/cabin-003.jpg"></img>
    </Row>
  );
}

export default Cabins;
