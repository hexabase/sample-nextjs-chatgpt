import React, { useEffect, useState } from "react";
// import "antd/dist/antd.css";
import { Table } from "antd";

const CustomTable: React.FC<{
  columns: any[];
  data: any[];
  isShowTotal?: boolean;
  showSizeChanger?: any;
  tableName?: any;
  rowKey?: any;
  showQuickJumper?: any;
  pagination?: any;
  position?: any;
  //   scroll?: any;
  setPage?: any;
  setLimit?: any;
  onChange?: any;
}> = ({
  columns,
  data,
  isShowTotal,
  showSizeChanger,
  tableName,
  rowKey,
  showQuickJumper,
  pagination,
  position,
  //   scroll = false,
  setPage,
  setLimit,
  onChange,
}) => {
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setDataSource(data);
    }
  }, [data]);

  return (
    <div>
      {data && data.length > 0 ? (
        <Table
          className={"antd-custom-table"}
          columns={columns}
          rowKey={(record, index) => (tableName ? tableName + "-" : "") + index}
          pagination={{
            showSizeChanger: showSizeChanger ? true : false,
            showQuickJumper: showQuickJumper ? true : false,
            pageSize: pagination ? pagination.limit : 10,
            current: pagination ? pagination.page : 1,
            total: pagination ? pagination.total : data ? data.length : 0,
            // showTotal: (total, range) => {
            //   if (isShowTotal) {
            //     return `Hiển thị ${range[0]}-${range[1]} trong ${pagination ? pagination.total : total} kết quả`;
            //   }
            // },
            pageSizeOptions: ["10", "20", "50"],
            position: [position ? position : "bottomRight"],
            size: "default",
            onChange: (pNumber, pSize) => {
              if (pagination.limit) setLimit(pSize);
              if (pagination.page) setPage(pNumber);
            },
          }}
          onChange={onChange}
          //   scroll={scroll ? { x: scroll ? scroll.x : "hidden", y: scroll ? scroll.y : "hidden" } : false}
          dataSource={dataSource}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CustomTable;
