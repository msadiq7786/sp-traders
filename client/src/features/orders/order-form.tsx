"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Order } from "./types";
import { OrderFormValues, orderSchema } from "./order.schema";
import { useCreateOrder, useUpdateOrder } from "./hooks/mutations";
import { useProducts } from "../products/hooks/queries";
import SpinLoader from "@/components/ui/spin-loader";

interface OrderFormProps {
  order?: Order;
  onSuccess?: () => void;
}

export function OrderForm({ order, onSuccess }: OrderFormProps) {
  const isEdit = !!order;

  const createOrder = useCreateOrder();
  const updateOrder = useUpdateOrder();
  const { data, isFetching, isError } = useProducts();

  const isPending = createOrder.isPending || updateOrder.isPending;

  const today = useMemo(() => {
    const date = new Date();

    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
  }, []);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),

    defaultValues: {
      grade: order?.grade ?? "",
      quantity: order?.quantity != null ? String(order.quantity) : "",
      date: order?.date ? order.date.slice(0, 10) : "",
      address: order?.address ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      grade: order?.grade ?? "",
      quantity: order?.quantity != null ? String(order.quantity) : "",
      date: order?.date ? order.date.slice(0, 10) : "",
      address: order?.address ?? "",
    });
  }, [order, form]);

  const onSubmit = (values: OrderFormValues) => {
    const payload = {
      grade: values.grade,
      quantity: Number(values.quantity),
      date: values.date,
      address: values.address.trim(),
    };

    if (isEdit && order) {
      updateOrder.mutate(
        {
          order: payload,
          orderId: order._id,
        },
        {
          onSuccess: () => {
            form.reset();
            onSuccess?.();
          },
        },
      );

      return;
    }

    createOrder.mutate(payload, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.grade}>
          <FieldLabel htmlFor="grade">Type of Oil</FieldLabel>

          <Select
            value={form.watch("grade")}
            onValueChange={(value) =>
              form.setValue("grade", value ?? "", {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            disabled={isPending}
          >
            <SelectTrigger
              id="grade"
              aria-invalid={!!form.formState.errors.grade}
              className="w-full py-5"
            >
              <SelectValue placeholder="Select oil type" />
            </SelectTrigger>

            <SelectContent>
              {isFetching || isError ? (
                <SelectItem value="" disabled>
                  <SpinLoader />
                </SelectItem>
              ) : (
                data?.data.products.map((product) => (
                  <SelectItem key={product._id} value={product.name}>
                    {product.name.toUpperCase()}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {form.formState.errors.grade && (
            <FieldError>{form.formState.errors.grade.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!form.formState.errors.quantity}>
          <FieldLabel htmlFor="quantity">Quantity in LTR</FieldLabel>

          <Input
            id="quantity"
            type="number"
            min={1}
            step={1}
            placeholder="Enter quantity"
            inputMode="numeric"
            aria-invalid={!!form.formState.errors.quantity}
            disabled={isPending}
            className="py-5"
            {...form.register("quantity")}
          />

          {form.formState.errors.quantity && (
            <FieldError>{form.formState.errors.quantity.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!form.formState.errors.date}>
          <FieldLabel htmlFor="date">Date</FieldLabel>

          <Input
            id="date"
            type="date"
            min={isEdit ? undefined : today}
            aria-invalid={!!form.formState.errors.date}
            disabled={isPending}
            className="py-5"
            {...form.register("date")}
          />

          {form.formState.errors.date && (
            <FieldError>{form.formState.errors.date.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!form.formState.errors.address}>
          <FieldLabel htmlFor="address">Destination Address</FieldLabel>

          <Textarea
            id="address"
            placeholder="Enter destination address"
            aria-invalid={!!form.formState.errors.address}
            disabled={isPending}
            className="min-h-24 resize-none"
            {...form.register("address")}
          />

          {form.formState.errors.address && (
            <FieldError>{form.formState.errors.address.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full py-5" disabled={isPending}>
        {isPending ? (
          <span className="inline-flex items-center gap-1">
            <Loader2 className="size-4 animate-spin" />

            {isEdit ? "Updating order..." : "Creating order..."}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1">
            <Package className="size-4" />

            {isEdit ? "Update Order" : "Make Order"}
          </span>
        )}
      </Button>
    </form>
  );
}
