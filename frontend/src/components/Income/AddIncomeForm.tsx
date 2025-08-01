import React, { useState } from 'react'
import Input from '../inputs/input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });
    return (
        <div>
            {/* emoji picker for the icon */}
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={( selectedIcon ) => handleChange("icon", selectedIcon)}
            />


            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Income Source"
                placeholder="Enter Income Source"
                type="text"
            >
            </Input>

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="Enter Amount"
                type="number"
            >
            </Input>

            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            >
            </Input>
            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddIncome(income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    )
}

export default AddIncomeForm