"use strict";
cc._RF.push(module, '799d8/OTSdDSZ7hf7eIbxjZ', 'hero');
// script/hero.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroState;
(function (HeroState) {
    HeroState[HeroState["Stand"] = 1] = "Stand";
    HeroState[HeroState["Attack"] = 2] = "Attack";
})(HeroState || (HeroState = {}));
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = '英雄脚本';
        _this._speed = 200;
        _this._sp = new cc.Vec2(0, 0);
        _this._input = {};
        _this._heroState = HeroState.Stand;
        _this._anima = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this._anima = 'idle';
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.animationFinished, this);
    };
    NewClass.prototype.onDestroy = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.animationFinished, this);
    };
    NewClass.prototype.onKeyDown = function (e) {
        this._input[e.keyCode] = 1;
    };
    NewClass.prototype.onKeyUp = function (e) {
        this._input[e.keyCode] = 0;
    };
    NewClass.prototype.animationFinished = function (event, data) {
        if (data.name == 'attack') {
            if (this._anima != 'idle') {
                this._heroState = HeroState.Stand;
                this.setHeroAni('idle');
            }
        }
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.setHeroAni = function (anima) {
        if (this._anima === anima)
            return;
        this._anima = anima;
        this.node.getComponent(cc.Animation).play(this._anima);
    };
    NewClass.prototype.update = function (dt) {
        var anima = 'idle';
        if (this._input[cc.macro.KEY.j]) {
            this._heroState = HeroState.Attack;
        }
        switch (this._heroState) {
            case HeroState.Stand:
                var scaleX = Math.abs(this.node.scaleX);
                var lv = this.node.getComponent(cc.RigidBody).linearVelocity;
                if (this._input[cc.macro.KEY.a] || this._input[cc.macro.KEY.left]) {
                    this._sp.x = -1;
                    if (this.node.scaleX === scaleX) {
                        this.node.scaleX = -scaleX;
                    }
                }
                else if (this._input[cc.macro.KEY.d] || this._input[cc.macro.KEY.right]) {
                    this._sp.x = 1;
                    if (this.node.scaleX !== scaleX) {
                        this.node.scaleX = scaleX;
                    }
                }
                else {
                    this._sp.x = 0;
                }
                if (this._sp.x) {
                    lv.x = this._sp.x * this._speed;
                    anima = 'run';
                }
                else {
                    lv.x = 0;
                    anima = 'idle';
                }
                this.node.getComponent(cc.RigidBody).linearVelocity = lv;
                break;
            case HeroState.Attack:
                anima = 'attack';
                console.log('attack');
                break;
        }
        this.setHeroAni(anima);
    };
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();