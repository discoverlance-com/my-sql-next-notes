import { LoaderIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "~/components/ui/button";

interface SubmitButtonProps extends ButtonProps {}

const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="gap-2" type="submit" {...props}>
      {pending && <LoaderIcon className="h-4 w-4 animate-spin" />}{" "}
      <span>{children}</span>
    </Button>
  );
};

export default SubmitButton;
