import { getFlipdImg } from '@/utils/util';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs'
import path from 'path'
class IndexController {
  private imgFolder = `./../static/`
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public getImg = async (req: Request, res: Response, next: NextFunction) => {
    res.set('content-type','image/jpg')
    try {
      const buffer = await this.findFileByFileName(req.params.fileName)
      res.send(buffer)
      res.end()
    } catch (error) {
      res.sendStatus(404)
      res.end()
    }
  }

  // 查找文件并返回读取后的文件文件流
  findFileByFileName(fileName:string){
    const filePath = path.resolve(__dirname,`${this.imgFolder+fileName}`)
    const stream = fs.createReadStream(filePath)
    const currentDatas = []
    return new Promise((resolve,reject)=>{
      if (stream){
        stream.on('data',chunk=>{
          currentDatas.push(chunk)
        })
        stream.on('error',()=>{
          reject(Buffer.concat([]))
        })
        stream.on('end',async ()=>{
          const finalData = Buffer.concat(currentDatas)
          const newBuffer = await getFlipdImg(finalData)
          resolve(newBuffer)
        })
      }
    })
    return stream
  }
}

export default IndexController;
