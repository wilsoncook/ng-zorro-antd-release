import { Component } from '@angular/core';

@Component({
  selector: '<%= selector %>',
  <% if(inlineTemplate) { %>template: `
    <nz-switch [(ngModel)]="loading"></nz-switch>
    <nz-list [nzDataSource]="listData" [nzRenderItem]="item" [nzItemLayout]="'vertical'">
      <ng-template #item let-item>
        <nz-list-item [nzContent]="loading?' ':item.content" [nzActions]="loading?[]:[starAction,likeAction,msgAction]" [nzExtra]="loading?'':extra">
          <nz-skeleton [nzLoading]="loading" [nzActive]="true" [nzAvatar]="true">
            <ng-template #starAction><i class="anticon anticon-star-o" style="margin-right: 8px;"></i> 156</ng-template>
            <ng-template #likeAction><i class="anticon anticon-like-o" style="margin-right: 8px;"></i> 156</ng-template>
            <ng-template #msgAction><i class="anticon anticon-message" style="margin-right: 8px;"></i> 2</ng-template>
            <nz-list-item-meta
              [nzAvatar]="item.avatar"
              [nzTitle]="nzTitle"
              [nzDescription]="item.description">
              <ng-template #nzTitle><a href="{{item.href}}">{{item.title}}</a></ng-template>
            </nz-list-item-meta>
            <ng-template #extra>
              <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png">
            </ng-template>
          </nz-skeleton>
        </nz-list-item>
      </ng-template>
    </nz-list>
  `<% } else { %>templateUrl: './<%= dasherize(name) %>.component.html'<% } %>
})
export class <%= classify(name) %>Component {
  loading = true;
  listData = new Array(3).fill({}).map((i, index) => {
    return {
      href: 'http://ng.ant.design',
      title: `ant design part ${index}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    };
  });
}
