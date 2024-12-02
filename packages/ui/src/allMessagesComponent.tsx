import { MessageComponent } from "@repo/ui/messageComponent";


interface allMessagesProps {
    messagesObject: string[];
}

export function AllMessagesComponent(props: allMessagesProps) {
    const messagesArray = Object.entries(props.messagesObject);
    
    return <div className="bg-gray-800 rounded-lg w-full h-svh overflow-auto my-20 flex flex-col-reverse justify-start">
            {Object.entries(props.messagesObject).reverse().map(([key, value]) => (
            <div key={key}>
                <MessageComponent message={value} /> <br/>
            </div>
            ))}
    </div>
}