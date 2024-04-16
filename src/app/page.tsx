"use client";
import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input
        {...register("email", {
          required: "Email is required",
          validate: (value) => value.includes("@"),
        })}
        type="text"
        placeholder="Email"
        className="border h-20"
      />
      {errors.email && <div>{errors.email.message}</div>}
      <input
        {...register("password", {
          required: "password is required",
          minLength: 6,
        })}
        type="password"
        placeholder="Password"
        className="border h-20"
      />
      {errors.password && <div>{errors.password.message}</div>}
      <button type="submit" className="bg-blue-600 h-12">
        {" "}
        submit
      </button>
    </form>
  );
};

export default page;
