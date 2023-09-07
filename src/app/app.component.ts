import { Component, OnInit } from '@angular/core';
import { Dcupl } from '@dcupl/core';
import { DcuplAppLoader } from '@dcupl/loader';
import { PivotOptions, PivotResponse } from '@dcupl/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public response: PivotResponse | undefined;

  ngOnInit(): void {
    this.init();
  }

  private async init(): Promise<void> {
    const dcupl = new Dcupl({
      config: {
        projectId: 'amNlybMblzqF2qcixBVT',
        apiKey: '0857c213-e2dc-49f3-95af-d6001a6327d4',
      },
    });

    const loader = new DcuplAppLoader();
    dcupl.loaders.add(loader, 'default');

    await loader.config.fetch();

    await loader.process({ applicationKey: 'default' });

    await dcupl.init();

    const list = dcupl.lists.create({ modelKey: 'Style' });

    const options: PivotOptions = {
      columns: [{ attribute: 'gender' }],
      rows: [{ attribute: 'masterCategory' }],
      values: [{ attribute: 'styleID', types: ['count'] }],
    };

    this.response = list.catalog.fn.pivot(options);

    console.log(options);
    console.log(this.response);
  }
}
