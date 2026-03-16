"use clirnt"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("e2fff90b-a78e-43e8-ac3a-cc187b8e26bd");
    }, []);

    return null;
}
