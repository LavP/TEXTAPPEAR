//TODO:func-contに指が触れている間だけ、sceanrSwitchをpreviewにする処理を、子コンポーネントのv-on:マウスがクリックされている間とマウスが上がった時のイベントをトリガーに実装する

const vm = new Vue({
    el:'#vm',
    methods:{
        //ページ遷移地のスクロール位置リセット
        scrollReset:function(){
            window.scrollTo(0,0);
        },
        //CSSに値をバインディングするためのフォーマッティング
        getTextStyles: function() {
            //Work of value converter
            return{
                color: `hsl(
                    ${this.textStyles.color.h},
                    ${this.textStyles.color.s}%,
                    ${this.textStyles.color.l}%)
                `,
                fontSize:`${this.textStyles.fontSize}px`,
                fontFamily:this.textStyles.fontFamily,
                lineHeight:this.textStyles.lineHeight,
                textAlign:this.textStyles.textAlign,
                letterSpacing:`${this.textStyles.letterSpacing}em`,//add em
                padding:`
                    ${this.textStyles.padding.top}px 
                    ${this.textStyles.padding.left}px 
                    ${this.textStyles.padding.right}px 
                    ${this.textStyles.padding.bottom}px
                `
            }
        },
        getTitleStyles: function() {
            //Work of value converter
            return{
                color: `hsl(
                    ${this.titleStyles.color.h},
                    ${this.titleStyles.color.s}%,
                    ${this.titleStyles.color.l}%)
                `,
                fontSize:`${this.titleStyles.fontSize}px`,
                fontFamily:this.titleStyles.fontFamily,
                lineHeight:this.titleStyles.lineHeight,
                textAlign:this.titleStyles.textAlign,
                letterSpacing:`${this.titleStyles.letterSpacing}em`,//add em
                padding:`
                    ${this.titleStyles.padding.top}px 
                    ${this.titleStyles.padding.left}px 
                    ${this.titleStyles.padding.right}px 
                    ${this.titleStyles.padding.bottom}px
                `
            }
        },
        getPageBackgroundColor:function(){
            //Work of value converter            
             if(this.sceneSwitch != "result"){
                return{
                    backgroundColor: `hsl(
                        ${this.backgroundColor.h},
                        ${this.backgroundColor.s}%,
                        ${this.backgroundColor.l}%)
                    `
                }
             }else{
                return{
                    backgroundColor: `hsl(188,23%,33%)`,
                    copy : `hsl(
                            ${this.backgroundColor.h},
                            ${this.backgroundColor.s}%,
                            ${this.backgroundColor.l}%)
                    `
                }
             }

            
            
        },
        //各機能の日本語名を取得
        getFuncModeName:function(){
            //Translate of CSS id to name
            let text = 'トップ';
            switch (this.funcMode) {
                case "color":text = "文字色"; break;
                case "fontSize":text = "文字サイズ"; break;
                case "fontFamily":text = "書体"; break;
                case "lineHeight":text = "行間"; break;
                case "textAlign":text = "行揃え"; break;
                case "letterSpacing":text = "字詰め"; break;
                case "padding":text = "余白"; break;
                case "backgroundColor":text = "背景色"; break;
                default:text = "トップ"; break;
            }
            return text;
        },
        //一つ前の画面に遷移
        backToFunc:function(){
            switch (this.sceneSwitch) {
                case "selectFunc":
                    this.saveRecentValue();
                    this.changeFlag = false
                    this.sceneSwitch = 'wait'
                break;
                case "waitFunc":

                    this.sceneSwitch = 'selectFunc'
                    
                break;
                case "preview":
                    //TODO:まだpreview状態になるようなコードを書いていない
                    //ここのcaseに入ったということは、値の変動があったということ
                    this.changeFlag = true
                    this.sceneSwitch = 'waitFunc'
                break;
                default:
                    break;
            }
        },
        //履歴操作
        saveRecentValue:function(){
            const self = this
            //連想配列の参照渡しを回避するため
            let tmpTitle = JSON.stringify(self.titleStyles)
            tmpTitle = JSON.parse(tmpTitle)
            let tmpText = JSON.stringify(self.textStyles)
            tmpText = JSON.parse(tmpText)
            let tmpBG = JSON.stringify(self.backgroundColor)
            tmpBG = JSON.parse(tmpBG)
            
            //TODO:変化がなかった場合は保存しない処理まだできてない
            //値に変化があったか識別
            if(this.logNo > 0){
                console.log('２回目以降');
                //console.log(this.changeLog[this.logNo-1].titleStyles)
                //console.log(tmpTitle)
                
                if(this.changeFlag == true){
                    //値に変化があるなら保存
                    this.changeLog[this.logNo] = {
                        titleStyles:tmpTitle,
                        textStyles:tmpText,
                        backgroundColor:tmpBG
                    }
                    this.logNo++;
                    console.log('Saved due to change in value')
                }else{
                    console.log('Skip due to no change in value')
                }
            }else{
                console.log('初回')
                this.changeLog[0] = {
                    titleStyles:tmpTitle,
                    textStyles:tmpText,
                    backgroundColor:tmpBG
                }
                this.logNo++;
            }
            console.log(this.logNo);
            //console.log(tmpTitle)
            //console.log(this.changeLog[this.logNo-1].titleStyles)
            
        },
        readRecentValue:function(){
            const self = this
            this.titleStyles = this.changeLog[self.logNo-1].titleStyles;
            this.textStyles = this.changeLog[self.logNo-1].textStyles;
            this.backgroundColor = this.changeLog[self.logNo-1].backgroundColor;
            self.logNo--;
        },
        readFirstValue:function(){
            const self = this
            
            this.titleStyles = this.changeLog[0].titleStyles;
            this.textStyles = this.changeLog[0].textStyles;
            this.backgroundColor = this.changeLog[0].backgroundColor;
            
            self.logNo = 0;
        },
        //各コントローラーの値反映
        changeColor:function(scrollH,scrollS,scrollL){            
            if(this.target == 'title'){
                this.titleStyles.color.h = scrollH;
                this.titleStyles.color.s = scrollS;
                this.titleStyles.color.l = scrollL;
            }else{
                this.textStyles.color.h = scrollH;
                this.textStyles.color.s = scrollS;
                this.textStyles.color.l = scrollL;
            }
        },
        changeFontSize:function(scroll){
            if(this.target == 'title'){
                this.titleStyles.fontSize = scroll
            }else{
                this.textStyles.fontSize = scroll
            }
        },
        changeFontFamily:function(selectedFont){
            if(this.target == 'title'){
                this.titleStyles.fontFamily = selectedFont
            }else{
                this.textStyles.fontFamily = selectedFont
            }
        },
        changeLineHeight:function(scroll){
            if(this.target == 'title'){
                this.titleStyles.lineHeight = scroll
            }else{
                this.textStyles.lineHeight = scroll
            }
        },
        changeTextAlign:function(selectedAlign){
            if(this.target == 'title'){
                this.titleStyles.textAlign = selectedAlign
            }else{
                this.textStyles.textAlign = selectedAlign
            }
        },
        changeLetterSpacing:function(scroll){
            if(this.target == 'title'){
                this.titleStyles.letterSpacing = scroll
            }else{
                this.textStyles.letterSpacing = scroll
            }
        },
        changePadding:function(scroll){
            //TODO:まだ
            if(this.target == 'title'){
                this.titleStyles.padding = scroll
            }else{
                this.textStyles.padding = scroll
            }
        },
        changeBackgroundColor:function(scrollH,scrollS,scrollL){            
            if(this.target == 'title'){
                this.backgroundColor.h = scrollH;
                this.backgroundColor.s = scrollS;
                this.backgroundColor.l = scrollL;
            }else{
                this.backgroundColor.h = scrollH;
                this.backgroundColor.s = scrollS;
                this.backgroundColor.l = scrollL;
            }
        },
        //アプリ開始
        switchContinue:function(){
            this.sceneSwitch = 'tutorial'
            this.scrollReset()
            /*
            setTimeout(() => {
                this.sceneSwitch = "wait"
            }, 8 * 1000);
            */
            this.backgroundColor.h = 360
            this.backgroundColor.s = 20
            this.backgroundColor.l = 90
        }
    },
    data: function (){
        return{
            //CSS Values
            textStyles: {
                color:{
                    h:360,
                    s:100,
                    l:0
                },
                fontSize:22,//add px
                fontFamily:"initial",
                lineHeight:1.5,
                textAlign:'justify',
                letterSpacing:0,//add em
                padding:{
                    top:20,//add em
                    left:20,
                    right:20,
                    bottom:20
                }
            },
            titleStyles: {
                color:{
                    h:360,
                    s:100,
                    l:0
                },
                fontSize:35,//add px
                fontFamily:"initial",
                lineHeight:1.5,
                textAlign:'justify',
                letterSpacing:0,//add em
                padding:{
                    top:20,//add em
                    left:20,
                    right:20,
                    bottom:20
                }
            },
            backgroundColor:{
                h:188,
                s:23,
                l:33
            },
            //Log
            changeLog:[],
            logNo:0,
            changeFlag:true,
            //Scene controller
            sceneSwitch:"hello",
                /*
                hello       = アプリ説明画面
                tutorial    = 説明画面表示
                wait        = funcUIは表示されておらず入力を待機している状態
                selectFunc  = 機能一覧が表示されている状態
                waitFunc     = 何かしらの機能が選択されUIが表示されている状態
                preview     = 何かしらの機能が選択されUIが表示されている状態で操作が行われており、みやすさ向上のためにFuncUIが不透明で表示されている
                result      = disibeが選択され、結果が表示される画面
                */
            //各機能のスイッチャー
            funcMode:'top',
            //タイトルとテキストどちらが押されたのかを保持
            target:null,
            //result画面のタブスイッチ
            activeTab:'css'
            
        }
    },
    mounted: function() {
        //debug用スイッチャー 一時的に自動繊維無効化中
        //this.sceneSwitch = 'hello'
        //this.funcMode = 'fontFamily'
        //this.target = 'text'
    }
})