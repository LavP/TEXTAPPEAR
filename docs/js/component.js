console.log('compoenent readed!');

Vue.component('color-cont',{
    props:['now-title-color','now-text-color','target'],
    template:`
        <div class='color-cont funcParts'>
            <div class='func-view'>
                <ul>
                    <li id="H-con">
                        <h4>H - 色相 {{ scrollH }}°</h4>
                        <div v-bind:style='{ background : "linear-gradient(90deg, hsl(0, "+scrollS+"%, "+scrollL+"%) 0%, hsl(45, "+scrollS+"%, "+scrollL+"%) 12.5%, hsl(84, "+scrollS+"%, "+scrollL+"%) 25%, hsl(135, "+scrollS+"%, "+scrollL+"%) 37.5%, hsl(180, "+scrollS+"%, "+scrollL+"%) 50%, hsl(225, "+scrollS+"%, "+scrollL+"%) 62.5%, hsl(274, "+scrollS+"%, "+scrollL+"%) "+scrollL+"%, hsl(315, "+scrollS+"%, "+scrollL+"%) 87.5%, hsl(0, "+scrollS+"%, "+scrollL+"%) 99.5%)" }'><!--スライダーの表示--></div>
                    </li>
                    <li id="S-con">
                        <h4>S - 彩度 {{ scrollS }}%</h4>
                        <div v-bind:style='{ background : "linear-gradient(90deg, hsl("+scrollH+", 0%, "+scrollL+"%), hsl("+scrollH+", 100%, "+scrollL+"%))" }'><!--スライダーの表示--></div>
                    </li>
                    <li id="L-con">
                        <h4>L - 明度 {{ scrollL }}%</h4>
                        <div v-bind:style='{ background : "linear-gradient(90deg, hsl("+scrollH+", "+scrollS+"%, 0%), hsl("+scrollH+", "+scrollS+"%, 100%))" }'><!--スライダーの表示--></div>
                    </li>
                </ul>
            </div>
            <div class='func-sensor' id='hslSensor'>
                <div id="H-Sensor" v-on:scroll='getScrollTop'>
                    <div><!--inner--></div>
                </div>
                <div id="S-Sensor" v-on:scroll='getScrollTop'>
                    <div><!--inner--></div>
                </div>
                <div id="L-Sensor" v-on:scroll='getScrollTop'> 
                    <div><!--inner--></div>
                </div>
            </div>
        </div>
    `,
    methods: {
        getScrollTop:function(){
            //Get scrollTop value
            this.scrollH = document.querySelector('#H-Sensor').scrollLeft;
            this.scrollS = document.querySelector('#S-Sensor').scrollLeft;
            this.scrollL = document.querySelector('#L-Sensor').scrollLeft;
            //Convert to proper value
            this.scrollH = this.scrollH * 1;
            this.scrollS = (this.scrollS * 1) / 2;
            this.scrollL = (this.scrollL * 1) / 2;

            //Pass scroll value to parent
            this.$emit('send-from-child',this.scrollH,this.scrollS,this.scrollL);
        }
    },
    data:function(){
        if(this.target == "title"){
            return{
                scrollH:this.nowTitleColor.h,
                scrollS:this.nowTitleColor.s,
                scrollL:this.nowTitleColor.b
            }
        }else{
            return{
                scrollH:this.nowTextColor.h,
                scrollS:this.nowTextColor.s,
                scrollL:this.nowTextColor.b
            }
        }
        
    },
    mounted() {
        if(this.target == 'title'){
            document.querySelector('#H-Sensor').scrollTo(this.nowTitleColor.h,0)
            document.querySelector('#S-Sensor').scrollTo(this.nowTitleColor.s,0)
            document.querySelector('#L-Sensor').scrollTo(this.nowTitleColor.l,0)
        }else{
            document.querySelector('#H-Sensor').scrollTo(this.nowTextColor.h,0)
            document.querySelector('#S-Sensor').scrollTo(this.nowTextColor.s,0)
            document.querySelector('#L-Sensor').scrollTo(this.nowTextColor.l,0)
        }
        
    }
})

