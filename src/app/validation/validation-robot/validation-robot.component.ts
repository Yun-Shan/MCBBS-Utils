import { AfterViewInit, Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ValidationService } from '../validation.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-validation-robot',
  templateUrl: './validation-robot.component.html',
  styleUrls: ['./validation-robot.component.scss']
})
export class ValidationRobotComponent implements AfterViewInit {

  data: any;
  loading = true;
  fail = false;
  success = false;
  updateTime: string;

  readonly displayedColumns = ['tid', 'edit_time', 'check_result'];
  readonly displayedColumnsSmall = ['tid', 'check_result'];
  private readonly option = {
    backgroundColor: '#eaeaea',

    title: {
      text: '检测结果 - 获取数据中...',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#222'
      }
    },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: '检测结果',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        minShowLabelAngle: 0.5,
        roseType: false,
        label: {
          normal: {
            textStyle: {
              color: 'rgba(7, 7, 7, 0.7)'
            },
            formatter: '{b}({c})'
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(7, 7, 7, 0.7)'
            },
            smooth: 0.2,
            length: 15,
            length2: 35
          }
        },
        itemStyle: {
          normal: {
            color: (params) => {
              switch (params.name) {
                case '检测通过且与版主一致':
                  return 'forestgreen';
                case '检测不通过且与版主一致':
                  return 'green';
                case '检测通过但版主审核不通过':
                  return 'red';
                case '检测不通过但版主审核通过':
                  return 'purple';
                default:
                  return 'black';
              }
            },
            shadowBlur: 200,
            shadowColor: 'rgba(177, 177, 177, 0.7)'
          }
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay(idx) {
          return Math.abs(Math.random() * 210 - idx);
        }
      }
    ]
  };
  private readonly resizeEvent = new Subject();
  resultErrors: any;

  isSmallScreen = false;

  constructor(private validationService: ValidationService,
              breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((breakpointState: BreakpointState) => {
        return this.isSmallScreen = breakpointState.matches;
      });

    this.validationService.getThreads().then(
      res => {
        this.updateTime = res['update-time'];
        this.data = res.data
          .sort((a, b) => {
            // 基础排序：错误>警告>正确
            const val = b.check_result - a.check_result;
            if (val !== 0) {
              return val;
            }
            // 按编辑时间倒序
            return Date.parse(b.edit_time) - Date.parse(a.edit_time);
          });
        this.loading = false;
        this.success = true;
      },
      error => {
        this.loading = false;
        this.fail = true;
        console.log(error);
      }
    );
  }

  resolveResult(results) {
    return JSON.parse(results);
  }

  ngAfterViewInit(): void {
    const charts = echarts.init(document.getElementById('my-chart'));
    charts.setOption(this.option);
    this.validationService.getResults().then(
      res => {
        const data = [
          /* tslint:disable:no-string-literal */
          {value: res.data['检查通过且和版主审核结果一致'], name: '检测通过且与版主一致'},
          {value: res.data['检查不通过且和版主审核结果一致'], name: '检测不通过且与版主一致'},
          {value: res.data['检查通过但版主审核不通过'], name: '检测通过但版主审核不通过'},
          {value: res.data['检查不通过但版主审核通过'], name: '检测不通过但版主审核通过'},
        ];
        const checkCount = res.data['检查通过且和版主审核结果一致'] + res.data['检查不通过且和版主审核结果一致']
          + res.data['检查通过但版主审核不通过'] + res.data['检查不通过但版主审核通过'];
        charts.setOption({
          title: {
            text: `检测结果 - 已检测${checkCount}帖(次)`
          },
          series: [{data}]
        });
        this.resultErrors = res.errs;
      },
      error => {
        charts.setOption({
          title: {
            text: '检测结果 - 获取数据失败！'
          }
        });
        console.log(error);
      }
    );
    this.resizeEvent.asObservable()
      .pipe(debounceTime(100))
      .subscribe(_ => {
        charts.resize();
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(_) {
    this.resizeEvent.next('0');
  }

}
