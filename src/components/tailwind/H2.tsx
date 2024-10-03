import { cn } from "../../utils/utils";
 
export function H2(props: React.HTMLProps<HTMLHeadingElement>) {
    return (
        <h2
            {...props}
            className={cn(
                "text-2xl font-semibold tracking-tighter",
                props.className
            )} 
        />
    );
}