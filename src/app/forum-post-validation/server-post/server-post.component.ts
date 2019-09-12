import { Component, OnInit } from '@angular/core';
import { Server } from './server';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import * as $ from 'jquery';

declare var window: any;

@Component({
  selector: 'app-server-post',
  templateUrl: './server-post.component.html',
  styleUrls: ['./server-post.component.scss'],
})
export class ServerPostComponent implements OnInit {

  noticeOpenState = true;
  currentVersion: string;
  server: Server = new Server();
  form: FormGroup;

  constructor() {
    const val = localStorage.getItem('noticePanelExpand');
    this.noticeOpenState = val ? val !== 'false' : true;
  }

  ngOnInit() {

    this.form = new FormGroup({
      title: new FormControl('', [
        (control: AbstractControl) => {
          if (!control.value) {
            return null;
          }
          const regex =
            /^\[(?<network>.{2})](?<name>.*[^ ]) ?—— ?.+\[(?<version>[^\s]+)]$/g;
          const res = regex.exec(control.value);
          if (res) {
            const errs = {};
            let counter = 0;
            if (!/(电信)|(联通)|(移动)|(双线)|(多线)|(教育)|(港澳)|(台湾)|(欧洲)|(美洲)|(亚太)|(内网)/.test(res.groups.network)) {
              errs[`1-2(${++counter})`] = '网络类型错误';
            }
            if (this.server.name && this.server.name !== res.groups.name) {
              errs[`1-2(${++counter})`] = '服务器名称必须与模板内服务器名称一致';
            }
            if (this.currentVersion && this.currentVersion !== 'other' && this.currentVersion !== res.groups.version.toLowerCase()) {
              errs[`1-2(${++counter})`] = '版本号要与模板中版本号完全符合';
            }
            if (counter > 0) {
              return errs;
            }
          } else {
            return {'1-2': '帖名格式不符合规则'};
          }
          return null;
        }
      ]),
      name: new FormControl('', [
        (control: AbstractControl) => {
          if (!control.value) {
            return null;
          }
          const regex =
            /^[^,.()[\]'"!?{}+\-*/—:<>‘“《》：]*[^ ,.()[\]'"!?{}+\-*/—:<>‘“《》：]$/g;
          if (regex.test(control.value)) {
            return null;
          } else {
            return {'1-2': '服务器名称不允许使用任何符号'};
          }
        }
      ]),
      serverVersion: new FormControl(),
      welfare: new FormControl(),
      serverType: new FormControl(),
      specialClient: new FormControl(),
      clientDownload: new FormControl('', [
        (control: AbstractControl) => {
          if (!control.value) {
            return null;
          }
          const regex =
            /^.*((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+.*$/g;
          if (regex.test(control.value)) {
            return null;
          } else {
            if (/^.*([1-9]([0-9]{5,11}))|(群).*$/g.test(control.value)) {
              return {'3-2': 'QQ群内下载不视为客户端的有效下载地址'};
            }
            return {'3-2': '需要说明客户端的有效网盘下载地址'};
          }
        }
      ]),
      content: new FormControl('', [], [
        (control: AbstractControl) => {
          if (!control.value) {
            return Promise.resolve(null);
          }
          const server = this.server;
          return new Promise((resolve) => {
            const errs = {};
            const $preview = $('<div>' + window.bbcode2html(control.value) + '</div>');
            const text = $preview.text();
            if (text.length <= 100) {
              errs['3-3'] = '宣传帖内容必须在100字以上';
            }
            if (!$('img', $preview).length) {
              errs['*3-3'] = '建议使用游戏截图介绍服务器';
            }

            const $colors = $('font[color]', $preview);
            $colors.each(function() {
              if (errs['3-5']) {
                return;
              }
              document.body.appendChild(this);
              // @ts-ignore
              const colorStr = document.defaultView.getComputedStyle(this).color;
              // document.body.removeChild(this);
              const res = /rgb\((?<r>\d+), (?<g>\d+), (?<b>\d+)\)/.exec(colorStr);
              const r = parseInt(res.groups.r, 10);
              const g = parseInt(res.groups.g, 10);
              const b = parseInt(res.groups.b, 10);
              const rmean = (r + 251) / 2;
              const R = r - 251;
              const G = g - 242;
              const B = b - 219;
              const dis = Math.sqrt((2 + rmean / 256) * (R ** 2) + 4 * (G ** 2) + (2 + (255 - rmean) / 256) * (B ** 2));
              console.log(dis);
              if (dis < 550) {
                errs['3-5'] = '疑似有妨碍阅读的字体颜色，请仔细检查';
              }
            });

            const $sizes = $('font[size]', $preview);
            if ($sizes.length && $sizes.filter(function() {
              // @ts-ignore
              return this.size > 5;
            }).length) {
              if (errs['3-5']) {
                errs['3-5'] += '；只允许使用5号及5号以下的字号';
              } else {
                errs['3-5'] = '只允许使用5号及5号以下的字号';
              }
            }

            const AUTO_AUDIO_REGEX = /\[(?<type>audio|flash)].+\?.*auto=1.*\Q[/\E\k<type>]/i;
            const TOP_WORD_REGEX = /(国家级)|(国内(最|前|唯一|少数))|(最高级)|(第一家)|(唯一一([家个]))|((最|第一|唯一).{1,15}服)|(服.{1,15}(最|第一|唯一))/;
            const POKEMON_REGEX = /(宝可梦)|(精灵宝可梦)|(口袋((妖怪)|(怪兽)|(怪物))|(宠物小精灵)|(袋魔)|(ポケットモンスター)|(ポケモン)|(Pokemon)|(Pokémon))/g;

            if (AUTO_AUDIO_REGEX.test(control.value)) {
              errs['3-6'] = '帖内禁止出现会自动播放的音乐';
            }
            if (TOP_WORD_REGEX.test(text)) {
              errs['3-7-7'] = '禁止在宣传贴内使用国家级、最高级、第一家等用语';
            }
            if (server.welfare) {
              const WelfareDeclare = '本服是公益服并且愿意承担虚假宣传的一切后果';
              let invalid = false;
              if (text.substr(0, WelfareDeclare.length) !== WelfareDeclare) {
                invalid = true;
              }

              let $declare;
              if (!invalid) {
                $declare = $(':contains(\'' + WelfareDeclare + '\')', $preview);
                if (!$declare.length) {
                  invalid = true;
                } else {
                  $declare = $declare.parent();
                }
              }

              const selectors = ['font[size=\'5\']', 'font[size][size!=\'5\']', 'font[color=\'red\']', 'font[color][color!=\'red\']',
                'div[align=\'center\']', 'div[align][align!=\'center\']', 'b', '[style*=\'font-weight\']'];
              let sidx = 0;
              while (!invalid) {
                if (sidx >= selectors.length) {
                  break;
                }
                const $val = $(selectors[sidx], $declare);
                invalid = $val.text() !== WelfareDeclare || $(selectors[sidx + 1], $val).length > 0;
                sidx += 2;
              }
              if (invalid) {
                errs['3-4'] = '公益服需在帖子最顶部以正确格式标注公益声明';
              }
            } else {
              if (POKEMON_REGEX.test(text)) {
                errs['3-9-1'] = '以Pixelmon Mod为服务器玩法的仅允许成为公益服';
              }
            }
            if (Object.keys(errs).length > 0) {
              resolve(errs);
            } else {
              resolve(null);
            }
          });
        }
      ]),
    });
    for (const control of Object.keys(this.form.controls)) {
      this.form.get(control).valueChanges.subscribe(val => {
        this.server[control] = val;
      });
    }
  }

  test() {
    console.log(this.server);
  }

  log(obj: any) {
    console.log(obj);
  }

  noticePanelToggle() {
    localStorage.setItem('noticePanelExpand', String(this.noticeOpenState));
  }

  keysCount(obj: any) {
    return obj ? Object.keys(obj).length : 0;
  }

  isInvalid(name: string) {
    const control = this.form.get(name);
    return control.touched && control.invalid;
  }

  resetCurrentVersion() {
    if (this.server.version.other) {
      this.currentVersion = 'other';
      return;
    }
    let verMax = null;
    let verMaxNum = 0;
    let verMin = null;
    let verMinNum = 99999;
    for (const v of Object.keys(this.server.version)) {
      const val = this.server.version[v];
      if (val) {
        if (!verMaxNum || val > verMaxNum) {
          verMax = v;
          verMaxNum = val;
        }
        if (!verMinNum || val < verMinNum) {
          verMin = v;
          verMinNum = val;
        }
      }
    }
    if (verMax && verMin) {
      if (verMax === verMin) {
        this.currentVersion = verMax.toLowerCase();
      } else {
        const maxMain = verMax.lastIndexOf('.') === verMax.indexOf('.') ? verMax : verMax.substring(0, verMax.lastIndexOf('.'));
        const minMain = verMin.lastIndexOf('.') === verMin.indexOf('.') ? verMin : verMin.substring(0, verMin.lastIndexOf('.'));
        if (maxMain === minMain) {
          this.currentVersion = maxMain + '.x';
        } else {
          this.currentVersion = (verMin + '-' + verMax).toLowerCase();
        }
      }
    } else {
      if (verMax || verMin) {
        this.currentVersion = verMax ? verMax.toLowerCase() : verMin.toLowerCase();
      } else {
        this.currentVersion = null;
      }
    }
    console.log(this.currentVersion);
  }

}
