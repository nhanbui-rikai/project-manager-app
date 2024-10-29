"use client";

import { Autocomplete, Avatar, Button, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function Profile() {
  return (
    <div className="flex">
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
                <h2 className="text-[#222] text-xl font-bold">Pikami Cha</h2>
                <span className="text-sm text-[#8898aa]">Canada</span>
              </div>
            </div>
            <div className="flex justify-center">
              <Button sx={{ textTransform: "none" }} variant="contained" className="bg-[#ff5e5e] mt-2">
                Follow now
              </Button>
            </div>
            <h4 className="mt-4 mb-1 text-lg font-bold">About me</h4>
            <p className="text-sm text-[#8898aa]">
              Hi, I'm Pikamy, has been the industry standard dummy text ever since the 1500s.
            </p>

            <div className="flex gap-2 items-center mt-2">
              <span className="font-semibold text-sm">Mobile</span>
              <span className="text-sm text-[#8898aa]">01793931609</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-sm">Email</span>
              <span className="text-sm text-[#8898aa]">admin@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="px-4 rounded-lg bg-white shadow-sm shadow-slate-500 py-4 h-full">
          <div className="flex flex-col">
            <h2 className="font-bold py-5 text-xl">Personal Info</h2>
          </div>
          <div className="flex">
            <div className="flex-1 px-2">
              <TextField sx={{ width: "100%" }} label="First name" />
            </div>
            <div className="flex-1 px-2">
              <TextField sx={{ width: "100%" }} label="Last name" />
            </div>
          </div>
          <div className="flex mt-4">
            <div className="flex-1 px-2">
              <TextField sx={{ width: "100%" }} label="Phone number" />
            </div>
            <div className="flex-1 px-2">
              <Autocomplete
                disablePortal
                options={[
                  { label: "Male", year: 1994 },
                  { label: "Female", year: 1972 },
                ]}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="Gender" />}
              />
            </div>
          </div>
          <div className="mr-2">
            <Button className="float-right mt-5" variant="contained" sx={{ width: 100, bgcolor: "#6366f1" }}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
