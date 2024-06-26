import React from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, checked, onChange }) => {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
    />
  );
};

export default Checkbox;
