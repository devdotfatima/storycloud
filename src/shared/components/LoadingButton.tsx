import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

type LoadingButtonPropsT = {
  loading: boolean;
} & ButtonProps;

export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonPropsT) {
  console.log(loading);

  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}
