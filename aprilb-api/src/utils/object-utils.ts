import logger from "../configs/logger.js";
import _ from "lodash";

/**
 * Method that hides the property by name of a given object and logs if fails.
 * @param obj - Object to remove the property.
 * @param propertyName - Property name to be removed.
 */
const hidePropertyAndLog = <T>(obj: T, propertyName: string) => {
  if (!obj || !propertyName) {
    return;
  }

  const result = _(obj).unset(propertyName).value();

  if (!result && logger) {
    logger.warn(`${typeof obj} - Could not remove ${propertyName} property.`);
  }
};

export { hidePropertyAndLog };
