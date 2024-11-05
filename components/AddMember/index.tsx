import { User } from "@/constants/types";

import { Close } from "@mui/icons-material";
import "@/styles/components/AddMember.css";

import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import MemberItem from "./MemberItem";
import useDebounce from "@/hooks/useDebounce";
import { searchUser } from "@/api/userService";
import { DetailTaskContext } from "../CreateTask";
import { toast } from "react-toastify";

export default function AddMember({ onClosePopper }: { onClosePopper?: () => void }) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);
  const [searchResult, setSearchResult] = useState<Array<User>>([]);

  const { members, setMembers, currentUser } = useContext(DetailTaskContext);

  const handleClose = () => {
    if (onClosePopper) return onClosePopper();
  };

  const handleRemove = (data: any) => {
    setMembers((prev: any) => {
      let newState = [...prev];
      newState = newState.filter((item) => item.id !== data.id);
      return newState;
    });
  };

  const handleAddIntoTask = (data: any) => {
    setMembers((prev: any) => {
      const newState = [...prev];
      const isExisted = newState.find((item) => item.id === data.id);
      if (!isExisted) newState.push(data);
      return newState;
    });
  };

  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setIsSearching(true);
      searchUser(debounceValue.trim())
        .then((res) => {
          setSearchResult(res);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };

    fetchApi();
    // eslint-disable-next-line
  }, [debounceValue]);
  return (
    <div className="flex flex-col min-w-[300px] bg-white rounded-md add-member-wrapper">
      <div className="px-2 py-1 flex items-center">
        <h3 className="flex-1 text-center text-sm">Members</h3>
        <button
          onClick={handleClose}
          className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-slate-200"
        >
          <Close sx={{ fontSize: 16 }} />
        </button>
      </div>
      <div className="px-3 pb-3">
        <TextField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              paddingY: "8px",
              paddingX: "12px",
            },
          }}
        />

        <div>
          <div className="text-xs mt-4 mb-2">Card Members</div>
          <div className="max-h-[259px] overflow-y-scroll">
            {members?.map((user: any, index: number) => (
              <MemberItem key={index} onRemove={handleRemove} disable data={user} />
            ))}
          </div>
        </div>

        {searchResult.length > 0 ? (
          <div>
            <div className="text-xs mt-4 mb-2">Members</div>
            <div className="max-h-[259px] overflow-y-scroll">
              {searchResult.map((item, index) => (
                <MemberItem onClick={handleAddIntoTask} key={index} data={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-sm py-6 px-[6px] bg-slate-200 text-center rounded-md mt-2">No result</div>
        )}
      </div>
    </div>
  );
}
