"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useCreateProduct, useUpdateProduct } from "./hooks/mutation";

import { ProductFormValues, productSchema } from "./schema";

import { Product } from "./types";

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
}

export function ProductForm({ product, onSuccess }: ProductFormProps) {
  const isEdit = !!product;

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const isPending = createProduct.isPending || updateProduct.isPending;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: product?.name ?? "",
      code: product?.code ?? "",
      isActive: product?.isActive ?? true,
    },
  });

  useEffect(() => {
    form.reset({
      name: product?.name ?? "",
      code: product?.code ?? "",
      isActive: product?.isActive ?? true,
    });
  }, [product, form]);

  const onSubmit = (values: ProductFormValues) => {
    if (isEdit && product) {
      updateProduct.mutate(
        {
          product: values,
          productId: product._id,
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

    createProduct.mutate(values, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="product-name">Product Name</FieldLabel>

          <Input
            id="product-name"
            placeholder="Enter product name"
            aria-invalid={!!form.formState.errors.name}
            disabled={isPending}
            {...form.register("name")}
          />

          {form.formState.errors.name && (
            <FieldError>{form.formState.errors.name.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!form.formState.errors.code}>
          <FieldLabel htmlFor="product-code">Product Code</FieldLabel>

          <Input
            id="product-code"
            placeholder="Enter product code"
            aria-invalid={!!form.formState.errors.code}
            disabled={isPending}
            {...form.register("code")}
          />

          {form.formState.errors.code && (
            <FieldError>{form.formState.errors.code.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!form.formState.errors.isActive}>
          <FieldLabel htmlFor="product-status">Status</FieldLabel>

          <Select
            value={form.watch("isActive") ? "active" : "inactive"}
            onValueChange={(value) =>
              form.setValue("isActive", value === "active", {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            disabled={isPending}
          >
            <SelectTrigger
              id="product-status"
              aria-invalid={!!form.formState.errors.isActive}
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="active">Active</SelectItem>

              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {form.formState.errors.isActive && (
            <FieldError>{form.formState.errors.isActive.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending
          ? isEdit
            ? "Updating..."
            : "Adding..."
          : isEdit
            ? "Update Product"
            : "Add Product"}
      </Button>
    </form>
  );
}
