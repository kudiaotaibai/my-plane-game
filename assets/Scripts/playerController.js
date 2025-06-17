cc.Class({
    extends: cc.Component,

    properties: {

        bullet:{
            default: null,
            type: cc.Prefab
        },


        BulletManager: cc.Node,

        duck: cc.Prefab,
        fly: cc.Prefab,
        EnemyController: cc.Node,

        bulletAudio: {
            default: null,
            type: cc.AudioClip
        },

        player: {
            default: null,
            type: cc.Node
        },
        isShoot:null,
    },

   
    onLoad: function () {
       
        var isShoot=false;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
           
            
            var anim1 = cc.find("Canvas/Player").getComponent(cc.Animation);
            anim1.play('player');
            cc.find("Canvas/Player").getComponent("playerController").isShoot=true;
            

        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
         
            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
            cc.find("Canvas/Player").getComponent("playerController").isShoot=true;
            if(this.x>320)
            {
                this.x=320;
            }
            else if(this.x<-320)
            {
                this.x=-320;
            }   
            else
            {
                this.node.x = this.x ;
            }
           
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            
            var anim1 = cc.find("Canvas/Player").getComponent(cc.Animation);
            anim1.stop('player');
           
            cc.find("Canvas/Player").getComponent("playerController").isShoot=false;
          
        }, this.node);
        
    },
   

    onCollisionEnter: function (other, self) {
        var pos = this.node.getPosition();
        cc.find("Canvas").getComponent("Game").createflash(pos);
        window.Global.loseTTL();
        if (window.Global.live < 0) {
            window.Global.live = 0;
            cc.find("Canvas").getComponent("Game").createboom(pos);
            this.scheduleOnce(function () { cc.director.loadScene('Game Over'); }, 0.4);
            this.scheduleOnce(function () { this.node.active = false; }, 0.5);

        }
    },

    start () {
        //??????????
        //????????????????????��?1
        //?????0.1?????????????????????????
        this.bulletTime = 0.2;
        this.duckTime = 5;
        this.flyTime = 5;


    },

   

    update(dt) {

        if(this.isShoot)
        {
           
            this.bulletTime -= dt;
        if (this.bulletTime <= 0) {
            //??????
            this.bulletTime = 0.2;
            let bulletNode_1 = cc.instantiate(this.bullet);
            let bulletNode_2 = cc.instantiate(this.bullet);
            //????????
            bulletNode_1.y = this.node.y + 40;
            bulletNode_1.x = this.node.x - 55;
            bulletNode_2.y = this.node.y + 40;
            bulletNode_2.x = this.node.x + 55;
            //????????????BulletManager?????
            this.BulletManager.addChild(bulletNode_1);
            this.BulletManager.addChild(bulletNode_2);
            //?????��
            cc.audioEngine.playEffect(this.bulletAudio, false);
        }

        }
        

        //????????
        this.duckTime -= dt;
        if (this.duckTime <= 0) {
            //??????
            this.duckTime = 5;
            let duckNode = cc.instantiate(this.duck);
            //????????
            duckNode.y = 960 / 2;
            duckNode.x = Math.random() * 640 - 640 / 2;

            //????????????EnemyController?????
            this.EnemyController.addChild(duckNode);
        }

        //?????????
        this.flyTime -= dt;
        if (this.flyTime <= 0) {
            //??????
            this.flyTime = 5;
            let flyNode = cc.instantiate(this.fly);
            //????????
            flyNode.y = 960 / 2;
            flyNode.x = Math.random() * 640 - 640 / 2;

            //????????????EnemyController?????
            this.EnemyController.addChild(flyNode);
        }

    },
});
