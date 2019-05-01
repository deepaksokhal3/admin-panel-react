export default {
    resources : {
        drivers : {
            name   : 'Drivers',
            fields : {
                name      : 'Name',
                address   : 'Address',
                status    : 'Status',
                carNumber : 'Car number',
                phone     : 'Phone'
            },
            page : {
                delete : 'Delete driver',
                create : 'Create driver',
                edit   : 'Edit driver'
            },
            create : {
                tabs : {
                    driverInfo : 'Driver info',
                    carInfo    : 'Car info',
                    driverDocs : 'Driver Documents',
                    contacts   : 'Contacts'
                },
                name    : 'Name',
                photo   : 'Photo',
                phone   : 'Phone',
                address : 'Address',
                tin     : 'TIN',
                car     : {
                    number : 'Number',
                    brand  : 'Brand',
                    owner  : 'Owner'
                }
            }

        },
        products : {
            name   : 'Product |||| Products',
            fields : {
            },
            tabs : {
                image       : 'Image',
                details     : 'Details',
                description : 'Description',
                reviews     : 'Reviews'
            }
        },
        placeholderImg  : 'Drop your image here',
        placeholderFile : 'Drop your file here',
        firstName       : 'First name',
        lastName        : 'Last name'
    }
};
