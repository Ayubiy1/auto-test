import { useContext } from "react";
import Contex from "../../components/contex";
import { useQuery } from "react-query";
import axios from "axios";
import Typography from "antd/es/typography/Typography";
import { Col, Row } from "antd";
import { useNavigate } from "react-router";

const Results = () => {
  const { setChooseAllAnswer, chooseAllAnswer, userId } = useContext(Contex);

  const navigate = useNavigate();

  const { data } = useQuery("", () => {
    return axios.get("http://localhost:3004/answers");
  });

  return (
    <>
      <div>
        <Row className={"flex items-start  justify-center  p-2"}>
          {data?.data
            ?.filter((i) => i?.userId == userId)
            .map((item, index) => {
              return (
                <Col
                  span={12}
                  xs={{ span: 20 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 6 }}
                  key={index}
                >
                  <div
                    className="shadowmd p-2 rounded-sm m-1"
                    style={{ border: "1px solid #80808026" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[#4096ff] text-[14px] font-bold">
                        {item?.variantName}
                      </span>

                      <span
                        className="p-1 shadow-md cursor-pointer text-[11px] rounded-sm"
                        onClick={() => {
                          navigate(`/test/${item?.variantName}`);
                        }}
                      >
                        Qayta ishlash
                      </span>
                    </div>

                    <Typography
                      className="my-0.5 text-[#606060]"
                      style={{ fontFamily: "Montserrat,serif !important" }}
                    >
                      20 tadan {item?.answers.length}tasi ishlandi
                    </Typography>

                    <div className="flex items-center justify-center">
                      {item?.answers?.map((a, indexCh) => {
                        return (
                          <span
                            key={indexCh}
                            className="w-[50px] h-[30px] flex items-center justify-center shadowlg cursor-pointer rounded-md mx-1"
                            style={{ border: "1px solid #80808026" }}
                          >
                            {indexCh + 1}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
};
export default Results;
