'use client'
import React from "react";

import styles from "./styles.module.scss";
import { List_Chat_Type } from "@/common/types/message";
import IconChat from "../icons/IconChat";
import { format } from "date-fns";
import classNames from "classnames";

interface Menu_Type extends List_Chat_Type {
  label: string;
  key: string;
  route: string;
}

interface Props {
  menuItems: Menu_Type[];
  onClick?: (e: any) => void;
  selectedKeys?: string;
}

function Menu(props: Props) {
  const { menuItems, onClick, selectedKeys } = props;
  return (
    <div>
      <ul className={styles.list}>
        {menuItems &&
          menuItems.map((menuItem) => {
            return (
              <li
                className={classNames(menuItem.key === selectedKeys ? styles.selected : "")}
                key={menuItem.key}
                onClick={() => onClick?.(menuItem)}
              >
                <div className="flex gap-3 items-center">
                  <IconChat />
                  <span className="truncate">{menuItem.label}</span>
                </div>
                {menuItem.updated_at && (
                  <span className="text-xs">{format(new Date(menuItem.updated_at), "yyyy.MM.dd")}</span>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Menu;
