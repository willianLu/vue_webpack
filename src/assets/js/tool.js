/** 
 * 用于延迟执行
 * @param
 * @export
 *
 */
export function delayExecute(duration = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, duration)
    })
}