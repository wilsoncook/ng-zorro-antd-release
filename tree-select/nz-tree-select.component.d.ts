import { FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NzFormatEmitEvent } from '../tree/interface';
import { NzTreeNode } from '../tree/nz-tree-node';
import { NzTreeComponent } from '../tree/nz-tree.component';
export declare class NzTreeSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    private document;
    private element;
    private renderer;
    private cdr;
    private overlay;
    private viewContainerRef;
    private nodes;
    isComposing: boolean;
    isDestroy: boolean;
    inputValue: string;
    dropDownClassMap: {
        [className: string]: boolean;
    };
    dropDownPosition: 'top' | 'center' | 'bottom';
    overlayRef: OverlayRef;
    portal: TemplatePortal<{}>;
    positionStrategy: FlexibleConnectedPositionStrategy;
    overlayBackdropClickSubscription: Subscription;
    selectionChangeSubscription: Subscription;
    selectedNodes: NzTreeNode[];
    value: string[];
    nzAllowClear: boolean;
    nzShowExpand: boolean;
    nzDropdownMatchSelectWidth: boolean;
    nzCheckable: boolean;
    nzShowSearch: boolean;
    nzDisabled: boolean;
    nzShowLine: boolean;
    nzAsyncData: boolean;
    nzMultiple: boolean;
    nzDefaultExpandAll: boolean;
    nzOpen: boolean;
    nzSize: string;
    nzPlaceHolder: string;
    nzDropdownStyle: {
        [key: string]: string;
    };
    nzDefaultExpandedKeys: string[];
    nzDisplayWith: (node: NzTreeNode) => string;
    nzOpenChange: EventEmitter<boolean>;
    nzCleared: EventEmitter<void>;
    nzRemoved: EventEmitter<NzTreeNode>;
    nzExpandChange: EventEmitter<NzFormatEmitEvent>;
    nzTreeClick: EventEmitter<NzFormatEmitEvent>;
    nzTreeCheckBoxChange: EventEmitter<NzFormatEmitEvent>;
    nzNodes: NzTreeNode[];
    inputElement: ElementRef;
    treeSelect: ElementRef;
    dropdownTemplate: any;
    treeRef: NzTreeComponent;
    onChange: (value: string[] | string) => void;
    onTouched: () => void;
    readonly placeHolderDisplay: string;
    readonly searchDisplay: string;
    readonly isMultiple: boolean;
    readonly selectedValueDisplay: {
        [key: string]: string;
    };
    constructor(document: any, // tslint:disable-line:no-any
    element: ElementRef, renderer: Renderer2, cdr: ChangeDetectorRef, overlay: Overlay, viewContainerRef: ViewContainerRef);
    trigger(): void;
    openDropdown(): void;
    closeDropDown(): void;
    onKeyDownInput(e: KeyboardEvent): void;
    setInputValue(value: string): void;
    detachOverlay(): void;
    removeSelected(node: NzTreeNode, emit?: boolean): void;
    focusOnInput(): void;
    attachOverlay(): void;
    getOverlayConfig(): OverlayConfig;
    getOverlayPosition(): PositionStrategy;
    subscribeOverlayBackdropClick(): Subscription;
    subscribeSelectionChange(): Subscription;
    updateSelectedNodes(): void;
    updatePosition(): void;
    updateInputWidth(): void;
    onClearSelection(): void;
    updateDropDownClassMap(): void;
    updateCdkConnectedOverlayStatus(): void;
    writeValue(value: string[] | string): void;
    registerOnChange(fn: (_: string[] | string) => void): void;
    registerOnTouched(fn: () => void): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    setDisabledState(isDisabled: boolean): void;
}