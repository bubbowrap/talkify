import { useEffect, useState } from 'react';
import { sayInput, populateVoiceList } from 'api';
import {
  Box,
  ButtonGroup,
  FormControl,
  Select,
  MenuItem,
  Slider,
  TextField,
  InputLabel,
  Button,
} from '@mui/material';

const selectValues = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

interface voiceProps {
  voiceURI: string;
  name: string;
  lang: string;
  default: boolean;
}

const TalkifyForm = () => {
  const [textInput, setTextInput] = useState('');
  const [voiceList, setVoiceList] = useState<any>([]);
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [voice, setVoice] = useState('Alex');
  const [pitch, setPitch] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);

  useEffect(() => {
    const fetchVoices = () => {
      try {
        window.speechSynthesis.onvoiceschanged = () => {
          const data = populateVoiceList();
          setVoiceList(data);
        };
      } catch (err) {
        console.log(err);
      }
    };
    fetchVoices();
  }, []);

  useEffect(() => {
    setVoiceOptions(
      voiceList.length ? (
        voiceList?.map(({ name, lang }: voiceProps, i: number) => (
          <MenuItem value={name} key={i}>
            {name} - {lang}
          </MenuItem>
        ))
      ) : (
        <MenuItem value='Alex'>Alex - en-US</MenuItem>
      )
    );
  }, [voiceList]);

  useEffect(() => {
    setVoice((prevVoice: any) =>
      voiceList.length > 0
        ? voiceList?.filter((voice: any) => voice.default)[0].name
        : prevVoice
    );
  }, [voiceList]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    textInput.length && sayInput(textInput, voice, pitch, rate);
  };

  return (
    <Box textAlign='center'>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <FormControl
          sx={{ width: '25%', minWidth: '150px', m: '0.5rem 0.5rem 1.5rem' }}
        >
          <InputLabel htmlFor='voices-id'>Voices</InputLabel>
          <Select
            labelId='voices-id'
            label='Voices'
            id=''
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
          >
            {voiceOptions}
          </Select>
        </FormControl>
        <FormControl
          sx={{ width: '10%', m: '0.5rem 0.5rem 1.5rem', minWidth: '75px' }}
        >
          <InputLabel>Rate</InputLabel>
          <Select
            label='Rate'
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            {selectValues.map((value, i) => (
              <MenuItem value={value} key={i}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{ width: '10%', m: '0.5rem 0.5rem 1.5rem', minWidth: '75px' }}
        >
          <InputLabel>Pitch</InputLabel>
          <Select
            label='Pitch'
            defaultValue={pitch}
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
          >
            {selectValues.map((value, i) => (
              <MenuItem value={value} key={i}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            onChange={(e) => setTextInput(e.target.value)}
            label='Input Text'
            variant='outlined'
            color='primary'
            multiline
            rows={8}
            required
            sx={{ mb: 4 }}
          />
        </FormControl>
        <ButtonGroup aria-label='Talkify Controls'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            disableElevation
          >
            Talk to me
          </Button>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            disableElevation
            onClick={() => window.speechSynthesis.pause()}
          >
            Pause
          </Button>
          <Button
            variant='contained'
            color='success'
            size='large'
            disableElevation
            onClick={() => window.speechSynthesis.resume()}
          >
            Resume
          </Button>
          <Button
            variant='contained'
            color='error'
            size='large'
            disableElevation
            onClick={() => window.speechSynthesis.cancel()}
          >
            Stop
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default TalkifyForm;
