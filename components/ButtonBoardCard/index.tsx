import CheckIcon from "@mui/icons-material/Check";

export const ButtonBoardCard = ({
  isActive = false,
  isFollowing,
  className,
  nameBtn,
  onHandleEvent,
  children,
}: {
  isActive?: boolean;
  isFollowing?: boolean;
  className?: string;
  nameBtn?: any;
  onHandleEvent?: any;
  children?: any;
}) => {
  return (
    <div
      onClick={onHandleEvent}
      className={`${
        isActive ? className : "min-w-full m-1 bg-gray-200 hover:bg-gray-300"
      } cursor-pointer flex items-center px-2 py-[6px]  rounded-[4px] select-none`}
    >
      {children}
      <div className="text-[14px]">{nameBtn}</div>
      {isFollowing && <CheckIcon className="ml-1" style={{ fontSize: "16px" }} />}
    </div>
  );
};
