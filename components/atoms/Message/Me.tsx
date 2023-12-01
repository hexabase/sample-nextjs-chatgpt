'use client'
import { Message_Type } from '@/common/types/message';
import styles from '@/components/atoms/Message/Me.module.scss';
import React from 'react';

interface Props {
  children?: Message_Type['content'];
}

function MyMessage(props: Props, ref: any) {
  return (
    <div>
      <div className={styles.container} ref={ref}>
        <div className={styles.content}>{props.children}</div>
      </div>
      <div className="text-black text-xs text-right mt-1">You</div>
    </div>
  );
}

export default React.forwardRef(MyMessage);