Vue.component('font-size-cont',{
    template:`
        <div class='font-size-cont funcParts'>
            <div class='func-view'>
                <img src='images/func-big-small.svg'>
            </div>
            <div class='func-sensor' id='test'  v-on:scroll='getScrollTop'>
                <div id='heightLowSensor'></div>
            </div>
        </div>
    `,
    methods: {
        getScrollTop:function(){
            //Get scrollTop value
            let scroll = document.querySelector('#test').scrollTop;
            //Convert to proper value
            scroll = scroll * 0.1;
            //Pass scroll value to parent
            this.$emit('send-from-child',scroll);
        }
    }
})


Vue.component('font-family-cont',{
    template:`
        <div class='font-family-cont funcParts'>
            <div class='func-view'>
                <ul>
                    <li v-for='font in fontList' v-on:click='selectFont = font; getSelectValue()' v-bind:class='{ selected : selectFont == font }' v-bind:style='{ fontFamily : font }'><span>新しい時代のこころを映すタイプフェイスデザイン</span></li>
                </ul>
            </div>
        </div>
    `,
    methods: {
        getSelectValue:function(){
            //Pass scroll value to parent
            this.$emit('send-from-child',this.selectFont);
        }
    },
    data:function(){
        return{
            selectFont:'left',
            fontList:['ro-shino-std','tbchibirgothicplusk-pro','tbcinergothic-std','a-otf-midashi-mi-ma31-pr6n','a-otf-futo-min-a101-pr6n','a-otf-gothic-bbb-pr6n','a-otf-futo-go-b101-pr6n','donguri-kana','ta-rb']
        }
    }
})


Vue.component('line-height-cont',{
    template:`
        <div class='line-height-cont funcParts'>
            <div class='func-view'>
                <img src='images/func-big-small.svg'>
            </div>
            <div class='func-sensor' id='test'  v-on:scroll='getScrollTop'>
                <div id='heightLowSensor'></div>
            </div>
        </div>
    `,
    methods: {
        getScrollTop:function(){
            //Get scrollTop value
            let scroll = document.querySelector('#test').scrollTop;
            //Convert to proper value
            scroll = scroll * 0.01;
            //Pass scroll value to parent
            this.$emit('send-from-child',scroll);
        }
    }
})


Vue.component('text-align-cont',{
    template:`
        <div class='text-align-cont funcParts'>
            <div class='func-view'>
                <ul>
                    <li v-on:click='selectAlign = "left"; getSelectValue()' v-bind:class='{ selected : selectAlign == "left" }'><img src="images/alignLeft.svg" alt="←"><span>右揃え配置</span></li>
                    <li v-on:click='selectAlign = "center"; getSelectValue()' v-bind:class='{ selected : selectAlign == "center" }'><img src="images/alignCenter.svg" alt="≡"><span>中央揃え配置</span></li>
                    <li v-on:click='selectAlign = "right"; getSelectValue()' v-bind:class='{ selected : selectAlign == "right" }'><img src="images/alignRight.svg" alt="→"><span>左揃え配置</span></li>
                    <li v-on:click='selectAlign = "justify"; getSelectValue()' v-bind:class='{ selected : selectAlign == "justify" }'><img src="images/alignJustify.svg" alt="↔"><span>右揃え均等配置</span></li>
                </ul>
            </div>
        </div>
    `,
    methods: {
        getSelectValue:function(){
            //Pass scroll value to parent
            this.$emit('send-from-child',this.selectAlign);
        }
    },
    data:function(){
        return{
            selectAlign:'left'
        }
    }
})


Vue.component('letter-spacing-cont',{
    template:`
        <div class='letter-spacing-cont funcParts'>
            <div class='func-view'>
                <img src='images/func-big-small.svg'>
            </div>
            <div class='func-sensor' id='test'  v-on:scroll='getScrollTop'>
                <div id='heightLowSensor'></div>
            </div>
        </div>
    `,
    methods: {
        getScrollTop:function(){
            //Get scrollTop value
            let scroll = document.querySelector('#test').scrollTop;
            //Convert to proper value
            scroll = scroll * 0.001;
            //Pass scroll value to parent
            this.$emit('send-from-child',scroll);
        }
    }
})


