<template>
	<view class="content">
		<view class="top-bar">
			<navigator url="../userdetails/userdetails?id=aaa" class="top-bar-left" >
					<image src="../../static/image/pic/sd1.png" mode=""></image>
			</navigator>
			
			<view class="top-bar-center">
				<image src="../../static/image/top-center.png" mode="" class="logo"></image>
			</view>
			
			<view class="top-bar-right">
				<view class="search" @tap="toSearch">
				 <image src="../../static/image/top-right1.png" mode=""></image>
				 </view>
				 
				 <view class="add">
				<image src="../../static/image/top-right2.png" mode=""></image>
				</view>
			</view>
			
		</view>
		
		<view class="main">
		<view class="friends">
			<navigator url="../friendrequest/friendrequest?id=ccc" class="friend-list">
				
				<view class="friend-list-l">
					<text class="tip">1</text>
					<image src="../../static/image/pic/apply.png" mode=""></image>
				</view>
				
				<view class="friend-list-r">
					<view class="top">
						<view class="name">好友申请</view>
						<view class="time">11:23</view>
					</view>	
					<view class="message">茫茫人海，相聚便是缘分</view>
				</view>
				
			</navigator>
		</view>
		
		<view class="friends">
			<navigator url="../chartroom/chartroom?id=bbb" class="friend-list" v-for="(item,index) in friends" :key="index">
				
				<view class="friend-list-l">
					<text class="tip" v-if="item.tip>0">{{item.tip}}</text>
					<image :src="item.imgurl"></image>
				</view>
				
				<view class="friend-list-r">
					<view class="top">
						<view class="name">{{item.name}}</view>
						<view class="time">{{changeTime(item.time)}}</view>
					</view>	
					<view class="message">{{item.news}}</view>
				</view>
				
			</navigator>
		</view>
		</view>
	</view>
</template>

<script>
	import data from '../../commons/JS/data.js'
	import myfun from '../../commons/JS/myfun.js'
	export default {
		data() {
			return {
				
				friends:[],
			}
		},
		onLoad() {
		this.getFriends();
		},
		methods: {
			changeTime:function(date){
				return myfun.dateTime(date);
			},
			getFriends:function(){
				this.friends=data.friends()
				for(let i=0;i<this.friends.length;i++){
				this.friends[i].imgurl="../../static/image/pic/"+this.friends[i].imgurl
				}
				console.log(this.friends)
			},
			//去搜索页面
			toSearch:function(){
				 uni.navigateTo({
				 	url: '../search/search',
				 }); 
			},
			
		}
	}
	
</script>


<style  lang="scss">
	@import "@/commons/CSS/topbar.scss";
	
	.top-bar{
		background: rgba(255,255,255,0.96);
		border-bottom:1px solid $uni-border-color;
		.top-bar-right{
			image{
				padding: 18rpx 0 0 18rpx;
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
	.main{
		padding-top: 104rpx;
	}
	.friend-list{
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base;
		//& 这是sass的语法，代表上一级选择器
		&:active{
			background-color: $uni-bg-color-grey;
		}
		
		.friend-list-l{
			float: left;
			position: relative;
			image{
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
				background-color:$uni-bg-color;
			}
			.tip{
				position: absolute;
				z-index: 10;
				top:-8rpx;
				min-width: 24rpx;
				left: 68rpx;
				height: 36rpx;
				padding: 0 6rpx;
				background: $uni-color-warning;
				border-radius:18rpx;
				text-align: center;
				font-size: $uni-font-size-sm;
				color:$uni-text-color-inverse;
				line-height: 36rpx;
			}
		}
		.friend-list-r{
			padding-left: 128rpx;
			
			.top{
				height:50rpx;
				.name{
					font-size:36rpx;
					font-weight: 400;
					color:$uni-text-color;
					line-height: 50rpx;
					float: left;
				}
				.time{
					
					float: right;
					line-height: 50rpx;
					font-size: $uni-font-size-sm;
					color:$uni-text-color-disable;
				}
			}
		}
		.message{
			font-size: $uni-font-size-base;
			color:$uni-text-color-grey;
			line-height: 40rpx;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
			
			
		}
	}

</style>
