"use client";

import { Autocomplete, Avatar, Button, CircularProgress, TextField } from "@mui/material";
import "@/styles/pages/profile.css";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { Controller, useForm } from "react-hook-form";
import { updateProfile } from "@/api/authService";
import { toast } from "react-toastify";
import { updateUser } from "@/lib/store/feature/auth.slice";
import { useState } from "react";

export default function Profile() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

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
      userName: currentUser?.user_name,
      phoneNumber: currentUser?.phone_number,
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
                <h2 className="text-[#222] text-xl font-bold">{currentUser?.user_name}</h2>
                <span className="text-sm text-[#8898aa]">Vietnam</span>
              </div>
            </div>
            <div className="flex justify-center follow-btn">
              <Button sx={{ textTransform: "none" }} variant="contained" className="bg-[#ff5e5e] mt-2">
                Follow now
              </Button>
            </div>
            <h4 className="mt-4 mb-1 text-lg font-bold">About me</h4>
            <p className="text-sm text-[#8898aa]">{currentUser?.bio}</p>

            <div className="flex gap-2 items-center mt-2">
              <span className="font-semibold text-sm">Mobile</span>
              <span className="text-sm text-[#8898aa]">{currentUser?.phone_number}</span>
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
            <h2 className="font-bold py-5 text-xl text-[#222]">Personal Info</h2>
          </div>
          <div className="flex profile-wrapper">
            <div className="flex-1 px-2">
              <Controller
                name="userName"
                control={form.control}
                render={({ field }) => (
                  <TextField value={field.value} onChange={field.onChange} sx={{ width: "100%" }} label="First name" />
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
                    label="Phone number"
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
                    value={field.value ? { label: "Male", value: true } : { label: "Female", value: false }}
                    disablePortal
                    options={[
                      { label: "Male", value: true },
                      { label: "Female", value: false },
                    ]}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={(_, value) => field.onChange(value?.value)}
                    renderInput={(params) => <TextField {...params} label="Gender" />}
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
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
