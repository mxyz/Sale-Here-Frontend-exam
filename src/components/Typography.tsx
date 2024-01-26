import classNames from "classnames";
import { ReactNode, memo } from "react";

import css from './Typography.module.scss';

export enum TYPOGRAPHY_TYPES {
    'TITLE'= 'title-37px'
  }
  
  // https://mui.com/system/typography/
  // https://chakra-ui.com/docs/components/typography/heading
  export interface IPropsTypography {
    children: ReactNode;
    className?: string;
    textAlign?: 'left' | 'center' | 'right';
    typography: TYPOGRAPHY_TYPES;
    dataTestId?: string;
  }
  
  const Typography = (props: IPropsTypography) => {
    const { children, className, textAlign, typography, dataTestId } = props;
  
      
        return (
          <>
            <p
              className={classNames(
                `text-colorsBrandWarmBlack01LabelPrimary`,
                `text-${textAlign ?? 'justify'}`,
              css[typography],
              className,
              )}
              data-testid={dataTestId}
            >
              {children}
            </p>
          </>
        );
    
  };
  
  export default memo(Typography);
  