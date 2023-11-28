import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useUser } from "@/hooks/useUser";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { useSpring, animated } from "@react-spring/web";
import spring from "@/utils/spring";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useStore";
import { compareDesc } from "date-fns";

const cx = classNames.bind(styles);

const PrivateLayout: React.FC<{ children: any; className?: string }> = ({ children, className }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [springStyles, api] = useSpring(() => spring.FADED);
  // useUser();
  const listChat = useAppSelector((state) => state.listChat.values);

  const router = useRouter();

  // // create menu items sidebar
  // const menuLeft: any = useMemo(() => {
  //   const newMenu = [...listChat];
  //   return newMenu
  //     ?.sort((a, b) => compareDesc(new Date(a.updated_at), new Date(b.updated_at)))
  //     ?.map((item) => ({
  //       label: item.title,
  //       key: item.path,
  //       route: item.path,
  //       ...item,
  //     }));
  // }, [listChat]);

  useEffect(() => {
    api.start(spring.FADED);
    return () => {
      api.stop();
    };
  }, [api, router.pathname]);

  return (
    <div className={cx("flex", "private_layout", [className])}>
      <Sidebar collapsed={collapsed} />
      <div className="flex-1">
        <div className={cx("private_layout_content")}>
          <div className={cx("scroll_private_layout_content", "bg-white", "min-h-full", "h-full")}>
            <animated.div className="h-full" style={springStyles}>
              {children}
            </animated.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