Vue.component('padding-cont',{
    template:`
        <div class='padding-cont funcParts'>
            <div class='func-view'>
                この機能はまだサポートされていません
            </div>
        </div>
    `,
    methods: {
        getScrollTop:function(){
            //Get scrollTop value
            let scroll = document.querySelector('#test').scrollTop;
            //Convert to proper value
            scroll = scroll * 0.1;
            //Pass scroll value to parent
            this.$emit('send-from-child',scroll);
        }
    }
})


Vue.component('background-color-cont',{
    props:['now-background-color'],
    template:`
        <div class='background-color-cont funcParts'>
            <div class='func-view'>
                <ul>
                    <li id="H-con">
                        <h4>H - 色相 {{ scrollH }}°</h4>
                        <div v-bind:style='{ background : "linear-gradient(90deg, hsl(0, "+scrollS+"%, "+scrollL+"%) 0%, hsl(45, "+scrollS+"%, "+scrollL+"%) 12.5%, hsl(84, "+scrollS+"%, "+scrollL+"%) 25%, hsl(135, "+scrollS+"%, "+scrollL+"%) 37.5%, hsl(180, "+scrollS+"%, "+scrollL+"%) 50%, hsl(225, "+scrollS+"%, "+scrollL+"%) 62.5%, hsl(274, "+scrollS+"%, "+scrollL+"%) "+scrollL+"%, hsl(315, "+scrollS+"%, "+scrollL+"%) 87.5%, hsl(0, "+scrollS+"%, "+scrollL+"%) 99.5%)" }'><!--スライダーの表示--></div>
                    </li>
                    <li id="S-con">
                        <h4>S - 彩度 {{ scrollS }}%</h4>
                        <div v-bind:style='{ background : "linear-gradient(90deg, hsl("+scrollH+", 0%, "+scrollL+"%), hsl("+scrollH+", 100%, "+scrollL+"%))" }'><!--スライダーの表示--></div>
                    </li>
                    <li id="L-con">
                        <h4>L - 明度 {{ scrollL }}%</h4>
                        <div v-bind:style='{ background : "linear-gradient(90deg, hsl("+scrollH+", "+scrollS+"%, 0%), hsl("+scrollH+", "+scrollS+"%, 100%))" }'><!--スライダーの表示--></div>
                    </li>
                </ul>
            </div>
            <div class='func-sensor' id='hslSensor'>
                <div id="H-Sensor" v-on:scroll='getScrollTop'>
                    <div><!--inner--></div> <!--TODO:ここに色相のCSSをv-bind-->
                </div>
                <div id="S-Sensor" v-on:scroll='getScrollTop'>
                    <div><!--inner--></div>
                </div>
                <div id="L-Sensor" v-on:scroll='getScrollTop'> 
                    <div><!--inner--></div>
                </div>
            </div>
        </div>
    `,
    methods: {
        getScrollTop:function(){
            //Get scrollTop value
            this.scrollH = document.querySelector('#H-Sensor').scrollLeft;
            this.scrollS = document.querySelector('#S-Sensor').scrollLeft;
            this.scrollL = document.querySelector('#L-Sensor').scrollLeft;
            //Convert to proper value
            this.scrollH = this.scrollH * 1;
            this.scrollS = (this.scrollS * 1) / 2;
            this.scrollL = (this.scrollL * 1) / 2;

            //Pass scroll value to parent
            this.$emit('send-from-child',this.scrollH,this.scrollS,this.scrollL);
        }
    },
    data:function(){
        return{
            scrollH:this.nowBackgroundColor.h,
            scrollS:this.nowBackgroundColor.s,
            scrollL:this.nowBackgroundColor.l
        }
    },
    mounted() {
        document.querySelector('#H-Sensor').scrollTo(this.nowBackgroundColor.h,0)
        document.querySelector('#S-Sensor').scrollTo(this.nowBackgroundColor.s,0)
        document.querySelector('#L-Sensor').scrollTo(this.nowBackgroundColor.l,0)
    }
})