'use client'
import { COOKIES_KEY } from "@/common/constants/cookie";
import { APP_ROUTES } from "@/common/constants/routes";
import Menu from "@/components/atoms/menu";
import { useListConversation, useListConversationStore } from "@/hooks/useConversationHook";
import Logo from "@/public/images/logo_sidebar.png";
import type { MenuProps } from "antd";
import { Button, Layout } from "antd";
import cx from "classnames";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./sidebar.module.scss";


// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

interface ISidebar {
  collapsed: boolean;
}

const Sidebar: React.FC<ISidebar> = ({ collapsed }) => {
  const { Sider } = Layout;
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const id = searchParams.get('id')

  const { listData, setListData } = useListConversationStore();
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [current, setCurrent] = useState("/");

  const firstLoad = useMemo(async () => {
    const lstConversationApi = await useListConversation();
    setListData(lstConversationApi);
  }, []);

  const lstConversation = useMemo(() => {
    if (listData) {
      const convertedListData = listData.map((item) => {
        const objMenu = {
          ...item,
          label: item.title,
          key: item.id,
          route: item.id,
        };
        return objMenu;
      });
      return [
        ...convertedListData,
      ];
    } else return [];
  }, [listData]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
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
    const url = id;
    const activeMenu = listData.find((item: any) => url && url == item.id);
    if (activeMenu) {
      setCurrent(activeMenu.id);
    } else {
      setCurrent("/");
    }
  }, [pathname, listData]);

  const handleLogout = () => {
    Cookies.remove(COOKIES_KEY.ACCESS_TOKEN);
    Cookies.remove(COOKIES_KEY.USERNAME);
    Cookies.remove(COOKIES_KEY.EMAIL);
    Cookies.remove(COOKIES_KEY.USER_ID);
    Cookies.remove(COOKIES_KEY.PROFILE_PICTURE);
    router.push(APP_ROUTES.LOGIN);
  };

  return (
    <Sider className={cx(styles.side_bar)} collapsed={collapsed} width={256}>
      <div className="flex flex-col h-full">
        <div className="flex-grow px-5 flex flex-col overflow-x-auto">
          <div className="mb-6">
            <Button
              onClick={() => router.push("/")}
              size="large"
              className="w-full !text-[#fff] hover:!text-[#fff] hover:!border-[#fff]"
            >
              New Chat
            </Button>
          </div>
          <Menu menuItems={lstConversation} onClick={onClick} selectedKeys={current} />
        </div>
        <div>
          <div className="flex items-center justify-center">
            <Image src={Logo} height={28} alt="logo" />
          </div>
          <div className="h-[1px] border-t-2 border-t-[#fff] my-5"></div>
          <div className="flex items-center justify-center gap-4">
            <Image
              src={Cookies.get(COOKIES_KEY.PROFILE_PICTURE) ?? ""}
              className={cx(styles.avatar)}
              width={32}
              height={32}
              alt="logo"
            />
            <span className="text-base text-[#fff]">{Cookies.get(COOKIES_KEY.EMAIL)}</span>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
