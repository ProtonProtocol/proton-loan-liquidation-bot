import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "./constants";
import fetch from "node-fetch";
var last_message: string = "";
var last_message_time: number = Date.now();

export const telegram_message = async (message: string) => {
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    //don't send the same message with in the 30 minutes
    if (
      last_message === message &&
      Date.now() - last_message_time < 30 * 60 * 1000
    ) {
      return;
    }
    last_message = message;
    last_message_time = Date.now();
    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${message}`
      );
    } catch (e) {
      console.error("Error Sending Telegram Message");
      console.error(message);
      console.error(e);
    }
  }
};
