import { getUsersCheck } from "@/app/services/users/users";
import { useMutation } from "@tanstack/react-query";

const useCheckMember = () => {
  return useMutation({
    mutationFn: async ({ appUserId }: { appUserId: number }) => {
      try {
        return await getUsersCheck({ appUserId });
      } catch {
        return { isMember: false, userId: 0 };
      }
    },
  });
};

export default useCheckMember;
