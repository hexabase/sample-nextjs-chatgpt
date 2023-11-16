import { COOKIES_KEY } from '@/common/constants/cookie';
import { APP_ROUTES } from '@/common/constants/routes';
import type { MenuProps } from 'antd';
import { Button, Layout } from 'antd';
import cx from 'classnames';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './sidebar.module.scss';
import Logo from '@/public/images/logo_sidebar.png';
import avatarDefault from '@/public/images/avatarDefault.png';
import Image from 'next/image';
import Menu from '@/components/atoms/menu';

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

interface ISidebar {
  collapsed: boolean;
  menu: any;
}

const Sidebar: React.FC<ISidebar> = ({ collapsed, menu }) => {
  const { Sider } = Layout;
  const router = useRouter();

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [current, setCurrent] = useState('/');

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick = (e: any) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  useEffect(() => {
    const url = router.query.id;
    const activeMenu = menu.find((item: any) => url && url == item.id);
    console.log(url, menu);
    if (activeMenu) {
      setCurrent(activeMenu.path);
    } else {
      setCurrent('/');
    }
  }, [router.pathname, menu]);

  const handleLogout = () => {
    Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
    router.push(APP_ROUTES.LOGIN);
  };

  return (
    <Sider className={cx(styles.side_bar)} collapsed={collapsed} width={256}>
      <div className="flex flex-col h-full">
        <div className="flex-grow px-5 flex flex-col">
          <div className="mb-6">
            <Button
              onClick={() => router.push('/')}
              size="large"
              className="w-full !text-[#fff] hover:!text-[#fff] hover:!border-[#fff]"
            >
              New Chat
            </Button>
          </div>
          <Menu menuItems={menu} onClick={onClick} selectedKeys={current} />
        </div>
        <div>
          <div className="flex items-center justify-center">
            <Image src={Logo} height={28} alt="logo" />
          </div>
          <div className="h-[1px] border-t-2 border-t-[#fff] my-5"></div>
          <div className="flex items-center justify-center gap-4">
            <Image
              src={avatarDefault}
              className={cx(styles.avatar)}
              width={32}
              height={32}
              alt="logo"
            />
            <span className="text-base text-[#fff]">Test@Hexabase.co.jp</span>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
