import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useCreateCabin(){
    // After created cabin success => need re-render cabin to get data
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Create cabin successful");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    //   reset();
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return {isCreating, createCabin}
}