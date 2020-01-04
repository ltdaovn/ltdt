//abc
/* Khai báo các biến toàn cục */
	var stage,mDoThi,loop;
	var speedAni=10;
	var Khoa_L=false;
	var LenhKich=0;
	var Color_L=["#FFFF99","#CCFF99","#FFCC99","#FF99FF","#CFCFCF","#C6E2FF","#9FB6CD"];
/*Thông Báo*/
function Loi_Chay(){
	L_Loi("Không thể chạy thuật toán khác khi thuật toán hiện tại chưa kết thúc! Nếu đồ thị đang tô màu, hãy click vào vị trí bất kỳ trên bảng vẽ để hủy màu trước khi tiếp tục.");
}
function Bao_Diem(){
	L_Loi("Để thêm điểm, nhấp chuột vào vị trí trống bất kỳ trên bản vẽ. Điểm sau khi được tạo có thể dời vị trí bằng cách kéo thả.");
}
function Bao_Cung(){
	L_Loi("Để thêm cung, click vào một điểm đã tạo, sau khi thấy điểm đã đổi màu đánh dấu, click vào điểm thứ hai.");
}
/* Các Lệnh */
function L_Loi(vanban){
	$("#VanBanLoi").text(vanban);
	$('#CanhBao').css('display','block');
}
function L_KetQuaA(vanban){
	$("#KetQua").append(vanban);
}
function L_KetQuaR(vanban){
	$("#KetQua").html(vanban);
}
function L_MoDiChuyenD(evt){
	if(mDoThi.Ani.length>0) return;
	Khoa_L=true;
	evt.currentTarget.Cha.DoiXY(evt.stageX,evt.stageY);
}
function L_HuyDiChuyenD(){
	Khoa_L=false;
}
function L_XoaMotThu(){
	if(Khoa_L) return;
	if(mDoThi.Ani.length>0){ Loi_Chay();return;}
	if(LenhKich==1){
		LenhKich=0;
		$("body").removeClass("chuotxoa");
		return;
	}
	LenhKich=1;
	$("body").addClass("chuotxoa");
}
function L_ThemDinh(evt){
	if(Khoa_L) return;
	if(mDoThi.Ani.length>0){ Loi_Chay();return;}
	mDoThi.ThemDinh("nothing",evt.stageX,evt.stageY);
}

function L_ThemCung(evt){
	console.log("click fire");
	if(Khoa_L) return;
	if(mDoThi.Ani.length>0){ Loi_Chay();return;}
	if(LenhKich==1){
		var So=mDoThi.NumDinh(evt.currentTarget.Cha);
		mDoThi.XoaMotDinh(So);
		mDoThi.L_st=new Dinh("null",0,0);
		//LenhKich=0;
		//$("body").removeClass("chuotxoa");
		return;
	}
	if(mDoThi.L_st.name=="null"){
		mDoThi.L_st=evt.currentTarget.Cha;
		mDoThi.L_st.DoiMau("#EED5D2"); //Chuyển màu
		//Khoa_L=true;
		return;
	}
	mDoThi.ThemCung(mDoThi.L_st,evt.currentTarget.Cha,0,mDoThi.loai);
	mDoThi.L_st.DoiMau("#FFFFFF"); //Trả về như cũ
	mDoThi.L_st=new Dinh("null",0,0); //Trả về giá trị cũ
}
function L_SuaCung(evt){
	if(Khoa_L) return;
	if(mDoThi.Ani.length>0){ Loi_Chay();return;}
	if(LenhKich==1){
		console.log(evt.currentTarget.Cha);
		mDoThi.XoaMotCung(evt.currentTarget.Cha);
		mDoThi.L_st=new Dinh("null",0,0); //Hủy đỉnh trỏ
		//LenhKich=0;
		//$("body").removeClass("chuotxoa");
		return;
	}
	var STTcung=mDoThi.Cungs.indexOf(evt.currentTarget.Cha);
	$('#nhapTrong').css('display','block');
	mDoThi.setCung=STTcung;
	$('#soTrong').val(mDoThi.Cungs[STTcung].TL);
}
function L_SuaTcung(){
	mDoThi.Cungs[mDoThi.setCung].TL=parseInt($('#soTrong').val());
	mDoThi.Cungs[mDoThi.setCung].VeCung(mDoThi.Cungs[mDoThi.setCung].Dau.DoHoa,mDoThi.Cungs[mDoThi.setCung].Cuoi.DoHoa,"#999999",mDoThi.Cungs[mDoThi.setCung].mXoay);
	$('#nhapTrong').css('display','none');
}
function L_NhapData(data){
	if(mDoThi.Ani.length>0||Khoa_L||mDoThi.L_st.name!="null"){ Loi_Chay();return;}
	console.log(data);
	mDoThi.NhapDT(data);
}
function L_DoiLoai(){
	if(mDoThi.Ani.length>0||Khoa_L){ Loi_Chay();return;}
	mDoThi.DoiLoai((mDoThi.loai==1)? 2:1);
}

function L_DuyetRong(){
	if(mDoThi.Ani.length>0||Khoa_L){ Loi_Chay();return;}
	var A=[];
	var N=0;
	var VB="<p class='w3-white w3-border-bottom'>Kết quả duyệt rộng:</p><p class='w3-white w3-border-bottom'>* Các điểm bắt đầu lần duyệt mới có * phía trước</p>";
	for(var i=0;i<mDoThi.Dinhs.length;i++){
		if(A.indexOf(mDoThi.Dinhs[i])==-1){
			mDoThi.BFS(mDoThi.Dinhs[i],A);
			VB+="<p class='w3-border-bottom'>*. ";
			for(var i=N;i<A.length;i++){
				VB+=" "+A[i].name;
			}
			N=A.length;
		}
	}
	L_KetQuaR(VB);
	mDoThi.DoHoa.mouseEnabled = false;
}

