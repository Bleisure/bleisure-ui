import { HasStatus } from "../types/custom-types";
import { Dictionary } from "../types/types";

interface StatusDictionary extends Dictionary<HasStatus> { }

const statusList: StatusDictionary = {
  APPROVED: {
    status: "approved",
  },
}
export default statusList
