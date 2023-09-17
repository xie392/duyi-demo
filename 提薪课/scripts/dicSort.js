/*
 * @Author: xie392
 * @Date: 2023-09-17 23:13:44
 * @Description: 编码顺序和字典顺序
 * @See: https://v.douyin.com/iexAbdge/
 */
const names = ['郭德纲', '岳云鹏', '孙越', '曹操', '刘云涛']

names.sort((a, b) => {
    return a.localeCompare(b)
})

console.log(names)  // [ '曹操', '郭德纲', '刘云涛', '孙越', '岳云鹏' ]