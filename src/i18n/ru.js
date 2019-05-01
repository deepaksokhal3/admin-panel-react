export default {
    resources : {
        drivers : {
            name   : 'Менеджеры',
            fields : {
                name      : 'Имя',
                address   : 'Адрес',
                carNumber : 'Номер авто',
                status    : 'Статус',
                phone     : 'Телефон',
                available : 'Доступный',
                balance   : 'Баланс'
            },
            page : {
                delete : 'Удалить менеджера',
                create : 'Создать менеджера',
                edit   : 'Редактировать'
            },
            create : {
                tabs : {
                    driverInfo : 'Информация о менеджере',
                    carInfo    : 'Информация об авто',
                    driverDocs : 'Документы менеджера',
                    contacts   : 'Контакты'
                },
                tin         : 'ИНН',
                document    : 'Загрузить документ',
                name        : 'Имя',
                photo       : 'Фото',
                phone       : 'Телефон',
                address     : 'Адрес',
                newPassword : 'Новый пароль',
                password    : 'Пароль',
                car         : {
                    number : 'Номер авто',
                    brand  : 'Марка авто',
                    owner  : 'Владелец'
                }
            }

        },
        products : {
            name   : 'Товары',
            fields : {
                name       : 'Название',
                descrption : 'Описание'
            },
            tabs : {
                image       : 'Фото',
                details     : 'Детали',
                description : 'Описание'
            },
            page : {
                delete : 'Удалить товар',
                create : 'Создать товар',
                edit   : 'Редактировать товар'
            },
            create : {
                name  : 'Товар',
                title : 'Название'
            },
            size  : 'Объем, л',
            price : 'Цена',
            type  : 'Тип'

        },
        orders : {
            name       : 'Заказы',
            rating     : 'Рейтинг',
            status     : 'Статус',
            driverName : 'Имя менеджера',
            clientName : 'Имя клиента',
            phone      : 'Телефон клиента',
            create     : 'Оформить заказ'
        },
        provider : {
            phone   : 'Телефон',
            address : 'Адрес',
            email   : 'Электронная почта',
            name    : 'Компания',
            coins   : 'Баланс',
            city    : 'Город',
            page    : {
                delete : 'Удалить поставщика',
                create : 'Создать поставщика',
                edit   : 'Редактировать поставщика',
                list   : 'Список поставщиков'
            }
        },
        admin : {
            name  : 'Имя',
            phone : 'Телефон',
            page  : {
                delete : 'Удалить',
                create : 'Создать',
                edit   : 'Редактировать ',
                list   : 'Список администраторов'
            },
            telegramId : 'Телеграм ID',
            viber      : 'Viber'
        },
        providers    : 'Поставщики',
        admins       : 'Администраторы',
        firstName    : 'Имя',
        lastName     : 'Фамилия',
        search       : 'Поиск',
        createdAt    : 'Дата',
        searchDriver : 'Поиск менеджера',
        searchClient : 'Поиск клиента',
        stat         : 'Статистика'
    }
};
