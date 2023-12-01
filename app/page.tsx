import { COOKIES_KEY } from "@/common/constants/cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import PrivateLayout from "@/components/molecules/layouts/PrivateLayout";
import HomeContainer from '@/containers/home';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const cookieStore = cookies()
  cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)
  if (!cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)) {
    redirect(APP_ROUTES.LOGIN)
  } else {
    return <PrivateLayout>
      <HomeContainer />
    </PrivateLayout>
  }
}
