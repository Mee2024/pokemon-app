import { useEffect } from "react";

export default function useOnclickOutside(ref, handler){
    useEffect(() => {
        const listener = (event) => {

            //모달안을 클릭했는지 
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
          

            //모달 밖을 클릭했는지 
            handler();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart",listener);
        return () => {
            document.removeEventListener("mousedown",listener);
            document.removeEventListener("touchstart",listener);
        };
    },[ref,handler])
}