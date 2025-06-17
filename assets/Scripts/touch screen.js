
cc.Class({
    extends: cc.Component,

    properties: {
       //bj_1:cc.Node,
       //bj_2:cc.Node,
       player:cc.Node,
       //bullet:cc.Prefab,
    },

    onLoad () 
    {
        //this.bullet_sx=0;
        this.player.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this) 
        //手指按下时开始监控
        this.player.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        //手指松开时终止监控
        this.player.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
        //终止对该事件监控
    },
    onTouchMove(event){
       var oldPos = event.getLocation();
       //console.log(oldPos,this.role.x,this.role.y);
       var delta = event.getDelta();
       this.player.x += delta.x;
       this.player.y += delta.y;
    },
    onTouchEnd:function(){
        cc.log('触摸结束');
    },
    onTouchCancel:function(){
        cc.log('触摸取消')
    },
   /* MoveBj:function(){
        this.bj_1.y -= 8;
        this.bj_2.y -= 8;
        if(this.bj_1.y <= -this.bj_1.height)
            this.bj_1.y = this.bj_1.height;
        if(this.bj_2.y <= -this.bj_1.height)
            this.bj_2.y = this.bj_1.height;
    },*/
   /* CreateBullet:function(){
        var Bullet = cc.instantiate(this.bullet);
        this.node.addChild(Bullet);
        Bullet.setPosition(this.hero.x,this.hero.y + this.hero.height/2+10);
        //Bullet.getComponent('bullet').game = this;
    },*/
    update (dt)
    {
        /*this.bullet_sx++;
        if(this.bullet_sx >= 16)
        {
            this.CreateBullet();
            this.bullet_sx=0;
        }
        this.MoveBj();   //主游戏场景轮番移动的函数*/
    },
});

