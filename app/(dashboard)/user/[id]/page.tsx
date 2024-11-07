"use client";
import { UserService } from "@/api/userService";
import LoadingSpinner from "@/components/LoadingSpinner";
import RenderCondition from "@/components/RederCondition";
import SelectorInput from "@/components/SelectInput";
import TextArea from "@/components/TextArea";
import TextInput from "@/components/TextInput";
import { useAppSelector } from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { Button, Typography } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useParams } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  user_name: string;
  email: string;
  gender: string;
  phone_number: string;
  role: string;
  bio: string;
  updated_at: Date | string;
}

const DetailUserPage = () => {
  const [isEdit, setIsEdit] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const params = useParams<{ id: string }>();
  const { selectedUser } = useAppSelector((state) => state.app);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      user_name: selectedUser.user_name,
      email: selectedUser.email,
      gender: selectedUser.gender,
      phone_number: selectedUser.phone_number,
      role: selectedUser.role,
      bio: selectedUser.bio,
    },
  });

  const handleResetError = (field: keyof FormData) => {
    clearErrors([field]);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const newData = {
        ...data,
        updated_at: Timestamp.fromDate(new Date()),
      };

      const res = await UserService.updateUser(selectedUser.id, newData);
      if (res) {
        toast.success("Update User successfully", {
          position: "top-center",
        });
        setIsEdit(true);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const roleOptions = [
    { value: "member", label: "Member" },
    { value: "Admin", label: "Admin" },
  ];
  return (
    <>
      <div className="flex justify-between p-3">
        <Typography className="font-bold">DetailUser</Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1">
            <TextInput
              label="Name"
              id="user_name"
              variant="outlined"
              disabled={isEdit}
              className={cn("w-full col-span-1 mb-3", isEdit && "hover:cursor-not-allowed")}
              showIcon={false}
              error={!!errors.user_name}
              helperText={errors.user_name ? errors.user_name.message : ""}
              {...register("user_name", {
                required: "user_name is required",
              })}
              onBlur={() => handleResetError("user_name")}
            />

            <div className="flex gap-3 mb-3">
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Genders is required" }}
                render={({ field }) => (
                  <SelectorInput
                    {...field}
                    label="Genders"
                    id="gender"
                    variant="outlined"
                    disabled={isEdit}
                    error={!!errors.gender}
                    helperText={errors.gender ? errors.gender.message : ""}
                    onBlur={() => {
                      field.onBlur();
                      handleResetError("gender");
                    }}
                    className="col-span-1 w-full"
                    options={genderOptions}
                  />
                )}
              />

              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <SelectorInput
                    {...field}
                    label="Role"
                    id="role"
                    variant="outlined"
                    disabled={isEdit}
                    error={!!errors.role}
                    helperText={errors.role ? errors.role.message : ""}
                    onBlur={() => {
                      field.onBlur();
                      handleResetError("role");
                    }}
                    className="col-span-1 w-full"
                    options={roleOptions}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-1">
            <TextInput
              label="Email"
              id="email"
              variant="outlined"
              disabled={isEdit}
              className={`w-full col-span-1 mb-3`}
              showIcon={false}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              {...register("email", {
                required: "Email is required",
              })}
              onBlur={() => handleResetError("email")}
            />

            <TextInput
              label="Phone Number"
              id="phone_number"
              variant="outlined"
              disabled={isEdit}
              className={`w-full col-span-1`}
              showIcon={false}
              error={!!errors.phone_number}
              helperText={errors.phone_number ? errors.phone_number.message : ""}
              {...register("phone_number", {
                required: "phone_number is required",
              })}
              onBlur={() => handleResetError("phone_number")}
            />
          </div>

          <div className="col-span-2">
            <TextArea
              label="Bio"
              id="bio"
              disabled={isEdit}
              variant="outlined"
              className={`w-full col-span-1 mb-3`}
              error={!!errors.bio}
              helperText={errors.bio ? errors.bio.message : ""}
              {...register("bio", { required: "Bio is required" })}
              onBlur={() => handleResetError("bio")}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <RenderCondition condition={!isEdit}>
            <Button
              className={cn(loading && "hover:cursor-not-allowed")}
              onClick={handleSubmit(onSubmit)}
              type="submit"
              variant="contained"
              color="primary"
            >
              <RenderCondition condition={loading}>
                <LoadingSpinner className="text-sm" />
              </RenderCondition>
              Submit
            </Button>
            <Button onClick={() => setIsEdit(true)} variant="contained" color="inherit">
              Cancel
            </Button>
          </RenderCondition>

          <RenderCondition condition={isEdit}>
            <Button onClick={() => setIsEdit(false)} variant="contained" color="inherit">
              Edit
            </Button>
          </RenderCondition>
        </div>
      </form>
    </>
  );
};

export default DetailUserPage;
