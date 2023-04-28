/* eslint-disable @typescript-eslint/no-var-requires */
import { GetAttributes } from 'src/types/method';
import { parse } from 'yaml';
const path = require('path');
const fs = require('fs');

// 获取项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};
// 读取项目配置

export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./config/${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf-8');
  const config = parse(file);
  return config;
};

// 过滤掉数组中不想要的元素，或者选出想要的元素
/**
 *
 * @param obj 需要过滤的对象
 * @param strs 需要过滤(筛选)的属性
 * @param flag 标识是过滤还是筛选 默认false过滤 ，true筛选
 * @returns
 */
export const objFilter = <T>(
  obj: any,
  strs: GetAttributes<T>,
  flag = false,
) => {
  // 默认过滤
  // flag = true 则筛选strs
  if (flag) {
    const newObj = {};
    for (const key of strs) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key as string] = obj[key];
      }
    }
    return newObj;
  }
  // flag = false 则过滤strs
  else {
    const newObj = {};
    for (const key in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        !strs.includes(key as any)
      ) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }
};
