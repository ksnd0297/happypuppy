import { getUsersCheck } from "@/app/services/users/users";
import { useMutation } from "@tanstack/react-query";

const useCheckMember = () => {
  return useMutation({
    mutationFn: async ({ appUserId }: { appUserId: number }) => {
      return await getUsersCheck({ appUserId });
    },
  });
};

export default useCheckMember;
