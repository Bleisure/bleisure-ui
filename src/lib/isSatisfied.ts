import { Credentials } from "../models";

const isSatisfied = (
  requirements: Credentials[] | Credentials,
  credentials: Credentials[]
): boolean => {

  let _requirements: Credentials[] = []

  if (!Array.isArray(requirements)) {
    _requirements = [requirements]
  } else {
    _requirements = [...requirements]
  }

  return credentials.some(c => _requirements.some(r => r.name === c.name))
};

export default isSatisfied;
