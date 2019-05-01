export default {
    resources : {
        drivers : {
            name   : 'Водії',
            fields : {
                name      : 'Ім\'я',
                address   : 'Адреса',
                status    : 'Статус',
                carNumber : 'Номер авто',
                phone     : 'Телефон'
            },
            page : {
                delete : 'Видалити водія',
                create : 'Створити водія',
                edit   : 'Редагувати водія'
            },
            create : {
                tabs : {
                    driverInfo : 'Інформація про водія',
                    carInfo    : 'Інформація про авто',
                    driverDocs : 'Документи водія',
                    contacts   : 'Контакти'
                },
                name    : 'Ім\'я',
                photo   : 'Фото',
                phone   : 'Телефон',
                address : 'Адреса',
                tin     : 'ІНН',
                car     : {
                    number : 'Номер',
                    brand  : 'Марка',
                    owner  : 'Власник'
                }
            }

        },
        products : {
            name   : 'Продукт |||| Продукти',
            fields : {
            },
            tabs : {
                image       : 'Фото',
                details     : 'Деталі',
                description : 'Опис'
            }
        },
        placeholderImg  : 'Перетягніть фото сюди',
        placeholderFile : 'Перетягніть файл сюди',
        firstName       : 'Ім\'я',
        lastName        : 'Прізвище'
    }
};