function L_DuyetSau(){
	if(mDoThi.Ani.length>0||Khoa_L){ Loi_Chay();return;}
	var A=[];
	var N=0;
	var VB="<p class='w3-white w3-border-bottom'>Kết quả duyệt sâu:</p><p class='w3-white w3-border-bottom'>* Các điểm bắt đầu lần duyệt mới có * phía trước</p>";
	for(var i=0;i<mDoThi.Dinhs.length;i++){
		if(A.indexOf(mDoThi.Dinhs[i])==-1){
			mDoThi.DFS(mDoThi.Dinhs[i],A);
			VB+="<p class='w3-border-bottom'>*. ";
			for(var i=N;i<A.length;i++){
				VB+=" "+A[i].name;
			}
			N=A.length;
		}
	}
	L_KetQuaR(VB);
	mDoThi.DoHoa.mouseEnabled = false;
}
function L_LienThong(){
	if(mDoThi.Ani.length>0||Khoa_L){ Loi_Chay();return;}
	var CheckLien=mDoThi.LienThong();
	if(CheckLien.Tloi){
		$("#KetQua").html("<p class='w3-green'>Liên Thông!</p>");
	}
	else{
		console.log(CheckLien);
		$("#KetQua").html("<p class='w3-red'>Không Liên Thông!</p>");
		var TPList="";
		for(var i=0;i<CheckLien.Llist.length;i++){
			TPList=TPList+"<p class='w3-border-bottom'>*. ";
			//Lấy tên điểm
			for(var j=0;j<CheckLien.Llist[i].length;j++){
				TPList=TPList+CheckLien.Llist[i][j].name+" ";
			}
			TPList=TPList+"</p>";
		}
		$("#KetQua").html($("#KetQua").html()+TPList+"</p>");
	}
}
function L_Kruskal(){
	if(mDoThi.Ani.length>0||Khoa_L){ Loi_Chay();return;}
	if(mDoThi.loai!=1){ L_Loi("Chỉ áp dụng cho tìm cây vô hướng!");return;}
	var KQ=mDoThi.Kruskal();
	var VB="<p class='w3-white w3-border-bottom'>Xanh: Nhận, Tím: bị loại, Xám: Không xét.</p><p class='w3-white w3-border-bottom'>D1 D2 W</p>";
	var E=0; //Đánh dấu cung không xét
	console.log(KQ);
	var TongTL=0;
	for(var i=0;i<KQ[1].length;i++){
		var TTcung=KQ[0].Cungs.indexOf(KQ[1][i]); console.log(TTcung);
		if(E==1)
			VB=VB+"<p class='w3-light-grey w3-border-bottom'>"+KQ[1][i].Dau.name+" "+KQ[1][i].Cuoi.name+" "+KQ[1][i].TL+"</p>";
		else if(TTcung!=-1){
			VB=VB+"<p class='w3-green w3-border-bottom'>"+KQ[1][i].Dau.name+" "+KQ[1][i].Cuoi.name+" "+KQ[1][i].TL+"</p>";
			TongTL+=parseInt(KQ[1][i].TL);
			if(TTcung==KQ[0].Cungs.length-1) E=1;
		}
		else
			VB=VB+"<p class='w3-purple w3-border-bottom'>"+KQ[1][i].Dau.name+" "+KQ[1][i].Cuoi.name+" "+KQ[1][i].TL+"</p>";
	}
	if(KQ[0].Cungs.length!=mDoThi.Dinhs.length-1){
		L_KetQuaR(VB+"<p class='w3-pale-red w3-border-bottom'>Không tìm được cây khung!</p>");
		return;
	}
	L_KetQuaR(VB+"<p class='w3-white w3-border-bottom'>Tổng chi phí:"+TongTL+"</p>");
}
function L_Prim(){
	if(mDoThi.Ani.length>0||Khoa_L){ Loi_Chay();return;}
	if(mDoThi.loai!=1){ L_Loi("Chỉ áp dụng cho tìm cây vô hướng!");return;}
	var KQ=mDoThi.Prim();
	var TongTL=0;
	var VB="<p class='w3-white w3-border-bottom'>Thứ tự các cạnh cho vào cây</p><p class='w3-white w3-border-bottom'>D1 D2 W</p>";
	for(var i=0;i<KQ.Cungs.length;i++){
		VB=VB+"<p class='w3-green w3-border-bottom'>"+KQ.Cungs[i].Dau.name+" "+KQ.Cungs[i].Cuoi.name+" "+KQ.Cungs[i].TL+"</p>";
		TongTL+=parseInt(KQ.Cungs[i].TL);
	}
	if(KQ.Cungs.length!=mDoThi.Dinhs.length-1){
		L_KetQuaR(VB+"<p class='w3-pale-red w3-border-bottom'>Không tìm được cây khung!</p>");
		return;
	}
	L_KetQuaR(VB+"<p class='w3-white w3-border-bottom'>Tổng chi phí:"+TongTL+"</p>");
}
function L_Edmonds(){
	if(mDoThi.Ani.length>0||Khoa_L){ Loi_Chay();return;}
	if(mDoThi.loai!=2){ L_Loi("Chỉ áp dụng cho tìm cây có hướng!");return;}
	var KQ=mDoThi.CayCoHuong();
	var TongTL=0;
	var VB="<p class='w3-white w3-border-bottom'>Các cung của cây có hướng</p><p class='w3-white w3-border-bottom'>D1 D2 W</p>";
	for(var i=0;i<KQ[0].Cungs.length;i++){
		VB=VB+"<p class='w3-green w3-border-bottom'>"+KQ[0].Cungs[i].Dau.name+" "+KQ[0].Cungs[i].Cuoi.name+" "+KQ[0].Cungs[i].TL+"</p>";
		TongTL+=parseInt(KQ[0].Cungs[i].TL);
	}
	if(KQ[0].Cungs.length!=mDoThi.Dinhs.length-1){
		L_KetQuaR(VB+"<p class='w3-pale-red w3-border-bottom'>Không tìm được cây khung!</p>");
		return;
	}
	L_KetQuaR(VB+"<p class='w3-white w3-border-bottom'>Tổng chi phí:"+TongTL+"</p>");
	mDoThi.DoHoa.mouseEnabled = false;
}
function L_Ford(){
	if(mDoThi.Ani.length>0||Khoa_L){ Loi_Chay();return;}
	if(mDoThi.loai!=2){ L_Loi("Chỉ áp dụng cho đồ thị có hướng!");return;}
	if(mDoThi.Cungs.length<1){ L_Loi("Không tìm được luồng của đồ thị có số cung < 1!");return;}
	var DPhat=mDoThi.Dinhs[0];
	var DThu=mDoThi.Dinhs[mDoThi.Dinhs.length-1];
	var KQ=mDoThi.Ford(DPhat,DThu);
	var VB="<p class='w3-white w3-border-bottom'>Luồng giữa các đỉnh</p><p class='w3-white w3-border-bottom'>D1->D2:  FLow</p>";
	var MaxLuong=-1;
	for(var i=0;i<DPhat.KetNoi.length;i++)
		if(DPhat.KetNoi[i].Cuoi==DPhat){
			L_KetQuaR(VB+"<p class='w3-pale-red w3-border-bottom'>Không tìm được luồng cực đại do đỉnh phát và đỉnh thu không hợp lệ hoặc luồng cực đại bằng 0!!</p>");
			return;
		}
	for(var i=0;i<DThu.KetNoi.length;i++)
		if(DThu.KetNoi[i].Dau==DThu){
			L_KetQuaR(VB+"<p class='w3-pale-red w3-border-bottom'>Không tìm được luồng cực đại do đỉnh phát và đỉnh thu không hợp lệ hoặc luồng cực đại bằng 0!!</p>");
			return;
		}
	for(var i=0;i<KQ[0].length;i++)
		for(var j=0;j<KQ[0].length;j++)
			if(typeof KQ[0][i][j]!="undefined"){
				VB=VB+"<p class='w3-green w3-border-bottom'>"+i+" -> "+j+":  "+KQ[0][i][j]+"</p>";
				if(j==mDoThi.Dinhs.length-1) MaxLuong+=(MaxLuong!=-1)? KQ[0][i][j]:KQ[0][i][j]+1;
			}
	if(MaxLuong==-1){
		L_KetQuaR(VB+"<p class='w3-pale-red w3-border-bottom'>Không tìm được luồng cực đại do đỉnh phát và đỉnh thu không hợp lệ hoặc luồng cực đại bằng 0!!</p>");
		return;
	}
	var lcS="";
	var lcT="";
	for(var i=0;i<mDoThi.Dinhs.length;i++)
		if(typeof KQ[1][i]=="undefined")
			lcT=i+" "+lcT;
		else
			lcS=i+" "+lcS;
	VB=VB+"<p class='w3-white w3-border-bottom'>Lát cắt hẹp nhất:</br>* S={"+lcS+"}</br>* T={"+lcT+"}</p>"
	L_KetQuaR(VB+"<p class='w3-white w3-border-bottom'>Luồng cực đại:"+MaxLuong+"</p>");
}
function L_Dijkstra(){
	if(mDoThi.Ani.length>0||Khoa_L){ Loi_Chay();return;}
	var Goc=mDoThi.Dinhs[0];
	var KQ=mDoThi.Dijkstra(Goc);
	var VB="<p class='w3-white w3-border-bottom'>Đường đi ngắn nhất từ S đến các đỉnh khác</p><p class='w3-white w3-border-bottom'>*->...->Dn:  Chi phí</p>";
	for(var i=0;i<mDoThi.Dinhs.length;i++){
		var NOI=i;
		var j=i;
		while(KQ[0][j]>=0){
			NOI=KQ[0][j]+"->"+NOI;
			j=KQ[0][j];
		}
		if(j==i&&mDoThi.Dinhs[i]==Goc)
			VB+="<p class='w3-green w3-border-bottom'>"+NOI+":  Gốc</p>";
		else if(j==i)
			VB+="<p class='w3-grey w3-border-bottom'>"+NOI+":  Không có đường</p>";
		else
			VB+="<p class='w3-green w3-border-bottom'>"+NOI+":  "+KQ[1][i]+"</p>";
	}
	L_KetQuaR(VB);
}
/* Lệnh đổi màu */
function LenhMau(mamau,listD){
	this.Lists=[];
	this.Ma=mamau;
	if(Array.isArray(listD)){
		this.Lists=this.Lists.concat(listD);
	}
	else this.Lists.push(listD);
}
/* Đối tượng Đỉnh */
function Dinh(nDinh,Dx,Dy){
	var se=this;
	this.name=nDinh; //Tên đỉnh, từ 1->n
	this.HangXom=[]; //Danh sách đỉnh kề
	this.KetNoi=[]; //Danh sách các cung kết nối với nó
	this.DoHoa=new createjs.Container(); //Biến quản lý đồ họa
	
	/* Thao tác toán */

	
	/*Thao tác với đồ họa*/
	this.VeDiem=function(){
		this.DoHoa.removeAllChildren();
		var ND=this.name;
		//Vẽ Hình Tròn
		var dh_T=new createjs.Graphics().s("#999999").f("#FFFFFF").dc(0, 0,30);
		var HT= new createjs.Shape(dh_T);
		//Vẽ Chữ
		var VB=new createjs.Text(ND, "50px Arial", "#000000");
		VB.regX=25;
		VB.regY=25;
		//Thêm vào
		this.DoHoa.addChild(HT,VB);
	}
	this.DoiXY=function(DHx,DHy){
		this.DoHoa.x=DHx;
		this.DoHoa.y=DHy;
		for(var i=0;i<this.KetNoi.length;i++)
			this.KetNoi[i].VeCung(se.KetNoi[i].Dau.DoHoa,se.KetNoi[i].Cuoi.DoHoa,"#999999",se.KetNoi[i].mXoay);
	}
	this.DoiMau=function(mamau){
		var dh_T=new createjs.Graphics().s("#999999").f(mamau).dc(0, 0,30);
		var HT= new createjs.Shape(dh_T);
		this.DoHoa.removeChildAt(0);
		this.DoHoa.addChildAt(HT,0);
	}
	/* Chạy khi Đỉnh được tạo */
	this.VeDiem();
	this.DoiXY(Dx,Dy);
	this.DoHoa.Cha=se;
	this.DoHoa.on("click",L_ThemCung);
	this.DoHoa.on("pressmove",L_MoDiChuyenD);
	this.DoHoa.on("pressup",L_HuyDiChuyenD);
}

