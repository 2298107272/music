<template>
  <div id="app">
     <div class="box">
        <!-- 头部 -->
        <div class="header">
            <span>哟西</span>
            <div class="inp">
                <input type="text" v-model="Listmusic" @keyup='Search2'>
            </div>
        </div>
        <!-- 中间部分 -->
        <div class="content">
        <!-- 中间左侧列表 -->
            <div class="content-let">
                <div class="content-let_list" v-for="item in List" :key="item.id" @click="oppen(item.id)">
                    <div class="content-let_list_audio" @click="oppen(item.id)"></div>
                    <div class="content-let_list_name">{{item.name}}</div>
                    <div class="content-let_list_mv" v-if="item.mvid!==0" @click.stop="Mvoppen(item.mvid)"></div>
                </div>
            </div>
        <!-- 播放器图片 -->
            <div class="content-con">
                <img src="./assets/disc.png" alt="">
                <img :src="picUrl" alt="">
            </div>
        <!-- 中间右侧 -->
            <div class="content-rig">
                <h4>热门留言</h4>
                <div class="content-rig_list" v-for="v in hotComments" :key="v.id">

                     <img :src="v.user.avatarUrl" alt="">
                     <span>{{v.user.nickname}}</span> 
                    <div class="aa">
                       {{v.content}}
                    </div>
                </div>
            </div>
        </div>
        <!-- 尾部 -->
        <div class="foolt">
            <audio :src="url" controls autoplay loop></audio>
        </div>

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'app',
  data(){
    return{
      Listmusic:'五月天',
      List:[
          {name:'',
          id:''}
      ],
      //歌曲id
      id:'',
      //歌曲播放地址
      url:'',
      //歌曲图片地址
      picUrl:'',
      //歌曲评论
      hotComments:[
          {
            content:'',
            user:{
                avatarUrl:'',
                nickname:''
            }
          }
      ],
      //歌曲mv
      mvurl:''
    }
  },
   mounted(){
        this.Search()
        
    },
  methods:{
      Search2(ev){
            if(ev.keyCode == 13){
                console.log(909);
                this.Search();
            }
      },
   async Search(id){
     const {data:res}=await this.$http.get(`https://apimusic.linweiqin.com/search`,
        {params:{keywords:this.Listmusic}}
     )
     this.List=res.result.songs
     this.musiccontent(res.result.songs[0].id)
     this.tp(res.result.songs[0].id)
    console.log(res);
    
    },
   async oppen(id){
       console.log(id);
        const {data:res}=await this.$http.get(`https://apimusic.linweiqin.com/song/url`,
        {params:{id}}
       
     ) 
     this.url=res.data[0].url
     this.tp(id)
     this.musiccontent(id)
    },
    async tp(ids){
     const {data:res}=await this.$http.get(`https://apimusic.linweiqin.com/song/detail`,
        {params:{ids}}
     )
     this.picUrl=res.songs[0].al.picUrl
     console.log(res.songs[0].al.picUrl);
    },
    async musiccontent(id){
       const {data:res}=await this.$http.get(`https://apimusic.linweiqin.com/comment/hot?type=0`,
        {params:{id}}
     ) 
     this.hotComments=res.hotComments
     console.log(res);
    },
   async Mvoppen(id){
     const {data:res}=await this.$http.get(`https://apimusic.linweiqin.com/mv/url`,
        {params:{id}}
     ) 
     console.log(res);
     this.mvurl=res.data.url
     this.$router.push({path:'./mv',query:{msg:this.mvurl}})
    }
  },
}
</script>

<style>
body,html{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
     
    
}
#app{
    width: 100%;
    height: 100%;
   background: url('./assets/bg1.jpeg') no-repeat ;
   background-size:cover
}
.box{
           position: absolute;
           width: 800px;
           height: 500px;
           /* background-color: red; */
           left: 50%;
           top: 50%;
           transform:translate(-50%,-50%);
           
        }
        .header{
            width: 800px;
            height: 60px;
            background-color: rgba(255, 192, 203, 0.863);
        }
        .content{
            width: 800px;
            height: 390px;
            background:rgba(156, 156, 226, 0.322);
        }
        .foolt{
            width: 800px;
            height: 50px;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.808);
        }
        .header span{
            line-height: 71px; 
            margin-left: 20px;
            font-size: 20px;
            font-weight: 500;
        }
        .inp{
            float:right;
            margin-top: 22px;
            margin-right: 40px;
            width: 200px;
            height: 30px;
            line-height: 30px;
            
        }
        .inp input{
            float: left;
            outline:none;
            width: 145px;
            height: 20px;
            border-radius: 15px;
            text-indent: 1.5em;
        }
       
        /*  */
        .content div{
            float: left;
        }
        .content-let::-webkit-scrollbar {
            display: none; /* Chrome Safari */
            }
        .content-let{
            height: 380px;
            width: 219px;
            padding: 10px 5px 0 5px;
            border-right: 1px solid blueviolet;
            overflow: auto;
        }
        .content-con{
            height: 390px;
            width: 369px;
            border-right: 1px solid blueviolet;
        }
        .content-rig::-webkit-scrollbar {
            display: none; /* Chrome Safari */
            }
        .content-rig{
            height: 100%;
            width: 200px;
            overflow: auto;
            /* background-color: white; */
        }
        
        .content-let_list{
            height: 40px;
            cursor: pointer;
            align-items: center;
        }
        .content-let_list> div{
            float: left;
        }
        .content-let_list_audio{
            width: 25px;
            height: 25px;
            background: url('./assets/table.png') -18px -18px;
        }
        .content-let_list_name{
            width: 121px;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            text-align: center;
            color: red;
        }
        .content-let_list_mv{
            width: 30px;
            height: 25px;
            margin-left: 20px;
            background: url('./assets/table.png') left -45px;
        }
        /*  */
        .content-con img:nth-child(1){
            position: absolute;
            left: 283px;
            top: 121px;
        }
        .content-con img:nth-child(2){
            position: absolute;
            left: 341px;
            top: 178px;
            width: 140px;
            border-radius: 80px;
        }
        .content-rig h4{
            margin: 0;
        }
        .content-rig_list{
            width: 200px;
           
        }
      .content-rig_list img{
          display: inline-block;
          margin-left: 15px;
          margin-top: 10px;
          cursor: pointer;
          width: 30px;
          border-radius: 15px;
      }
      .content-rig_list span{
          display: inline-block;
          width: 70px;
          height: 20px;
          color: red;
          overflow: hidden;
      }
     .aa{
        float: right;
        margin-left: 35px;
        margin-top: 5px;
         width: 150px;
        color: rgba(255, 192, 203, 0.788);
         word-wrap:break-word;
         overflow: hidden;
     }
       /* 底部 */
       .foolt audio{
           width: 100%;
           height: 50px;
       }
</style>