import sharp from 'sharp'
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

// getFlipdImg
export const getFlipdImg = (buffer:Buffer) => {
  return new Promise((resolve,reject)=>{
    sharp(buffer).flip(true).flop(true).toBuffer().then((newBuffer:Buffer)=>{
      resolve(newBuffer)
    }).catch(err=>{
      reject(err)
    })
  })
}