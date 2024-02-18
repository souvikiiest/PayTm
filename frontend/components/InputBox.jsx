export function InputBox({placeholder,label,onChange}){
    return <>
        <div className="mx-4 my-2 font-bold">{label}</div>
        <input onChange={onChange} className="mx-2 rounded-lg rounded-2 py-2 pl-2" placeholder={placeholder}></input>
    </>
}