import PrivateLayout from '@/components/molecules/layouts/PrivateLayout';
import ChatContainer from '@/containers/chat';
import withAuthenticationServer from '@/hooks/withAuthentication';
import type { NextPageWithLayout } from '@/pages/_app';
import type { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';

const InquiryPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({}) => {
  return <ChatContainer />;
};

InquiryPage.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export const getServerSideProps: GetServerSideProps = withAuthenticationServer(
  async () => ({
    props: {},
  })
);

export default InquiryPage;
