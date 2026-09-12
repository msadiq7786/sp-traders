export type OrderStatus =
	| "pending"
	| "accepted"
	| "dispatched"
	| "delivered"
	| "rejected";

interface OrderStatusEmailProps {
	_id: string;
	address: string;
	quantity: number;
	grade: string;
	date: string | Date;
	status: OrderStatus;
}

const STATUS_CONFIG: Record<
	OrderStatus,
	{
		label: string;
		title: string;
		message: string;
		badgeBackground: string;
		badgeColor: string;
	}
> = {
	pending: {
		label: "ORDER PENDING",
		title: "Your order is pending",
		message:
			"Your order has been received and is currently waiting for review. We will notify you once there is an update.",
		badgeBackground: "#fffbeb",
		badgeColor: "#b45309",
	},

	accepted: {
		label: "ORDER ACCEPTED",
		title: "Your order has been accepted",
		message:
			"Your order has been successfully reviewed and accepted. We will keep you updated about the next steps.",
		badgeBackground: "#ecfdf5",
		badgeColor: "#047857",
	},

	dispatched: {
		label: "ORDER DISPATCHED",
		title: "Your order has been dispatched",
		message:
			"Good news! Your order has been dispatched and is now on its way to the delivery address provided.",
		badgeBackground: "#eff6ff",
		badgeColor: "#1d4ed8",
	},

	delivered: {
		label: "ORDER DELIVERED",
		title: "Your order has been delivered",
		message:
			"Your order has been successfully delivered. Thank you for choosing SP-Traders.",
		badgeBackground: "#ecfdf5",
		badgeColor: "#047857",
	},

	rejected: {
		label: "ORDER REJECTED",
		title: "Your order has been rejected",
		message:
			"Unfortunately, your order could not be accepted at this time. Please contact our support team if you have any questions.",
		badgeBackground: "#fef2f2",
		badgeColor: "#b91c1c",
	},
};

export const orderStatusEmail = ({
	_id,
	address,
	quantity,
	grade,
	date,
	status,
}: OrderStatusEmailProps) => {
	const config = STATUS_CONFIG[status];

	const formattedDate = new Date(date).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>${config.title} - SP-Traders</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background-color: #f5f7f9;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2937;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
>
  <tr>
    <td
      align="center"
      style="padding: 40px 16px;"
    >

      <!-- Main Container -->
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          max-width: 600px;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        "
      >

        <!-- Header -->
        <tr>
          <td
            style="
              padding: 24px 30px;
              border-bottom: 1px solid #e5e7eb;
            "
          >

            <div
              style="
                font-size: 24px;
                font-weight: 800;
                letter-spacing: -0.5px;
                color: #111827;
              "
            >
              SP-Traders
            </div>

            <div
              style="
                margin-top: 4px;
                font-size: 12px;
                color: #6b7280;
                letter-spacing: 0.5px;
              "
            >
              ORDER MANAGEMENT
            </div>

          </td>
        </tr>

        <!-- Status -->
        <tr>
          <td style="padding: 36px 30px 20px;">

            <div
              style="
                display: inline-block;
                padding: 7px 12px;
                background-color: ${config.badgeBackground};
                color: ${config.badgeColor};
                border-radius: 999px;
                font-size: 13px;
                font-weight: 700;
              "
            >
              ${config.label}
            </div>

            <h1
              style="
                margin: 18px 0 8px;
                font-size: 26px;
                line-height: 34px;
                color: #111827;
              "
            >
              ${config.title}
            </h1>

            <p
              style="
                margin: 0;
                font-size: 15px;
                line-height: 24px;
                color: #6b7280;
              "
            >
              ${config.message}
            </p>

          </td>
        </tr>

        <!-- Order Details -->
        <tr>
          <td style="padding: 10px 30px 30px;">

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                background-color: #f9fafb;
                border: 1px solid #e5e7eb;
                border-radius: 10px;
              "
            >

              <!-- Order ID -->
              <tr>
                <td
                  style="
                    padding: 16px;
                    border-bottom: 1px solid #e5e7eb;
                  "
                >
                  <div
                    style="
                      font-size: 12px;
                      color: #6b7280;
                      margin-bottom: 5px;
                    "
                  >
                    ORDER ID
                  </div>

                  <div
                    style="
                      font-size: 14px;
                      font-weight: 700;
                      color: #111827;
                      word-break: break-all;
                    "
                  >
                    #${_id}
                  </div>
                </td>
              </tr>

              <!-- Grade -->
              <tr>
                <td
                  style="
                    padding: 16px;
                    border-bottom: 1px solid #e5e7eb;
                  "
                >
                  <div
                    style="
                      font-size: 12px;
                      color: #6b7280;
                      margin-bottom: 5px;
                    "
                  >
                    GRADE
                  </div>

                  <div
                    style="
                      font-size: 15px;
                      font-weight: 700;
                      color: #111827;
                      text-transform: uppercase;
                    "
                  >
                    ${grade}
                  </div>
                </td>
              </tr>

              <!-- Quantity -->
              <tr>
                <td
                  style="
                    padding: 16px;
                    border-bottom: 1px solid #e5e7eb;
                  "
                >
                  <div
                    style="
                      font-size: 12px;
                      color: #6b7280;
                      margin-bottom: 5px;
                    "
                  >
                    QUANTITY
                  </div>

                  <div
                    style="
                      font-size: 15px;
                      font-weight: 700;
                      color: #111827;
                    "
                  >
                    ${quantity}
                  </div>
                </td>
              </tr>

              <!-- Order Date -->
              <tr>
                <td
                  style="
                    padding: 16px;
                    border-bottom: 1px solid #e5e7eb;
                  "
                >
                  <div
                    style="
                      font-size: 12px;
                      color: #6b7280;
                      margin-bottom: 5px;
                    "
                  >
                    ORDER DATE
                  </div>

                  <div
                    style="
                      font-size: 15px;
                      font-weight: 700;
                      color: #111827;
                    "
                  >
                    ${formattedDate}
                  </div>
                </td>
              </tr>

              <!-- Address -->
              <tr>
                <td style="padding: 16px;">

                  <div
                    style="
                      font-size: 12px;
                      color: #6b7280;
                      margin-bottom: 5px;
                    "
                  >
                    DELIVERY ADDRESS
                  </div>

                  <div
                    style="
                      font-size: 14px;
                      line-height: 21px;
                      font-weight: 600;
                      color: #111827;
                    "
                  >
                    ${address}
                  </div>

                </td>
              </tr>

            </table>

          </td>
        </tr>

        <!-- Footer Message -->
        <tr>
          <td style="padding: 0 30px 30px;">

            <p
              style="
                margin: 0;
                font-size: 14px;
                line-height: 22px;
                color: #6b7280;
              "
            >
              If you have any questions regarding your order,
              please contact our support team.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td
            style="
              padding: 24px 30px;
              background-color: #f9fafb;
              border-top: 1px solid #e5e7eb;
            "
          >

            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: #111827;
                margin-bottom: 6px;
              "
            >
              SP-Traders
            </div>

            <div
              style="
                font-size: 12px;
                line-height: 18px;
                color: #9ca3af;
              "
            >
              This is an automated email. Please do not reply
              directly to this message.
            </div>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
};
