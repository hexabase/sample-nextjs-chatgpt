'use client';
import PrivateLayout from '@/components/molecules/layouts/PrivateLayout';
import HomeContainer from '@/containers/home';
import { useTranslation } from '@/utils/i18n/client';

export default function HomePage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = useTranslation(lng, 'common');
  return (
    <PrivateLayout>
      <HomeContainer />
    </PrivateLayout>
  );
}
