<template>
	<view class="content">
		<view class="top-bar">
			<view class="search-div">
				<input type="search" placeholder="搜索用户/群" class="search" placeholder-style="color:#bbb;font-weight:400" @input="search"/>
				<image src="../../static/image/top-right1.png" class="search-img"></image>
			</view>
			
			<view class="top-bar-right" @tap="backOne">
				<view class="text">取消</view>
			</view>
		</view>
		
		<view class="main">
			<view class="search-result">
				<view class="title" v-if="userarr.length>0">用户</view>
				<view class="user-list" v-for="(item,index) in userarr" :key="index" >
				<navigator url="../userhome/userhome?id=aaa" hover-class="none">
					<image :src="item.imgurl"></image>
				</navigator>
					<view class="names">
						<view class="name" v-html="item.name"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view class="right-btn send" v-if="item.tip==1" @tap="toChartroom">发消息</view>
					<view class="right-btn add" v-if="item.tip==0" @tap="toUserhome">加好友</view>
				</view>
			</view>	
		</view>
		
			
			
		
	</view>
</template>

<script>
	import data from '../../commons/JS/data.js'
	export default {
		data() {
			return {
				userarr:[],
				
			};
		},
		methods:{
			toChartroom:function(){
				 uni.navigateTo({
				 	url: '../chartroom/chartroom',
				 }); 
			},
			toUserhome:function(){
				 uni.navigateTo({
				 	url: '../userhome/userhome',
				 }); 
			},
			//关键词
			search:function(e){
				this.userarr=[];
				let searchval=e.detail.value;
				if(searchval.length>0){
					this.searchUser(searchval);
				}
			},
			//寻找关键词匹配用户
			searchUser:function(e){
				
				let arr=data.friends();
				let exp=eval("/"+ e +"/g");//转换为正则
				for(let i=0;i<arr.length;i++){
					if(arr[i].name.search(e) !=-1 || arr[i].email.search(e) !=-1 ){
						this.isFriend(arr[i]);//每一个都要判断
						arr[i].imgurl="../../static/image/pic/"+arr[i].imgurl;
						arr[i].name=arr[i].name.replace(exp,"<span style='color:#4AAAFF;'>"+e+"</span>")
						arr[i].email=arr[i].email.replace(exp,"<span style='color:#4AAAFF;'>"+e+"</span>")
						this.userarr.push(arr[i]);
					}
				}
				console.log(this.userarr);
			},
			//判断是否为好友
			isFriend:function(e){
				let tip=0;
				let arr=data.isfriend();
				for(let i=0;i<arr.length;i++){
					if(arr[i].friend==e.id){
						tip=1;
					}
				}
				e.tip=tip;
			},
			//返回上一级
			backOne:function(){
				uni.navigateBack({
					delta: 1
				});
			},
			
		}
	}

</script>

<style lang="scss">
@import "../../commons/CSS/topbar.scss";
.top-bar{
	background: rgba(255,255,255,0.96);
	border-bottom:1px solid $uni-border-color;
	.search-div{
		position: absolute;
		top:0;
		left: 0;
		float: left;
		width: 100%;
		padding: 14rpx 118rpx 14rpx $uni-spacing-col-base;
		box-sizing: border-box;
		z-index: -1;
		.search{
			padding: 0 60rpx 0 12rpx;
			height: 60rpx;
			background:$uni-bg-color-grey;
			border-radius: 10rpx;
		}
		.search-img{
			height: 40rpx;
			width: 40rpx;
			position: absolute;
			top:22rpx;
			right: 130rpx;

		}
	}
}
.main{
	padding:88rpx $uni-spacing-col-base;
	.search-result{
		padding-top: $uni-spacing-col-base;
		.title{
			font-size:44rpx;
			font-weight: 600;
			color:$uni-text-color;
			line-height:60rpx;
		}
		.user-list{
			width: 100%;
			padding: 20rpx 0;
			height: 80rpx;
			image{
				float: left;
				width: 80rpx;
				height: 80rpx;
				border-radius: $uni-border-radius-base;
			}
		}
		.names{
			float: left;
			padding-left: $uni-spacing-col-base;
			
			.name{
				line-height: 50rpx;
				color:$uni-text-color;
				font-size:36rpx;
			}
			.email{
				color:$uni-text-color;
				font-size:$uni-font-size-sm;
				line-height: 28rpx;
			}
		
		}
		.right-btn{
			float: right;
			width: 120rpx;
			height: 48rpx;
			border-radius: 24rpx;
			background:$uni-color-primary;
			font-size:$uni-font-size-sm;
			color:$uni-text-color;
			line-height: 48rpx;
			margin-top:16rpx;
			text-align: center;
		}
		.send{
			background:$uni-color-primary;
			color:$uni-text-color;
		}
		.add{
			background:rgba(74,170,255,0.1);
			color:$uni-text-color;
		}
	}
}
</style>
