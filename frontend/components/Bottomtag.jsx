
import {Link} from "react-router-dom";

export function BottomTag({label, bottomText,to}){
    return <>
            <div className="font-light my-2  ml-auto mr-auto">{label}  <Link to={to}>{bottomText}</Link>
  </div>
            
    </>
}