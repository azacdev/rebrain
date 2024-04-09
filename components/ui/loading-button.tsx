import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./button";

type LoadingButtonProps = {
  loading: boolean;
} & ButtonProps;

const LoadingButton = ({ children, loading, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {children}
      {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};

export default LoadingButton;
