import { inngest } from "./client.js";
import { sendOrderStatus } from "./functions.js";

// Safe, clean aggregate export
export const functions = [sendOrderStatus];
export { inngest };
