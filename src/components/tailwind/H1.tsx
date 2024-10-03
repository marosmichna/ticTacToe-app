import { cn } from "../../utils/utils";
 
export function H1(props: React.HTMLProps<HTMLHeadingElement>) {
    return (
        <h1
            {...props}
            className={cn(
                "text-3xl font-bold tracking-tighter sm:text-4xl",
                props.className
            )} 
        />
    );
}