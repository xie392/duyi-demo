/*
 * @Author: xie392
 * @Date: 2023-09-17 10:49:54
 * @Description: AJAX进度监控 
 * @See: https://v.douyin.com/ie9MEUYM/
 */
function fetchRequest(options: { url: string, method: 'GET' | 'POST', data?: any }) {
    const { url, method = 'GET', data = {} } = options

    return new Promise( async (resolve) => {
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            // body: JSON.stringify(data )
        })
        // 获取响应体的长度
        const total = Number(resp.headers.get('Content-Length'))
        // 获取响应体的编码
        const decoder = new TextDecoder()
        let body = ''
        const reader = (resp.body as any).getReader()
        let loaded = 0
        while(1) {
            const { done, value } = await reader.read()
            if (done) {
                break
            }
            loaded += value?.length ?? 0
            body += decoder.decode(value)
            onProgress({ loaded, total })
        }
        // resolve(resp)
    })
}

function onProgress({ loaded, total }: { loaded: number, total: number }) {
    console.log('下载进度：' + loaded / total * 100 + '%')
}


export default fetchRequest