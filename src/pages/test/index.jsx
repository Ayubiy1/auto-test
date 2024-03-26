import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { Button, Image, Skeleton } from "antd";
import Typography from "antd/es/typography/Typography";

import "./style.css";

import Images1 from "./Autotest_Images/i.webp";
import Contex from "../../components/contex";

const Test = () => {
  const { id, variant } = useParams();
  const navigate = useNavigate();
  const { setChooseAllAnswer, userId, setUserId } = useContext(Contex);

  const [choosAnswers, setChoosAnswers] = useState([]);

  const [chooseAnswer, setChooseAnswer] = useState("0");
  const [paginatsion1, setPAgination1] = useState(0);
  const [paginatsion2, setPAgination2] = useState(1);
  const [variantName, setVariantName] = useState("");

  const { data, isLoading } = useQuery(
    ["tests-uz-data", paginatsion1, paginatsion2],
    () => {
      return axios.get(`http://localhost:3004/test-uz/?name=${variant}`);
    }
  );
  const { mutate } = useMutation(
    (newData) => {
      return axios.post(`http://localhost:3004/answers`, newData);
    },
    {
      onSuccess: (response) => {
        navigate(`/test/results`);
      },
      onError: (response) => {
        console.log("error");
      },
    }
  );

  const resultAdd = ({ choosAnswers, variantName }) => {
    setVariantName(variantName);

    const newAnswer = {
      userId: userId,
      variantName: variantName,
      answers: choosAnswers ? [...choosAnswers] : [],
    };
    console.log(newAnswer);

    if (choosAnswers) {
      mutate(newAnswer);
    }
  };

  const changeAnswer = (item, test, answer) => {
    setChooseAnswer(answer?.text);

    setChoosAnswers((prev) => {
      const existingItem = prev?.find((item) => item.testId === test?.id);

      const newAnswer = {
        testId: test?.id,
        answerText: answer?.text,
      };

      if (existingItem?.testId !== test?.id) {
        return [...prev, newAnswer];
      }
      if (existingItem?.testId == test?.id) {
        return [...choosAnswers.filter((i) => i.testId != test?.id), newAnswer];
      }

      return prev;
    });
  };

  return (
    <>
      {!isLoading ? (
        data?.data?.map((item) => {
          return item?.tests
            ?.slice(paginatsion1, paginatsion2)
            .map((test, index) => {
              return (
                <div key={test.id}>
                  <div className="flex gap-1 items-center justify-between my3 lg:mt10">
                    <Button
                      onClick={() => {
                        setPAgination1((prev) => prev - 1);
                        setPAgination2((prev) => prev - 1);
                      }}
                      disabled={paginatsion1 < 1}
                    >
                      Oldingi test
                    </Button>

                    <Button
                      onClick={() => {
                        resultAdd({ choosAnswers, variantName: item?.name });
                      }}
                    >
                      Yakunlash
                    </Button>

                    <Button
                      onClick={() => {
                        setPAgination1((prev) => prev + 1);
                        setPAgination2((prev) => prev + 1);
                      }}
                      disabled={paginatsion2 == item?.tests.length}
                    >
                      Keyingi test
                    </Button>
                  </div>

                  <div className="mt-5 md:mt-10">
                    <span className="text-[#0e5cad] sm:text-[20px] md:text-[25px] font-bold">
                      {test.id})
                    </span>
                    <Typography className="flex gap-1 items-center text-[#0e5cad] text-[20px] md:text-[33px] font-bold">
                      {test.question}
                    </Typography>

                    <div className="flex flex-col lg:flex-row items-center justify-between lg:mt-10">
                      <div className="w-[100%] lg:w-[40%] lg:order-2 flex items-center justify-center mt-3">
                        <Image
                          src={
                            test?.media?.name
                              ? `https://github.com/Ayubiy1/test-auto-imgs/blob/main/${test?.media?.name}.png?raw=true`
                              : Images1
                          }
                          alt=""
                        />
                      </div>

                      <div className="mt-3 w-[100%] lg:w-[60%]">
                        {test.choices.map((answer) => {
                          const isSelected = choosAnswers.some(
                            (item) =>
                              item.testId === test.id &&
                              item.answerText === answer.text
                          );

                          return (
                            <div
                              className={`w-[100%] p-2 my-1 answer ${
                                chooseAnswer === answer.text
                                  ? "text-white bg-yellow-300"
                                  : isSelected
                                  ? "bg-yellow-300"
                                  : "bg-[#80808014]"
                              }`}
                              onClick={() => {
                                changeAnswer(item, test, answer);
                              }}
                              key={answer.text}
                            >
                              <Typography className="font-bold">
                                {answer.text}
                              </Typography>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            });
        })
      ) : (
        <div>
          <div className="mt-5 md:mt-10">
            <Skeleton.Button
              active={true}
              size={"large"}
              shape="default"
              block={true}
            />
            <div className="flex flex-col lg:flex-row items-center justify-between lg:mt-10">
              <div className="w-[100%] lg:w-[40%] lg:order-2 flex items-center justify-center mt-3">
                <Skeleton.Image
                  active={true}
                  style={{ width: "400px", height: "200px" }}
                />
              </div>

              <div className={`w-[100%] p-2 my-1`}>
                <Skeleton active />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Test;
