import { Chart } from "react-google-charts";
import '../homepage/homepage.css';

class Bill {
    name: string;
    amount: number;
    date: string;
    category: string;

    constructor(name: string, amount: number, date: string, category: string) {
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.category = category;
    }

}

function Bills() {

    return (
        <>
            <p>Categories</p>
            <button>Add</button>
            <button>Delete</button>
        </>
    );
};

export default Bills