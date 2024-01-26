import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Typography, { TYPOGRAPHY_TYPES } from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";

const CreateAndJoinRoomController = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const { userName } = useParams();
  const [chatRoomName, setChatRoomName] = useState("");
  const onChangeRoomName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setChatRoomName(event.target.value);
    },
    []
  );

  const action = useMemo(() => {
    const action = pathname.split("/").pop();
    return action;
  }, [pathname]);

  const labels = useMemo(() => {
    return action === "join"
      ? { title: "เข้าร่วมแชท", submitButton: "เข้าร่วม" }
      : { title: "สร้างห้องใหม่", submitButton: "ยืนยัน" };
  }, [action]);

  const onClickBack = useCallback(() => {
    navigator(-1);
  }, [navigator]);

  const onClickSubmit = useCallback(() => {
    navigator(`/chat-room/${chatRoomName}/user/${userName}`);
  }, [chatRoomName, navigator, userName]);

  return (
    <div className="w-full flex flex-col items-center">
      <Typography typography={TYPOGRAPHY_TYPES.TITLE}>
        {labels.title}
      </Typography>
      <section
        className="flex flex-col items-center space-y-4"
        id="form-section"
      >
        <Input
          onChange={onChangeRoomName}
          value={chatRoomName}
          placeholder="ชื่อห้อง"
        />
        <section className="flex space-x-4" id="buttons-section">
          <Button className="text-[24px]" onClick={onClickBack} outline>
            กลับ
          </Button>
          <Button className="text-[24px]" onClick={onClickSubmit}>
            {labels.submitButton}
          </Button>
        </section>
      </section>
    </div>
  );
};
export default CreateAndJoinRoomController;
