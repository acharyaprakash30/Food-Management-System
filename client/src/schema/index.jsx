import * as Yup from 'yup';


export const registrationSchema = Yup.object({

    userName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain alphabetical characters.')
        .min(4, 'Fullname must be at least 4 characters long.')
        .max(30, 'Fullname cannot be longer than 30 characters.')
        .required('Fullname is required.'),

    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must have \'@\' followed by \'.com\'.')
        .required('Email is required.'),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long.')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[0-9a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
            'Password must contain at least one number and one special character.')
        .required('Password is required.'),

    // confirmPassword: Yup.string().required('Confirm password is required.').oneOf([Yup.ref('password'), null], "Password must match."),
    phoneNumber: Yup.string()
    .min(10, 'Phonenumber must be at least 10 digits long.')
    .max(10, 'Phonenumber cannot be longer than 10 digits.')
    .matches(/^98/, 'Phone number must start with 98.')
    .required('Phone number is required.'),


})


export const loginSchmea = Yup.object({

    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must have \'@\' followed by \'.com\'.')
        .required('Email is required.'),



    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long.')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[0-9a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
            'Password must contain at least one number and one special character.')
        .required('Password is required.'),



})


export const addItemSchema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    category: Yup.string().required('Category selection is required'),
    price: Yup.number().required('Price is required').min(50, 'Price must be above 50'),
    file: Yup.mixed().required('Image selection is required'),
});





export const profileSchema = Yup.object({

    userName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain alphabetical characters.')
        .min(5, 'Fullname must be at least 5 characters long.')
        .max(30, 'Fullname cannot be longer than 30 characters.')
        .required('Fullname is required.'),

    email: Yup.string()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email must have \'@\' followed by \'.com\'.')
        .required('Email is required.'),

   
    phoneNumber: Yup.string()
    .min(10, 'Phonenumber must be at least 10 digits long.')
    .max(10, 'Phonenumber cannot be longer than 10 digits.')
    .matches(/^98/, 'Phone number must start with 98.')
    .required('Phone number is required.'),


})

