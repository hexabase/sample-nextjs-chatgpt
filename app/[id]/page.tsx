import { COOKIES_KEY } from "@/common/constants/cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import PrivateLayout from "@/components/molecules/layouts/PrivateLayout";
import ChatContainer from "@/containers/chat";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { FC } from "react";

interface pageProps {
    params: { id: string }
}

const HomePage: FC<pageProps> = ({ params }) => {
    const cookieStore = cookies()
    cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)
    if (!cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)) {
        redirect(APP_ROUTES.LOGIN)
    } else {
        return <PrivateLayout>
            <ChatContainer id={params.id} />
        </PrivateLayout>
    }
}
export default HomePage

// export default async function HomePage() {
//     const cookieStore = cookies()
//     cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)
//     if (!cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)) {
//         redirect(APP_ROUTES.LOGIN)
//     } else {
//         return <PrivateLayout>
//             <ChatContainer />
//         </PrivateLayout>
//     }
// }

