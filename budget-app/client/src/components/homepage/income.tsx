import { useState } from "react";
import { getDebtAmount } from "../homepage/bills.tsx"

function getIncome() {
    var income = 1000;
    
    return income;
}

function incomeSection() {
    var debtAmount = getDebtAmount();
    var income = getIncome();
    var dtiRatio = ( debtAmount / income ) * 100;
    
    return (
        <div className="dtiSection">
            <h3>Income: {income}</h3>
            <h3>Debt: {debtAmount}</h3>
            <h3>Debt to Income Ratio: {dtiRatio}%</h3>
        </div>
    );
}

export default incomeSection;