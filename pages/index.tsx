import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Typography, Link } from '@mui/material';
import TalkifyForm from 'components/TalkifyForm';
import Footer from 'components/Footer';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Talkify</title>
        <meta
          name='description'
          content='Text to speech app using the Web Speech API.'
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container component='main' maxWidth='md' sx={{ mt: 4, mb: 8 }}>
        <Typography component='h1' variant='h1' align='center' color='primary'>
          Talkify
        </Typography>
        <Typography
          align='center'
          color='textSecondary'
          lineHeight='1.25'
          sx={{ fontSize: 20, mt: 3, mb: 4 }}
        >
          Browser-based text-to-speech app because reading is for nerds.
        </Typography>
        <TalkifyForm />
      </Container>
      <Footer>
        Built by{' '}
        <Link
          href='https://jeremysamuel.dev'
          target='_blank'
          rel='noopener noreferrer'
        >
          Jeremy Samuel
        </Link>
        .
      </Footer>
    </div>
  );
};

export default Home;
