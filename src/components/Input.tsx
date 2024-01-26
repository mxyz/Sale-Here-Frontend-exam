import classNames from 'classnames';
import { CSSProperties, ChangeEventHandler } from 'react';


export interface IInputProps {

  /**  name of input element */
  name?: string;

  /** id of input element */
  id?: string;

  /** type of input element
   * default = "text"
   * */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search';

  placeholder?: string;

  disabled?: boolean;

  /** custom inline style of input element */
  style?: CSSProperties;

  value?: string | number;
  onChange?: ChangeEventHandler<Element>;

  /** limit input length */
  maxLength?: number;

  className?: string;

}

const defaultProps = {
  name: undefined,
  // options: undefined,
  id: undefined,
  placeholder: undefined,
  style: undefined,
  value: undefined,
  maxLength: undefined,
  invalid: false,
  type: 'text',
  disabled: false,
  className: undefined,
};

const Input = (props: IInputProps) => {
  const { className, id, maxLength, name,onChange } = props;
  const { placeholder, type, style, value, disabled } = props;
//     height 60px
//     color #4e4e4e
//     border 3px solid lightgray
//     radius 10px
//     font size 34px
  return (
    <input
      className={classNames(
        'border-solid border-lightgray border-[3px] rounded-[10px] h-[60px] text-[34px] text-[#4e4e4e] text-center',
        className,
      )}
      id={id}
      maxLength={maxLength}
      name={name}
      
      onChange={onChange}
      
      placeholder={placeholder}
      onWheel={
        type === 'number'
          ? (e) => {
              e.stopPropagation();
              e.currentTarget.blur();
            }
          : undefined
      }
      style={style}
      type={type}
      value={value}
      disabled={disabled}
    />
  );
};

Input.defaultProps = defaultProps;

export default Input;
