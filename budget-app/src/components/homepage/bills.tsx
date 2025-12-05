export type Bill = {
    id: string;
    name: string;
    amount: number;
    dueDate?: Date;
    category?: "need" | "want" | "savings";
};

type Billsprops = {
    bills: Bill[];  
    onCreateBill: () => void;
    onDeleteBill: (id: string) => void;
};

function Bills({ bills, onCreateBill, onDeleteBill }: Billsprops) {
    
    return (
        <>
            <h2>Bills</h2>    
        </>
    )
};

export default Bills