/*Đối tượng Cung*/
function Cung(Ddau,Dcuoi,W,cloai,out){
	var se=this;
	this.loai=cloai;
	this.Dau=Ddau;
	this.Cuoi=Dcuoi;
	this.TL=W;
	this.ChieuDai; //Chiều dài đồ họa
	this.mXoay; //Độ cong của đường
	this.DoHoa=new createjs.Container();
	/*Thao Tác với cung*/
	this.DoiLoai1=function(){
		this.loai=1;
		this.XoaMuiTen();
	}
	this.DoiLoai2=function(){
		this.loai=2;
		this.AddMuiTen();
	}
	/*Thao Tác đồ Họa*/
	this.VeCung=function(Dd,Dc,mau,out){
		var OO=(typeof out=="undefined")? 0:out;
		this.mXoay=OO;
		var MM=(typeof mau=="undefined")? "#999999":mau;
		this.DoHoa.removeAllChildren();
		//Tính vector
		var V_x=Dc.x-Dd.x;
		var V_y=Dc.y-Dd.y;
		var cDai=Math.sqrt(Math.pow(V_x,2)+Math.pow(V_y,2));
		var cXoay=Math.atan2(V_y,V_x)*180/Math.PI;
		var cmXoay=Math.atan2(cDai/2-cDai,OO)*180/Math.PI;
		//Vẽ Line
		var dh_L=new createjs.Graphics().ss(5).s(MM).mt(0,0).qt(cDai/2,OO,cDai,0).es();
		var Line=new createjs.Shape(dh_L);
		
		//Thêm vào
		this.ChieuDai=cDai;
		this.DoHoa.x=Dd.x;this.DoHoa.y=Dd.y;
		this.DoHoa.rotation=cXoay;
		this.DoHoa.addChild(Line);
		if(this.loai==2){
			//Vẽ Mũi tên
			var dh_M=new createjs.Graphics().ss(5).s(MM).f(MM).mt(-50,5).lt(-50,-5).lt(-30,0).cp().es();
			var Mui=new createjs.Shape(dh_M);
			Mui.x=cDai;
			Mui.rotation=180+90-cmXoay;
			//console.log(cmXoay);
			this.DoHoa.addChild(Mui);
		}
		//Trong so
		var VB=new createjs.Text(se.TL, "30px Arial", "#FF0000");
		var KhungW=new createjs.Shape(new createjs.Graphics().s("#000000").f("#FFFFFF").dr(-2,-2,35,35));
		var conW=new createjs.Container();
		conW.addChild(KhungW,VB);
		conW.x=cDai/2;conW.y=se.mXoay/2;conW.regX=15;conW.regY=15;conW.rotation=-cXoay;
		conW.alpha=se.TL>0 ? 1:0;
		this.DoHoa.addChild(conW);
	}
	this.XoaMuiTen=function(){
		this.DoHoa.removeChildAt(se.DoHoa.numChildren-2);
	}
	this.AddMuiTen=function(){
		var cDai=this.ChieuDai;
		var cmXoay=Math.atan2(cDai/2-cDai,se.mXoay)*180/Math.PI;
		//Vẽ Mũi tên
		var dh_M=new createjs.Graphics().ss(5).s("#999999").f("#999999").mt(-50,5).lt(-50,-5).lt(-30,0).cp().es();
		var Mui=new createjs.Shape(dh_M);
		Mui.x=cDai;
		Mui.rotation=180+90-cmXoay;
		//console.log(cmXoay);
		this.DoHoa.addChildAt(Mui,1);
	}
	this.DoiMau=function(ma){
		this.VeCung(se.Dau.DoHoa,se.Cuoi.DoHoa,ma,se.mXoay);
	}
	/*Chạy khi tạo cung*/
	this.VeCung(Ddau.DoHoa,Dcuoi.DoHoa,out);
	this.DoHoa.Cha=se;
	this.DoHoa.on("click",L_SuaCung);
}
/* Đồ thị Edmonds */
function DoThiE(DScung,DSdiem){
	var se=this;
	this.Cungs=[]; //DS cung
	this.Dinhs=[]; //DS đỉnh
	this.TrongS=[]; //Trọng số cập nhật
	//Tìm đỉnh trong các tập đỉnh, nếu tồn tại, trả về vị trí tập đỉnh chứa nó,nếu không trả -1
	this.FindD=function(Dinh){
		for(var i=0;i<se.Dinhs.length;i++){
			var A=se.Dinhs[i].indexOf(Dinh);
			if(A!=-1) return i;
		}
		return -1;
	}
	//Lấy trọng số cập nhật
	this.TSO=function(Cung){
		var STT=se.Cungs.indexOf(Cung);
		return se.TrongS[STT];
	}
	//Nhận một đỉnh đại diện, trả về list hàng xóm của tập đỉnh chứa đỉnh đó.
	this.TimHangXom=function(Dinh){
		var STT=se.FindD(Dinh);
		var DS=[]; //Danh sách trả về
		var Roi=[]; //Danh sách những đỉnh đã có trong danh sách
		for(var i=0;i<se.Cungs.length;i++)
			if(se.FindD(se.Cungs[i].Dau)==STT&&Roi.indexOf(se.Cungs[i].Cuoi)==-1){
				var M=se.Dinhs[se.FindD(se.Cungs[i].Cuoi)];
				DS.push(M);
				Roi.concat(M);
			}
		return DS;
	}
	//Duyệt một đỉnh để tìm dinhG, trả về mảng các trên đường đi nếu tìm được, nếu không trả về false
	this.TimKiemDFS=function(Dinh,DinhG,s){
		if(Dinh==DinhG&&s==0) return Dinh;
		var HangXom=se.TimHangXom(Dinh[0]);
		for(var i=0;i<HangXom.length;i++){
			var Chu=se.TimKiemDFS(HangXom[i],DinhG,0);
			if(Chu) return Chu.concat(Dinh);
		}
		return false;
	}
	//Tìm chu trình một đỉnh
	this.ChuTrinh=function(Dinh){
		var A=this.TimKiemDFS(Dinh,Dinh,1);
		return A;
	}
	//Tìm chu trình cho toàn bộ
	this.ChuTrinhA=function(){
		var CChu=[]; //Danh sách chu trình
		var InChu=[];
		for(var i=0;i<se.Dinhs.length;i++){
			if(InChu.indexOf(se.Dinhs[i][0])!=-1) continue;
			var Chu=se.ChuTrinh(se.Dinhs[i]);
			if(Chu){
				Chu.splice(-1);
				InChu=InChu.concat(Chu);
				CChu.push(Chu);
			}
			else{
				InChu=InChu.concat(se.Dinhs[i]);
				CChu.push(se.Dinhs[i]);
			}
		}
		return CChu;
	}
	//Sắp xếp cung
	this.SapXepCung=function(listC){
		var kq=[];
		for(i=0;i<listC.length;i++)
			for(j=kq.length-1;j>=-1;j--)
				if(j==-1||parseInt(se.TSO(listC[i]))>=parseInt(se.TSO(kq[j]))){
					kq.splice(j+1,0,listC[i]);
					break;
				}
		return kq;
	}
	//Thay đổi Cungs TrongS
	this.ChangC=function(CC,TT){
		this.Cungs=CC;
		this.TrongS=TT;
	}
	//Xây dựng đồ thị sắp xỉ
	this.XapXi=function(GocG){
		var CungD=this.SapXepCung(se.Cungs);
		var KQc=[];
		var KQt=[];
		for(var i=0;i<this.Dinhs.length;i++){
			//Kiểm tra không phải gốc
			if(this.Dinhs[i].indexOf(GocG)!=-1) continue;
			//Tìm Cung vào nhỏ nhất
			for(var j=0;j<CungD.length;j++)
				if(se.FindD(CungD[j].Cuoi)==i){
					KQc.push(CungD[j]);
					KQt.push(se.TSO(CungD[j]));
					break;
				}
		}
		se.Cungs=KQc;
		se.TrongS=KQt;
	}
	//Co Đồ thị dựa vào đồ thị xấp xỉ G và danh sách tập đỉnh DSco
	this.Co=function(G,DSco){
		var CungKQ=[];
		var TrongKQ=[];
		for(var i=0;i<DSco.length;i++)
			for(var j=0;j<se.Cungs.length;j++)
				if(DSco[i].indexOf(se.Cungs[j].Dau)!=-1&&DSco[i].indexOf(se.Cungs[j].Cuoi)==-1){
					CungKQ.push(se.Cungs[j]);
					var DiemC=G.Dinhs[G.FindD(se.Cungs[j].Cuoi)]; //Tìm tập đỉnh được trỏ tới
					var numC=-1;
					for(var k=0;k<DSco.length;k++){
						if(DSco[k]==DSco[i]) continue;
						else if(DSco[k].indexOf(se.Cungs[j].Cuoi)!=-1&&DSco[k].length==1) break;
						else if(DSco[k].indexOf(se.Cungs[j].Cuoi)!=-1){
							numC=k;
							break;
						}
					}
					//Nếu cung nối tới một đỉnh đơn
					if(numC==-1){
						TrongKQ.push(se.TrongS[j]);
					}
					//Nếu cung nối tới một chu trình
					if(numC!=-1)
						for(var k=0;k<G.Cungs.length;k++)
							if(G.Cungs[k].Cuoi==se.Cungs[j].Cuoi){
								//Tìm được cạnh trong chu trình
								TrongKQ.push(parseInt(se.TrongS[j])-parseInt(G.TrongS[k]));
							}
				}
		this.Dinhs=DSco;
		this.Cungs=CungKQ;
		this.TrongS=TrongKQ;
	}
	//Giãn đồ thị từ đồ thị co G
/* 	this.Gian=function(G){
		for(var i=0;i<G.Cungs.length;i++){
			//Tìm đối tượng cung đang trỏ đến
			var So=G.FindD(G.Cungs[i].Cuoi);
			//Nếu cung trỏ vào một chu trình
			if(G.Dinhs[So].length>1)
				for(var j=0;j<se.Cungs.length;j++)
					if(se.Cungs[j]!=G.Cungs[i]&&se.Cungs[j].Cuoi==G.Cungs[i].Cuoi&&G.FindD(se.Cungs[j].Dau)==G.FindD(G.Cungs[i].Cuoi)){
						se.Cungs.splice(j,1); //Cắt bỏ cạnh
						se.TrongS.splice(j,1); //Cắt bỏ trọng số cập nhật
						break;
					}
		}
	} */
	//Giãn đồ thị từ H
	this.Gian=function(H){
		var Kcungs=[];
		var Tcungs=[];
		//Duyệt tìm cạnh H trùng với this
		for(var i=0;i<H.Cungs.length;i++){
			var TTC=Kcungs.push(H.Cungs[i]);
			Tcungs.push(H.TrongS[i]);
			//Duyệt tìm nếu có cung gây ra chu trình
			var VT=H.FindD(H.Cungs[i].Cuoi);
			if(this.Dinhs[se.FindD(H.Cungs[i].Cuoi)].length<H.Dinhs[VT].length)
				for(var j=0;j<se.Cungs.length;j++)
					if(se.Cungs[j]!=H.Cungs[i]&&H.Dinhs[VT].indexOf(se.Cungs[j].Cuoi)!=-1&&H.Dinhs[VT].indexOf(se.Cungs[j].Dau)!=-1)
						if(se.FindD(se.Cungs[j].Cuoi)!=se.FindD(H.Cungs[i].Cuoi)){
							Kcungs.push(se.Cungs[j]);
							Tcungs.push(se.TrongS[j]);
						}
						else if(se.FindD(se.Cungs[j].Cuoi)==se.FindD(H.Cungs[i].Cuoi))
								Tcungs[TTC]+=H.TrongS[i];
		}
		this.Cungs=Kcungs;
		this.TrongS=Tcungs;
	}
	//Giữ lại các cạnh trùng với H
	this.GiuTrung=function(H){
		var Kcungs=[];
		var Tcungs=[];
		for(var i=0;i<se.Cungs.length;i++)
			if(H.Cungs.indexOf(se.Cungs[i])!=-1){
				Kcungs.push(se.Cungs[i]);
				Tcungs.push(se.TrongS[i]);
			}
		this.Cungs=Kcungs;
		this.TrongS=Tcungs;
	}
	this.Dinhs=this.Dinhs.concat(DSdiem);
	this.Cungs=this.Cungs.concat(DScung);
	for(var i=0;i<this.Cungs.length;i++)
		this.TrongS.push(DScung[i].TL);
}
/*Đồi Thị*/
function DoThi(nloai){
	var se=this;
	this.autoName=0;
	this.loai=nloai; //loai: 1. Đồ thị vô hướng; 2. Đồ thị có hướng
	this.Dinhs=[]; //Toàn bộ đỉnh
	this.Cungs=[]; //Toàn bộ cung
	this.DoHoa=new createjs.Container(); //Biến quản lý đồ họa
	this.Ani=[]; //Lưu kịch bản đổi màu
	this.AniT=0; //Thời gian bắt đầu kịch bản
	this.Bang=new createjs.Container(); //Dùng bắt sự kiện nhấp vào vùng trống
	this.L_st=new Dinh("null",0,0); //Lưu đỉnh bắt đầu duyệt
	this.setCung=-1; //Số thứ tự cung đang được chọn (dùng cho việc thay đổi trọng số)
	/* Các thao tác */
	this.ThemDinh=function(ten,DHx,DHy){
		if(ten="nothing") ten=this.autoName;
		var newDinh=new Dinh(ten,DHx,DHy); //Tạo đỉnh với name=ten; Vị trí đồ họa DHx,DHy
		this.Dinhs.push(newDinh); //Thêm Vào Danh Sách đỉnh
		this.DoHoa.addChild(newDinh.DoHoa); //Thêm vào đồ họa chính (Để vẽ lên Stage)
		this.autoName++;
	}
	
	this.ThemCung=function(Ddau,Dcuoi,W,cloai){
		if(Ddau==Dcuoi) return;
		var newCung=new Cung(Ddau,Dcuoi,W,cloai);
		this.Cungs.push(newCung);
		this.DoHoa.addChildAt(newCung.DoHoa,1);
		Ddau.HangXom.push(Dcuoi);
		Ddau.KetNoi.push(newCung);
		Dcuoi.HangXom.push(Ddau);
		Dcuoi.KetNoi.push(newCung);
		this.VeLaiCung(newCung);
	}
	this.XoaDinh=function(numDinh){
		for(var i=0;i<se.Dinhs[numDinh].KetNoi.length;i++)
			this.XoaCung(se.Dinhs[numDinh].KetNoi[i]);
		this.DoHoa.removeChild(se.Dinhs[numDinh].DoHoa);
		this.Dinhs.splice(numDinh,1);
	}
	this.XoaMotDinh=function(numDinh){
		this.XoaDinh(numDinh);
		this.autoName--;
		for(var i=numDinh;i<this.Dinhs.length;i++){
			this.Dinhs[i].name--;
			this.Dinhs[i].VeDiem();
		}
	}
	this.XoaCung=function(nCung){
		var scc=this.Cungs.indexOf(nCung);
		this.DoHoa.removeChild(nCung.DoHoa);
		this.Cungs.splice(scc,1);
	}
	this.XoaMotCung=function(nCung){
		var Sd=nCung.Dau.KetNoi.indexOf(nCung); //Số đầu
		var Sc=nCung.Cuoi.KetNoi.indexOf(nCung); //số cuối
		nCung.Dau.KetNoi.splice(Sd,1);
		nCung.Cuoi.KetNoi.splice(Sc,1);
		this.XoaCung(nCung);
		for(var i=0;i<nCung.Dau.KetNoi.length;i++)
			if(nCung.Dau.KetNoi[i].Dau==nCung.Cuoi||nCung.Dau.KetNoi[i].Cuoi==nCung.Cuoi){
				this.VeLaiCung(nCung.Dau.KetNoi[i]);
				console.log("AAA");
			}
	}
	this.ReSetD=function(){
		while(this.Dinhs.length>0){
			this.XoaDinh(0);
		}
		this.autoName=0; //Name auto tro lai nhu cu
	}
	this.NhapDT=function(mData){
		this.ReSetD();
		rData=mData.split('\n');
		var sDinh=parseInt(rData[0].split(' ')[0]);
		var sCung=parseInt(rData[0].split(' ')[1]);
		//Check lỗi
		if(isNaN(sDinh)||isNaN(sCung)) return false;
		//Tạo đỉnh
		var Khoang=50;
		for(var i=0;i<=sDinh;i++)
			this.ThemDinh('nothing',50+Khoang*i,50+Khoang*(i+1));
		//Tạo cung
		for(var i=1;i<=rData.length-1;i++){
			var DD=rData[i].split(' ')[0];
			var DC=rData[i].split(' ')[1];
			var TS=isNaN(rData[i].split(' ')[2])? 0:rData[i].split(' ')[2];
			if(isNaN(DD)||isNaN(DC)||DD>sDinh||DC>sDinh) return false;
			this.ThemCung(se.Dinhs[DD],se.Dinhs[DC],parseInt(TS),se.loai);
		}
		return true;
	}
	this.DoiLoai=function(mloai){
		if(mloai==this.loai) return;
		this.loai=mloai;
		if(mloai==1)
			for(var i=0;i<this.Cungs.length;i++)
				this.Cungs[i].DoiLoai1();
		else
			for(var i=0;i<this.Cungs.length;i++)
				this.Cungs[i].DoiLoai2();
	}
	this.NumDinh=function(Diem){
		return this.Dinhs.indexOf(Diem);
	}
	this.IsHangXom=function(D1,D2){
		//if(this.loai==1&&D1.HangXom.indexOf(D2)!=-1) return true;
		var i=this.Cungs.length-1;
		while(i>=0){
			if((this.Cungs[i].Dau==D1&&this.Cungs[i].Cuoi==D2)||(this.loai==1&&this.Cungs[i].Cuoi==D1&&this.Cungs[i].Dau==D2))
				return true;
			i--;
		}
		return false;
	}
	this.TimHangXom=function(numD){
		var kq=[];
		for(var i=0;i<this.Dinhs.length;i++){
			if(this.IsHangXom(this.Dinhs[numD],this.Dinhs[i]))
				kq.push(this.Dinhs[i]);
		}
		return kq; //Trả về hàng xóm theo thứ tự
	}
	this.VeLaiCung=function(CungV){
		var Xoay=0;
		var pu=1;
		for(var i=0;i<this.Cungs.length;i++)
			if(this.Cungs.indexOf(CungV)!=i&&CungV.Dau==this.Cungs[i].Dau&&CungV.Cuoi==this.Cungs[i].Cuoi&&Xoay==this.Cungs[i].mXoay){
				Xoay+=pu*100;
				pu=pu*0.9;
			}
			else if(this.Cungs.indexOf(CungV)!=i&&CungV.Dau==this.Cungs[i].Cuoi&&CungV.Cuoi==this.Cungs[i].Dau&&Xoay==this.Cungs[i].mXoay)
				Xoay+=(Xoay==0)? 100:0;
		CungV.VeCung(CungV.Dau.DoHoa,CungV.Cuoi.DoHoa,"#999999",Xoay);
	}
	this.DoiMau=function(mamau,mdinh){
		mdinh.DoiMau(mamau);
	}
	this.DoiMaus=function(){
		if(this.Ani.length==0) return;
		var step=(loop-this.AniT);
		if(Math.floor(step/speedAni)>this.Ani.length) return;
		else if(Math.floor(step/speedAni)==this.Ani.length){
			this.DoHoa.mouseEnabled=true;
			this.DoHoa.mouseChildren=false;
			this.DoHoa.on("mousedown",function(evt){
				se.Ani=[];
				se.DoHoa.mouseChildren=true;
				se.ResetMau();
				evt.remove();
			});
			return;
		}
		if(step%speedAni==0){
			for(var i=0;i<this.Ani[Math.floor(step/speedAni)].Lists.length;i++)
				this.Ani[Math.floor(step/speedAni)].Lists[i].DoiMau(this.Ani[Math.floor(step/speedAni)].Ma);
		}
	}
	this.ResetMau=function(){
		for(var i=0;i<this.Dinhs.length;i++)
			this.Dinhs[i].DoiMau("#FFFFFF");
		for(var i=0;i<this.Cungs.length;i++)
			this.Cungs[i].DoiMau();
	}
	this.BFS=function(DiemBD,DuyetRoi){
		var HangDoi=[];
		var copAni=[];
		HangDoi.push(DiemBD); //Cho Điểm BĐ vào hàng đợi
		while(HangDoi.length>0){
			var A=HangDoi.shift(); //Lấy đầu hàng ra
			DuyetRoi.push(A); copAni.push(new LenhMau("#FF9966",A));
			var HX=this.TimHangXom(this.NumDinh(A));
			var ListAdd=[]; //Lưu danh sách hàng xóm chưa duyệt
			for(var i=0;i<HX.length;i++){
				if(DuyetRoi.indexOf(HX[i])==-1&&HangDoi.indexOf(HX[i])==-1){
					ListAdd.push(HX[i]);
				}
			}
			
			//Đưa danh sách hàng xóm vào hàng
			if(ListAdd.length>0){
				HangDoi=HangDoi.concat(ListAdd);
				copAni.push(new LenhMau("#FFFF66",ListAdd));
			}
		}
		this.Ani=this.Ani.concat(copAni);
		this.AniT=loop;
	}
	this.DFS=function(DiemBD,DuyetRoi){
		var NganXep=[];
		var copAni=[];
		NganXep.push(DiemBD); //Cho Điểm BĐ vào ngăn
		while(NganXep.length>0){
			var A=NganXep.pop(); //Lấy 1 đỉnh ra
			if(DuyetRoi.indexOf(A)!=-1) continue; //Nếu đã duyệt rồi
			DuyetRoi.push(A); copAni.push(new LenhMau("#FF9966",A));
			var HX=this.TimHangXom(this.NumDinh(A));
			var ListAdd=[]; //Lưu danh sách hàng xóm chưa duyệt
			for(var i=0;i<HX.length;i++){
				if(DuyetRoi.indexOf(HX[i])==-1){
					ListAdd.push(HX[i]);
				}
			}
			
			//Đưa danh sách hàng xóm vào hàng
			if(ListAdd.length>0){
				NganXep=NganXep.concat(ListAdd);
				copAni.push(new LenhMau("#FFFF66",ListAdd));
			}
		}
		this.Ani=this.Ani.concat(copAni);
		this.AniT=loop;
	}
	this.K_DFS=function(DiemBD,DuyetRoi,KetQua){
		var NganXep=[];
		var copAni=[];
		var copKQL=[]; //Lưu tạm kết quả duyệt
		NganXep.push(DiemBD); //Cho Điểm BĐ vào ngăn
		while(NganXep.length>0){
			var A=NganXep.pop(); //Lấy 1 đỉnh ra
			if(DuyetRoi.indexOf(A)!=-1) continue; //Nếu đã duyệt rồi
			DuyetRoi.push(A); copKQL.push(A);
			var HX=this.TimHangXom(this.NumDinh(A));
			var ListAdd=[]; //Lưu danh sách hàng xóm chưa duyệt
			for(var i=0;i<HX.length;i++){
				if(DuyetRoi.indexOf(HX[i])==-1){
					ListAdd.push(HX[i]);
				}
			}
			
			//Đưa danh sách hàng xóm vào hàng
			if(ListAdd.length>0){
				NganXep=NganXep.concat(ListAdd);
				//
			}
		}
		//Nếu có đỉnh dược duyệt trong lần gọi này
		if(copKQL.length>0){
			KetQua.Llist.push(copKQL);
			copAni.push(new LenhMau(Color_L[KetQua.Llist.length-1],copKQL));
		}
		this.Ani=this.Ani.concat(copAni);
		this.AniT=loop;
	}
	this.K_Tarjan=function(DiemBD,DuyetRoi,KetQua,T_List,NganXep){
		var numBD=this.NumDinh(DiemBD); //Chỉ số đỉnh
		var HX=this.TimHangXom(numBD); //Hàng xóm
		var TT=DuyetRoi.length; //Thứ tự duyệt
		DuyetRoi.push(DiemBD); //Đánh dấu đã duyệt
		NganXep.push(DiemBD); //Bỏ vào ngăn xếp
		T_List[numBD].key=TT;
		T_List[numBD].lowkey=TT;
		for(var i=0;i<HX.length;i++){
			//Nếu đã xác định thành phần liên thông
			if(T_List[this.NumDinh(HX[i])].lowkey==-1){
				continue;
			}
			//Nếu chưa duyệt
			else if(T_List[this.NumDinh(HX[i])].key==-1){
				var KeyC=this.K_Tarjan(HX[i],DuyetRoi,KetQua,T_List,NganXep);
				KeyC=(KeyC>=0)? KeyC:9999;
				T_List[numBD].lowkey=Math.min(T_List[numBD].lowkey,KeyC);
			}
			//Nếu duyệt rồi nhưng có lowkey nhỏ
			else if(T_List[this.NumDinh(HX[i])].lowkey<T_List[numBD].lowkey){
				T_List[numBD].lowkey=T_List[this.NumDinh(HX[i])].lowkey;
			}
		}
		//Nếu DiemBD là gốc của thành phần liên thông
		if(T_List[numBD].key==T_List[numBD].lowkey){
			var stt=NganXep.indexOf(DiemBD); //Vị trí của DiemBD trong ngăn
			var TP=NganXep.splice(stt); //Lấy numBD và các phần vào sau nó ra
			KetQua.Llist.push(TP); //Bỏ vào kết quả
			this.Ani.push(new LenhMau(Color_L[KetQua.Llist.length-1],TP)); //Xác định màu
			this.AniT=loop;
			for(var i=0;i<TP.length;i++)
				T_List[this.NumDinh(TP[i])].lowkey=-1;
		}
		return T_List[numBD].lowkey;
	}
	this.LienThong=function(){
		var KetQua={};
		KetQua.Tloi=true; //true: Liên thông, false: Không liên thông
		KetQua.Llist=[]; //Mảng gồm các bộ phận liên thông.
		DuyetList=[]; //Các đỉnh đã duyệt
		if(this.loai==1){
			//Tìm liên thông vô hướng
			for(var i=0;i<this.Dinhs.length;i++){
				if(DuyetList.indexOf(se.Dinhs[i])==-1)
					this.K_DFS(se.Dinhs[i],DuyetList,KetQua);
			}
			if(KetQua.Llist.length!=1) KetQua.Tloi=false;
		}
		else if(this.loai==2){
			var T_List=[]; //Mảng lưu key và lowkey
			//khởi tạo giá trị mảng lưu key/lowkey
			for(var i=0;i<this.Dinhs.length;i++){
				var K={
					key: -1,
					lowkey: 9999
				};
				T_List.push(K);
			}
			for(var i=0;i<this.Dinhs.length;i++){
				var NganXep=[]; //Ngăn rỗng
				if(DuyetList.indexOf(se.Dinhs[i])==-1)
					this.K_Tarjan(se.Dinhs[i],DuyetList,KetQua,T_List,NganXep);
			}
			//console.log(T_List);
			if(KetQua.Llist.length!=1) KetQua.Tloi=false;
		}
		return KetQua;
	}
	this.TimKiem_DFS=function(DiemBD,DiemKT){
		var DuyetRoi=[];
		var NganXep=[];
		var copAni=[];
		NganXep.push(DiemBD); //Cho Điểm BĐ vào ngăn
		while(NganXep.length>0){
			var A=NganXep.pop(); //Lấy 1 đỉnh ra
			if(DuyetRoi.indexOf(A)!=-1) continue; //Nếu đã duyệt rồi
			if(Array.isArray(DiemKT)&&DiemKT.indexOf(A)!=1) return true;
			else if(A==DiemKT) return true; //Tìm thấy DiemKT
			DuyetRoi.push(A);
			var HX=this.TimHangXom(this.NumDinh(A));
			var ListAdd=[]; //Lưu danh sách hàng xóm chưa duyệt
			for(var i=0;i<HX.length;i++){
				if(DuyetRoi.indexOf(HX[i])==-1){
					ListAdd.push(HX[i]);
				}
			}
			
			//Đưa danh sách hàng xóm vào hàng
			if(ListAdd.length>0){
				NganXep=NganXep.concat(ListAdd);
			}
		}
		return false;
	}
	this.SapXepCung=function(listC){
		var kq=[];
		for(i=0;i<listC.length;i++)
			for(j=kq.length-1;j>=-1;j--)
				if(j==-1||parseInt(listC[i].TL)>=parseInt(kq[j].TL)){
					kq.splice(j+1,0,listC[i]);
					break;
				}
		return kq;
	}
	this.Kruskal=function(){
		var Lcung=this.SapXepCung(se.Cungs);
		var CayKhung=new DoThi(1); //Đồ thị lưu dữ liệu cây
		CayKhung.Dinhs=CayKhung.Dinhs.concat(se.Dinhs);
		for(var i=0;i<Lcung.length;i++){
			console.log(CayKhung.TimKiem_DFS(Lcung[i].Dau,Lcung[i].Cuoi));
			if(!CayKhung.TimKiem_DFS(Lcung[i].Dau,Lcung[i].Cuoi)){
				this.Ani.push(new LenhMau("#FF0000",[Lcung[i],Lcung[i].Dau,Lcung[i].Cuoi]));
				if(CayKhung.Cungs.push(Lcung[i])==CayKhung.Dinhs.length-1){
					break;
				}
			}
		}
		this.AniT=loop;
		return [CayKhung,Lcung];
	}
	this.Prim=function(){
		var DuyetRoi=[]; //Đỉnh đã duyệt
		var listC=[]; //Danh sách cung sẽ xem xét
		var CayKhung=new DoThi(1); //Đồ thị lưu dữ liệu cây
		var DC=this.Dinhs[0]; //Bỏ đỉnh đầu tiên vào để xét
		while(CayKhung.Cungs.length<this.Dinhs.length-1){
			//Thêm các cung mới nối với đỉnh vào listC
			for(var i=0;i<DC.KetNoi.length;i++)
				if(DuyetRoi.indexOf(DC.KetNoi[i].Cuoi)==-1&&DuyetRoi.indexOf(DC.KetNoi[i].Dau)==-1)
					listC.push(DC.KetNoi[i]);
				else{
					//Xét trường hợp cung nối đến các đỉnh đã duyệt rồi vẫn còn trong listC 
					var A=listC.indexOf(DC.KetNoi[i]);
					if(A==-1) continue;
					listC.splice(A,1); //Loại bỏ cung khỏi listC
				}
			//Đánh dấu đã duyệt đỉnh đang xét
			DuyetRoi.push(DC);
			this.Ani.push(new LenhMau("#00CCCC",DC)); //Tô đỉnh
			//Sắp xếp lại listC
			listC=this.SapXepCung(listC);
			//Chọn cung có Trọng số nhỏ nhất thêm vào Cây
			var CungNho=listC.shift();
			if(typeof CungNho=="undefined") break; //Xảy ra khi đồ thị không liên thông
			CayKhung.Cungs.push(CungNho);
			this.Ani.push(new LenhMau("#00CCCC",CungNho)); //tô cung
			//Đổi đỉnh DC bằng đỉnh mới
			if(DuyetRoi.indexOf(CungNho.Dau)==-1){
				DC=CungNho.Dau;
			}
			else{
				DC=CungNho.Cuoi;
			}
		}
		this.Ani.push(new LenhMau("#00CCCC",DC)); //Tô đỉnh cuối
		this.AniT=loop; //Gán thời gian
		return CayKhung;
	}
	this.Edmonds=function(Goc){
		//Khởi tạo
		var H=[];
		var G=[];
		var stop=1;
		var tapdinh=[];
		for(var i=0;i<this.Dinhs.length;i++)
			tapdinh.push([se.Dinhs[i]]);
		G.push(new DoThiE(se.Cungs,tapdinh));
		//Pha co
		while(stop==1){
			console.log(G[G.length-1]);
			var DTx=new DoThiE(G[G.length-1].Cungs,G[G.length-1].Dinhs);
			var DTg=new DoThiE(G[G.length-1].Cungs,G[G.length-1].Dinhs);
			console.log("SSSSSSSSSS",DTx.Cungs);
			DTx.XapXi(Goc);
			console.log("KK",DTx.Cungs);
			H.push(DTx);
			var CT=DTx.ChuTrinhA();
			//console.log(DTx);
			
			//Nếu có chu trình
			if(CT.length<DTx.Dinhs.length){
				//console.log("AA");
				DTg.Co(DTx,CT);
				G.push(DTg);
			}
			else {
				stop=2;
				//console.log(G.length);
				if(G.length==1){return [DTx];}
			}
		}
		console.log("A",H);
		//Pha giãn
		//G[G.length-1].GiuTrung(H[H.length-1]);
		for(var i=H.length-2;i>=0;i--){
			H[i].Gian(H[i+1]);
			//console.log(i);
		}
		console.log(H);
		console.log(G);
		return H;
	}
	this.CayCoHuong=function(){
		var Goc=se.Dinhs[0];
		var KQ=this.Edmonds(Goc);
		var Mang=[];
		Mang=Mang.concat(KQ[0].Cungs);
		for(var i=0;i<KQ[0].Dinhs.length;i++)
			Mang=Mang.concat(KQ[0].Dinhs[i][0]);
		console.log(Mang);
		this.Ani.push(new LenhMau("#FF0000",Mang));
		this.AniT=loop;
		return KQ;
	}
	//Tìm tổng khả năng thông qua A đến B
	this.FindC=function(A,B){
		var MaxC=Number.MAX_SAFE_INTEGER;
		for(var i=0;i<A.KetNoi.length;i++){
			if(A.KetNoi[i].Cuoi==B)
				MaxC=(MaxC<Number.MAX_SAFE_INTEGER)? MaxC+parseInt(A.KetNoi[i].TL):A.KetNoi[i].TL;
		}
		if(MaxC!=Number.MAX_SAFE_INTEGER) return MaxC;
		return false;
	}
	this.FindF=function(nA,nB,LC,num){
		console.log(LC);
		if(typeof num!="undefined") LC[nA][nB]=num;
		return (typeof LC[nA][nB]=="undefined") ? 0:LC[nA][nB] ;
	}
	this.Ford=function(DiemS,DiemT){
		var Ul=Number.MAX_SAFE_INTEGER; //Vô cực
		//Tìm index
		var iS=this.NumDinh(DiemS);
		var iT=this.NumDinh(DiemT);
		var f=[]; //luồng đã tăng mỗi cung
		for(var i=0;i<this.Dinhs.length;i++)
			f.push(new Array(se.Dinhs.length));
		while(true){
			//Khai báo
			var NganXep=[];
			var LatCat=[];
			var d=[]; //Hướng cung
			var p=[]; //Đỉnh trước trên đường tăng luồng
			var m=[]; //Lượng tăng lớn nhất luồng có thể tăng
			//Đánh dấu S
			d[iS]=true;
			p[iS]=iS;
			m[iS]=Ul;
			//Cho S vào hàng đợi
			NganXep.push(iS);
			//Tìm đường tăng luồng
			while(NganXep.length>0){
				//Lấy một đỉnh ra
				var DD=NganXep.pop();
				console.log(DD);
				var HX=this.TimHangXom(DD);
				//Duyệt tìm đường đi đến điểm kề
				for(var i=0;i<HX.length;i++){
					var nV=this.NumDinh(HX[i]);
					if(typeof d[nV]=="undefined"&&this.FindC(se.Dinhs[DD],HX[i])>this.FindF(DD,nV,f)){
						
						//Đánh dấu S
						d[nV]=true;
						p[nV]=DD;
						m[nV]=Math.min(m[DD],this.FindC(se.Dinhs[DD],HX[i])-this.FindF(DD,nV,f));
						NganXep.push(nV);
					}
				}
				for(var i=0;i<this.Dinhs[DD].HangXom.length;i++){
					var nX=this.NumDinh(se.Dinhs[DD].HangXom[i]);
					if(typeof d[nX]=="undefined"&&HX.indexOf(se.Dinhs[DD].HangXom[i])==-1&&se.FindF(nX,DD,f)>0){
						d[nX]=false;
						p[nX]=DD;
						m[nX]=Math.min(m[DD],se.FindF(nX,DD,f));
						NganXep.push(nX);
					}
				}
				console.log(d,p,m);
				if(typeof d[iT]!="undefined" ) break;
			}
			//Duyệt mà không tìm được đường đi
			if(typeof(d[iT])=="undefined" ){
				LatCat=LatCat.concat(d);
				break;
			}
			//Tăng luồng theo đường tăng luồng
			console.log("Tăng");
			var XX=iT;
			var sigma=m[XX];
			var ListDuong=[];
			while(XX!=iS){
				console.log("LOOP",XX);
				if(XX==iT) ListDuong.push(this.Dinhs[XX]);
				ListDuong.push(this.Dinhs[p[XX]]);
				if(d[XX]){
					se.FindF(p[XX],XX,f,se.FindF(p[XX],XX,f)+sigma);
					for(var r=0;r<this.Dinhs[p[XX]].KetNoi.length;r++)
						if(this.Dinhs[p[XX]].KetNoi[r].Cuoi==this.Dinhs[XX])
							ListDuong.push(this.Dinhs[p[XX]].KetNoi[r]);
				}
				else
					se.FindF(XX,p[XX],f,se.FindF(XX,p[XX],f)-sigma);
				XX=p[XX];
			}
			this.Ani.push(new LenhMau("#90EE90",ListDuong));
			console.log(f);
			//break;
		}
		this.AniT=loop;
		return [f,LatCat];
	}
	/* Cung nhỏ nhất từ A đến B */
	this.CungNhoNhat=function(A,B){
		var WNN=Number.MAX_SAFE_INTEGER;
		var CNN;
		for(var i=0;i<A.KetNoi.length;i++)
			if((A.KetNoi[i].Cuoi==B||(A.KetNoi[i].Dau==B&&this.loai==1))&&A.KetNoi[i].TL<WNN){
				CNN=A.KetNoi[i];
				WNN=A.KetNoi[i].TL;
			}
		return CNN;
	}
	/* Giải thuật Dijkstra */
	this.Dijkstra=function(Goc){
		/*Phần khởi tạo */
		var STTG=se.NumDinh(Goc);
		var pi=[]; //Chiều dài đường đi ngắn nhất từ Gốc đến U
		var p=[]; //Đỉnh trước đỉnh U
		var DanhDau=[]; //Chứa đỉnh đã tìm được đường đi
		for(var i=0;i<this.Dinhs.length;i++){
			pi.push(Number.MAX_SAFE_INTEGER);
			p.push(-1);
			DanhDau.push(-1);
		}
		pi[STTG]=0;
		/* Tìm đường */
		for(var i=0;i<this.Dinhs.length;i++){
			//Tìm đỉnh có đường đi ngắn nhất chưa xét
			var NganNhat=Number.MAX_SAFE_INTEGER;
			var Dngan=-1;
			for(var j=0;j<this.Dinhs.length;j++)
				if(DanhDau[j]==-1&&pi[j]<=NganNhat){
					NganNhat=pi[j];
					Dngan=j;
				}
			//Đánh dấu nó
			DanhDau[Dngan]=1;
			if(Dngan!=STTG&&p[Dngan]!=-1)
				this.Ani.push(new LenhMau("#CD69C9",[ se.Dinhs[Dngan],se.CungNhoNhat( se.Dinhs[p[Dngan]],se.Dinhs[Dngan] ) ]));
			else
				this.Ani.push(new LenhMau("#CD69C9", se.Dinhs[Dngan]) );
			//Cập nhật đỉnh kề chưa xét của Dngan
			var HX=this.TimHangXom(Dngan);
			for(var j=0;j<HX.length;j++){
				console.log("á");
				var V=this.NumDinh(HX[j]);
				var CNN=this.CungNhoNhat(se.Dinhs[Dngan],HX[j]); //Cung nhỏ nhất từ Dngan tới j
				if(CNN.TL+pi[Dngan]<pi[V]){
					p[V]=Dngan;
					pi[V]=CNN.TL+pi[Dngan];
				}
			}
		}
		this.AniT=loop;
		return [p,pi];
	}
	/* Chạy khi khởi tạo */
	this.Bang.hitArea=new createjs.Shape(new createjs.Graphics().f("#FF0000").dr(0,0,800,600));
	this.DoHoa.addChild(se.Bang);
}