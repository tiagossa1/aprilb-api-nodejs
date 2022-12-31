import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

const roles = () => {
  ac.grant("MANAGER")
    .createAny("member")
    .readAny("member")
    .updateAny("member")
    .deleteAny("member")
    .createAny("non-member")
    .readAny("non-member")
    .updateAny("non-member")
    .deleteAny("non-member")
    .createAny("fee")
    .readAny("fee")
    .updateAny("fee")
    .deleteAny("fee")
    .createAny("trip")
    .readAny("trip")
    .updateAny("trip")
    .deleteAny("trip");

  ac.grant("ADMINISTRATOR")
    .extend("MANAGER")
    .createAny("trip-type")
    .readAny("trip-type")
    .updateAny("trip-type")
    .deleteAny("trip-type")
    .createAny("user")
    .readAny("user")
    .deleteAny("user");

  ac.grant("DESIGNER").readAny("trip");
  ac.grant("READ_ONLY")
    .readAny("member")
    .readAny("non-member")
    .readAny("fee")
    .readAny("trip");
  return ac;
};

export default roles;
