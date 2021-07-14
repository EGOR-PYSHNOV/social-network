import nodemailer from 'nodemailer';

const options = {
  service: 'Yandex',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
};

export const mailer = nodemailer.createTransport(options);
