import { useState } from 'react';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button
        variation="primary"
        size="medium"
        onClick={() => setIsOpenModal((show) => !show)}
      >
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
