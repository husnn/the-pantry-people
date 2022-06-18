import type { NextPage } from 'next';
import Head from 'next/head';
import useAuthentication from '../modules/auth/useAuthentication';

const Home: NextPage = () => {
  useAuthentication(true, true);

  return (
    <div>
      <Head>
        <title>The Pantry People</title>
        <meta
          name="description"
          content="Helping food banks better connect with their community."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
