import { useQuery } from "@tanstack/react-query";
import { getMaintenance, getVersion } from "../services/maintenance/maintenance";

const useApp = () => {
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      const [maintenance, version] = await Promise.all([getMaintenance(), getVersion()]);

      return {
        maintenance,
        version,
      };
    },
  });
};

export default useApp;
