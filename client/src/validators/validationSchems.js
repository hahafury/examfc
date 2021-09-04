import * as yup from 'yup';
import valid from 'card-validator';

export default {
  LoginSchem: yup.object().shape({
    email: yup.string().email('check email').required('required'),
    password: yup.string().test('test-password', 'min 6 symbols', (value) => (value && value.trim().length >= 6)).required('required'),
  }),
  RegistrationSchem: yup.object().shape({
    email: yup.string().email('check email').required('Email is required'),
    password: yup.string().test('test-password', 'min 6 symbols', (value) => (value && value.trim().length >= 6)).required('required'),
    confirmPassword: yup.string().required('confirm password is required').oneOf([yup.ref('password')], 'confirmation pass must match password'),
    firstName: yup.string().test('test-firstName', 'required', (value) => (value && value.trim().length >= 1)).required('First Name is required'),
    lastName: yup.string().test('test-lastName', 'required', (value) => (value && value.trim().length >= 1)).required('Last Name is required'),
    displayName: yup.string().test('test-displayName', 'required', (value) => (value && value.trim().length >= 1)).required('Display Name is required'),
    role: yup.string().matches(/(customer|creator)/).required('Role is required'),
    agreeOfTerms: yup.boolean().oneOf([true], 'Must Accept Terms and Conditions').required('Must Accept Terms and Conditions'),
  }),
  CreateEventSchem: yup.object().shape({
    eventInfo: yup.string().required('Event info is required'),
    eventNotificationDay: yup.string().trim().matches(/^(0?[1-9]|[12][0-9]|3[01])$/, 'invalid day').required('required'),
    eventNotificationMonth: yup.string().trim().matches(/^(0?[1-9]|1[0-2])$/, 'invalid month').required('required'),
    eventNotificationYear: yup.string().matches(/^(20)\d{2}$/, 'invalid year').test('is-valid-year', 'invalid year', (value)=>(parseInt(value)>=2021 && parseInt(value)<=2099)).required('required'),
    eventNotificationHours: yup.string().matches(/^(0?[1-9]|1[0123456789]|2[01234])$/, 'invalid hours').required('required'),
    eventNotificationMinutes: yup.string().matches(/^(0?[1-9]|1[0123456789]|2[0123456789]|3[0123456789]|4[0123456789]|5[0123456789])$/,'invalid minutes').required('required'),
    eventDeadlineDay: yup.string().trim().matches(/^(0?[1-9]|[12][0-9]|3[01])$/, 'invalid day').required('required'),
    eventDeadlineMonth: yup.string().trim().matches(/^(0?[1-9]|1[0-2])$/, 'invalid month').required('required'),
    eventDeadlineYear: yup.string().matches(/^(20)\d{2}$/, 'invalid year').test('is-valid-year', 'invalid year', (value)=>(parseInt(value)>=2021 && parseInt(value)<=2099)).required('required'),
    eventDeadlineHours: yup.string().matches(/^(0?[1-9]|1[0123456789]|2[01234])$/, 'invalid hours').required('required'),
    eventDeadlineMinutes: yup.string().matches(/^(0?[1-9]|1[0123456789]|2[0123456789]|3[0123456789]|4[0123456789]|5[0123456789])$/,'invalid minutes').required('required'),
  }),
  ContestSchem: yup.object({
    nameVenture: yup.string().min(3),
    contestType: yup.string().matches(/(name|tagline|logo)/).required(),
    title: yup.string().test('test-title', 'required', (value) => (value && value.trim().length >= 1)).required('title of contest required'),
    industry: yup.string().required('industry required'),
    focusOfWork: yup.string().test('test-focusOfWork', 'required', (value) => (value && value.trim().length >= 1)).required('focus of work required'),
    targetCustomer: yup.string().test('test-targetCustomer', 'required', (value) => (value && value.trim().length >= 1)).required('target customers required'),
    styleName: yup.string().min(1),
    typeOfName: yup.string().min(1),
    typeOfTagline: yup.string().min(1),
    brandStyle: yup.string().min(1),
    file: yup.mixed(),
  }),
  filterSchem: yup.object().shape({
    typeIndex: yup.number().oneOf[1, 2, 3, 4, 5, 6, 7],
    contestId: yup.string(),
    awardSort: yup.string().matches(/(desc|asc)/),
    industry: yup.string(),
  }),
  LogoOfferSchema: yup.object().shape({
    offerData: yup.mixed().required('required'),
  }),
  TextOfferSchema: yup.object().shape({
    offerData: yup.string().test('test-offerData', 'required', (value) => (value && value.trim().length >= 1)).required('suggestion is required'),
  }),
  PaymentSchema: yup.object().shape({
    number: yup.string().test('test-cardNumber', 'Credit Card number is invalid', (value) => valid.number(value).isValid).required('required'),
    name: yup.string().min(1, 'required atleast one symbol').required('required'),
    cvc: yup.string().test('test-cvc', 'cvc is invalid', (value) => valid.cvv(value).isValid).required('required'),
    expiry: yup.string().test('test-expiry', 'expiry is invalid', (value) => valid.expirationDate(value).isValid).required('required'),
  }),
  CashoutSchema: yup.object().shape({
    sum: yup.number().min(5, 'min sum is 5$').required('required'),
    number: yup.string().test('test-cardNumber', 'Credit Card number is invalid', (value) => valid.number(value).isValid).required('required'),
    name: yup.string().min(1).required('required'),
    cvc: yup.string().test('test-cvc', 'cvc is invalid', (value) => valid.cvv(value).isValid).required('required'),
    expiry: yup.string().test('test-expiry', 'expiry is invalid', (value) => valid.expirationDate(value).isValid).required('required'),
  }),
  UpdateUserSchema: yup.object().shape({
    firstName: yup.string().test('test-firstName', 'required', (value) => (value && value.trim().length >= 1)).required('required'),
    lastName: yup.string().test('test-lastName', 'required', (value) => (value && value.trim().length >= 1)).required('required'),
    displayName: yup.string().test('test-displayName', 'required', (value) => (value && value.trim().length >= 1)).required('required'),
    file: yup.mixed(),
  }),
  MessageSchema: yup.object({
    message: yup.string().test('test-message', 'required', (value) => value && value.trim().length >= 1).required('required'),
  }),
  CatalogSchema: yup.object({
    catalogName: yup.string().test('test-catalogName', 'required', (value) => value && value.trim().length >= 1).required('required'),
  }),
};
