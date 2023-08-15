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
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

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

export async function createEditCabin(newCabin: FormDataI, id?: number) {
  const hasImagePath = typeof newCabin?.image === 'string';
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase.from('cabins');

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Canbins can not be created');
  }

  // upload image
  if(hasImagePath) return data;
  const { error: errorStorage } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

    // If have error when upload image => delete cabin
  if (errorStorage) {
    await supabase.from('cabins').delete().eq('id', data?.id);
    console.error(errorStorage);
    throw new Error('Canbin image can not be uploaded');
  }

  return data;
}
