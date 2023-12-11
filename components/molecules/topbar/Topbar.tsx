import { COOKIES_KEY } from '@/common/constants/cookie';
import { APP_ROUTES } from '@/common/constants/routes';
import { Layout } from 'antd';
import cx from 'classnames';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './topbar.module.scss';
import { useTopBarStore } from '@/hooks/useTopBar';

const Topbar: React.FC = () => {
  const { title } = useTopBarStore();
  const { Sider } = Layout;
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
    Cookies.remove(COOKIES_KEY.USERNAME);
    Cookies.remove(COOKIES_KEY.EMAIL);
    Cookies.remove(COOKIES_KEY.USER_ID);
    Cookies.remove(COOKIES_KEY.PROFILE_PICTURE);
    router.push(APP_ROUTES.LOGIN);
  };

  return (
    <Sider className={cx(styles.top_bar)} width={'100%'}>
      <div className="flex items-center justify-between font-semibold p-4 h-full">
        <span>{title}</span>
      </div>
    </Sider>
  );
};

export default Topbar;
