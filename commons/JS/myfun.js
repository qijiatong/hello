export default{
	dateTime(e){
		let old=new Date(e);
		let now=new Date();
		
		let d=old.getTime();//获取时间戳信息
		let h=old.getHours();//小时
		let m=old.getMinutes();//分钟
		let Y=old.getFullYear();//年
		let M=old.getMonth()+1;//月 0代表1
		let D=old.getDate();//日
		
		let nd=now.getTime();//获取时间戳信息
		let nh=now.getHours();//小时
		let nm=now.getMinutes();//分钟
		let nY=now.getFullYear();//年
		let nM=now.getMonth()+1;//月 0代表1
		let nD=now.getDate();//日
		
		//当天时间
		if(D===nD && M===nM && Y===nY){
			if(h<10){
				h='0'+h;
			}
			if(m<10){
				m='0'+m;
			}
			
			return h+':'+m;
		}
		
		//前天时间
		if(D+1===nD && M===nM && Y===nY){
			if(h<10){
				h='0'+h;
			}
			if(m<10){
				m='0'+m;
			}
			
			return '前天'+h+':'+m;
		}
		//超过两天
		else{
			return Y+'/'+M+'/'+D;
		}
	},
	dateTime1(e){
		let old=new Date(e);
		let now=new Date();
		
		let d=old.getTime();//获取时间戳信息
		let h=old.getHours();//小时
		let m=old.getMinutes();//分钟
		let Y=old.getFullYear();//年
		let M=old.getMonth()+1;//月 0代表1
		let D=old.getDate();//日
		
		let nd=now.getTime();//获取时间戳信息
		let nh=now.getHours();//小时
		let nm=now.getMinutes();//分钟
		let nY=now.getFullYear();//年
		let nM=now.getMonth()+1;//月 0代表1
		let nD=now.getDate();//日
		
		//当天时间
		if(D===nD && M===nM && Y===nY){
			if(h<10){
				h='0'+h;
			}
			if(m<10){
				m='0'+m;
			}
			
			return h+':'+m;
		}
		
		//前天时间
		if(D+1===nD && M===nM && Y===nY){
			if(h<10){
				h='0'+h;
			}
			if(m<10){
				m='0'+m;
			}
			
			return '前天'+h+':'+m;
		}
		//今年
		else if(Y===nY){
			if(h<10){
				h='0'+h;
			}
			if(m<10){
				m='0'+m;
			}
			return M+'月'+D+'日'+h+':'+m;
		}
		//超过两天
		else{
			if(h<10){
				h='0'+h;
			}
			if(m<10){
				m='0'+m;
			}
			return Y+'年'+M+'月'+D+'日'+' '+h+':'+m;
		}
	},
	//详细时间转换
	detailTime(e){
		let old=new Date(e);
		
		
		let d=old.getTime();//获取时间戳信息
		let h=old.getHours();//小时
		let m=old.getMinutes();//分钟
		let Y=old.getFullYear();//年
		let M=old.getMonth()+1;//月 0代表1
		let D=old.getDate();//日
		
		//处理时间
		if(M<10){
			M='0'+M;
		}
		if(D<10){
			D='0'+D;
		}
		if(h<10){
			h='0'+h;
		}
		if(m<10){
			m='0'+m;
		}
		return Y+'-'+M+'-'+D+' '+h+':'+m;
		
		
	},
	//间隔时间差
	spaceTime(old,now){
		old=new Date(old);
		now=new Date(now);
		
		var told=old.getTime();
		var tnow=now.getTime();
		if(told>(tnow+1000*60*5)){
			return now;
		}
		else{
			return '';
		}
	}
}