import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onClick?: () => void;
}

const Search: React.FC<SearchProps> = ({ onClick, className, ...props }) => {
  return (
    <>
      <div className={cn("flex h-full justify-center items-center gap-3")}>
        {" "}
        <button onClick={onClick}>
          <SearchIcon />
        </button>
        <input
          type="text"
          className={cn("outline-none h-11 rounded-md p-3 border border-slate-200 bg-transparent", className)}
          placeholder="Search Input"
          {...props}
        />
      </div>
    </>
  );
};

export default Search;
