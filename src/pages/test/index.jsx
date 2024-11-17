import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router";
import { Button, Image, Modal, Skeleton, Typography } from "antd";
import "./style.css";
import Images1 from "./Autotest_Images/i.webp";
import Contex from "../../components/contex";

const Test = () => {
  const { id, variant } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const { userId, setChooseAllAnswer } = useContext(Contex);
  const [finishTimeM, setFinishTimeM] = useState(5);
  const [finishTimeS, setFinishTimeS] = useState(0);
  const [choosAnswers, setChoosAnswers] = useState([]);
  const [paginatsion1, setPAgination1] = useState(0);
  const [paginatsion2, setPAgination2] = useState(1);
  const [selectAnswer, setSelectAnswer] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const date = new Date();
  const formattedDateTime = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  console.log(formattedDateTime);



  const { mutate } = useMutation((hData) => {
    return axios.post("http://localhost:3004/historys", hData)
    // return axios.post("https://auto-test-api-8ch5.onrender.com/historys", hData)
  }, {
    onSuccess: () => {
    }
  })
  const { data: historysData } = useQuery("history-data", () => {
    return axios.get("https://auto-test-api-8ch5.onrender.com/historys")
  })
  const { data: historyData } = useQuery("history-data", () => {
    return axios.get(`https://auto-test-api-8ch5.onrender.com/historys?userId=${userId}`)
  })
  // this is tests data to find test the selected test name
  const { data, isLoading } = useQuery(
    ["tests-uz-data", paginatsion1, paginatsion2],
    () =>
      axios.get(
        `https://auto-test-api-8ch5.onrender.com/test-uz/?name=${variant}`
      )
  );

  useEffect(() => {
    // if (!historysData) return; // historysData mavjudligini tekshiramiz
    const interval = setInterval(() => {
      setFinishTimeS((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else if (finishTimeM > 0) {
          setFinishTimeM((prevM) => prevM - 1);
          return 59;
        } else {
          setIsFinished(true);
          clearInterval(interval);
          return 0;
        }
      });
    }, 50);
    return () => clearInterval(interval);
  }, [finishTimeM, finishTimeS]);

  useEffect(() => {
    if (Object.keys(selectAnswer).length !== 0) {
      const userExists = historysData?.data?.find((hItem) => hItem.userId = userId);


      const dataa = {
        userId,
        complated: selectAnswer,
        variantName: "1-variant",
        foundedCount: Object.keys(selectAnswer).length,
        doneBefore: !userExists ? false : true,
        date: formattedDateTime
      };


      mutate(dataa);
    }
  }, [isFinished])

  const changeAnswer = (test, answer) => {
    if (!selectAnswer[test.id]) {
      setChoosAnswers((prev) => [
        ...prev,
        { testId: test.id, answerText: answer.text, answer: answer.answer },
      ]);

      setSelectAnswer((prev) => ({
        ...prev,
        [test.id]: answer.text,
      }));
    }
  };
  const resultAdd = ({ choosAnswers, variantName }) => {
    setChooseAllAnswer(choosAnswers);
  };

  return (
    <>
      {!isLoading ? (
        data?.data?.map((item) =>
          item?.tests?.slice(paginatsion1, paginatsion2).map((test, index) => (
            <div key={index}>
              <div className="flex gap-1 items-center justify-between my-3 lg:mt-10">
                <Button
                  onClick={() => {
                    setPAgination1(paginatsion1 - 1);
                    setPAgination2(paginatsion2 - 1);
                  }}
                  disabled={paginatsion1 < 1 || finishTimeM == 0}
                >
                  Oldingi test
                </Button>
                <Button onClick={()=>{
                  prematureTermination()
                }}
                 >
                  {finishTimeM}:{finishTimeS < 10 ? 0 : ""}
                  {finishTimeS}
                </Button>
                <Button
                  onClick={() => {
                    setPAgination1(paginatsion1 + 1);
                    setPAgination2(paginatsion2 + 1);
                  }}
                  disabled={paginatsion2 === item?.tests.length || finishTimeM == 0}
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
                    {test.choices.map((answer, index) => (
                      <div
                        className={`w-[100%] p-2 my-1 answer ${selectAnswer[test.id] === answer.text && answer.answer
                          ? "bg-green-500"
                          : selectAnswer[test.id] === answer.text
                            ? "bg-red-600 text-white"
                            : "bg-[#80808014]"
                          } ${isFinished == true
                            ? "cursor-no-drop"
                            : "cursor-pointer"
                          }`}
                        onClick={() => {
                          if (!isFinished || finishTimeM == 0) {
                            changeAnswer(test, answer);
                          }
                        }}
                        key={index}
                      >
                        <Typography className="font-bold">
                          {answer.text}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div >
          ))
        )
      ) : (
        <div>
          <div className="mt-5 md:mt-10">
            <Skeleton.Button active size="large" shape="default" block />
            <div className="flex flex-col lg:flex-row items-center justify-between lg:mt-10">
              <div className="w-[100%] lg:w-[40%] lg:order-2 flex items-center justify-center mt-3">
                <Skeleton.Image
                  active
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

      <Modal title="Javoblar" centeredx onCancel={() => {
        setIsFinished(false)
      }} footer={false} open={isFinished}>
        {data?.data?.map((item) => {
          return (
            <>
              <span>
                {item?.tests.length} ta savoldan {choosAnswers?.length} tasini
                bajardingiz
              </span>

              <div className="flex flex-col items-start">
                <span className="">
                  {choosAnswers.filter((chA) => chA?.answer == true).length}tasi
                  to'g'ri
                </span>
                <span className="">
                  {choosAnswers.filter((chA) => chA?.answer == false).length}
                  tasi noto'g'ri
                </span>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  onClick={() => {
                    navigate("/tests");
                  }}
                  type="primary"
                >
                  Orqaga qaytish
                </Button>
              </div>
            </>
          );
        })}
      </Modal>
    </>
  );
};
export default Test;

// const { mutate: mutateHistoryPut } = useMutation(
//   (hData) => {
//     return axios.put(`https://auto-test-api-8ch5.onrender.com/historys/${hData.userId}`, hData);
//   },
//   {
//     onSuccess: () => {
//       queryClient.invalidateQueries("history-data");
//     },
//     onError: (error) => {
//     }
//   }
// );