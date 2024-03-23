import { useContext } from "react";
import Contex from "../../components/contex";

const Results = () => {
  const { setChooseAllAnswer, chooseAllAnswer } = useContext(Contex);
  console.log(chooseAllAnswer);

  return <>Results</>;
};
export default Results;
