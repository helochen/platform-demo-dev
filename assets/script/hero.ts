// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

enum HeroState {
    Stand = 1,
    Attack = 2,
}

@ccclass
export default class NewClass extends cc.Component {

    @property
    text: string = '英雄脚本';

    private _speed: number = 200;
    private _sp = new cc.Vec2(0, 0);
    private _input = {};
    private _heroState: HeroState = HeroState.Stand;
    private _anima: string = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this._anima = 'idle';

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED,
            this.animationFinished, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.getComponent(cc.Animation).off(cc.Animation.EventType.FINISHED, this.animationFinished, this);
    }

    onKeyDown(e: any) {
        this._input[e.keyCode] = 1;
    }

    onKeyUp(e: any) {
        this._input[e.keyCode] = 0;
    }

    animationFinished(event: string, data: any) {
        if (data.name == 'attack') {
            if (this._anima != 'idle') {
                this._heroState = HeroState.Stand;
                this.setHeroAni('idle');
            }
        }
    }

    start() {

    }

    setHeroAni(anima: string) {
        if (this._anima === anima)
            return;
        this._anima = anima;
        this.node.getComponent(cc.Animation).play(this._anima);
    }

    update(dt: any) {
        let anima = 'idle';
        if (this._input[cc.macro.KEY.j]) {
            this._heroState = HeroState.Attack;
        }

        switch (this._heroState) {
            case HeroState.Stand:
                let scaleX = Math.abs(this.node.scaleX);
                let lv = this.node.getComponent(cc.RigidBody).linearVelocity;

                if (this._input[cc.macro.KEY.a] || this._input[cc.macro.KEY.left]) {
                    this._sp.x = -1;
                    if (this.node.scaleX === scaleX) {
                        this.node.scaleX = -scaleX;
                    }

                } else if (this._input[cc.macro.KEY.d] || this._input[cc.macro.KEY.right]) {
                    this._sp.x = 1;
                    if (this.node.scaleX !== scaleX) {
                        this.node.scaleX = scaleX;
                    }

                } else {
                    this._sp.x = 0;
                }

                if (this._sp.x) {
                    lv.x = this._sp.x * this._speed;
                    anima = 'run';
                } else {
                    lv.x = 0;
                    anima = 'idle';
                }
                this.node.getComponent(cc.RigidBody).linearVelocity = lv;
                break
            case HeroState.Attack:
                anima = 'attack';
                console.log('attack');
                break;
        }

        this.setHeroAni(anima);

    }
}
