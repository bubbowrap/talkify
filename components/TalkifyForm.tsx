import { useEffect, useState } from 'react';
import { sayInput, populateVoiceList, testRun } from 'api';
import { ChangeEvent } from 'react';
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
  const [voiceOptions, setVoiceOptions] = useState();
  const [voice, setVoice] = useState('Alex');
  const [pitch, setPitch] = useState(1);
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
        voiceList?.map(({ voiceURI, name, lang }: voiceProps, i: number) => (
          <MenuItem value={voiceURI} key={i}>
            {name} - {lang}
          </MenuItem>
        ))
      ) : (
        <MenuItem key='empty' value={''}></MenuItem>
      )
    );
  }, [voiceList]);

  useEffect(() => {
    setVoice((prevVoice: any) =>
      voiceList
        ? voiceList?.filter((voiceItem: any) => voiceItem.default)
        : prevVoice
    );
  }, [voiceList]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    window.speechSynthesis.cancel();
    textInput.length && sayInput(textInput, voice, pitch, rate);
  };

  return (
    <Box textAlign='center'>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <FormControl sx={{ minWidth: '25%', m: '0.5rem 0.5rem 1.5rem' }}>
          <InputLabel htmlFor='voices-id'>Voices</InputLabel>
          <Select
            labelId='voices-id'
            label='Voices'
            id=''
            value={voice}
            autoWidth
            onChange={(e) => setVoice(e.target.value)}
          >
            {voiceOptions}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '10%', m: '0.5rem 0.5rem 1.5rem' }}>
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
        <FormControl sx={{ width: '10%', m: '0.5rem 0.5rem 1.5rem' }}>
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
