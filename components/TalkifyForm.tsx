import { useEffect, useState } from 'react';
import { sayInput, populateVoiceList } from 'api';

import {
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';

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
  const [voice, setVoice] = useState<any>([
    {
      voiceURI: 'Alex',
      name: 'Alex',
      lang: 'en-US',
      localService: true,
      default: true,
    },
  ]);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    setVoiceList(populateVoiceList());
  }, []);

  useEffect(() => {
    setVoiceOptions(
      voiceList?.map(({ voiceURI, name, lang }: voiceProps) => (
        <MenuItem value={voiceURI} key={name}>
          {name} - {lang}
        </MenuItem>
      ))
    );
  }, [voiceList]);

  //   useEffect(() => {
  //     console.log(voiceList);
  //     setVoice((prevVoice: any) =>
  //       voiceList
  //         ? voiceList?.filter((voiceItem: any) => voiceItem.default)
  //         : prevVoice
  //     );
  //   }, [voiceList]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(voice);
    textInput.length && sayInput(textInput, voice, pitch, rate);
  };

  return (
    <Box textAlign='center'>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <Select
          label='Voices'
          defaultValue={'Alex'}
          value={voice[0].name}
          onChange={(e) => setVoice(e.target.value)}
        >
          {voiceOptions}
        </Select>
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
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          disableElevation
        >
          Talk to me
        </Button>
      </form>
    </Box>
  );
};

export default TalkifyForm;
