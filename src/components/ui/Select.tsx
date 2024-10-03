import { cn } from "../../utils/utils";

type SelectProps = React.HTMLAttributes<HTMLSelectElement> & {
    rowCellLine?: number[];
    winLine?: number[];
}

const Select = ({ rowCellLine, winLine, className, ...props }: SelectProps) => {

    return (
        <select
            className={cn("w-10 bg-slate-400 text-white cursor-pointer outline-none", className)}
            {...props}
        >
            {rowCellLine?.map((rowCell) => (
                <option key={rowCell} value={rowCell}>{rowCell}</option>
            ))}
            {winLine?.map((win) => (
                <option key={win} value={win}>{win}</option>
            ))}
        </select>
    )
}

export default Select;