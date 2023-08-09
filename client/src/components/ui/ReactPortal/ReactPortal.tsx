"use client"

import { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
    children: React.ReactNode;
    wrapperId?: string;
}

const ReactPortal: FC<ReactPortalProps> = ({
    children,
    wrapperId = "react-portal-wrapper",
}) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>();

    useEffect(() => {
        let element: HTMLElement | null = document.getElementById(wrapperId);
        let systemCreated: boolean = false;
        if (!element) {
            systemCreated = true;
            const wrapperEl: HTMLElement = document.createElement("div");
            wrapperEl.setAttribute("id", wrapperId);
            document.body.appendChild(wrapperEl);
            element = wrapperEl;
        }
        setWrapperElement(element);

        return () => {
            if (systemCreated && element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    if (wrapperElement === undefined || wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
};

export default ReactPortal;
