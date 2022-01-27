import {useState} from 'react';
import {sayInput} from 'api';

import { TextField, Button } from '@mui/material';


const TalkifyForm = () => {
    const [textInput, setTextInput] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    sayInput(textInput);
}

    return(
        <form  autoComplete="off" onSubmit={handleSubmit}>
            <TextField onChange={(e) => setTextInput(e.target.value)} label="Input Text" variant="outlined" color="primary" fullWidth type="textArea" required />
            <Button type="submit" variant="contained" color="primary" size="large" disableElevation>Talk to me</Button>
        </form>
    )
}

export default TalkifyForm;