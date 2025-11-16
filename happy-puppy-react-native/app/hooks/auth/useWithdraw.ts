import { withdrawUsers } from "@/app/services/users/users";
import { useMutation } from "@tanstack/react-query";

const useWithdraw = () => {
  return useMutation({
    mutationFn: async (userId: number) => {
      const response = withdrawUsers(userId);

      return response;
    },
  });
};

export default useWithdraw;
