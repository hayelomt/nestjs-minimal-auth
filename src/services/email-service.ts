'use server';

export const sendEmail = async (to: string, subject: string, html: string) => {
  console.log(`Email sent to ${to} with subject: ${subject} and text: ${html}`);
};
