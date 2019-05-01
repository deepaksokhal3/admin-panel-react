import { englishMessages } from 'admin-on-rest';
import ruMessages from 'aor-language-russian';
import uaMessages from 'aor-language-ukrainian';

import customRussMessages    from './ru';
import customUaMessages      from './uk';
import customEnglishMessages from './en';

export default {
    ru : { ...ruMessages, ...customRussMessages },
    uk : { ...uaMessages, ...customUaMessages },
    en : { ...englishMessages, ...customEnglishMessages }
};
