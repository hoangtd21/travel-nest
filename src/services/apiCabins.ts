import { CabinI } from '../features/cabins/CabinTable';
import { FormDataI } from '../features/cabins/cabin-model';
import supabase from './supabase';

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
  const { data, error } = await supabase.from('cabins').insert([newCabin]);

  if (error) {
    console.error(error);
    throw new Error('Canbins can not be created');
  }

  return data;
}
