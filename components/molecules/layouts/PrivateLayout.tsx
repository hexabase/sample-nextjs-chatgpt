'use client'
import spring from "@/utils/spring";
import { animated, useSpring } from "@react-spring/web";
import classNames from "classnames/bind";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const PrivateLayout: React.FC<{ children: any; className?: string }> = ({ children, className }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [springStyles, api] = useSpring(() => spring.FADED);

  return (
    <div className={cx("flex", "private_layout", [className])} suppressHydrationWarning>
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
