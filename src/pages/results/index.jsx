import { useContext } from "react";
import Contex from "../../components/contex";
import { useQuery } from "react-query";
import axios from "axios";
import { Col, Row, Typography } from "antd";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Results = () => {
  const { chooseAllAnswer, userId } = useContext(Contex);
  const variantName = useSelector((state) => state.variantName);

  const navigate = useNavigate();

  const { data, isLoading } = useQuery("answers-results", () => {
    return axios.get(`https://auto-test-api-8ch5.onrender.com/test-uz?id=1`);
  });

  return (
    <>
      <div>
        <Row className={"flex items-start  justify-center w-[100%] p-2"}>
          {data?.data?.map((item) => {
            return (
              <div
                className="shadowmd p-2 rounded-sm m-1 w-[100%] md:w-[60%]"
                style={{ border: "1px solid #80808026" }}
                key={item.id}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#4096ff] text-[20px] font-bold">
                    {item?.name}
                  </span>

                  <span
                    className="p-1 shadow-md cursor-pointer text-[11px] rounded-sm"
                    onClick={() => {
                      navigate(`/test/${item?.name}`);
                    }}
                  >
                    Qayta ishlash
                  </span>
                </div>

                <Typography
                  className="my-0.5 text-[#606060]"
                  style={{ fontFamily: "Montserrat,serif !important" }}
                >
                  {item?.tests?.length} tadan 20 tasi ishlandi
                </Typography>

                <div className="mt-2 w-[100%] h-[77vh] overflow-y-scroll">
                  {item.tests?.map((a, indexCh) => {
                    return (
                      <span
                        key={indexCh}
                        className="flex items-center justify-center shadow-lg cursor-pointer rounded-md my-4 py-2"
                        style={{ border: "1px solid #80808026" }}
                      >
                        {a?.question}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Row>
      </div>
    </>
  );
};
export default Results;
