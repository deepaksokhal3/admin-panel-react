import LIVR           from 'livr';
import { prepareError }   from './utils';

export function FactoryValidation(fields, ruls) {
    const errorsObj = {};
    const validator = new LIVR.Validator(ruls);
    const isErrors = !validator.validate(fields);

    if (isErrors) {
        const validatorErrors = validator.getErrors();

        for (const field in validatorErrors) {
            if (field && (field !== 'car')) {
                errorsObj[field] = prepareError(field, validatorErrors[field]);
            }
        }

        return errorsObj;
    }

    return;
}
