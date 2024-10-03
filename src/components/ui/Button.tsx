
import { cva } from "class-variance-authority";
import { cn } from "../../utils/utils";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    buttonText: string;
    variant?: 'withPlayer' | 'withComputer';
};

const Button = ({ buttonText, className, variant, ...props }: ButtonProps) => {
  return (
    <button
        className={cn(buttonVariants({ variant }), className)}
        {...props}
    >
        <div>
            {buttonText}
        </div>
    </button>
  )
}

const buttonVariants = cva(
    ' font-semibold text-white border-2 border-[#D6D6D6] rounded-md px-4 py-2 hover:opacity-80',
    {
        variants: {
            variant: {
                withPlayer: ' bg-gray-500',
                withComputer: 'bg-gray-800',
            },
        },
        defaultVariants: {
            variant: 'withPlayer',
        },
    },
);

export default Button;