import { useState } from "react";
import '../homepage/homepage.css';

class Bill {
    id: number;
    name: string;
    amount: number;
    date: string;
    category: string;

    constructor(id: number, name: string, amount: number, date: string, category: string) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.category = category;
    }
}

class Budget {
    bills: Bill[] = [];

    addBill(name: string, amount: number, date: string, category: string) {
        const bill = new Bill(this.bills.length + 1, name, amount, date, category); 
        this.bills.push(bill);
    }

    removeBill(id: number) {
        this.bills = this.bills.filter(bill => bill.id !== id);
    }

    updateBill(updatedBill: Bill) {
        this.bills = this.bills.map(b => b.id === updatedBill.id ? updatedBill : b);
    }
}

const budget = new Budget();
budget.addBill("Shopping", 500, "02-14-2025", "Want");
budget.addBill("Groceries", 400, "09-29-2025", "Need");
budget.addBill("Gas", 80, "06-03-2025", "Need");

function CreateBill({ onClose, onSubmit, initialBill }: { onClose: () => void; onSubmit: (bill: Bill) => void; initialBill?: Bill }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const nameInput = form.elements.namedItem("billName") as HTMLInputElement;
        const amountInput = form.elements.namedItem("amount") as HTMLInputElement;
        const dateInput = form.elements.namedItem("date") as HTMLInputElement;
        const categoryInput = form.elements.namedItem("category") as HTMLInputElement;

        const bill = new Bill(initialBill?.id || Date.now(), nameInput.value, parseFloat(amountInput.value), dateInput.value, categoryInput.value);
        onSubmit(bill);
        onClose(); 
    };

    return (
        <form onSubmit={handleSubmit} className="billCreation">
            <label htmlFor="billName">Bill Name: </label>
            <input name="billName" type="text" defaultValue={initialBill?.name}></input><br />
            <label htmlFor="amount">Amount: </label>
            <input className="amount" name="amount" type="number" defaultValue={initialBill?.amount}></input><br />
            <label htmlFor="date">Date Due: </label>
            <input name="date" type="text" defaultValue={initialBill?.date}></input><br />
            <label htmlFor="category">Category: </label>
            <input name="category" type="text" defaultValue={initialBill?.category}></input><br />
            <button type="submit" value="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}

function Bills() {
    const [refresh, setRefresh] = useState(0);
    const [mode, setMode] = useState<'view' | 'add' | 'edit'>('view');
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

    switch (mode) {
        case 'view':
            return (
                <div className="viewSection">
                    <button className="addBill" onClick={() => setMode('add')}>+</button>
                    <ul>
                        {budget.bills.map(bill => (
                            <li className="bills" key={bill.id}>
                                
                                <span>
                                    <span className="billDate">
                                        {bill.date}
                                    </span>
                                    {bill.name}
                                    <span className={bill.category + "Category"}>
                                        ({bill.category})
                                    </span>
                                </span>
                                <span className="billAmount">-${bill.amount}</span>
                                <button className="editBtn" onClick={() => { setSelectedBill(bill); setMode('edit'); }}>Edit</button>
                                <button className="deleteBtn" onClick={() => { budget.removeBill(bill.id); setRefresh(refresh + 1); }}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case 'add':
            return <CreateBill onClose={() => setMode('view')} onSubmit={(bill) => { budget.addBill(bill.name, bill.amount, bill.date, bill.category); setRefresh(refresh + 1); }} />;
        case 'edit':
            if (selectedBill) {
                return <CreateBill onClose={() => { setMode('view'); setSelectedBill(null); }} onSubmit={(bill) => { budget.updateBill(bill); setRefresh(refresh + 1); }} initialBill={selectedBill} />;
            }
            break;
    }
    return null;
}

export default Bills;