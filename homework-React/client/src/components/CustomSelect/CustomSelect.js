import React, { useState } from "react";

import './styles.scss';

const CustomSelect = ({ options, defaulValue, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(defaulValue);
  const [isActive, setIsActive] = useState(false);

  const onChangeHandler = (event) => {    
    const selectedValue = event.target.value;

    const selected = options.find(option => option.value === selectedValue);

    onChange(selected);

    setSelectedOption(selected);
    setIsActive(false);
  };

  const onClickHandler = (event) => {
    if (event.target.dataset.select === 'opened') {
      event.target.setAttribute('data-select', 'closed');
    } else {
      event.target.setAttribute('data-select', 'opened');
    }

    setIsActive(!isActive);
  };

  return (
    <div className="select-container">
      <select className="custom-select dark-btn" defaultValue={selectedOption} onChange={onChangeHandler} onClick={onClickHandler} >
        {options.map((option) => (
          <option key={option.value} className="custom-option" value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;