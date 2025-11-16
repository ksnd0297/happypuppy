import { postReport } from "@/app/services/report/report";
import { ReportRequest } from "@/app/services/report/types";
import { useMutation } from "@tanstack/react-query";

const useReport = () => {
  return useMutation({
    mutationFn: async (data: ReportRequest) => {
      return postReport(data);
    },
  });
};

export default useReport;
