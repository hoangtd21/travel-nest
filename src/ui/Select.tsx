import styled from 'styled-components';
import { Option } from './SortBy';

const StyledSelect = styled.select<{ type?: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps {
  options: Option[];
  value?: string;
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ options, value, handleChange, ...props }: SelectProps) {
  return (
    <StyledSelect
      value={value}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
