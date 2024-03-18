import { Typography } from "antd";
import axios from "axios";
import { useQuery } from "react-query";

const Tests = () => {
  const { data } = useQuery("tests-uz-data", () => {
    return axios.get(`http://localhost:3004/test-uz`);
  });

  return (
    <>
      <div>
        {data?.data.slice(0, 10).map((test, index) => {
          return (
            <div key={index}>
              {test?.id}
              <Typography>{test?.question}</Typography>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tests;
