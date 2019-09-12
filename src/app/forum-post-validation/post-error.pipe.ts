import { Pipe, PipeTransform } from '@angular/core';

const map = {
  // required: '违反版规3-1：必须如实填写服务器发帖模板中的项目，模板信息不全视为模板不合格',
  required: '违反版规3-1：请认真阅读版规并仔细核对！',
};

@Pipe({
  name: 'postError'
})
export class PostErrorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.value === true) {
      return map[value.key];
    }
    // 尝试不显示违规原因，*开头的属于建议，仍继续显示
    // return `违反版规${value.key}：${value.value}`;
    if (value.key[0] === '*') {
      return `违反版规${value.key}：${value.value}`;
    } else {
      return `违反版规${value.key}：请认真阅读版规并仔细核对！`;
    }
  }

}
