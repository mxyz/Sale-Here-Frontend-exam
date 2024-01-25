import { CSSProperties } from "react";

interface IPropsImage {
    src: string;
    alt?: string;
    className?: string;
    aspectRatio?: number;
}

const Image = (props: IPropsImage) => {
    const  {className, src, alt='image',aspectRatio} = props;
    return <div
      className={className}
      style={
        {
          '--aspectRatio': aspectRatio,
        } as CSSProperties
      }
    >

        <img className="w-full h-full object-cover" src={src} alt={alt} />
    </div>
}

export default Image;