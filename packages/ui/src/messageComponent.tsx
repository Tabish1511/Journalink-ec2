export function MessageComponent(props: any) {
    return <div className="rounded-lg bg-sky-800 border-sky-500 w-4/5 py-4 flex justify-center ">
        {props.message}
    </div>
}