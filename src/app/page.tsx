"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { resolve } from "path";
import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

// type FormFields = {
//   email: string;
//   password: string;
// };

const page = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@test.com",
      password: "123456",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("email", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input
        {...register("email")}
        type="text"
        placeholder="Email"
        className="border h-20"
      />
      {errors.email && <div>{errors.email.message}</div>}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="border h-20"
      />
      {errors.password && <div>{errors.password.message}</div>}
      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-600 h-12"
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default page;
