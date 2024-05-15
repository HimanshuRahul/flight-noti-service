const { StatusCodes } = require("http-status-codes");
const { TicketRepository } = require("../repositories");
const { MAILER } = require("../config");
const AppError = require("../utils/errors/app-error");

const ticketRepository = new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text) {
  try {
    const response = await MAILER.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      text: text,
    });
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot create a new email object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function createTicket(data) {
  try {
    const response = await ticketRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot create a new ticket object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getPendingEmails() {
  try {
    const response = await ticketRepository.getPendingTickets();
    return response;
  } catch (error) {
    throw new AppError(
      "Cannot create a new pending Email object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  sendEmail,
  createTicket,
  getPendingEmails,
};
