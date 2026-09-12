"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RegisterFormValues, registerSchema } from "./register-schema";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.confirmPassword,
        name: values.name,
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message ?? "Failed to Register");
        },
        onSuccess: (_) => {
          toast.success("User Registered successfully");
          router.push("/dashboard");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-5"
      noValidate
    >
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="name">Organization's Name</FieldLabel>

        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          className="py-5"
          {...register("name")}
        />

        {errors.name && <FieldError>{errors.name.message}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">Email</FieldLabel>

        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          className="py-5"
          {...register("email")}
        />

        {errors.email && <FieldError>{errors.email.message}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="password">Password</FieldLabel>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            className="py-5 pr-10"
            {...register("password")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground absolute top-0 right-0 size-10 hover:bg-transparent"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        </div>

        {errors.password && <FieldError>{errors.password.message}</FieldError>}
      </Field>

      <Field data-invalid={!!errors.confirmPassword}>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>

        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            className="py-5 pr-10"
            {...register("confirmPassword")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground absolute top-0 right-0 size-10 hover:bg-transparent"
            onClick={() => setShowConfirmPassword((value) => !value)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        </div>

        {errors.confirmPassword && (
          <FieldError>{errors.confirmPassword.message}</FieldError>
        )}
      </Field>

      <Button type="submit" className="w-full py-5" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
