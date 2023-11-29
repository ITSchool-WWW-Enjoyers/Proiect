import {Form} from 'react-bootstrap';
import {useState} from 'react';


const Converter =()=>{
    const [fromUnit,setFromUnit]=useState('KG')
    const [toUnit,setToUnit] =useState('LBS')
    const [value,setValue]=useState('')
    const [result,setResult]=useState('')
    const [currentConversion,setCurrentConversion]=useState('1')

    const onSelectChange =(event)=>{
        console.log('event',event.target.value)
        const value=event.target.value
        setCurrentConversion(value)
        setValue('')
        setResult('')
        if(event.target.value=='1'){
            setFromUnit('KG')
            setToUnit('LBS')
        }
        else if(value=='2'){
            setFromUnit('KM')
            setToUnit('METER')
        }
        else if(value=='3'){
            setFromUnit('METER')
            setToUnit('CM')
        }
        else if(value=='4'){
            setFromUnit('INCH')
            setToUnit('CM')
        }
        else if(value=='5'){
            setFromUnit('PX')
            setToUnit('REM')
        }
    }

    const onValueChange = (event)=>{
        setValue(event.target.value)
        if(event.target.value==''){
            setResult('')
        }
        else{
            if(currentConversion=='1'){
                setResult(parseFloat(event.target.value)*2.20462)
            }
            else if(currentConversion =='2'){
                setResult(parseFloat(event.target.value)*1000)
            }
            else if(currentConversion =='3'){
                setResult(parseFloat(event.target.value)*100)
            }
            else if(currentConversion =='4'){
                setResult(parseFloat(event.target.value)*2.54)
            }
            else if(currentConversion =='5'){
                setResult(parseFloat(event.target.value)*0.063)
            }
        }
       
    }

    const onResultChange = (event)=>{
        setResult(event.target.value)
        if(event.target.value==''){
            setValue('')
        }
        else{
            if(currentConversion=='1'){
                setValue(parseFloat(event.target.value)/2.20462)
            }
            else if(currentConversion =='2'){
                setValue(parseFloat(event.target.value)/1000)
            }
            else if(currentConversion =='3'){
                setValue(parseFloat(event.target.value)/1000)
            }
            else if(currentConversion =='4'){
                setValue(parseFloat(event.target.value)/2.54)
            }
            else if(currentConversion =='5'){
                setValue(parseFloat(event.target.value)/0.063)
            }
            

        }
    
    }

    return (
        
    <Form>
        <Form.Group className='mb-3' controlId='conversion'>
            <Form.Label><b>Select Your Conversion</b></Form.Label>
            <Form.Select aria-label="Default select example" onChange={onSelectChange}>
                <option value="1">KG-LBS</option>
                <option value="2">KM-METER</option>
                <option value="3">METER-CM</option>
                <option value="4">INCH-CM</option>
                <option value="5">PX-REM</option>
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>{fromUnit}</b></Form.Label>
            <Form.Control type="text" placeholder="Enter Value"  value={value} onChange={onValueChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><b>{toUnit}</b></Form.Label>
            <Form.Control type="text" placeholder="Result"  value={result} onChange={onResultChange}/>
        </Form.Group>
    </Form>
    )

}

export default Converter;