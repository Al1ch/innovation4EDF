"use client";
import React from "react";
import styles from "./SignupForm.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import Input from "@/components/Input/Input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignupForm = () => {
  const FormSchema = z
    .object({
      username: z.string().min(1, "Username is required").max(20),
      email: z.string().min(1, "Email is required").email("Invalid Email"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: z
        .string()
        .min(1, "Password Confirmation is required")
        .max(100),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <Input label="Username" />
        <Input label="Email" />
        <Input label="Password" />
        <Input label="Confirm Password" />
      </form>
      <Button backgroundColor="black" size="xl" type="submit">
        <span className={styles.buttonLabel}>Crée un Compte</span>
      </Button>
      <div> Or </div>
      <span className={styles.text}>
        if you already have an account, please
        <Link href="/signIn"> Sign in </Link>
      </span>
    </div>
  );
};

export default SignupForm;
