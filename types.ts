export type Language = 'en' | 'km';

export interface Translations {
  title: string;
  subtitle: string;
  formProgress: string;
  complete: string;
  eventDates: string;
  location: string;
  personalInfo: string;
  fullNameKhmer: string;
  fullNameLatin: string;
  gender: string;
  dateOfBirth: string;
  select: string;
  male: string;
  female: string;
  other: string;
  academicInfo: string;
  yearOfStudy: string;
  department: string;
  university: string;
  studentId: string;
  contactInfo: string;
  phoneNumber: string;
  emailAddress: string;
  telegramUsername: string;
  address: string;
  interestsExp: string;
  preferredTeam: string;
  selectTeam: string;
  previousExp: string;
  skills: string;
  motivation: string;
  availability: string;
  eventAvailability: string;
  weeklyCommitment: string;
  commitmentStatement: string;
  resetForm: string;
  exportPDF: string;
  submitApp: string;
  submitting: string;
  appSubmitted: string;
  thankYou: string;
  needHelp: string;
  helpText: string;
  darkMode: string;
  lightMode: string;
  next: string;
  back: string;
  step: string;
  of: string;
  startRegistration: string;
}

export interface FormData {
  fullNameKhmer: string;
  fullNameLatin: string;
  gender: string;
  dateOfBirth: string;
  yearOfStudy: string;
  department: string;
  university: string;
  studentId: string;
  phone: string;
  email: string;
  telegram: string;
  address: string;
  team: string;
  experience: string;
  skills: string;
  motivation: string;
  availability: string;
  weeklyCommitment: string;
  commitmentStatement: string;
}

export const INITIAL_FORM_DATA: FormData = {
  fullNameKhmer: '',
  fullNameLatin: '',
  gender: '',
  dateOfBirth: '',
  yearOfStudy: '',
  department: '',
  university: '',
  studentId: '',
  phone: '',
  email: '',
  telegram: '',
  address: '',
  team: '',
  experience: '',
  skills: '',
  motivation: '',
  availability: '',
  weeklyCommitment: '',
  commitmentStatement: ''
};