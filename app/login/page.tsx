import { COOKIES_KEY } from "@/common/constants/cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import LoginContainer from '@/containers/login';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function HomePage() {
    const cookieStore = cookies()
    cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)
    if (cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)) {
        redirect(APP_ROUTES.HOME)
    } else {
        return <LoginContainer />
    }
}
