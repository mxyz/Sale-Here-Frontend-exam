import classNames from "classnames";

export interface IPropsChatBox {
  sender: string;
  message: string;
  owned?: boolean;
}

const ChatBox = (props: IPropsChatBox) => {
  const { sender, message, owned } = props;
  return (
    <div
      className={classNames("my-3 rounded py-3 text-white ", {
        "self-end": owned,
      })}
    >
      <div className="flex items-center">
        <div className="">
          {!owned && (
            <div className="text-sm font-medium leading-5 text-gray-400">
              คุณ {sender}
            </div>
          )}
          <div
            className={classNames(
              "px-4 py-2 rounded-[12px] text-[18px] text-black bg-[#ebebeb]",
              { "ml-2": !owned }
            )}
          >
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
