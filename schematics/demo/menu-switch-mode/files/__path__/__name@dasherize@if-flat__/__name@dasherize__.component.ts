import { Component } from '@angular/core';

@Component({
  selector: '<%= selector %>',
  <% if(inlineTemplate) { %>template: `
    <nz-switch [(ngModel)]="mode">
    </nz-switch>
    Change Mode
    <nz-divider nzType="vertical"></nz-divider>
    <nz-switch [(ngModel)]="dark">
    </nz-switch>
    Change Theme
    <br>
    <br>
    <ul nz-menu [nzMode]="mode?'vertical':'inline'" [nzTheme]="dark?'dark':'light'" style="width: 240px;">
      <li nz-submenu>
        <span title><i class="anticon anticon-mail"></i> Navigation One</span>
        <ul>
          <li nz-menu-group>
            <span title>Item 1</span>
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
          <li nz-menu-group>
            <span title>Item 2</span>
            <ul>
              <li nz-menu-item>Option 3</li>
              <li nz-menu-item>Option 4</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu>
        <span title><i class="anticon anticon-appstore"></i> Navigation Two</span>
        <ul>
          <li nz-menu-item>Option 5</li>
          <li nz-menu-item>Option 6</li>
          <li nz-submenu>
            <span title>Submenu</span>
            <ul>
              <li nz-menu-item>Option 7</li>
              <li nz-menu-item>Option 8</li>
            </ul>
          </li>
        </ul>
      </li>
      <li nz-submenu>
        <span title><i class="anticon anticon-setting"></i> Navigation Three</span>
        <ul>
          <li nz-menu-item>Option 9</li>
          <li nz-menu-item>Option 10</li>
          <li nz-menu-item>Option 11</li>
        </ul>
      </li>
    </ul>`<% } else { %>templateUrl: './<%= dasherize(name) %>.component.html'<% } %>,
  styles  : []
})
export class <%= classify(name) %>Component {
  mode = false;
  dark = false;
}
