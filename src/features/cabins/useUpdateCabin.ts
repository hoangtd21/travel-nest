import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormDataI } from "./cabin-model";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: FormDataI;
      id: number;
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Edit cabin successful");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  return { isUpdating, updateCabin };
}
