
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/hero.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxoZXJvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsa0JBQXFDLEVBQW5DLG9CQUFPLEVBQUUsc0JBQTBCLENBQUM7QUFFNUMsSUFBSyxTQUdKO0FBSEQsV0FBSyxTQUFTO0lBQ1YsMkNBQVMsQ0FBQTtJQUNULDZDQUFVLENBQUE7QUFDZCxDQUFDLEVBSEksU0FBUyxLQUFULFNBQVMsUUFHYjtBQUdEO0lBQXNDLDRCQUFZO0lBRGxEO1FBQUEscUVBc0dDO1FBbEdHLFVBQUksR0FBVyxNQUFNLENBQUM7UUFFZCxZQUFNLEdBQVcsR0FBRyxDQUFDO1FBQ3JCLFNBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLFlBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixnQkFBVSxHQUFjLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDeEMsWUFBTSxHQUFXLElBQUksQ0FBQzs7SUE0RmxDLENBQUM7SUEzRkcsd0JBQXdCO0lBRXhCLHlCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlB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RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNCLENBQUM7SUFqR0Q7UUFEQyxRQUFROzBDQUNhO0lBSEwsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXFHNUI7SUFBRCxlQUFDO0NBckdELEFBcUdDLENBckdxQyxFQUFFLENBQUMsU0FBUyxHQXFHakQ7a0JBckdvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gSGVyb1N0YXRlIHtcclxuICAgIFN0YW5kID0gMSxcclxuICAgIEF0dGFjayA9IDIsXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0NsYXNzIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHRleHQ6IHN0cmluZyA9ICfoi7Hpm4TohJrmnKwnO1xyXG5cclxuICAgIHByaXZhdGUgX3NwZWVkOiBudW1iZXIgPSAyMDA7XHJcbiAgICBwcml2YXRlIF9zcCA9IG5ldyBjYy5WZWMyKDAsIDApO1xyXG4gICAgcHJpdmF0ZSBfaW5wdXQgPSB7fTtcclxuICAgIHByaXZhdGUgX2hlcm9TdGF0ZTogSGVyb1N0YXRlID0gSGVyb1N0YXRlLlN0YW5kO1xyXG4gICAgcHJpdmF0ZSBfYW5pbWE6IHN0cmluZyA9IG51bGw7XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX2FuaW1hID0gJ2lkbGUnO1xyXG5cclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMub25LZXlEb3duLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELFxyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkZpbmlzaGVkLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbktleURvd24sIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5vZmYoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwgdGhpcy5hbmltYXRpb25GaW5pc2hlZCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlEb3duKGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuX2lucHV0W2Uua2V5Q29kZV0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5VXAoZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5faW5wdXRbZS5rZXlDb2RlXSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0aW9uRmluaXNoZWQoZXZlbnQ6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKGRhdGEubmFtZSA9PSAnYXR0YWNrJykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYW5pbWEgIT0gJ2lkbGUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oZXJvU3RhdGUgPSBIZXJvU3RhdGUuU3RhbmQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhlcm9BbmkoJ2lkbGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0SGVyb0FuaShhbmltYTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hID09PSBhbmltYSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2FuaW1hID0gYW5pbWE7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkodGhpcy5fYW5pbWEpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDogYW55KSB7XHJcbiAgICAgICAgbGV0IGFuaW1hID0gJ2lkbGUnO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnB1dFtjYy5tYWNyby5LRVkual0pIHtcclxuICAgICAgICAgICAgdGhpcy5faGVyb1N0YXRlID0gSGVyb1N0YXRlLkF0dGFjaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5faGVyb1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSGVyb1N0YXRlLlN0YW5kOlxyXG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlWCA9IE1hdGguYWJzKHRoaXMubm9kZS5zY2FsZVgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGx2ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbnB1dFtjYy5tYWNyby5LRVkuYV0gfHwgdGhpcy5faW5wdXRbY2MubWFjcm8uS0VZLmxlZnRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3AueCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuc2NhbGVYID09PSBzY2FsZVgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IC1zY2FsZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faW5wdXRbY2MubWFjcm8uS0VZLmRdIHx8IHRoaXMuX2lucHV0W2NjLm1hY3JvLktFWS5yaWdodF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcC54ID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLnNjYWxlWCAhPT0gc2NhbGVYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBzY2FsZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3AueCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NwLngpIHtcclxuICAgICAgICAgICAgICAgICAgICBsdi54ID0gdGhpcy5fc3AueCAqIHRoaXMuX3NwZWVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hID0gJ3J1bic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hID0gJ2lkbGUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpLmxpbmVhclZlbG9jaXR5ID0gbHY7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIEhlcm9TdGF0ZS5BdHRhY2s6XHJcbiAgICAgICAgICAgICAgICBhbmltYSA9ICdhdHRhY2snO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F0dGFjaycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldEhlcm9BbmkoYW5pbWEpO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=