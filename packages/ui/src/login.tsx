"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./button";
import { useEffect, useState } from "react";

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(50, "Username must be less than 50 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void | Promise<void>;
  isSubmitting: boolean
}

export const LoginForm = ({ onSubmit, isSubmitting }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [ isSubmit, setIsSubmit ] = useState(false)
  useEffect(()=>{setIsSubmit(isSubmitting)},[isSubmitting])
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="!space-y-2"
      noValidate
    >
      <div className="!space-y-1">
        <h2 className="text-2xl font-semibold text-[var(--main)]">
          Sign In
        </h2>

        <p className="text-sm">
          Enter your credentials to authenticate.
        </p>
      </div>

      {/* Username */}
      <div className="!space-y-1">
        <label
          htmlFor="username"
          className="text-sm"
        >
          Username:
        </label>

        <div>
          <input
            id="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            {...register("username")}
            className={`
              ${
                errors.username
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[var(--main)]"
              }
            `}
          />
        </div>

        {errors.username && (
          <p className="text-xs text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="!space-y-1">
        <label
          htmlFor="password"
          className="text-sm"
        >
          Password:
        </label>

        <div>
          <input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password")}
            className={`
              ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[var(--main)]"
              }
            `}
          />
        </div>

        {errors.password && (
          <p className="text-xs text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Button
          appName="locally"
          className="w-full"
          disabled={isSubmit}
        >
          {isSubmit ? "Signing in..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};