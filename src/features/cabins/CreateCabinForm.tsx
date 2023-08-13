import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { Textarea } from '../../ui/Textarea';
import { FormDataI } from './cabin-model';
import { createEditCabin } from '../../services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

interface CabinEditProps extends FormDataI {
  id: number;
}
function CreateCabinForm({
  cabinToEdit = {
    id: 0,
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: '',
    image: undefined,
  },
}: {
  cabinToEdit?: CabinEditProps;
}) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<FormDataI>({ defaultValues: isEditSession ? editValue : {} });
  const { errors } = formState;

  // After created cabin success => need re-render cabin to get data
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: handleCreateCabin } = useMutation({
    mutationFn: ({ newCabinData }: { newCabinData: FormDataI }) =>
      createEditCabin(newCabinData),
    onSuccess: () => {
      toast.success('Create cabin successful');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  const { isLoading: isUpdating, mutate: handleUpdateCabin } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: FormDataI;
      id: number;
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Edit cabin successful');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  const onSubmit: SubmitHandler<FormDataI> = (data) => {
    const imageData =
      typeof data.image === 'string' ? data.image : data?.image[0];

    if (isEditSession) {
      handleUpdateCabin({
        newCabinData: { ...data, image: imageData },
        id: editId,
      });
    } else {
      handleCreateCabin({ ...data, image: imageData });
    }
  };

  const onError = (error: FieldErrors<FormDataI>) => {
    console.log(error);
  };

  const isWorking = isUpdating || isCreating;
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (val) =>
              val <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          // type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register('description')}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button variation="primary" size="medium" disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
