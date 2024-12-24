/*
 * @Author: xie392
 * @Date: 2023-09-17 10:49:54
 * @Description: AJAX进度监控 
 * @See: https://v.douyin.com/ie9MEUYM/
 */
async function xhrRequest(options: { url: string, method?: 'GET' | 'POST', data?: any }) {
   return new Promise((resolve, reject) => {
        const { url, method = 'GET', data = null } = options
        const xhr = new XMLHttpRequest()

        xhr.addEventListener('progress',onProgress)
        xhr.upload.addEventListener('progress',onProgress)

        xhr.open(method, url)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.responseType = 'json'

        xhr.send(data)

        xhr.addEventListener('load', () => {
            resolve(xhr.response)
        })

        xhr.addEventListener('error', () => {
            reject(xhr.response)
        })
   })
}

/**
 * 可以在这里实现 loading 效果
 * @param event 
 */
function onProgress(event:ProgressEvent<XMLHttpRequestEventTarget>) {
    console.log("onProgress",event)
    if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        console.log('下载进度：' + percentComplete + '%');
    } else {
        console.log('无法计算总大小的进度更新');
    }
}

export default xhrRequest