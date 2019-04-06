import { Pipe, PipeTransform } from '@angular/core';

const map = {
  required: '违反版规3-1：必须如实填写服务器发帖模板中的项目，模板信息不全视为模板不合格',
};

@Pipe({
  name: 'postError'
})
export class PostErrorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.value === true) {
      return map[value.key];
    }
    return `违反版规${value.key}：${value.value}`;
  }

}
