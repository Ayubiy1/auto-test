import { Button, Typography } from "antd";
import { useSelector } from "react-redux";

const ContentComp = () => {
  const userActive = useSelector((state) => state?.userActive);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-around">
      <div>
        <h3 className="text-[30px] m-0">E-AVTOMAKTAB </h3>
        <Typography className="text-[30px]">
          Onlayn masofaviy ta'lim platformasi
        </Typography>

        {userActive == true ? (
          <Button type="primary" className="mt-2">
            Sinovni boshlash
          </Button>
        ) : (
          <Button type="primary" className="mt-2">
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
