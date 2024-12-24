/*
 * @Author: xie392
 * @Date: 2023-09-16 12:12:20
 * @Description: 
 */
declare global {
    interface Window {
      META: {
        name: string
        meta: { [key:string]: any }
      }
    }
  }
  