<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/commons/back.png" class="back-img" ></image>
			</view>
			<view class="top-bar-center ">
				<view class="top-bar-title">王鹤蓉</view>
			</view>
			<view class="top-bar-right">
				<view class="group-img">
					<image src="../../static/image/pic/whr.jpg" mode=""></image>
				</view>
			</view>
		</view>
		
		<scroll-view scroll-y="true" class="chat" :scroll-with-animation="swanition" :scroll-into-view="scrollToView" @scrolltoupper="nextPage">
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="loading" :animation="animationData" :class="{displaynone:isloading}">
					<image src="../../static/image/jiazai.png" class="loading-img"></image>
				</view>
				<view class="chat-ls" v-for="(item,index) in msgs" :key='index' :id="'msg'+item.tip">
					<view class="chat-time" v-if="item.time!=''">{{changeTime(item.time)}}</view>
					
					<view class="msg-m msg-left" v-if="item.id!='b'">
						<image :src="item.imgurl" class="user-img"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.types==0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.types==1" >
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="previewImg(item.message)"></image>
						</view>
						<!-- 音频 -->
						<view class="message" v-if="item.types==2" >
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}" @tap="playVoice(item.message.voice)">
								<image src="../../static/image/yuyinbofang.png" class="voice-img"></image>
							{{item.message.time}}″</view>
						</view>
						<!-- 位置 -->
						<view class="message" v-if="item.types==3" >
							<view class="msg-map">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<map class="map" :longitude="item.message.longitude" :latitude="item.message.latitude" :markers="covers(item.message)"></map>
								
							</view>
						</view>
							
					</view>
					
					<view class="msg-m msg-right" v-if="item.id=='b'">
						<image :src="item.imgurl" class="user-img"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.types==0">
							<view class="msg-text">{{item.message}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.types==1" >
							<image :src="item.message" class="msg-img" mode="widthFix" @tap="previewImg(item.message)"></image>
						</view>
						<!-- 音频 -->
						<view class="message" v-if="item.types==2" >
							<view class="msg-text voice" :style="{width:item.message.time*4+'px'}" @tap="playVoice(item.message.voice)">
								<image src="../../static/image/yuyinbofang.png" class="voice-img"></image>
							{{item.message.time}}″</view>
						</view>
						<!-- 位置 -->
						<view class="message" v-if="item.types==3" >
							<view class="msg-map">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<map class="map" :longitude="item.message.longitude" :latitude="item.message.latitude" :markers="covers(item.message)"></map>
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<submit @inputs="inputs" @heights="heights"></submit>
		
	</view>
	
</template>

<script>
	import data from '../../commons/JS/data.js'
	import myfun from '../../commons/JS/myfun.js'
	import submit from '../../commons/submit/submit.vue'
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				msgs:[],
				imgMsg:[],
				scrollToView:'',
				oldTime:new Date(),
				inputh:'72',
				animationData:{},
				nowpage:0,//页码
				loading:'',
				isloading:false,
				swanition:true,
				beginloading:true,//开始加载
			};
		},
		onLoad:function(){
			this.getMsg(this.nowpage);
			this.nextPage();
		},
		components:{
			submit
		},
		methods:{
			
			backOne:function(){
				uni.navigateBack({
					delta: 1
				});
			},
			
			//处理时间
			changeTime:function(date){
				return myfun.dateTime1(date);
			},
			//滚动顶部加载下一页
			nextPage: function(){
				if(this.nowpage>0 &&this.beginloading){
					//显示loading
						this.isloading=false;
						//禁止重复加载
						this.beginloading=false;
					    var animation = uni.createAnimation({
					      duration: 1000,
					        timingFunction: 'start-step',
					    })
					    this.animation = animation
						let i=1;
					    this.loading=setInterval(function() {
					      animation.rotate(i*30).step()
					      this.animationData = animation.export()
						  i++
						  //获取聊天数据
						  if(i>10){
							  this.getMsg(this.nowpage);
						  }
						  
					    }.bind(this),100)
				}
			
			  },
			  //获取聊天数据
			  getMsg:function(page){
			  	let msg=data.message();
			  	let maxpages=msg.length;
			  	if(msg.length>(page+1)*10){
			  		maxpages=(page+1)*10;
					this.nowpage++;
			  	}
			  	else{
					//数据获取完毕
			  		this.nowpage=-1;
			  	}
			  	for(var i=page*10;i<maxpages;i++){
			  		msg[i].imgurl='../../static/image/pic/'+msg[i].imgurl;
			  		//时间间隔
			  		if(i<msg.length-1){
			  			let t=myfun.spaceTime(this.oldTime,msg[i].time);
			  			if(t){
			  				this.oldTime=t;
			  			}
			  			msg[i].time=t;
			  		}
			  		
			  		//补充图片地址
			  		if(msg[i].types==1){
			  			msg[i].message='../../static/image/pic/'+msg[i].message;
			  			this.imgMsg.unshift(msg[i].message);
			  		}
			  		this.msgs.unshift(msg[i]);
			  	}
			  	//页数加一
			  	
			  	this.$nextTick(function(){
					this.swanition=false;
			  		this.scrollToView='msg'+this.msgs[maxpages-page*10-1].tip;
			  	})
			  	clearInterval(this.loading);
			  	//关闭loading
			  	this.isloading=true;
				//开启加载
				this.beginloading=true;
				this.goBottom();
				
				
			  	
			  },
			//预览图片
			previewImg:function(e){
				let index=0;
				for(let i=0;i<this.imgMsg.length;i++){
					if(this.imgMsg[i]==e){
						index=i;
					}
				}
				uni.previewImage({
					current:index,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			//播放音频
			playVoice:function(e){
				innerAudioContext.src = e;
				innerAudioContext.play();
			},
			//地图定位
			covers:function(e){
				let map=[{
				latitude:e.latitude,
				longtitude:e.longtitude,
				iconPath:'../../static/image/dingwei.png',
				}]
				return(map);
			},
			//接收输入内容
			inputs:function(e){
				this.swanition=true;
				console.log(e.message);
				let len=this.msgs.length;
				let nowTime=new Date();
					let t=myfun.spaceTime(this.oldTime,nowTime);
					if(t){
						this.oldTime=t;
					}
					nowTime=t;
				
				let data={
					id:'b',
					imgurl:'../../static/image/pic/whr.jpg',
					message:e.message,
					types:e.types,
					time:nowTime,
					tip:len,
				};
				this.msgs.push(data);
				this.$nextTick(function(){
					this.scrollToView='msg'+len;
				})
				if(e.types==1){
					this.imgMsg.push(e.message);
				}
				
			},
			
			//输入框高度
			heights:function(e){
				console.log('高度'+e);
				this.inputh=e;
				this.goBottom();
			},
			//滚动到底部
			goBottom:function(){
				this.swanition=true;
				this.scrollToView='';
				this.$nextTick(function(){
					let len=this.msgs.length-1;
					this.scrollToView = 'msg'+this.msgs[len].tip;
				})
			},
			
		}
	}
</script>

<style lang="scss">
@import "@/commons/CSS/topbar.scss";

page{
	height: 100%;
}

.content{
	height: 100%;
	background: rgba(244,244,244,1);
}
	.top-bar{
		background: rgba(244,244,244,0.96);
		border-bottom:1px solid $uni-border-color;
		
		.top-bar-title{
			font-size: 40rpx;
			text-align: center;
			line-height: 88rpx;
			font-weight: 400;
			
		}
		.top-bar-right{
			.group-img{
				position:absolute;
				top: 10rpx;
				right: 20rpx;
				width: 68rpx;
				height: 68rpx;
				image{
					border-radius: $uni-border-radius-base;
					width: 68rpx;
					height: 68rpx;
				}
			}
			
		}
	}
	.displaynone{
		display: none;
	}
	.chat{
		height: 100%;
		// .ji{
		// 	height:var(--status-bar-height);
		// 	width: 100%;
		// }
		.loading{
			text-align: center;
			.loading-img{
				width:60rpx;
				height: 60rpx;
			}
		}
		.chat-main{
			padding-left: $uni-spacing-col-base;
			padding-right: $uni-spacing-col-base;
			padding-top: 100rpx;
			
			display: flex;
			flex-direction: column;
		}
		.chat-ls{
			.chat-time{
				font-size:$uni-font-size-sm;
				color:rgba(39,40,50,0.3);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}
			.msg-m{
				
				display: flex;
				padding:20rpx 0;
				.user-img{
					flex: none;
					width: $uni-img-size-sm;
					height: $uni-img-size-sm;
					border-radius: $uni-border-radius-base;
				}
				.message{
					flex: none;
					max-width:480rpx;
				}
				.msg-text{
					font-size: $uni-font-size-lg;
					color:$uni-text-color;
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}
				.msg-img{
					max-width:400rpx;
					border-radius: $uni-border-radius-base;
				}
				.msg-map{
					background:#fff;
					width: 464rpx;
					height:284rpx;
					overflow: hidden;
					.map-name{
						font-size: $uni-font-size-lg;
						color:$uni-text-color;
						line-height: 44rpx;
						padding: 18rpx 24rpx 0 24rpx;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
					.map-address{
						font-size: $uni-font-size-sm;
						color:$uni-text-color-disable;
						line-height: 44rpx;
						padding: 0rpx 24rpx;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
					.map{
						padding-top:8rpx;
						width: 464rpx;
						height: 190rpx;
					}
				}
				.voice{
					min-width:80rpx;
					max-width: 400rpx;
				}
				.voice-img{
					width:200rpx;
					height: 36rpx;
				}
			}
			.msg-left{
				flex-direction: row;
				.msg-text{
					margin-left:16rpx;
					background-color: #fff;
					border-radius:0rpx 20rpx 20rpx 20rpx;
				}
				.msg-img{
					margin-left:16rpx;
				}
				.voice{
					text-align:right;
					
				}
				.msg-map{
					margin-left:16rpx;
					border-radius:0rpx 20rpx 20rpx 20rpx;
				}
				.voice-img{
					float: left;
					width: 28rpx;
					padding-top: 4rpx;
					height: 36rpx;
				}
			}
			.msg-right{
				flex-direction: row-reverse;
				.msg-text{
					margin-right:16rpx;
					background-color: rgba(255,228,49,0.8);
					border-radius:20rpx 0rpx 20rpx 20rpx;
				}
				.msg-img{
					margin-right:16rpx;
				}
				.msg-map{
					margin-right:16rpx;
					border-radius:20rpx 0px 20rpx 20rpx;
				}
				.voice{
					text-align:left;
				}
				.voice-img{
					float: right;
					padding-top: 4rpx;
					width: 28rpx;
					height: 36rpx;
				}
			}
		}
	}
	
</style>
