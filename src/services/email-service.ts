'use server';

export const sendEmail = async (to: string, subject: string, text: string) => {
  console.log(`Email sent to ${to} with subject: ${subject} and text: ${text}`);
};
