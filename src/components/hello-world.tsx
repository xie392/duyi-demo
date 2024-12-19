import { LinkButtonMemo } from "./link-demo";

function HelloWorld() {
    console.log("HelloWorld");

    return <div className="text-lg">
        Hello World! Welcome to my website!
        <LinkButtonMemo />
    </div>
}

export default HelloWorld
