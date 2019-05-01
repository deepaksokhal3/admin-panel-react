import LIVR from 'livr';

const defaultRules = {
    'secure_password'() {
        return value => {
            if (value === undefined || value === null || value === '') return;
            const regexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d#*&$@`~!%^()\-_{}[\]\\|+:;"'/]{8,}$/);

            if (!regexp.test(value)) return 'NOT_VALID_PASSWORD';
        };
    },
    'phone'() {
        return value => {
            if (value === undefined || value === null || value === '') return;
            const regexpUa = new RegExp(/^((\+3)8)(0\d{2})\d{7}$/);
            const regexpRuAndKz = new RegExp(/^(\+7)(\d{3})\d{7}$/);
            const regexpBe = new RegExp(/^((\+3)7)(5\d{2})\d{7}$/);

            if (!regexpUa.test(value) && !regexpRuAndKz.test(value) && !regexpBe.test(value)) return 'NOT_VALID'; // only UA mobile numbers
        };
    },
    'userName'() {
        return value => {
            if (value === undefined || value === null || value === '') return;
            const regexp = new RegExp(/^[а-яёa-zA-Z0-9-А-ЯІіїЇ]{1,20}$/);

            if (!regexp.test(value)) return 'NOT_VALID';
        };
    }
};

LIVR.Validator.registerDefaultRules(defaultRules);
