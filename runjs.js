//Khoi chay khi cac phan khac da tai xong
$(document).ready(function() {
	//Cài đặt, chỉnh khung
	stage=new createjs.Stage("BangVe");
	mDoThi=new DoThi(1);
	loop=0;
	//Thêm sự kiện cho DOM
	$("#ThemDiem").bind("click",Bao_Diem);
	$("#ThemCung").bind("click",Bao_Cung);
	$("#XoaMot").bind("click",L_XoaMotThu);
	$("#DoiLoai").bind("click",L_DoiLoai);
	$("#DuyetRong").bind("click",L_DuyetRong);
	$("#DuyetSau").bind("click",L_DuyetSau);
	$("#LienThong").bind("click",L_LienThong);
	$("#Kruskal").bind("click",L_Kruskal);
	$("#Prim").bind("click",L_Prim);
	$("#Edmonds").bind("click",L_Edmonds);
	$("#Ford").bind("click",L_Ford);
	$("#Dijkstra").bind("click",L_Dijkstra);
	$("#DongLoi").bind("click",function(){$('#CanhBao').css('display','none');});
	$("#DongData").bind("click",function(){$('#nhapdata').css('display','none');});
	$("#dongTrong").bind("click",function(){$('#nhapTrong').css('display','none');});
	$("#xacTrong").bind("click",L_SuaTcung);
	$("#TaoData").bind("click",function(){$('#nhapdata').css('display','none');L_NhapData($('#oNhap').val());});
	$("#L_NhapData").bind("click",function(){$('#nhapdata').css('display','block');});
	stage.addChild(mDoThi.DoHoa);
	mDoThi.Bang.on("mousedown",L_ThemDinh);
	function conStage(){
		createjs.Ticker.addEventListener("tick", tick);
		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		/* createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		createjs.Ticker.framerate = 60; */
	}
	//Frame work!
	function tick(){
		mDoThi.DoiMaus();
		stage.update();
		loop++;
	}
	conStage();
});