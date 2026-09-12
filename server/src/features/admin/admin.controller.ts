// Add LDO products

import { asyncHandler } from "@/utils/async-handler.js";
import { Request, Response } from "express";
import { ApiError } from "@/utils/api-error.js";
import { ApiResponse } from "@/utils/api-response.js";
import { Order } from "../orders/orders.schema.js";

/**
     create controller for admin fetching orders details along with user details(I already have a require Admin middleware, add pagination also, Here is the logic flow :

        fetch the recent 10 created orders along with user details like email, username,  

    The admin can fetch the orders details based on 1day, 1week, 1month, 6months, 1year
    or admin can fetch the orders of a particular user
 */
