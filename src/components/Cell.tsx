

type CellProps = {
    children: React.ReactNode;
    onClick: () => void;
};

const Cell: React.FC<CellProps> = ({ children, onClick }) => {
    return (
        <div 
            className="w-10 h-10 md:w-16 md:h-16 border border-white flex items-center justify-center cursor-pointer"
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Cell;


