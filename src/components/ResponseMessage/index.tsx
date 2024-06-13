import { twMerge } from "tailwind-merge";

type Props = {
  type: "ERROR" | "SUCCESS";
  width?: string;
  height?: string;
  children: React.ReactNode;
};

const ResponseMessage: React.FC<Props> = ({
  width = "100%",
  height = "auto",
  children,
  type,
}) => {
  const widthTw = `w-[${width}]`;
  const bgColor = type === "ERROR" ? "bg-[#EF5350]" : "bg-[blue]";
  const textColor = type === "ERROR" ? "text-[white]" : "text-[black]";
  const padding = "p-[10px]";

  return (
    <div className={twMerge(widthTw, height, bgColor, textColor, padding)}>
      {children}
    </div>
  );
};

export default ResponseMessage;
