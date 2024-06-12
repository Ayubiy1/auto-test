import axios from "axios";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { Button, Image, Skeleton } from "antd";
import Typography from "antd/es/typography/Typography";

import "./style.css";

import Images1 from "./Autotest_Images/i.webp";
import Contex from "../../components/contex";
import { setVariantName } from "../../redux/store";
import { useDispatch } from "react-redux";

const Test = () => {
  const { id, variant } = useParams();
  const navigate = useNavigate();
  const diapatch = useDispatch();
  const { userId, setChooseAllAnswer } = useContext(Contex);
  const [choosAnswers, setChoosAnswers] = useState([]);
  const [paginatsion1, setPAgination1] = useState(0);
  const [paginatsion2, setPAgination2] = useState(1);
  const [selectAnswer, setSelectAnswer] = useState([]);

  const { data, isLoading } = useQuery(
    ["tests-uz-data", paginatsion1, paginatsion2],
    () => {
      return axios.get(
        `https://auto-test-api-8ch5.onrender.com/test-uz/?name=${variant}`
      );
    }
  );
  const { data: resultsData } = useQuery(["res-data", variant], () => {
    return axios.get(
      `https://auto-test-api-8ch5.onrender.com/answers/?variantName=${variant}`
    );
  });

  const changeAnswer = (item, test, answer) => {
    setChoosAnswers((prev) => {
      const existingItem = prev?.find((item) => item.testId === test?.id);

      const newAnswer = {
        testId: test?.id,
        answerText: answer?.text,
        answer: answer?.answer,
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

  const resultAdd = ({ choosAnswers, variantName }) => {
    const oldDataRes = resultsData?.data[0];
    const oldDataResAnswr = resultsData?.data[0]?.answers[0];

    const newAnswer = {
      userId: userId,
      variantName: variantName,
      answers: {
        id: 1,
        date: new Date(),
        answr: [choosAnswers ? [...choosAnswers] : []],
      },
    };

    setChooseAllAnswer(choosAnswers);
  };

  const checkResult = (answer, index) => {
    setSelectAnswer((prev) => {
      const existingAnswer = selectAnswer.find(
        (prevAnswer) => prevAnswer.id == index
      );

      if (existingAnswer) {
        return prev;
      } else {
        return [
          ...prev,
          { id: index, text: answer.text, correct: answer.answer },
        ];
      }
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
                <div key={index}>
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
                        navigate("/test/results");
                        diapatch(setVariantName(item?.name));
                      }}
                      disabled={choosAnswers.length < 1 ? true : false}
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
                        {test.choices.map((answer, index) => {
                          console.log(selectAnswer);

                          console.log(
                            selectAnswer !== null
                              ? selectAnswer?.id + "==" + test?.id
                              : "null"
                          );

                          return (
                            <div
                              className={`w-[100%] p-2 my-1 answer`}
                              onClick={() => {
                                changeAnswer(item, test, answer);
                                checkResult(answer, test.id);
                              }}
                              key={index}
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

// import axios from "axios";
// import { useContext, useState } from "react";
// import { useQuery } from "react-query";
// import { useNavigate, useParams } from "react-router";
// import { Button, Image, Skeleton } from "antd";
// import Typography from "antd/es/typography/Typography";

// import "./style.css";

// import Images1 from "./Autotest_Images/i.webp";
// import Contex from "../../components/contex";
// import { setVariantName } from "../../redux/store";
// import { useDispatch } from "react-redux";

// const Test = () => {
//   const { id, variant } = useParams();
//   const navigate = useNavigate();
//   const diapatch = useDispatch();
//   const { userId, setChooseAllAnswer } = useContext(Contex);
//   const [choosAnswers, setChoosAnswers] = useState([]);
//   const [paginatsion1, setPAgination1] = useState(0);
//   const [paginatsion2, setPAgination2] = useState(1);
//   const [selectAnswer, setSelectAnswer] = useState([]);

//   const { data, isLoading } = useQuery(
//     ["tests-uz-data", paginatsion1, paginatsion2],
//     () => {
//       return axios.get(
//         `https://auto-test-api-8ch5.onrender.com/test-uz/?name=${variant}`
//       );
//     }
//   );
//   const { data: resultsData } = useQuery(["res-data", variant], () => {
//     return axios.get(
//       `https://auto-test-api-8ch5.onrender.com/answers/?variantName=${variant}`
//     );
//   });

//   const changeAnswer = (item, test, answer) => {
//     setChoosAnswers((prev) => {
//       const existingItem = prev?.find((item) => item.testId === test?.id);

//       const newAnswer = {
//         testId: test?.id,
//         answerText: answer?.text,
//         answer: answer?.answer,
//       };

//       if (existingItem?.testId !== test?.id) {
//         return [...prev, newAnswer];
//       }
//       if (existingItem?.testId == test?.id) {
//         return [...choosAnswers.filter((i) => i.testId != test?.id), newAnswer];
//       }

//       return prev;
//     });
//   };

//   const resultAdd = ({ choosAnswers, variantName }) => {
//     const oldDataRes = resultsData?.data[0];
//     const oldDataResAnswr = resultsData?.data[0]?.answers[0];

//     const newAnswer = {
//       userId: userId,
//       variantName: variantName,
//       answers: {
//         id: 1,
//         date: new Date(),
//         answr: [choosAnswers ? [...choosAnswers] : []],
//       },
//     };

//     setChooseAllAnswer(choosAnswers);
//   };

//   const checkResult = (answer, index) => {
//     setSelectAnswer((prev) => {
//       const existingAnswer = selectAnswer.find(
//         (prevAnswer) => prevAnswer.id == index
//       );

//       if (existingAnswer) {
//         return prev;
//       } else {
//         return [
//           ...prev,
//           { id: index, text: answer.text, correct: answer.answer },
//         ];
//       }
//     });
//   };

//   return (
//     <>
//       {!isLoading ? (
//         data?.data?.map((item) => {
//           return item?.tests
//             ?.slice(paginatsion1, paginatsion2)
//             .map((test, index) => {
//               return (
//                 <div key={index}>
//                   <div className="flex gap-1 items-center justify-between my3 lg:mt10">
//                     <Button
//                       onClick={() => {
//                         setPAgination1((prev) => prev - 1);
//                         setPAgination2((prev) => prev - 1);
//                       }}
//                       disabled={paginatsion1 < 1}
//                     >
//                       Oldingi test
//                     </Button>

//                     <Button
//                       onClick={() => {
//                         resultAdd({ choosAnswers, variantName: item?.name });
//                         navigate("/test/results");
//                         diapatch(setVariantName(item?.name));
//                       }}
//                       disabled={choosAnswers.length < 1 ? true : false}
//                     >
//                       Yakunlash
//                     </Button>

//                     <Button
//                       onClick={() => {
//                         setPAgination1((prev) => prev + 1);
//                         setPAgination2((prev) => prev + 1);
//                       }}
//                       disabled={paginatsion2 == item?.tests.length}
//                     >
//                       Keyingi test
//                     </Button>
//                   </div>

//                   <div className="mt-5 md:mt-10">
//                     <span className="text-[#0e5cad] sm:text-[20px] md:text-[25px] font-bold">
//                       {test.id})
//                     </span>
//                     <Typography className="flex gap-1 items-center text-[#0e5cad] text-[20px] md:text-[33px] font-bold">
//                       {test.question}
//                     </Typography>

//                     <div className="flex flex-col lg:flex-row items-center justify-between lg:mt-10">
//                       <div className="w-[100%] lg:w-[40%] lg:order-2 flex items-center justify-center mt-3">
//                         <Image
//                           src={
//                             test?.media?.name
//                               ? `https://github.com/Ayubiy1/test-auto-imgs/blob/main/${test?.media?.name}.png?raw=true`
//                               : Images1
//                           }
//                           alt=""
//                         />
//                       </div>

//                       <div className="mt-3 w-[100%] lg:w-[60%]">
//                         {test.choices.map((answer, index) => {
//                           console.log(selectAnswer);

//                           console.log(
//                             selectAnswer !== null
//                               ? selectAnswer?.id + "==" + test?.id
//                               : "null"
//                           );

//                           return (
//                             <div
//                               className={`w-[100%] p-2 my-1 answer ${
//                                 selectAnswer[test.id - 1]?.id === test?.id &&
//                                 selectAnswer[test.id - 1]?.text ==
//                                   answer.text &&
//                                 answer?.answer == true
//                                   ? "bg-green-500"
//                                   : selectAnswer[test.id - 1]?.id ===
//                                       test?.id &&
//                                     selectAnswer[test.id - 1]?.text ==
//                                       answer.text &&
//                                     answer?.answer !== true
//                                   ? "bg-red-700"
//                                   : "bg-[#80808014]"
//                               }`}
//                               // ${
//                               //   selectAnswer[test.id - 1]?.id == test?.id &&
//                               //   selectAnswer[test.id - 1]?.text ==
//                               //     answer.text &&
//                               //   selectAnswer[test.id - 1]?.correct == false
//                               //     ? //  &&selectAnswer[test.id - 1]?.answer == true
//                               //       "bg-red-500"
//                               //     : selectAnswer[test.id - 1]?.correct &&
//                               //       selectAnswer[test.id - 1]?.text ===
//                               //         answer.text
//                               //     ? "bg-green-700"
//                               //     : "bg-[#80808014]"
//                               // }

//                               // style={{
//                               //   backgroundColor:
//                               //     selectAnswer[test.id - 1]?.id === test?.id &&
//                               //     selectAnswer[test.id - 1]?.text == answer.text
//                               //       ? "white"
//                               //       : selectAnswer[test.id - 1]?.correct &&
//                               //         selectAnswer[test.id - 1]?.text ===
//                               //           answer.text
//                               //       ? "green"
//                               //       : "red",
//                               // }}
//                               onClick={() => {
//                                 changeAnswer(item, test, answer);
//                                 checkResult(answer, test.id);
//                               }}
//                               key={index}
//                             >
//                               <Typography className="font-bold">
//                                 {answer.text}
//                               </Typography>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             });
//         })
//       ) : (
//         <div>
//           <div className="mt-5 md:mt-10">
//             <Skeleton.Button
//               active={true}
//               size={"large"}
//               shape="default"
//               block={true}
//             />
//             <div className="flex flex-col lg:flex-row items-center justify-between lg:mt-10">
//               <div className="w-[100%] lg:w-[40%] lg:order-2 flex items-center justify-center mt-3">
//                 <Skeleton.Image
//                   active={true}
//                   style={{ width: "400px", height: "200px" }}
//                 />
//               </div>

//               <div className={`w-[100%] p-2 my-1`}>
//                 <Skeleton active />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Test;
