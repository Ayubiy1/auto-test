import { useContext } from "react";
import Contex from "../../components/contex";
import { useQuery } from "react-query";
import axios from "axios";

const Results = () => {
  const { setChooseAllAnswer, chooseAllAnswer } = useContext(Contex);

  const { data } = useQuery("", () => {
    return axios.get("http://localhost:3004/answers");
  });

  console.log(data?.data);

  return (
    <>
      <div>
        <div className="flex items-center">
          {chooseAllAnswer?.map((item, index) => {
            return (
              <span
                key={index}
                className="w-[50px] h-[50px] flex items-center justify-center shadow-lg cursor-pointer rounded-full mx-1"
              >
                {index + 1}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Results;
