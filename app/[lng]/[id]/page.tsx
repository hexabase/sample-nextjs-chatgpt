'use client';
import PrivateLayout from '@/components/molecules/layouts/PrivateLayout';
import ChatContainer from '@/containers/chat';
import { FC } from 'react';

interface pageProps {
  params: { id: string };
}

const HomePage: FC<pageProps> = ({ params }) => {
  return (
    <PrivateLayout id={params.id}>
      <ChatContainer id={params.id} />
    </PrivateLayout>
  );
};
export default HomePage;
