import { util } from "./util";
import { Unichat } from "./unichat";

export const unichatjs = {
  Unichat,
  util
};

export default Unichat;

(<any>window).unichatjs = unichatjs;
/** @deprecated Should use unichatjs namespace */
(<any>window).Unichat = Unichat;
