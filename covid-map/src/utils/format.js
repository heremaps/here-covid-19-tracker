
import { format } from "d3-format"

export const formatThousand = num => {
  return format(",.8r")(num).split(".")[0]
}
