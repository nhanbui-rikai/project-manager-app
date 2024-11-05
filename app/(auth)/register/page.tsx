"use client";

import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import validation from "./validation";
import { register } from "@/api/authService";
import { toast } from "react-toastify";

export default function Register() {
  const form = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: joiResolver(validation),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const handleRegister = ({
    userName,
    email,
    password,
  }: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    register({ email, password, userName, role: "member" })
      .then((res) => {
        form.reset();
        toast.success("Register successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="bg-[#F3F3F9]">
      <div className="container m-auto px-4 h-[100vh]">
        <div className="flex h-full">
          <div className="px-4 flex-1">
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="flex h-full items-center justify-center flex-col"
            >
              <div
                style={{ boxShadow: "6px 11px 41px -28px #a99de7" }}
                className="pt-12 px-5 pb-5 w-full rounded-lg bg-white flex flex-col items-center"
              >
                <h4 className="text-lg font-semibold">Register</h4>

                <div className="my-12 w-full flex flex-col gap-4">
                  <div>
                    <Controller
                      name="userName"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          value={field.value}
                          onChange={field.onChange}
                          error={Boolean(error)}
                          helperText={error ? error.message : ""}
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              paddingY: "12px",
                            },
                          }}
                          placeholder="userName"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          value={field.value}
                          onChange={field.onChange}
                          error={Boolean(error)}
                          helperText={error ? error.message : ""}
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              paddingY: "12px",
                            },
                          }}
                          placeholder="email"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          value={field.value}
                          onChange={field.onChange}
                          error={Boolean(error)}
                          helperText={error ? error.message : ""}
                          type="password"
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              paddingY: "12px",
                            },
                          }}
                          placeholder="password"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      name="confirmPassword"
                      control={form.control}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          value={field.value}
                          onChange={field.onChange}
                          type="password"
                          error={Boolean(error)}
                          helperText={error ? error.message : ""}
                          sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                              paddingY: "12px",
                            },
                          }}
                          placeholder="password"
                        />
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" sx={{ width: "100%" }} variant="contained">
                  Submit
                </Button>

                <p className="mt-12 mb-4 text-sm">
                  Dont have account?{" "}
                  <Link className="text-[#1976d2]" href={"/login"}>
                    Login
                  </Link>{" "}
                  now
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
