import { useEffect, useRef } from "react";

interface AutoH1Props extends React.HTMLAttributes<HTMLHeadingElement> {
    fallbackText?: string;
}

const AutoH1 = ({ children, fallbackText, ...props }: AutoH1Props) => {
    const h1Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!children && h1Ref.current && fallbackText) {
            h1Ref.current.textContent = fallbackText;
        }
    }, [children, fallbackText]);

    return (
        <h1 ref={h1Ref} {...props}>
            {children || fallbackText}
        </h1>
    );
};

export default AutoH1;
