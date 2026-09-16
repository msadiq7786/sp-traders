import { env } from "@/config/env.js";
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "sp-trader",
  eventKey: env.INNGEST_EVENT_KEY,
});
