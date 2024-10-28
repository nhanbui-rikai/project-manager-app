"use client";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function Login() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = ({ email, password }: { email: string; password: string }) => {
    console.log(email);
    console.log(password);
  };

  return (
    <div className="bg-[#F3F3F9]">
      <div className="container m-auto px-4 h-[100vh]">
        <div className="flex h-full">
          <div className="px-4 flex-1">
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="flex h-full items-center justify-center flex-col"
            >
              <div
                style={{ boxShadow: "6px 11px 41px -28px #a99de7" }}
                className="pt-12 px-5 pb-5 w-full rounded-lg bg-white flex flex-col items-center"
              >
                <h4 className="text-lg font-semibold">Login</h4>

                <div className="my-12 w-full flex flex-col gap-4">
                  <div>
                    <Controller
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <TextField
                          value={field.value}
                          onChange={field.onChange}
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
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <TextField
                          value={field.value}
                          onChange={field.onChange}
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
                </div>

                <Button type="submit" sx={{ width: "100%" }} variant="contained">
                  Login
                </Button>

                <p className="mt-12 mb-4 text-sm">
                  Dont have account?{" "}
                  <Link className="text-[#1976d2]" href={"/register"}>
                    Register
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
