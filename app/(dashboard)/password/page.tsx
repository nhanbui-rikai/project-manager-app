"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import validation from "./validation";
import { useAppSelector } from "@/hooks/useStore";
import { changePassword } from "@/api/authService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Password() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: joiResolver(validation),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const handleChangePassword = ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => {
    setIsLoading(true);
    changePassword({ newPassword, currentPassword: oldPassword, userId: currentUser.id })
      .then((res) => {
        toast.success(t("app.passwordPage.success"));
      })
      .catch((err) => {
        let message = err.message;
        if (message === "Current password is incorrect") message = t("app.passwordPage.passwordIncorrect");
        toast.error(message);
      })
      .finally(() => {
        form.reset();
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="flex-1">
        <form
          onSubmit={form.handleSubmit(handleChangePassword)}
          className="px-4 rounded-lg bg-white shadow-sm shadow-slate-500 py-4 h-full"
        >
          <div className="flex flex-col">
            <h2 className="font-bold py-5 text-xl">{t("app.passwordPage.title")}</h2>
          </div>

          <div className="flex flex-col gap-4 mt-4 py-4">
            <div className="flex-1 px-2">
              <Controller
                name="oldPassword"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={Boolean(error)}
                    helperText={error ? error.message : ""}
                    value={field.value}
                    onChange={field.onChange}
                    type="password"
                    sx={{ width: "100%" }}
                    placeholder={t("app.passwordPage.oldPasswordLabel")}
                  />
                )}
              />
            </div>
            <div className="flex-1 px-2">
              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={Boolean(error)}
                    helperText={error ? error.message : ""}
                    value={field.value}
                    onChange={field.onChange}
                    type="password"
                    sx={{ width: "100%" }}
                    placeholder={t("app.passwordPage.newPasswordLabel")}
                  />
                )}
              />
            </div>
            <div className="flex-1 px-2">
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    error={Boolean(error)}
                    helperText={error ? error.message : ""}
                    value={field.value}
                    onChange={field.onChange}
                    type="password"
                    sx={{ width: "100%" }}
                    placeholder={t("app.passwordPage.confirmPasswordLabel")}
                  />
                )}
              />
            </div>
          </div>
          <div className="mr-2 flex justify-center">
            <Button
              startIcon={isLoading && <CircularProgress size={18} />}
              type="submit"
              className="mt-5"
              variant="contained"
              sx={{ width: 150, bgcolor: "#6366f1" }}
            >
              {t("app.passwordPage.saveBtn")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
