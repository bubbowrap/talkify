import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Talkify</title>
        <meta
          name='description'
          content='Text to speech app using the Web Speech API.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Talkify</h1>
        <p>Don't read. Listen.</p>
      </main>

      <footer>
        Built by{' '}
        <a
          href='https://jeremysamuel.dev'
          target='_blank'
          rel='noopener noreferrer'
        >
          Jeremy Samuel.
        </a>
      </footer>
    </div>
  );
};

export default Home;
