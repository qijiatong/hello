<template>
	<view class="content" >
		<view class="top-bar">
			<view class="top-bar-left" @tap="backOne">
				<image src="../../static/commons/back.png" mode=""></image>
			</view>
			
			<view class="top-bar-right">
				<view class="more">
				 <image src="../../static/more.png" class="more-img"></image>
				 </view>
			</view>
		</view>
		
		<view class="bg" >
			<view class="bg-white" :animation="animationData4"></view>
				<image src="../../static/me.png" mode="aspectFill" class="bg-img" ></image>
		</view>
		
		<view class="main">
			<view class="user-head" >
				<view class="sex">
					<image src="../../static/woman.png" mode="" :animation="animationData3"></image>
				</view>
				<image src="../../static/me.png" mode="aspectFill" class="user-img" :animation="animationData2"></image>
			</view>
			
			<view class="user-imf" >
				<view class="name">{{use.name}}</view>
				<view class="nick">{{use.nick}}</view>
				<view class="intr">{{use.intr}}</view>
			</view>
		</view>
		
		<view class="bottom-bar">
			<view class="bottom-btn btn1" @tap="addFriendAnimat">加为好友</view>
		</view>
		
		
		<view class="add-misg" :style="{height:addHeight+'px',bottom:-+addHeight+'px'}" :animation="animationData">
			<view class="name">{{use.name}}</view>
			<textarea :value="myname+'请求添加为好友'" maxlength="120" class="add-main"></textarea>
			<view class="add-btn bottom-btn" :animation="animationData1">

					<view class="close btn1" @tap="addFriendAnimat" >取消</view>
					<view class="send btn1">发送</view>
			
			</view>	
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				addHeight:'',
				myname:'卢毕',
				isAdd:false,
				animationData:{},  //添加好友
				animationData1:{},  //添加好友
				animationData2:{},  //添加好友
				animationData3:{},  //添加好友
				animationData4:{},  //添加好友
				use:{
					
					name:'王某蓉',
					nick:'Reset',
					intr:'我們辶閒的關繋像⒈場游戲。最终，我練到滿級，nι却刪ㄋ游戲。☆',
				}
			};
		},
		onReady:function(){
			this.getElementStyle();
		},
		methods:{
			backOne:function(){
				uni.navigateBack({
					delta: 1
				});
			},
			getElementStyle:function(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.bg').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top);
				  this.addHeight=data.height-186;
				}).exec();
			},
			//添加好友动画
			addFriendAnimat:function(){
				this.isAdd=!this.isAdd;
				var animation = uni.createAnimation({
				      duration: 300,
				        timingFunction: 'ease',
				})
				var animation1 = uni.createAnimation({
					    duration: 300,
					    timingFunction: 'ease',
				})
				var animation2 = uni.createAnimation({
					    duration: 300,
					    timingFunction: 'ease',
				})
				var animation3 = uni.createAnimation({
					    duration: 300,
					    timingFunction: 'ease',
				})
				var animation4 = uni.createAnimation({
					    duration: 300,
					    timingFunction: 'ease',
				})
					if(this.isAdd){
						animation.bottom(0).step();
						animation1.bottom(0).step();
						animation2.width(120).height(120).step();
						animation3.opacity(0).step();
						animation4.backgroundColor('rgba(255,228,49,0.6)').step();
					}
					else{
						animation.bottom(-this.addHeight).step();
						animation1.bottom(-100).step();
						animation2.width().height().step();
						animation3.opacity(1).step()
						animation4.backgroundColor('rgba(255,228,49,0)').step()
					}
				    this.animationData = animation.export();
					this.animationData1 = animation1.export();
					this.animationData2 = animation2.export();
					this.animationData3 = animation3.export();
					this.animationData4 = animation4.export();
			}
		}
	}
</script>

<style lang="scss">
	@import "@/commons/CSS/topbar.scss";
	.top-bar-right{
		image{
			padding: 18rpx 0 0 18rpx;
			width: 52rpx;
			height: 52rpx;
		}
	}
	.bg{
		position: fixed;
		top:0;
		left:0;
		z-index: -2;
		width: 100%;
		height: 100%;
		.bg-white{
			width: 100%;
			height: 100%;
		}
		.bg-img{
			opacity: 0.4;
			width: 100%;
			height: 100%;
			index:-1;
			position: absolute;
			left: 0;
			top:0;
			filter: blur(12rpx);
		}
	}
	.main{
		padding-top: 230rpx;
		text-align: center;
		.user-head{
			margin:0 auto;
			position: relative;
			width: 380rpx;
			height: 380rpx;
			z-index: 10;
		}
		.sex{
			position: absolute;
			z-index: 10;
			bottom: 2rpx;
			right: 4rpx;
			width: 64rpx;
			height: 64rpx;
			z-index: 13;
			image{
				width: 48rpx;
				height: 48rpx;
			}	
		}
		.user-img{
			top:0;
			width: 380rpx;
			height: 380rpx;
			border-radius: 48rpx;
			border:6rpx solid rgba(255,255,255,1);
			box-shadow: 0rpx 36rpx 40rpx 0rpx rgba(39,40,50,0.1);
		}
		.user-imf{
			padding-top: 42rpx;
			
			.name{
				font-size: 42rpx;
				color:$uni-text-color;
				line-height: 74rpx;
				}
			.nick{
				font-size: $uni-font-size-base;
				line-height: 40rpx;
				color:$uni-text-color;
			}
			.intr{
				padding: 20rpx 100rpx;
				width: 552rpx;
				font-size: $uni-font-size-base;
				color:$uni-text-color;
				line-height: 48rpx;
				font-weight: 300;
			}
		}
	}
	.bottom-bar{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 104rpx;
		padding: 12rpx $uni-spacing-col-base;
		box-sizing: border-box;
		.bottom-btn{
			margin:auto;
			text-align: center;
			line-height: 80rpx;
			font-size: $uni-font-size-lg;
			color:$uni-text-color;
			
			height: 80rpx;
			background: $uni-color-primary;
			border-radius: $uni-border-radius-sm;
		}
	}
	.add-misg{
		position: fixed;
		bottom:0;
		width: 100%;
		box-sizing: border-box;
		padding: 0 56rpx;
		
		background: rgba(255,255,255,1);
		border-radius: 40rpx 40rpx 0 0;
		.name{
			padding: 160rpx 0 40rpx;
			font-size:52rpx;
			color:$uni-text-color;
			line-height: 74rpx;
		}
		.add-main{
			padding: 18rpx 22rpx;
			height: 420rpx;
			width: 100%;
			box-sizing: border-box;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-base;
			font-size: $uni-font-size-lg;
			color:$uni-text-color;
			line-height: 44rpx;
		}
		.add-btn{
			position: fixed;
			bottom:-104rpx;
			width: 86%;
			height: 104rpx;
			box-sizing: border-box;
			padding: 12rpx 0;
			z-index:100;
			height: 104rpx;
			display: flex;
			.close{
				width: 172rpx;
				background: $uni-bg-color-hover;
			}
			.send{
				margin-left:$uni-spacing-col-base;
				flex:auto;
				background: $uni-color-primary;
				
			}
		}
	}
	
</style>
