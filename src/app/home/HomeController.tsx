import React, { ChangeEvent, useCallback, useState } from "react";
import Input from "../../components/Input";
import Typography, { TYPOGRAPHY_TYPES } from "../../components/Typography";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";


const HomeController = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const onChangeUserName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const valueToSet = event.target.value;
      setUserName(valueToSet)
    },
    [],
  );

  const onClickGotoLandingPage = useCallback(()=>{
    if(!!userName) {
      return navigate(`/landing/${userName}`)
    }
  },[navigate, userName])

  // background color #ffffff
  // radius 20px
  // height 90vh
  return (
    <div className="w-full flex flex-col items-center py-16 space-y-8">
          <Typography typography={TYPOGRAPHY_TYPES.TITLE}>ชื่อของคุณ</Typography>
          <Input value={userName} onChange={onChangeUserName} />
          {userName && <Button onClick={onClickGotoLandingPage}>ยืนยัน</Button>}
    </div>
  );
};
export default HomeController;
