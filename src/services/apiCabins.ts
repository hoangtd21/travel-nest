import { CabinI } from '../features/cabins/CabinTable';
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
