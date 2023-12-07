import { Form } from 'react-bootstrap';
import { useState } from 'react';

const Converter = () => {
    const [fromUnit, setFromUnit] = useState('KG');
    const [toUnit, setToUnit] = useState('LBS');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const [currentConversion, setCurrentConversion] = useState('KG_LBS');

    const parseInputValue = (inputValue) => {
        return inputValue === '' ? NaN : parseFloat(inputValue);
    };

    const conversionOptions = [
        { value: 'KG_LBS', label: 'KG-LBS' },
        { value: 'KM_METER', label: 'KM-METER' },
        { value: 'METER_CM', label: 'METER-CM' },
        { value: 'INCH_CM', label: 'INCH-CM' },
        { value: 'PX_REM', label: 'PX-REM' },
    ];

    const onSelectChange = (event) => {
        const value = event.target.value;
        setCurrentConversion(value);
        setValue('');
        setResult('');

        switch (value) {
            case 'KG_LBS':
                setFromUnit('KG');
                setToUnit('LBS');
                break;
            case 'KM_METER':
                setFromUnit('KM');
                setToUnit('METER');
                break;
            case 'METER_CM':
                setFromUnit('METER');
                setToUnit('CM');
                break;
            case 'INCH_CM':
                setFromUnit('INCH');
                setToUnit('CM');
                break;
            case 'PX_REM':
                setFromUnit('PX');
                setToUnit('REM');
                break;

        }
    };

    const onValueChange = (event) => {
        const inputValue = event.target.value;
        const parsedValue = parseInputValue(inputValue);
        setValue(inputValue);

        if (isNaN(parsedValue)) {
            setResult('');
        } else {
            switch (currentConversion) {
                case 'KG_LBS':
                    setResult(parsedValue * 2.20462);
                    break;
                case 'KM_METER':
                    setResult(parsedValue * 1000);
                    break;
                case 'METER_CM':
                    setResult(parsedValue * 100);
                    break;
                case 'INCH_CM':
                    setResult(parsedValue * 2.54);
                    break;
                case 'PX_REM':
                    setResult(parsedValue * 0.0625);
                    break;
            }
        }
    };

    const onResultChange = (event) => {
        const inputValue = event.target.value;
        const parsedValue = parseInputValue(inputValue);
        setResult(inputValue);

        if (isNaN(parsedValue)) {
            setValue('');
        } else {
            switch (currentConversion) {
                case 'KG_LBS':
                    setValue(parsedValue / 2.20462);
                    break;
                case 'KM_METER':
                    setValue(parsedValue / 1000);
                    break;
                case 'METER_CM':
                    setValue(parsedValue / 1000);
                    break;
                case 'INCH_CM':
                    setValue(parsedValue / 2.54);
                    break;
                case 'PX_REM':
                    setValue(parsedValue / 0.063);
                    break;
            }
        }
    };

    return (
        <Form>
            <Form.Group className='mb-3' controlId='conversion'>
                <Form.Label>
                    <p>Select Your Conversion</p>
                </Form.Label>
                <Form.Select aria-label='Default select example' onChange={onSelectChange}>
                    {conversionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>
                    <p>{fromUnit}</p>
                </Form.Label>
                <Form.Control type='text' placeholder='Enter Value' value={value} onChange={onValueChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>
                    <p>{toUnit}</p>
                </Form.Label>
                <Form.Control type='text' placeholder='Result' value={result} onChange={onResultChange} />
            </Form.Group>
        </Form>
    );
};

export default Converter;