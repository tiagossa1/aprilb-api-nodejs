import { getDateRanges } from "./date-utils.js";
import _ from "lodash";

/**
 * Method that checks if member has fees on time.
 * @param paidYears Paid years numeric array.
 * @returns Boolean.
 */
const isMemberFeesOnSchedule = (paidYears: number[]) => {
  if (paidYears?.length === 0) return false;

  paidYears = _(paidYears).orderBy().value();

  const firstYear = paidYears[0] as number;
  const lastYear = new Date().getUTCFullYear();
  const yearsToCheck = getDateRanges(firstYear, lastYear);

  return _(yearsToCheck).difference(paidYears).value().length === 0;
};

export { isMemberFeesOnSchedule };
