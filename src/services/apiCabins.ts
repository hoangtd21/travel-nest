import { CabinI } from '../features/cabins/CabinTable';
import { FormDataI } from '../features/cabins/cabin-model';
import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Canbins can not be loaded');
  }
  const cabinsData = data as CabinI[];

  return cabinsData;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Canbins can not be deleted');
  }

  return data;
}

export async function createCabin(newCabin: FormDataI) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error('Canbins can not be created');
  }

  const { error: errorStorage } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (errorStorage) {
    await supabase.from('cabins').delete().eq('id', data?.id);
    console.error(errorStorage);
    throw new Error('Canbin image can not be uploaded');
  }

  return data;
}
