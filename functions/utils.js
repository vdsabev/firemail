const validateObjectValues = exports.validateObjectValues = (object, keys) => {
  keys.forEach((key) => validateValue(object[key], key));
};

const validateValue = exports.validateValue = (value, key) => {
  if (!value) throw new Error(`Invalid ${key}: ${value}`);
};
