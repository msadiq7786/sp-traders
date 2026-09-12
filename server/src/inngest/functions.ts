import { inngest } from "./index.js";
import { Resend } from "resend";
import { env } from "@/config/env.js";
import { orderStatusEmail } from "@/template/order.template.js";

const resend = new Resend(env.RESEND_API);

export const sendOrderStatus = inngest.createFunction(
	{
		id: "send-order-accepted-email",
		triggers: [{ event: "order/status.updated" }],
	},
	async ({ event, step }) => {
		const { order, user } = event.data;
		await step.run("send-order-accepted-email", async () => {
			const { data, error } = await resend.emails.send({
				from: "onboarding@resend.dev",
				to: user.email,
				subject: `Order #${order._id} has been accepted`,
				html: orderStatusEmail({
					...order,
					status: order.status,
				}),
			});

			if (error) {
				throw new Error(`Failed to send email: ${error.message}`);
			}

			return data;
		});

		return {
			success: true,
			orderId: order._id,
		};
	},
);
