"use client";

import { Autocomplete, Avatar, Button, CircularProgress, TextField } from "@mui/material";
import "@/styles/pages/profile.css";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { Controller, useForm } from "react-hook-form";
import { updateProfile } from "@/api/authService";
import { toast } from "react-toastify";
import { updateUser } from "@/lib/store/feature/auth.slice";
import { useState } from "react";
import { User } from "@/constants/types";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleUpdate = ({ userName, phoneNumber, gender, bio }: User) => {
    setIsLoading(true);
    updateProfile({ userName, bio, gender, phoneNumber, id: currentUser.id })
      .then((res) => {
        toast.success("Update profile successfully");
        dispatch(
          updateUser({
            user_name: userName,
            bio: bio,
            gender: gender,
            id: currentUser.id,
            phone_number: phoneNumber,
            email: currentUser.email,
          }),
        );
      })
      .catch((err) => {
        toast.error("Update unsuccessfully");
      })
      .finally(() => setIsLoading(false));
  };

  const form = useForm({
    defaultValues: {
      userName: currentUser?.userName,
      phoneNumber: currentUser?.phoneNumber,
      gender: currentUser?.gender,
      bio: currentUser?.bio,
    },
  });

  return (
    <div className="flex profile-wrapper min-h-[100vh]">
      <div className="flex-[0.3] px-4">
        <div className="rounded-lg bg-white shadow-sm shadow-slate-500 p-4">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Avatar
                sx={{ width: 80, height: 80 }}
                alt="Remy Sharp"
                src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
              />

              <div>
                <h2 className="text-[#222] text-xl font-bold">{currentUser?.userName}</h2>
                <span className="text-sm text-[#8898aa]">Vietnam</span>
              </div>
            </div>
            <div className="flex justify-center follow-btn">
              <Button sx={{ textTransform: "none", backgroundColor: "#ff5e5e" }} variant="contained" className="mt-2">
                {t("app.profilePage.followBtn")}
              </Button>
            </div>
            <h4 className="mt-4 mb-1 text-lg font-bold">{t("app.profilePage.aboutMeLabel")}</h4>
            <p className="text-sm text-[#8898aa]">{currentUser?.bio}</p>

            <div className="flex gap-2 items-center mt-2">
              <span className="font-semibold text-sm">{t("app.profilePage.phoneNumberLabel")}</span>
              <span className="text-sm text-[#8898aa]">{currentUser?.phoneNumber}</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-sm">Email</span>
              <span className="text-sm text-[#8898aa]">{currentUser?.email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-4">
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="px-4 rounded-lg bg-white shadow-sm shadow-slate-500 py-4 h-fit"
        >
          <div className="flex flex-col">
            <h2 className="font-bold py-5 text-xl text-[#222]">{t("app.profilePage.title")}</h2>
          </div>
          <div className="flex profile-wrapper">
            <div className="flex-1 px-2">
              <Controller
                name="userName"
                control={form.control}
                render={({ field }) => (
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    sx={{ width: "100%" }}
                    label={t("app.profilePage.userNameLabel")}
                  />
                )}
              />
            </div>
            <div className="flex-1 px-2">
              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field }) => (
                  <TextField
                    value={field.value}
                    onChange={field.onChange}
                    sx={{ width: "100%" }}
                    label={t("app.profilePage.phoneNumberLabel")}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex mt-4 profile-wrapper">
            <div className="flex-1 px-2">
              <Controller
                name="bio"
                control={form.control}
                render={({ field }) => (
                  <TextField value={field.value} onChange={field.onChange} sx={{ width: "100%" }} label="Bio" />
                )}
              />
            </div>
            <div className="flex-1 px-2">
              <Controller
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <Autocomplete
                    value={
                      field.value
                        ? { label: t("app.profilePage.genderMale"), value: true }
                        : { label: t("app.profilePage.genderFemale"), value: false }
                    }
                    disablePortal
                    options={[
                      { label: t("app.profilePage.genderMale"), value: true },
                      { label: t("app.profilePage.genderFemale"), value: false },
                    ]}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={(_, value) => field.onChange(value?.value)}
                    renderInput={(params) => <TextField {...params} label={t("app.profilePage.genderLabel")} />}
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </div>
          </div>
          <div className="py-3 flex justify-end mx-2">
            <Button
              startIcon={isLoading && <CircularProgress size={18} />}
              type="submit"
              className=""
              variant="contained"
              sx={{ width: 100, bgcolor: "#6366f1" }}
            >
              {t("app.profilePage.updateBtn")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
