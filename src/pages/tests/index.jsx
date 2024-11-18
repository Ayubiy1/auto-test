import { Col, Row, Skeleton, Typography } from "antd";
import { useQuery } from "react-query";

import { FaRegHeart } from "react-icons/fa";

import { useNavigate } from "react-router";
import axios from "axios";
import "./style.css";
import { useEffect } from "react";

const Tests = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user-token")
    if (!token) {
      setTimeout(() => {
        navigate("/")
      }, 2000)
    }
  })

  const { data, isLoading, isError } = useQuery("tests-uz-data", () => {
    return axios.get(`https://auto-test-api-8ch5.onrender.com/test-uz`);
  });

  return (
    <>
      <Row className={"flex items-start  justify-center  p-2"}>
        {isLoading == false &&
          data?.data?.map((item) => {
            return (
              <Col
                span={12}
                xs={{ span: 20 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xl={{ span: 6 }}
                key={item?.id}
                className="card p-2"
              >
                <div
                  className="m-1 shadow-lg rounded-md h-[111px] cursor-pointer flex items-center p-5"
                  onClick={() => {
                    navigate(`/test/${item?.name}`);
                    // /${item?.id}
                  }}
                >
                  <div className="w-[100%] cards">
                    <span className="text-[#4096ff] text-[14px] font-bold">
                      {item?.name}
                    </span>
                    <Typography
                      className="my-0.5 text-[#606060]"
                      style={{ fontFamily: "Montserrat,serif !important" }}
                    >
                      25 dona test •{item?.done} martaba ishlangan
                    </Typography>

                    <div className="flex items-center justify-between w-[100%]">
                      <Typography
                        className="text-[11px] font-bold text-[#0c7efa] px-2 rounded-sm inline-block"
                        style={{ background: "rgba(3, 89, 255, 0.16)" }}
                      >
                        Auto Test
                      </Typography>

                      <span>
                        <FaRegHeart />
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
      </Row>

      <Row className="flexitems-center justify-center">
        {(isError == true || isLoading) && (
          <>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
            <Col
              span={12}
              xs={{ span: 20 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              className="card p-2"
            >
              <div className="m-1 shadow-lg rounded-md h[111px] cursor-pointer flex items-center p-5">
                <Skeleton active={true} />
              </div>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default Tests;
