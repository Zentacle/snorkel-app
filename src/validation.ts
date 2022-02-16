import validate from 'validate.js';
import get from 'lodash/get';

validate.validators.presence.options = {
  allowEmpty: false,
};

validate.validators.isTruthy = (
  value: any,
  _options: any,
  _key: any,
  _attributes: any,
) => {
  if (!value) {
    return 'is required';
  }
};

// validate.validators.phone = (
//   value: any,
//   _options: any,
//   _key: any,
//   attributes: any,
// ) => {
//   if (value) {
//     const lengths = {
//       us: 10,
//       default: 10,
//     };
//     const country = get(attributes, 'address.country', 'default');
//     const countryLength = get(lengths, country.toLowerCase(), lengths.default);
//     const numbers = value.replace(/[^0-9]/g, '');

//     if (numbers.length !== countryLength) {
//       return 'number is invalid';
//     }
//   }
// };
