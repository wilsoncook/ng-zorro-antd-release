/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { InputBoolean } from '../core/util/convert';
import { NzTreeNode } from './nz-tree-node';
import { isCheckDisabled } from './nz-tree-util';
import { NzTreeService } from './nz-tree.service';
export class NzTreeNodeComponent {
    /**
     * @param {?} nzTreeService
     * @param {?} ngZone
     * @param {?} renderer
     * @param {?} elRef
     */
    constructor(nzTreeService, ngZone, renderer, elRef) {
        this.nzTreeService = nzTreeService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.elRef = elRef;
        // Output
        this.clickNode = new EventEmitter();
        this.dblClick = new EventEmitter();
        this.contextMenu = new EventEmitter();
        this.clickCheckBox = new EventEmitter();
        this.clickExpand = new EventEmitter();
        this.nzDragStart = new EventEmitter();
        this.nzDragEnter = new EventEmitter();
        this.nzDragOver = new EventEmitter();
        this.nzDragLeave = new EventEmitter();
        this.nzDrop = new EventEmitter();
        this.nzDragEnd = new EventEmitter();
        // default var
        this.prefixCls = 'ant-tree';
        this.highlightKeys = [];
        this.nzNodeClass = {};
        this.nzNodeSwitcherClass = {};
        this.nzNodeContentClass = {};
        this.nzNodeContentIconClass = {};
        this.nzNodeContentLoadingClass = {};
        this.nzNodeChildrenClass = {};
        /**
         * drag var
         */
        this.dragPos = 2;
        this.dragPosClass = {
            '0': 'drag-over',
            '1': 'drag-over-gap-bottom',
            '-1': 'drag-over-gap-top'
        };
        this._searchValue = '';
        this._nzExpandAll = false;
        ngZone.runOutsideAngular(() => {
            fromEvent(this.elRef.nativeElement, 'dragstart').subscribe((e) => this.handleDragStart(e));
            fromEvent(this.elRef.nativeElement, 'dragenter').subscribe((e) => this.handleDragEnter(e));
            fromEvent(this.elRef.nativeElement, 'dragover').subscribe((e) => this.handleDragOver(e));
            fromEvent(this.elRef.nativeElement, 'dragleave').subscribe((e) => this.handleDragLeave(e));
            fromEvent(this.elRef.nativeElement, 'drop').subscribe((e) => this.handleDragDrop(e));
            fromEvent(this.elRef.nativeElement, 'dragend').subscribe((e) => this.handleDragEnd(e));
        });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzTreeNode(value) {
        // add to checked list & selected list
        if (value.isChecked) {
            this.nzTreeService.setCheckedNodeList(value);
        }
        // add select list
        if (value.isSelected) {
            this.nzTreeService.setSelectedNodeList(value, this.nzMultiple);
        }
        if (!value.isLeaf) {
            this.nzTreeService.setExpandedNodeList(value);
        }
        this._nzTreeNode = value;
    }
    /**
     * @return {?}
     */
    get nzTreeNode() {
        return this._nzTreeNode;
    }
    /**
     * @deprecated use
     * nzExpandAll instead
     * @param {?} value
     * @return {?}
     */
    set nzDefaultExpandAll(value) {
        this._nzExpandAll = value;
        if (value && this.nzTreeNode && !this.nzTreeNode.isLeaf) {
            this.nzTreeNode.setExpanded(true);
            this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
        }
    }
    /**
     * @return {?}
     */
    get nzDefaultExpandAll() {
        return this._nzExpandAll;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzExpandAll(value) {
        this._nzExpandAll = value;
        if (value && this.nzTreeNode && !this.nzTreeNode.isLeaf) {
            this.nzTreeNode.setExpanded(true);
            this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
        }
    }
    /**
     * @return {?}
     */
    get nzExpandAll() {
        return this._nzExpandAll;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSearchValue(value) {
        this.highlightKeys = [];
        if (value && this.nzTreeNode.title.includes(value)) {
            this.nzTreeNode.isMatched = true;
            /** @type {?} */
            const index = this.nzTreeNode.title.indexOf(value);
            this.highlightKeys.push(this.nzTreeNode.title.slice(0, index));
            this.highlightKeys.push(this.nzTreeNode.title.slice(index + value.length, this.nzTreeNode.title.length));
        }
        else {
            // close the node if title does't contain search value
            this.nzTreeNode.isMatched = false;
        }
        this._searchValue = value;
    }
    /**
     * @return {?}
     */
    get nzSearchValue() {
        return this._searchValue;
    }
    /**
     * @return {?}
     */
    get canDraggable() {
        return (this.nzDraggable && this.nzTreeNode && !this.nzTreeNode.isDisabled) ? true : null;
    }
    /**
     * @return {?}
     */
    get isSwitcherOpen() {
        return (this.nzTreeNode.isExpanded && !this.nzTreeNode.isLeaf);
    }
    /**
     * @return {?}
     */
    get isSwitcherClose() {
        return (!this.nzTreeNode.isExpanded && !this.nzTreeNode.isLeaf);
    }
    /**
     * reset node class
     * @return {?}
     */
    setClassMap() {
        this.nzNodeClass = {
            [`${this.prefixCls}-treenode-disabled`]: this.nzTreeNode.isDisabled
        };
        this.nzNodeSwitcherClass = {
            [`${this.prefixCls}-switcher`]: true,
            [`${this.prefixCls}-switcher-noop`]: this.nzTreeNode.isLeaf
        };
        this.nzNodeContentClass = {
            [`${this.prefixCls}-node-content-wrapper`]: true
        };
        this.nzNodeContentIconClass = {
            [`${this.prefixCls}-iconEle`]: true,
            [`${this.prefixCls}-icon__customize`]: true
        };
        this.nzNodeContentLoadingClass = {
            [`${this.prefixCls}-iconEle`]: true
        };
        this.nzNodeChildrenClass = {
            [`${this.prefixCls}-child-tree`]: true,
            [`${this.prefixCls}-child-tree-open`]: true
        };
    }
    /**
     * click node to select, 200ms to dbl click
     * @param {?} event
     * @return {?}
     */
    nzClick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.nzTreeNode.isSelectable) {
            this.nzTreeService.setNodeActive(this.nzTreeNode, this.nzMultiple);
        }
        this.clickNode.emit(this.nzTreeService.formatEvent('click', this.nzTreeNode, event));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    nzDblClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dblClick.emit(this.nzTreeService.formatEvent('dblclick', this.nzTreeNode, event));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    nzContextMenu(event) {
        event.preventDefault();
        event.stopPropagation();
        this.contextMenu.emit(this.nzTreeService.formatEvent('contextmenu', this.nzTreeNode, event));
    }
    /**
     * collapse node
     * @param {?} event
     * @return {?}
     */
    _clickExpand(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.nzTreeNode.isLoading && !this.nzTreeNode.isLeaf) {
            // set async state
            if (this.nzAsyncData && this.nzTreeNode.getChildren().length === 0 && !this.nzTreeNode.isExpanded) {
                this.nzTreeNode.isLoading = true;
            }
            this.nzTreeNode.setExpanded(!this.nzTreeNode.isExpanded);
            this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
            this.clickExpand.emit(this.nzTreeService.formatEvent('expand', this.nzTreeNode, event));
        }
    }
    /**
     * check node
     * @param {?} event
     * @return {?}
     */
    _clickCheckBox(event) {
        event.preventDefault();
        event.stopPropagation();
        // return if node is disabled
        if (isCheckDisabled(this.nzTreeNode)) {
            return;
        }
        this.nzTreeNode.setChecked(!this.nzTreeNode.isChecked);
        this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
        if (!this.nzCheckStrictly) {
            this.nzTreeService.conduct(this.nzTreeNode);
        }
        this.clickCheckBox.emit(this.nzTreeService.formatEvent('check', this.nzTreeNode, event));
    }
    /**
     * drag event
     * @return {?}
     */
    clearDragClass() {
        /** @type {?} */
        const dragClass = ['drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over'];
        dragClass.forEach(e => {
            this.renderer.removeClass(this.dragElement.nativeElement, e);
        });
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleDragStart(e) {
        e.stopPropagation();
        try {
            // ie throw error
            // firefox-need-it
            e.dataTransfer.setData('text/plain', '');
        }
        catch (error) {
            // empty
        }
        this.nzTreeService.setSelectedNode(this.nzTreeNode);
        this.nzTreeNode.setExpanded(false);
        this.nzDragStart.emit(this.nzTreeService.formatEvent('dragstart', null, e));
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        // reset position
        this.dragPos = 2;
        this.ngZone.run(() => {
            if ((this.nzTreeNode !== this.nzTreeService.getSelectedNode()) && !this.nzTreeNode.isLeaf) {
                this.nzTreeNode.setExpanded(true);
            }
        });
        this.nzDragEnter.emit(this.nzTreeService.formatEvent('dragenter', this.nzTreeNode, e));
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        /** @type {?} */
        const dropPosition = this.nzTreeService.calcDropPosition(e);
        if (this.dragPos !== dropPosition) {
            this.clearDragClass();
            this.dragPos = dropPosition;
            // leaf node will pass
            if (!(this.dragPos === 0 && this.nzTreeNode.isLeaf)) {
                this.renderer.addClass(this.dragElement.nativeElement, this.dragPosClass[this.dragPos]);
            }
        }
        this.nzDragOver.emit(this.nzTreeService.formatEvent('dragover', this.nzTreeNode, e));
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleDragLeave(e) {
        e.stopPropagation();
        this.ngZone.run(() => {
            this.clearDragClass();
        });
        this.nzDragLeave.emit(this.nzTreeService.formatEvent('dragleave', this.nzTreeNode, e));
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleDragDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.ngZone.run(() => {
            this.clearDragClass();
            if (this.nzTreeService.getSelectedNode() === this.nzTreeNode) {
                return;
            }
            else if (this.dragPos === 0 && this.nzTreeNode.isLeaf) {
                return;
            }
            // pass if node is leafNo
            if (this.nzBeforeDrop) {
                this.nzBeforeDrop({
                    dragNode: this.nzTreeService.getSelectedNode(),
                    node: this.nzTreeNode,
                    pos: this.dragPos
                }).subscribe((canDrop) => {
                    if (canDrop) {
                        this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
                    }
                    this.nzDrop.emit(this.nzTreeService.formatEvent('drop', this.nzTreeNode, e));
                    this.nzDragEnd.emit(this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e));
                });
            }
            else if (this.nzTreeNode) {
                this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
                this.nzDrop.emit(this.nzTreeService.formatEvent('drop', this.nzTreeNode, e));
            }
        });
    }
    /**
     * @param {?} e
     * @return {?}
     */
    handleDragEnd(e) {
        e.stopPropagation();
        this.ngZone.run(() => {
            // if user do not custom beforeDrop
            if (!this.nzBeforeDrop) {
                this.nzTreeService.setSelectedNode(null);
                this.nzDragEnd.emit(this.nzTreeService.formatEvent('dragend', this.nzTreeNode, e));
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setClassMap();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.setClassMap();
    }
}
NzTreeNodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-node',
                template: "<li\n  #dragElement\n  role=\"treeitem\"\n  [ngClass]=\"nzNodeClass\"\n  [class.ant-tree-treenode-switcher-open]=\"isSwitcherOpen\"\n  [class.ant-tree-treenode-switcher-close]=\"isSwitcherClose\"\n  [class.ant-tree-treenode-checkbox-checked]=\"nzTreeNode.isChecked\"\n  [class.ant-tree-treenode-checkbox-indeterminate]=\"nzTreeNode.isHalfChecked\"\n  [class.ant-tree-treenode-selected]=\"nzTreeNode.isSelected\"\n  [class.ant-tree-treenode-loading]=\"nzTreeNode.isLoading\">\n  <ng-container *ngIf=\"nzShowExpand\">\n    <span\n      [ngClass]=\"nzNodeSwitcherClass\"\n      [class.ant-tree-switcher_open]=\"isSwitcherOpen\"\n      [class.ant-tree-switcher_close]=\"isSwitcherClose\"\n      (click)=\"_clickExpand($event)\">\n    </span>\n  </ng-container>\n  <ng-container *ngIf=\"nzCheckable\">\n    <span\n      class=\"ant-tree-checkbox\"\n      [class.ant-tree-checkbox-checked]=\"nzTreeNode.isChecked\"\n      [class.ant-tree-checkbox-indeterminate]=\"nzTreeNode.isHalfChecked\"\n      [class.ant-tree-checkbox-disabled]=\"(nzTreeNode.isDisabled || nzTreeNode.isDisableCheckbox)\"\n      (click)=\"_clickCheckBox($event)\">\n      <span class=\"ant-tree-checkbox-inner\"></span>\n    </span>\n  </ng-container>\n  <ng-container *ngIf=\"!nzTreeTemplate\">\n    <span\n      title=\"{{nzTreeNode.title}}\"\n      [attr.draggable]=\"canDraggable\"\n      [attr.aria-grabbed]=\"canDraggable\"\n      [ngClass]=\"nzNodeContentClass\"\n      [class.ant-tree-node-content-wrapper-open]=\"isSwitcherOpen\"\n      [class.ant-tree-node-content-wrapper-close]=\"isSwitcherClose\"\n      [class.ant-tree-node-selected]=\"nzTreeNode.isSelected\"\n      [class.draggable]=\"canDraggable\">\n      <span\n        *ngIf=\"nzTreeNode.origin.icon\"\n        [class.ant-tree-icon__open]=\"isSwitcherOpen\"\n        [class.ant-tree-icon__close]=\"isSwitcherClose\"\n        [class.ant-tree-icon_loading]=\"nzTreeNode.isLoading\"\n        [ngClass]=\"nzNodeContentLoadingClass\">\n        <span\n          [ngClass]=\"nzNodeContentIconClass\">\n          <i class=\"anticon\" [ngClass]=\"nzTreeNode.origin.icon\"></i>\n        </span>\n      </span>\n      <span class=\"ant-tree-title\">\n        <ng-container *ngIf=\"nzTreeNode.isMatched\">\n          <span>\n            {{highlightKeys[0]}}<span class=\"font-highlight\">{{nzSearchValue}}</span>{{highlightKeys[1]}}\n          </span>\n        </ng-container>\n        <ng-container *ngIf=\"!nzTreeNode.isMatched\">\n          {{nzTreeNode.title}}\n        </ng-container>\n      </span>\n    </span>\n  </ng-container>\n  <ng-template\n    [ngTemplateOutlet]=\"nzTreeTemplate\"\n    [ngTemplateOutletContext]=\"{ $implicit: nzTreeNode }\">\n  </ng-template>\n\n  <ul\n    role=\"group\"\n    [attr.data-expanded]=\"nzTreeNode.isExpanded\"\n    [ngClass]=\"nzNodeChildrenClass\"\n    [@nodeState]=\"nzTreeNode.isExpanded ? 'active' : 'inactive'\">\n    <nz-tree-node\n      *ngFor=\"let node of nzTreeNode.getChildren()\"\n      [nzTreeNode]=\"node\"\n      [nzShowLine]=\"nzShowLine\"\n      [nzDraggable]=\"nzDraggable\"\n      [nzCheckable]=\"nzCheckable\"\n      [nzShowExpand]=\"nzShowExpand\"\n      [nzAsyncData]=\"nzAsyncData\"\n      [nzMultiple]=\"nzMultiple\"\n      [nzExpandAll]=\"nzExpandAll\"\n      [nzDefaultExpandAll]=\"nzDefaultExpandAll\"\n      [nzSearchValue]=\"nzSearchValue\"\n      [nzBeforeDrop]=\"nzBeforeDrop\"\n      [nzCheckStrictly]=\"nzCheckStrictly\"\n      [nzTreeTemplate]=\"nzTreeTemplate\"\n      (clickNode)=\"clickNode.emit($event)\"\n      (dblClick)=\"dblClick.emit($event)\"\n      (contextMenu)=\"contextMenu.emit($event)\"\n      (clickExpand)=\"clickExpand.emit($event)\"\n      (clickCheckBox)=\"clickCheckBox.emit($event)\"\n      (nzDragStart)=\"nzDragStart.emit($event)\"\n      (nzDragEnter)=\"nzDragEnter.emit($event)\"\n      (nzDragOver)=\"nzDragOver.emit($event)\"\n      (nzDragLeave)=\"nzDragLeave.emit($event)\"\n      (nzDrop)=\"nzDrop.emit($event)\"\n      (nzDragEnd)=\"nzDragEnd.emit($event)\">\n    </nz-tree-node>\n  </ul>\n</li>",
                preserveWhitespaces: false,
                animations: [
                    trigger('nodeState', [
                        state('inactive', style({
                            opacity: '0',
                            height: '0',
                            display: 'none'
                        })),
                        state('active', style({
                            opacity: '1',
                            height: '*'
                        })),
                        transition('inactive => active', animate('100ms ease-in')),
                        transition('active => inactive', animate('100ms ease-out'))
                    ])
                ]
            }] }
];
/** @nocollapse */
NzTreeNodeComponent.ctorParameters = () => [
    { type: NzTreeService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ElementRef }
];
NzTreeNodeComponent.propDecorators = {
    dragElement: [{ type: ViewChild, args: ['dragElement',] }],
    nzShowLine: [{ type: Input }],
    nzShowExpand: [{ type: Input }],
    nzDraggable: [{ type: Input }],
    nzMultiple: [{ type: Input }],
    nzCheckable: [{ type: Input }],
    nzAsyncData: [{ type: Input }],
    nzCheckStrictly: [{ type: Input }],
    nzTreeTemplate: [{ type: Input }],
    nzBeforeDrop: [{ type: Input }],
    nzTreeNode: [{ type: Input }],
    nzDefaultExpandAll: [{ type: Input }],
    nzExpandAll: [{ type: Input }],
    nzSearchValue: [{ type: Input }],
    clickNode: [{ type: Output }],
    dblClick: [{ type: Output }],
    contextMenu: [{ type: Output }],
    clickCheckBox: [{ type: Output }],
    clickExpand: [{ type: Output }],
    nzDragStart: [{ type: Output }],
    nzDragEnter: [{ type: Output }],
    nzDragOver: [{ type: Output }],
    nzDragLeave: [{ type: Output }],
    nzDrop: [{ type: Output }],
    nzDragEnd: [{ type: Output }],
    nzClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    nzDblClick: [{ type: HostListener, args: ['dblclick', ['$event'],] }],
    nzContextMenu: [{ type: HostListener, args: ['contextmenu', ['$event'],] }]
};
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzShowLine", void 0);
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzShowExpand", void 0);
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzDraggable", void 0);
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzMultiple", void 0);
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzCheckable", void 0);
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzAsyncData", void 0);
tslib_1.__decorate([
    InputBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], NzTreeNodeComponent.prototype, "nzCheckStrictly", void 0);
function NzTreeNodeComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzTreeNodeComponent.prototype.dragElement;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzShowLine;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzShowExpand;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzDraggable;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzMultiple;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzCheckable;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzAsyncData;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzCheckStrictly;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzTreeTemplate;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzBeforeDrop;
    /** @type {?} */
    NzTreeNodeComponent.prototype.clickNode;
    /** @type {?} */
    NzTreeNodeComponent.prototype.dblClick;
    /** @type {?} */
    NzTreeNodeComponent.prototype.contextMenu;
    /** @type {?} */
    NzTreeNodeComponent.prototype.clickCheckBox;
    /** @type {?} */
    NzTreeNodeComponent.prototype.clickExpand;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzDragStart;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzDragEnter;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzDragOver;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzDragLeave;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzDrop;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzDragEnd;
    /** @type {?} */
    NzTreeNodeComponent.prototype.prefixCls;
    /** @type {?} */
    NzTreeNodeComponent.prototype.highlightKeys;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzNodeClass;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzNodeSwitcherClass;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzNodeContentClass;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzNodeContentIconClass;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzNodeContentLoadingClass;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzNodeChildrenClass;
    /**
     * drag var
     * @type {?}
     */
    NzTreeNodeComponent.prototype.dragPos;
    /** @type {?} */
    NzTreeNodeComponent.prototype.dragPosClass;
    /**
     * default set
     * @type {?}
     */
    NzTreeNodeComponent.prototype._nzTreeNode;
    /** @type {?} */
    NzTreeNodeComponent.prototype._searchValue;
    /** @type {?} */
    NzTreeNodeComponent.prototype._nzExpandAll;
    /** @type {?} */
    NzTreeNodeComponent.prototype.nzTreeService;
    /** @type {?} */
    NzTreeNodeComponent.prototype.ngZone;
    /** @type {?} */
    NzTreeNodeComponent.prototype.renderer;
    /** @type {?} */
    NzTreeNodeComponent.prototype.elRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdHJlZS1ub2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJ0cmVlL256LXRyZWUtbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFDTCxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQ2pELEtBQUssRUFBRSxNQUFNLEVBRUwsTUFBTSxFQUFFLFNBQVMsRUFFekIsV0FBVyxFQUFFLFNBQVMsRUFDdkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUF1QmxELE1BQU07Ozs7Ozs7SUE0VUosWUFBb0IsYUFBNEIsRUFBVSxNQUFjLEVBQVUsUUFBbUIsRUFBVSxLQUFpQjtRQUE1RyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBWTs7eUJBdlB6RSxJQUFJLFlBQVksRUFBRTt3QkFDbkIsSUFBSSxZQUFZLEVBQUU7MkJBQ2YsSUFBSSxZQUFZLEVBQUU7NkJBQ2hCLElBQUksWUFBWSxFQUFFOzJCQUNwQixJQUFJLFlBQVksRUFBRTsyQkFDbEIsSUFBSSxZQUFZLEVBQUU7MkJBQ2xCLElBQUks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QzFELFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztxQkFDNUQsQ0FBQztpQkFDSDthQUNGOzs7O1lBckJRLGFBQWE7WUFYYixNQUFNO1lBRUcsU0FBUztZQUhkLFVBQVU7OzswQkFvQ3BCLFNBQVMsU0FBQyxhQUFhO3lCQUV2QixLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzs4QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzt5QkFFTCxLQUFLO2lDQXdCTCxLQUFLOzBCQWNMLEtBQUs7NEJBYUwsS0FBSzt3QkFxQkwsTUFBTTt1QkFDTixNQUFNOzBCQUNOLE1BQU07NEJBQ04sTUFBTTswQkFDTixNQUFNOzBCQUNOLE1BQU07MEJBQ04sTUFBTTt5QkFDTixNQUFNOzBCQUNOLE1BQU07cUJBQ04sTUFBTTt3QkFDTixNQUFNO3NCQXVFTixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUUsUUFBUSxDQUFFO3lCQVVsQyxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUUsUUFBUSxDQUFFOzRCQVVyQyxZQUFZLFNBQUMsYUFBYSxFQUFFLENBQUUsUUFBUSxDQUFFOzs7SUF2TC9CLFlBQVksRUFBRTs7OztJQUNkLFlBQVksRUFBRTs7OztJQUNkLFlBQVksRUFBRTs7OztJQUNkLFlBQVksRUFBRTs7OztJQUNkLFlBQVksRUFBRTs7OztJQUNkLFlBQVksRUFBRTs7OztJQUNkLFlBQVksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5pbXBvcnQgeyBOekZvcm1hdEJlZm9yZURyb3BFdmVudCwgTnpGb3JtYXRFbWl0RXZlbnQgfSBmcm9tICcuLi90cmVlL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBOelRyZWVOb2RlIH0gZnJvbSAnLi9uei10cmVlLW5vZGUnO1xuaW1wb3J0IHsgaXNDaGVja0Rpc2FibGVkIH0gZnJvbSAnLi9uei10cmVlLXV0aWwnO1xuaW1wb3J0IHsgTnpUcmVlU2VydmljZSB9IGZyb20gJy4vbnotdHJlZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yICAgICAgICAgICA6ICduei10cmVlLW5vZGUnLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei10cmVlLW5vZGUuY29tcG9uZW50Lmh0bWwnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgYW5pbWF0aW9ucyAgICAgICAgIDogW1xuICAgIHRyaWdnZXIoJ25vZGVTdGF0ZScsIFtcbiAgICAgIHN0YXRlKCdpbmFjdGl2ZScsIHN0eWxlKHtcbiAgICAgICAgb3BhY2l0eTogJzAnLFxuICAgICAgICBoZWlnaHQgOiAnMCcsXG4gICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgfSkpLFxuICAgICAgc3RhdGUoJ2FjdGl2ZScsIHN0eWxlKHtcbiAgICAgICAgb3BhY2l0eTogJzEnLFxuICAgICAgICBoZWlnaHQgOiAnKidcbiAgICAgIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2luYWN0aXZlID0+IGFjdGl2ZScsIGFuaW1hdGUoJzEwMG1zIGVhc2UtaW4nKSksXG4gICAgICB0cmFuc2l0aW9uKCdhY3RpdmUgPT4gaW5hY3RpdmUnLCBhbmltYXRlKCcxMDBtcyBlYXNlLW91dCcpKVxuICAgIF0pXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOelRyZWVOb2RlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCdkcmFnRWxlbWVudCcpIGRyYWdFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dMaW5lOiBib29sZWFuO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93RXhwYW5kOiBib29sZWFuO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEcmFnZ2FibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek11bHRpcGxlOiBib29sZWFuO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDaGVja2FibGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekFzeW5jRGF0YTogYm9vbGVhbjtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2hlY2tTdHJpY3RseTogYm9vbGVhbjtcbiAgQElucHV0KCkgbnpUcmVlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuekJlZm9yZURyb3A6IChjb25maXJtOiBOekZvcm1hdEJlZm9yZURyb3BFdmVudCkgPT4gT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBASW5wdXQoKVxuICBzZXQgbnpUcmVlTm9kZSh2YWx1ZTogTnpUcmVlTm9kZSkge1xuICAgIC8vIGFkZCB0byBjaGVja2VkIGxpc3QgJiBzZWxlY3RlZCBsaXN0XG4gICAgaWYgKHZhbHVlLmlzQ2hlY2tlZCkge1xuICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLnNldENoZWNrZWROb2RlTGlzdCh2YWx1ZSk7XG4gICAgfVxuICAgIC8vIGFkZCBzZWxlY3QgbGlzdFxuICAgIGlmICh2YWx1ZS5pc1NlbGVjdGVkKSB7XG4gICAgICB0aGlzLm56VHJlZVNlcnZpY2Uuc2V0U2VsZWN0ZWROb2RlTGlzdCh2YWx1ZSwgdGhpcy5uek11bHRpcGxlKTtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZS5pc0xlYWYpIHtcbiAgICAgIHRoaXMubnpUcmVlU2VydmljZS5zZXRFeHBhbmRlZE5vZGVMaXN0KHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5fbnpUcmVlTm9kZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56VHJlZU5vZGUoKTogTnpUcmVlTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX256VHJlZU5vZGU7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlXG4gICAqIG56RXhwYW5kQWxsIGluc3RlYWRcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBuekRlZmF1bHRFeHBhbmRBbGwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9uekV4cGFuZEFsbCA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSAmJiB0aGlzLm56VHJlZU5vZGUgJiYgIXRoaXMubnpUcmVlTm9kZS5pc0xlYWYpIHtcbiAgICAgIHRoaXMubnpUcmVlTm9kZS5zZXRFeHBhbmRlZCh0cnVlKTtcbiAgICAgIHRoaXMubnpUcmVlU2VydmljZS5zZXRFeHBhbmRlZE5vZGVMaXN0KHRoaXMubnpUcmVlTm9kZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG56RGVmYXVsdEV4cGFuZEFsbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbnpFeHBhbmRBbGw7XG4gIH1cblxuICAvLyBkZWZhdWx0IHNldFxuICBASW5wdXQoKVxuICBzZXQgbnpFeHBhbmRBbGwodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9uekV4cGFuZEFsbCA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSAmJiB0aGlzLm56VHJlZU5vZGUgJiYgIXRoaXMubnpUcmVlTm9kZS5pc0xlYWYpIHtcbiAgICAgIHRoaXMubnpUcmVlTm9kZS5zZXRFeHBhbmRlZCh0cnVlKTtcbiAgICAgIHRoaXMubnpUcmVlU2VydmljZS5zZXRFeHBhbmRlZE5vZGVMaXN0KHRoaXMubnpUcmVlTm9kZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG56RXhwYW5kQWxsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9uekV4cGFuZEFsbDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelNlYXJjaFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmhpZ2hsaWdodEtleXMgPSBbXTtcbiAgICBpZiAodmFsdWUgJiYgdGhpcy5uelRyZWVOb2RlLnRpdGxlLmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgdGhpcy5uelRyZWVOb2RlLmlzTWF0Y2hlZCA9IHRydWU7XG4gICAgICAvLyBtYXRjaCB0aGUgc2VhcmNoIHZhbHVlXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMubnpUcmVlTm9kZS50aXRsZS5pbmRleE9mKHZhbHVlKTtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0S2V5cy5wdXNoKHRoaXMubnpUcmVlTm9kZS50aXRsZS5zbGljZSgwLCBpbmRleCkpO1xuICAgICAgdGhpcy5oaWdobGlnaHRLZXlzLnB1c2godGhpcy5uelRyZWVOb2RlLnRpdGxlLnNsaWNlKGluZGV4ICsgdmFsdWUubGVuZ3RoLCB0aGlzLm56VHJlZU5vZGUudGl0bGUubGVuZ3RoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNsb3NlIHRoZSBub2RlIGlmIHRpdGxlIGRvZXMndCBjb250YWluIHNlYXJjaCB2YWx1ZVxuICAgICAgdGhpcy5uelRyZWVOb2RlLmlzTWF0Y2hlZCA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9zZWFyY2hWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56U2VhcmNoVmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2VhcmNoVmFsdWU7XG4gIH1cblxuICAvLyBPdXRwdXRcbiAgQE91dHB1dCgpIGNsaWNrTm9kZTogRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRibENsaWNrOiBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29udGV4dE1lbnU6IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjbGlja0NoZWNrQm94OiBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2xpY2tFeHBhbmQ6IEV2ZW50RW1pdHRlcjxOekZvcm1hdEVtaXRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBuekRyYWdTdGFydDogRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG56RHJhZ0VudGVyOiBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbnpEcmFnT3ZlcjogRXZlbnRFbWl0dGVyPE56Rm9ybWF0RW1pdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG56RHJhZ0xlYXZlOiBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbnpEcm9wOiBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbnpEcmFnRW5kOiBFdmVudEVtaXR0ZXI8TnpGb3JtYXRFbWl0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8vIGRlZmF1bHQgdmFyXG4gIHByZWZpeENscyA9ICdhbnQtdHJlZSc7XG4gIGhpZ2hsaWdodEtleXMgPSBbXTtcbiAgbnpOb2RlQ2xhc3MgPSB7fTtcbiAgbnpOb2RlU3dpdGNoZXJDbGFzcyA9IHt9O1xuICBuek5vZGVDb250ZW50Q2xhc3MgPSB7fTtcbiAgbnpOb2RlQ29udGVudEljb25DbGFzcyA9IHt9O1xuICBuek5vZGVDb250ZW50TG9hZGluZ0NsYXNzID0ge307XG4gIG56Tm9kZUNoaWxkcmVuQ2xhc3MgPSB7fTtcblxuICAvKipcbiAgICogZHJhZyB2YXJcbiAgICovXG4gIGRyYWdQb3MgPSAyO1xuICBkcmFnUG9zQ2xhc3M6IG9iamVjdCA9IHtcbiAgICAnMCcgOiAnZHJhZy1vdmVyJyxcbiAgICAnMScgOiAnZHJhZy1vdmVyLWdhcC1ib3R0b20nLFxuICAgICctMSc6ICdkcmFnLW92ZXItZ2FwLXRvcCdcbiAgfTtcblxuICAvKipcbiAgICogZGVmYXVsdCBzZXRcbiAgICovXG4gIF9uelRyZWVOb2RlOiBOelRyZWVOb2RlO1xuICBfc2VhcmNoVmFsdWUgPSAnJztcbiAgX256RXhwYW5kQWxsID0gZmFsc2U7XG5cbiAgZ2V0IGNhbkRyYWdnYWJsZSgpOiBib29sZWFuIHwgbnVsbCB7XG4gICAgcmV0dXJuICh0aGlzLm56RHJhZ2dhYmxlICYmIHRoaXMubnpUcmVlTm9kZSAmJiAhdGhpcy5uelRyZWVOb2RlLmlzRGlzYWJsZWQpID8gdHJ1ZSA6IG51bGw7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlck9wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLm56VHJlZU5vZGUuaXNFeHBhbmRlZCAmJiAhdGhpcy5uelRyZWVOb2RlLmlzTGVhZik7XG4gIH1cblxuICBnZXQgaXNTd2l0Y2hlckNsb3NlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoIXRoaXMubnpUcmVlTm9kZS5pc0V4cGFuZGVkICYmICF0aGlzLm56VHJlZU5vZGUuaXNMZWFmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXNldCBub2RlIGNsYXNzXG4gICAqL1xuICBzZXRDbGFzc01hcCgpOiB2b2lkIHtcbiAgICB0aGlzLm56Tm9kZUNsYXNzID0ge1xuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tdHJlZW5vZGUtZGlzYWJsZWRgIF06IHRoaXMubnpUcmVlTm9kZS5pc0Rpc2FibGVkXG4gICAgfTtcbiAgICB0aGlzLm56Tm9kZVN3aXRjaGVyQ2xhc3MgPSB7XG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1zd2l0Y2hlcmAgXSAgICAgOiB0cnVlLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tc3dpdGNoZXItbm9vcGAgXTogdGhpcy5uelRyZWVOb2RlLmlzTGVhZlxuICAgIH07XG4gICAgdGhpcy5uek5vZGVDb250ZW50Q2xhc3MgPSB7XG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1ub2RlLWNvbnRlbnQtd3JhcHBlcmAgXTogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5uek5vZGVDb250ZW50SWNvbkNsYXNzID0ge1xuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30taWNvbkVsZWAgXSAgICAgICAgOiB0cnVlLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30taWNvbl9fY3VzdG9taXplYCBdOiB0cnVlXG4gICAgfTtcbiAgICB0aGlzLm56Tm9kZUNvbnRlbnRMb2FkaW5nQ2xhc3MgPSB7XG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1pY29uRWxlYCBdOiB0cnVlXG4gICAgfTtcbiAgICB0aGlzLm56Tm9kZUNoaWxkcmVuQ2xhc3MgPSB7XG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1jaGlsZC10cmVlYCBdICAgICA6IHRydWUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1jaGlsZC10cmVlLW9wZW5gIF06IHRydWVcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGNsaWNrIG5vZGUgdG8gc2VsZWN0LCAyMDBtcyB0byBkYmwgY2xpY2tcbiAgICovXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyAnJGV2ZW50JyBdKVxuICBuekNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5uelRyZWVOb2RlLmlzU2VsZWN0YWJsZSkge1xuICAgICAgdGhpcy5uelRyZWVTZXJ2aWNlLnNldE5vZGVBY3RpdmUodGhpcy5uelRyZWVOb2RlLCB0aGlzLm56TXVsdGlwbGUpO1xuICAgIH1cbiAgICB0aGlzLmNsaWNrTm9kZS5lbWl0KHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnY2xpY2snLCB0aGlzLm56VHJlZU5vZGUsIGV2ZW50KSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkYmxjbGljaycsIFsgJyRldmVudCcgXSlcbiAgbnpEYmxDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5kYmxDbGljay5lbWl0KHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnZGJsY2xpY2snLCB0aGlzLm56VHJlZU5vZGUsIGV2ZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsgJyRldmVudCcgXSlcbiAgbnpDb250ZXh0TWVudShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5jb250ZXh0TWVudS5lbWl0KHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnY29udGV4dG1lbnUnLCB0aGlzLm56VHJlZU5vZGUsIGV2ZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogY29sbGFwc2Ugbm9kZVxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIF9jbGlja0V4cGFuZChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKCF0aGlzLm56VHJlZU5vZGUuaXNMb2FkaW5nICYmICF0aGlzLm56VHJlZU5vZGUuaXNMZWFmKSB7XG4gICAgICAvLyBzZXQgYXN5bmMgc3RhdGVcbiAgICAgIGlmICh0aGlzLm56QXN5bmNEYXRhICYmIHRoaXMubnpUcmVlTm9kZS5nZXRDaGlsZHJlbigpLmxlbmd0aCA9PT0gMCAmJiAhdGhpcy5uelRyZWVOb2RlLmlzRXhwYW5kZWQpIHtcbiAgICAgICAgdGhpcy5uelRyZWVOb2RlLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLm56VHJlZU5vZGUuc2V0RXhwYW5kZWQoIXRoaXMubnpUcmVlTm9kZS5pc0V4cGFuZGVkKTtcbiAgICAgIHRoaXMubnpUcmVlU2VydmljZS5zZXRFeHBhbmRlZE5vZGVMaXN0KHRoaXMubnpUcmVlTm9kZSk7XG4gICAgICB0aGlzLmNsaWNrRXhwYW5kLmVtaXQodGhpcy5uelRyZWVTZXJ2aWNlLmZvcm1hdEV2ZW50KCdleHBhbmQnLCB0aGlzLm56VHJlZU5vZGUsIGV2ZW50KSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIG5vZGVcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBfY2xpY2tDaGVja0JveChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgLy8gcmV0dXJuIGlmIG5vZGUgaXMgZGlzYWJsZWRcbiAgICBpZiAoaXNDaGVja0Rpc2FibGVkKHRoaXMubnpUcmVlTm9kZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5uelRyZWVOb2RlLnNldENoZWNrZWQoIXRoaXMubnpUcmVlTm9kZS5pc0NoZWNrZWQpO1xuICAgIHRoaXMubnpUcmVlU2VydmljZS5zZXRDaGVja2VkTm9kZUxpc3QodGhpcy5uelRyZWVOb2RlKTtcbiAgICBpZiAoIXRoaXMubnpDaGVja1N0cmljdGx5KSB7XG4gICAgICB0aGlzLm56VHJlZVNlcnZpY2UuY29uZHVjdCh0aGlzLm56VHJlZU5vZGUpO1xuICAgIH1cbiAgICB0aGlzLmNsaWNrQ2hlY2tCb3guZW1pdCh0aGlzLm56VHJlZVNlcnZpY2UuZm9ybWF0RXZlbnQoJ2NoZWNrJywgdGhpcy5uelRyZWVOb2RlLCBldmVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRyYWcgZXZlbnRcbiAgICogQHBhcmFtIGVcbiAgICovXG4gIGNsZWFyRHJhZ0NsYXNzKCk6IHZvaWQge1xuICAgIGNvbnN0IGRyYWdDbGFzcyA9IFsgJ2RyYWctb3Zlci1nYXAtdG9wJywgJ2RyYWctb3Zlci1nYXAtYm90dG9tJywgJ2RyYWctb3ZlcicgXTtcbiAgICBkcmFnQ2xhc3MuZm9yRWFjaChlID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5kcmFnRWxlbWVudC5uYXRpdmVFbGVtZW50LCBlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZURyYWdTdGFydChlOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRyeSB7XG4gICAgICAvLyBpZSB0aHJvdyBlcnJvclxuICAgICAgLy8gZmlyZWZveC1uZWVkLWl0XG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgJycpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBlbXB0eVxuICAgIH1cbiAgICB0aGlzLm56VHJlZVNlcnZpY2Uuc2V0U2VsZWN0ZWROb2RlKHRoaXMubnpUcmVlTm9kZSk7XG4gICAgdGhpcy5uelRyZWVOb2RlLnNldEV4cGFuZGVkKGZhbHNlKTtcbiAgICB0aGlzLm56RHJhZ1N0YXJ0LmVtaXQodGhpcy5uelRyZWVTZXJ2aWNlLmZvcm1hdEV2ZW50KCdkcmFnc3RhcnQnLCBudWxsLCBlKSk7XG4gIH1cblxuICBoYW5kbGVEcmFnRW50ZXIoZTogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgLy8gcmVzZXQgcG9zaXRpb25cbiAgICB0aGlzLmRyYWdQb3MgPSAyO1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICBpZiAoKHRoaXMubnpUcmVlTm9kZSAhPT0gdGhpcy5uelRyZWVTZXJ2aWNlLmdldFNlbGVjdGVkTm9kZSgpKSAmJiAhdGhpcy5uelRyZWVOb2RlLmlzTGVhZikge1xuICAgICAgICB0aGlzLm56VHJlZU5vZGUuc2V0RXhwYW5kZWQodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5uekRyYWdFbnRlci5lbWl0KHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnZHJhZ2VudGVyJywgdGhpcy5uelRyZWVOb2RlLCBlKSk7XG4gIH1cblxuICBoYW5kbGVEcmFnT3ZlcihlOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBkcm9wUG9zaXRpb24gPSB0aGlzLm56VHJlZVNlcnZpY2UuY2FsY0Ryb3BQb3NpdGlvbihlKTtcbiAgICBpZiAodGhpcy5kcmFnUG9zICE9PSBkcm9wUG9zaXRpb24pIHtcbiAgICAgIHRoaXMuY2xlYXJEcmFnQ2xhc3MoKTtcbiAgICAgIHRoaXMuZHJhZ1BvcyA9IGRyb3BQb3NpdGlvbjtcbiAgICAgIC8vIGxlYWYgbm9kZSB3aWxsIHBhc3NcbiAgICAgIGlmICghKHRoaXMuZHJhZ1BvcyA9PT0gMCAmJiB0aGlzLm56VHJlZU5vZGUuaXNMZWFmKSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZHJhZ0VsZW1lbnQubmF0aXZlRWxlbWVudCwgdGhpcy5kcmFnUG9zQ2xhc3NbIHRoaXMuZHJhZ1BvcyBdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5uekRyYWdPdmVyLmVtaXQodGhpcy5uelRyZWVTZXJ2aWNlLmZvcm1hdEV2ZW50KCdkcmFnb3ZlcicsIHRoaXMubnpUcmVlTm9kZSwgZSkpO1xuICB9XG5cbiAgaGFuZGxlRHJhZ0xlYXZlKGU6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJEcmFnQ2xhc3MoKTtcbiAgICB9KTtcbiAgICB0aGlzLm56RHJhZ0xlYXZlLmVtaXQodGhpcy5uelRyZWVTZXJ2aWNlLmZvcm1hdEV2ZW50KCdkcmFnbGVhdmUnLCB0aGlzLm56VHJlZU5vZGUsIGUpKTtcbiAgfVxuXG4gIGhhbmRsZURyYWdEcm9wKGU6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLmNsZWFyRHJhZ0NsYXNzKCk7XG4gICAgICBpZiAodGhpcy5uelRyZWVTZXJ2aWNlLmdldFNlbGVjdGVkTm9kZSgpID09PSB0aGlzLm56VHJlZU5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmRyYWdQb3MgPT09IDAgJiYgdGhpcy5uelRyZWVOb2RlLmlzTGVhZikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBwYXNzIGlmIG5vZGUgaXMgbGVhZk5vXG4gICAgICBpZiAodGhpcy5uekJlZm9yZURyb3ApIHtcbiAgICAgICAgdGhpcy5uekJlZm9yZURyb3Aoe1xuICAgICAgICAgIGRyYWdOb2RlOiB0aGlzLm56VHJlZVNlcnZpY2UuZ2V0U2VsZWN0ZWROb2RlKCksXG4gICAgICAgICAgbm9kZSAgICA6IHRoaXMubnpUcmVlTm9kZSxcbiAgICAgICAgICBwb3MgICAgIDogdGhpcy5kcmFnUG9zXG4gICAgICAgIH0pLnN1YnNjcmliZSgoY2FuRHJvcDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIGlmIChjYW5Ecm9wKSB7XG4gICAgICAgICAgICB0aGlzLm56VHJlZVNlcnZpY2UuZHJvcEFuZEFwcGx5KHRoaXMubnpUcmVlTm9kZSwgdGhpcy5kcmFnUG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5uekRyb3AuZW1pdCh0aGlzLm56VHJlZVNlcnZpY2UuZm9ybWF0RXZlbnQoJ2Ryb3AnLCB0aGlzLm56VHJlZU5vZGUsIGUpKTtcbiAgICAgICAgICB0aGlzLm56RHJhZ0VuZC5lbWl0KHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnZHJhZ2VuZCcsIHRoaXMubnpUcmVlTm9kZSwgZSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5uelRyZWVOb2RlKSB7XG4gICAgICAgIHRoaXMubnpUcmVlU2VydmljZS5kcm9wQW5kQXBwbHkodGhpcy5uelRyZWVOb2RlLCB0aGlzLmRyYWdQb3MpO1xuICAgICAgICB0aGlzLm56RHJvcC5lbWl0KHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnZHJvcCcsIHRoaXMubnpUcmVlTm9kZSwgZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlRHJhZ0VuZChlOiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAvLyBpZiB1c2VyIGRvIG5vdCBjdXN0b20gYmVmb3JlRHJvcFxuICAgICAgaWYgKCF0aGlzLm56QmVmb3JlRHJvcCkge1xuICAgICAgICB0aGlzLm56VHJlZVNlcnZpY2Uuc2V0U2VsZWN0ZWROb2RlKG51bGwpO1xuICAgICAgICB0aGlzLm56RHJhZ0VuZC5lbWl0KHRoaXMubnpUcmVlU2VydmljZS5mb3JtYXRFdmVudCgnZHJhZ2VuZCcsIHRoaXMubnpUcmVlTm9kZSwgZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuelRyZWVTZXJ2aWNlOiBOelRyZWVTZXJ2aWNlLCBwcml2YXRlIG5nWm9uZTogTmdab25lLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBuZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZnJvbUV2ZW50KHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2RyYWdzdGFydCcpLnN1YnNjcmliZSgoZTogRHJhZ0V2ZW50KSA9PiB0aGlzLmhhbmRsZURyYWdTdGFydChlKSk7XG4gICAgICBmcm9tRXZlbnQodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZHJhZ2VudGVyJykuc3Vic2NyaWJlKChlOiBEcmFnRXZlbnQpID0+IHRoaXMuaGFuZGxlRHJhZ0VudGVyKGUpKTtcbiAgICAgIGZyb21FdmVudCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkcmFnb3ZlcicpLnN1YnNjcmliZSgoZTogRHJhZ0V2ZW50KSA9PiB0aGlzLmhhbmRsZURyYWdPdmVyKGUpKTtcbiAgICAgIGZyb21FdmVudCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsICdkcmFnbGVhdmUnKS5zdWJzY3JpYmUoKGU6IERyYWdFdmVudCkgPT4gdGhpcy5oYW5kbGVEcmFnTGVhdmUoZSkpO1xuICAgICAgZnJvbUV2ZW50KHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwgJ2Ryb3AnKS5zdWJzY3JpYmUoKGU6IERyYWdFdmVudCkgPT4gdGhpcy5oYW5kbGVEcmFnRHJvcChlKSk7XG4gICAgICBmcm9tRXZlbnQodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCAnZHJhZ2VuZCcpLnN1YnNjcmliZSgoZTogRHJhZ0V2ZW50KSA9PiB0aGlzLmhhbmRsZURyYWdFbmQoZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgfVxufVxuIl19