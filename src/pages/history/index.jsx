import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import Contex from "../../components/contex";
import { Table, Tag } from "antd";

const History = () => {
  const { userId } = useContext(Contex)

  const { data } = useQuery("history-data", () => {
    return axios.get(`https://auto-test-api-8ch5.onrender.com/historys?userId=${userId}`)
  })

  const date = new Date();
  const formattedDateTime = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;



  const columns = [
    {
      title: 'Variant nomi',
      dataIndex: 'variantName',
      key: 'variantName',
      render: (text, item) => <Tag color={item?.doneBefore == true ? "yellow" : "green"}>{text}</Tag>,
    },
    {
      title: 'Ishlangan soni',
      dataIndex: 'foundedCount',
      key: 'foundedCount',
    },
    {
      title: 'Ishlangan sana',
      dataIndex: 'date',
      key: 'date',
    },
  ]
  return <>
    <Table columns={columns} dataSource={data?.data}
      className="lg:w-[80%] mx-auto"
    />
  </>;
};

export default History;
