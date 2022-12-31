import _ from "lodash";

/**
 * Sums two numeric arrays.
 * @param leftArray One numeric array.
 * @param rightArray Another numeric array.
 * @returns Sum of {@link leftArray} and {@link rightArray}.
 */
const sumTwoNumericArrays = (leftArray: number[], rightArray: number[]) => {
  if (!leftArray && !rightArray) return 0;

  const sumLeftArray = _(leftArray ?? []).sum();
  const sumRightArray = _(rightArray ?? []).sum();

  return sumLeftArray + sumRightArray;
};

/**
 * Sums member reserved seats and non member reserved seats. This uses a common method called {@link sumTwoNumericArrays}.
 * @param memberReservedSeats Member reserved seats array.
 * @param nonMemberReservedSeats Non member reserved seats array.
 * @returns Sum of {@link memberReservedSeats} and {@link nonMemberReservedSeats}.
 */
const sumSeats = (
  memberReservedSeats: number[],
  nonMemberReservedSeats: number[]
) => {
  return sumTwoNumericArrays(memberReservedSeats, nonMemberReservedSeats);
};

/**
 * Sums member paid amounts and non member paid amounts. This uses a common method called {@link sumTwoNumericArrays}.
 * @param memberPaidAmounts Member paid amounts array.
 * @param nonMemberPaidAmount Non member paid amounts array.
 * @returns Sum of {@link memberPaidAmounts} and {@link nonMemberPaidAmount}.
 */
const getTotalPaidAmount = (
  memberPaidAmounts: number[],
  nonMemberPaidAmount: number[]
) => {
  return sumTwoNumericArrays(memberPaidAmounts, nonMemberPaidAmount);
};

export { sumSeats, getTotalPaidAmount };
