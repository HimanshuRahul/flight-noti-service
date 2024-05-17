const amqplib = require("amqplib");
const { EmailService } = require("../services");
const { GMAIL_EMAIL } = require("./server-config");
async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("noti-queue");
    channel.consume("noti-queue", async (data) => {
      console.log(`${Buffer.from(data.content)}`);
      const object = JSON.parse(`${Buffer.from(data.content)}`);

      await EmailService.sendEmail(
        GMAIL_EMAIL,
        object.recepientEmail,
        object.subject,
        object.text
      );
      channel.ack(data);
    });
  } catch (error) {}
}

module.exports = {
  connectQueue,
};
