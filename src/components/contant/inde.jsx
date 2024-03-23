import { Button, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ContentComp = () => {
  const userActive = useSelector((state) => state?.userActive);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-around">
      <div>
        <h3 className="text-[30px] m-0">E-AVTOMAKTAB </h3>
        <Typography className="text-[30px]">
          Onlayn masofaviy ta'lim platformasi
        </Typography>

        {userActive == true ? (
          <Button
            onClick={() => {
              navigate("/tests");
            }}
            type="primary"
            className="mt-2"
          >
            Sinovni boshlash
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/tests");
            }}
            type="primary"
            className="mt-2"
          >
            Tizimga kirish
          </Button>
        )}
      </div>
      <img
        src="https://e-avtomaktab.uz/Vesperr/assets/img/e-avto2.svg"
        className="w-[70%] lg:w-[40%]"
      />
    </div>
  );
};

export default ContentComp;
