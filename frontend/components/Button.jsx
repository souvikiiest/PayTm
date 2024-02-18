export function Button({label,onPress}){
    return <>
                <button onClick={onPress} className="my-3 mx-auto text-white rounded-xl py-1 px-3.5 border-solid bg-black ">{label}</button>

    </>
}