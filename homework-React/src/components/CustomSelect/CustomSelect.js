import React, { Component } from "react";

import './styles.scss';

class CustomSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: this.props.defaulValue,
      isActive: false
    };
  }

  onChangeHandler = (event) => {    
    const selectedValue = event.target.value;

    const { onChange, options } = this.props;

    const selected = options.find(option => option.value === selectedValue);

    onChange(selected);

    this.setState({
      selectedOption: selected,
      isActive: false
    });
  }

  onClickHandler = (event) => {
    if (event.target.dataset.select === 'opened') {
      event.target.setAttribute('data-select', 'closed');
    } else {
      event.target.setAttribute('data-select', 'opened');
    }

    this.setState({
      isActive: !this.state.isActive
    });
  }

  render() {
    const { options } = this.props;

    return (
      <div className="select-container">
        <select className="custom-select" defaultValue={this.state.selectedOption} onChange={this.onChangeHandler} onClick={(event) => this.onClickHandler(event)} >
          {options.map((option) => (
            <option key={option.value} className="custom-option" value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default CustomSelect;