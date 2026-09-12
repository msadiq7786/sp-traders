"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoginFormValues, loginSchema } from "./login-schema";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        rememberMe: true,
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message ?? "Failed to LoggedIn");
        },
        onSuccess: (_) => {
          toast.success("LoggedIn Successfully");
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
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">Email</FieldLabel>

        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="py-5"
          autoComplete="email"
          aria-invalid={!!errors.email}
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
            placeholder="Enter your password"
            autoComplete="current-password"
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

      <Button type="submit" className="w-full py-5" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
