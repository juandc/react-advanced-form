// @flow
import type { TValidatorFunc } from './index';
import type { TValidationResult } from './createValidationResult';
import type { TValidatorArgs } from './getRules';

function reduceValidationResults(initialAcc: TValidationResult, results: TValidationResult[]) {
  return results.reduce((acc: TValidationResult, result: TValidationResult) => {
    acc.expected = acc.expected ? result.expected : acc.expected;
    acc.rejectedRules = acc.rejectedRules.concat(result.rejectedRules);
    return acc;
  } , initialAcc);
}

export default function mapToSingleResult(...validators: TValidatorFunc[]) {
  console.log('...validators', validators)

  return (args: TValidatorArgs) => {
    return validators.reduce((acc, validator: TValidatorFunc) => {
      const validatorResult = validator(args);
      const validatorResultArr = Array.isArray(validatorResult) ? validatorResult : [validatorResult];

      console.log(' ')
      console.warn('reduceValidationResults')
      console.log('validator', validator)
      console.log('validator acc:', validatorResult);
      console.log('prev reduced', Object.assign({}, acc));

      const nextAcc = reduceValidationResults(acc, validatorResultArr);
      console.log({ nextAcc })

      return nextAcc;
    }, {
      expected: true,
      rejectedRules: []
    });
  };
}
