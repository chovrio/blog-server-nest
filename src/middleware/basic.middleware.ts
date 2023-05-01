import { BUSINESS_ERROR_CODE } from 'src/common/exceptions/business.error.codes';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { BasicObject } from 'src/types/basic';
import { MiddleWare } from 'src/types/middleware';

export const BasicValidateMiddleware = (obj: BasicObject): MiddleWare => {
  return (req, res, next) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (!req.body[key]) {
          const message = obj[key];
          throw new BusinessException({
            code: BUSINESS_ERROR_CODE.ARTICLE_PARAMS_NOT_COMPLETE,
            message,
          });
        }
      }
    }
    next();
  };
};
