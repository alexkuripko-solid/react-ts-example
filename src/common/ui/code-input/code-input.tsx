import { ChangeEvent, KeyboardEvent, KeyboardEventHandler, ReactElement, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material';
import { colors } from '../../../config/theme/colors';

const Container = styled('div')(
  () => `
    display: flex;
    justify-content: space-around;
`,
);

const Input = styled('input')(
  () => `
    width: 84px;
    height: 94px;
    border-radius: 6px;
    border: 0.5px solid ${colors.secondary[40]}; 
    font-size: 44px;
    text-align: center;
`,
);

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

const CodeInput = ({ value, onChange }: Props): ReactElement => {
  const [activeInput, setActiveInput] = useState<number>(0);

  const inputRef = useRef<any[]>([]);

  useEffect(() => {
    inputRef.current[activeInput]?.focus();
  }, [activeInput]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const arrayOfValue = value.split('');
    arrayOfValue[index] = e.target.value;
    const newValue = arrayOfValue.join('');

    if (newValue.length > 4) {
      return;
    }

    onChange(newValue);
    setActiveInput(newValue.length < 3 ? newValue.length : 3);
  };

  const handleClear: KeyboardEventHandler<HTMLInputElement> = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace') {
      onChange(value.slice(0, -1));
      setActiveInput(activeInput ? activeInput - 1 : 0);
    }
  };

  return (
    <Container>
      <Input
        value={value[0] || ''}
        onChange={(e) => handleChange(0, e)}
        onKeyDown={handleClear}
        disabled={activeInput !== 0}
        ref={(input) => (inputRef.current[0] = input)}
        autoFocus
      />
      <Input
        value={value[1] || ''}
        onChange={(e) => handleChange(1, e)}
        ref={(input) => (inputRef.current[1] = input)}
        onKeyDown={handleClear}
        disabled={activeInput !== 1}
      />
      <Input
        value={value[2] || ''}
        onChange={(e) => handleChange(2, e)}
        ref={(input) => (inputRef.current[2] = input)}
        onKeyDown={handleClear}
        disabled={activeInput !== 2}
      />
      <Input
        value={value[3] || ''}
        onChange={(e) => handleChange(3, e)}
        ref={(input) => (inputRef.current[3] = input)}
        onKeyDown={handleClear}
        disabled={activeInput !== 3}
      />
    </Container>
  );
};

export default CodeInput;
