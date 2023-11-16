import styles from '@/components/atoms/Message/System.module.scss';
import React from 'react';

interface Props {
  children?: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
}

function SystemMessage(props: Props, ref: any) {
  return (
    <div>
      <div
        ref={ref}
        tabIndex={0}
        onClick={props.onClick}
        className={styles.container}
      >
        <div className={styles.content}>{props.children}</div>
      </div>
      <span className="text-black text-xs">GPT</span>
    </div>
  );
}

export default React.forwardRef(SystemMessage);
