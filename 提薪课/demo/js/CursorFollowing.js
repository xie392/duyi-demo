const textContainer = document.querySelector('.text-container')
const textEl = document.querySelector('.text')
const cursorEl = document.querySelector('.cursor')

/**
 * 自动追加文字
 * 
 * @returns
 */
async function autoAppend() {
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function transfer(text) {
        return text.replace(/ /g, '&nbsp;')
    }

    const content = `我们可以度过美好时光，也可以虚度光阴，但我希望你活得精彩。如果你发现你的生活并非如此，我希望你能有勇气重新来过。 你是独特的，但你必须向统一让步；你是自由的，但你必须向禁忌妥协。因为你渴望亲近群体，渴望他们的接受。你害怕被群体驱逐。因而你是孤独的，你是独特但孤独的心魂。`

    for(let i = 0; i < content.length; i++) {
        let text = content.slice(0,i)
        let reslut = transfer(text)
        textEl.innerHTML = reslut
        updateCursor()
        await delay(200)
    }

}

autoAppend()

/**
 * 获取最后一个文本节点
 * 
 * @param {Element} node 
 * 
 * @returns {Element}
 */
function getLastTextNode(node){
    if(node.nodeType === Node.TEXT_NODE) {
        return node
    }
    const children = node.childNodes;
    for (let i = children.length - 1; i >= 0 ; i--) {
        const textNode = getLastTextNode(children[i])
        if(textNode) {
            return textNode
        }
    }
}

/**
 * 更新光标位置
 * 
 * @returns
 */
function updateCursor() {
    // 1、追加文字到末尾
    const lastTextNode = getLastTextNode(textEl)
    const textNode = document.createTextNode('文')
    if(lastTextNode) {
        lastTextNode.parentNode.appendChild(textNode)
    } else {
        textEl.appendChild(textNode)
    }

    // 2、获取追加文字的位置
    const range = document.createRange()
    range.setStart(textNode, 0)
    range.setEnd(textNode, 0)
    const rect = range.getBoundingClientRect()

    // 3、根据位置设置光标为位置
    const containerRect = textContainer.getBoundingClientRect()
    const x = rect.x - containerRect.x
    const y = rect.y - containerRect.y
    cursorEl.style.transform = `translate(${x + 5}px, ${y}px)`

    // 4、删除追加的文字
    textNode.remove()

}