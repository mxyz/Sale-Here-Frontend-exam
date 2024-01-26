import { ChangeEvent, KeyboardEvent, useCallback } from "react";

export interface IPropsMessageInput {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onEnter?: () => void;
}

const MessageInput = (props: IPropsMessageInput) => {
  const { value, onChange, onEnter } = props;

  const onPressEnter = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.shiftKey === false) {
        onEnter?.();
        event.preventDefault();
      }
    },
    [onEnter]
  );

  return (
    <div className="relative h-[54px]">
      <textarea
        className="w-full text-left text-24 border-solid border-lightgray border-[3px] rounded-[10px] text-[#4e4e4e] resize-none"
        value={value}
        onChange={onChange}
        onKeyDown={onPressEnter}
      />
      <div className="absolute text-[12px] text-[#6f6f6f] right-[8px] bottom-[0px]">
        Enter เพื่อส่ง
      </div>
    </div>
  );
};

export default MessageInput;
