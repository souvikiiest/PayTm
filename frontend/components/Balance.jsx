export function Balance({balance}){
    return <>
        <div className="flex justify-start ml-3 my-4 ">
            <div className="pl-4 font-bold">Your Balance</div>
            <div className="pl-4">Rs. {balance}</div>
        </div>
    </>
}