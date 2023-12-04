'use client';
import PrivateLayout from '@/components/molecules/layouts/PrivateLayout';
import HomeContainer from '@/containers/home';

export default async function HomePage() {
  return (
    <PrivateLayout>
      <HomeContainer />
    </PrivateLayout>
  );
}
