import { Component } from '@angular/core';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-attribute-display',
  templateUrl: './attribute-display.component.html',
  styleUrls: ['./attribute-display.component.scss']
})
export class AttributeDisplayComponent {

  constructor(public model: GirderPalamService, public settings: SettingsService) { }

  public hierarchyOneAttributes = [
    { label: 'オブジェクト分類名', value: '橋梁' },
    { label: '判別情報1（路線名）', key: 'Name_R' },
    { label: '判別情報2（道路種別）', key: 'Class_R' },
    { label: '判別情報3-1（開始距離標）', key: 'Milepost_B' },
    { label: '判別情報3-2（終了距離標）', key: 'Milepost_E' },
    { label: '判別情報3-3（開始測点番号）', key: 'BP' },
    { label: '判別情報3-4（終了測点番号）', key: 'EP' }
  ];

  public hierarchyTwoAttributes = [
    { label: 'オブジェクト分類名', value: '上部構造' },
    { label: '種類・形式', value: '単径間鋼橋鈑桁' }
  ];

  public getModelValue(key: string): string {
    if (!key) return '';
    return this.model.others[key] || '';
  }
}
