import{a as se}from"./chunk-JUFPAQTD.js";import{$ as Ee,Aa as Ae,Ba as je,C as b,D as le,Da as Be,E as L,F as me,J as pe,L as ce,P as de,Q as he,R as ue,S as fe,V as ge,W as xe,X as _e,Y as Ce,Z as ve,_ as be,a as ie,aa as Se,ba as we,ca as ye,da as De,ea as Me,fa as Te,ga as Ie,ha as Ve,i as V,ia as N,j as ne,k as ae,l as w,m as oe,n as re,o as F,p as O,sa as ke,ta as T,ua as P,va as Oe,wa as Le,xa as A,ya as j,za as Pe}from"./chunk-WAPFYI2K.js";import{Ac as I,Bb as u,Cc as te,Db as f,Hb as J,Ib as Q,Jb as U,Kb as q,Lb as o,Mb as C,Nb as M,Ob as Z,Pb as K,Qb as X,Sa as m,Ta as d,Tb as ee,_ as W,hb as h,ia as v,ja as $,jb as c,qa as x,ra as _,sb as i,tb as t,ub as g,vb as y,wb as D,yb as S,zc as k}from"./chunk-FOHSYZOF.js";function ze(e,n){e&1&&(i(0,"div"),g(1,"app-welcome-loader"),t())}function Ge(e,n){if(e&1&&(i(0,"tr")(1,"td")(2,"b"),o(3,"Comment :"),t()(),i(4,"td"),o(5),t()()),e&2){let r=f(2);m(5),C(r.tableData.comment)}}function Ye(e,n){if(e&1&&(i(0,"div")(1,"div",1)(2,"div",2)(3,"p"),o(4,"Expense Details"),t()(),i(5,"table",3)(6,"tr")(7,"td")(8,"b"),o(9,"Name : "),t()(),i(10,"td"),o(11),t()(),i(12,"tr")(13,"td")(14,"b"),o(15,"Amount : "),t()(),i(16,"td"),o(17),t()(),i(18,"tr")(19,"td")(20,"b"),o(21,"Expense Date :"),t()(),i(22,"td"),o(23),t()(),i(24,"tr")(25,"td")(26,"b"),o(27,"Expense Category : "),t()(),i(28,"td"),o(29),t()(),i(30,"tr")(31,"td")(32,"b"),o(33,"Payment Type : "),t()(),i(34,"td"),o(35),t()(),h(36,Ge,6,1,"tr",0),t()(),i(37,"div",4)(38,"button",5),o(39,"Ok"),t()()()),e&2){let r=f();m(11),C(r.tableData.name),m(6),C(r.tableData.amount),m(6),C(r.tableData.expense_date),m(6),C(r.tableData.expense_category),m(6),C(r.tableData.payment),m(),c("ngIf",r.tableData.comment!=null&&r.tableData.comment&&r.tableData.comment!="")}}var Fe=(()=>{let n=class n{constructor(l){this.businessData=l,this.tableData=[],this.isLoading=!1}ngOnInit(){this.onGetSingleExpense()}onGetSingleExpense(){this.isLoading=!0,this.businessData.onGetSingleExpense(this.businessData.data.data._id).subscribe(l=>{this.tableData=l.data,this.isLoading=!1})}};n.\u0275fac=function(a){return new(a||n)(d(b))},n.\u0275cmp=v({type:n,selectors:[["app-view-single"]],decls:2,vars:2,consts:[[4,"ngIf"],[2,"margin-top","30px"],[1,"viewExpense"],["align","center"],["mat-dialog-actions","","align","end"],["mat-flat-button","","mat-dialog-close","","color","primary"]],template:function(a,s){a&1&&h(0,ze,2,0,"div",0)(1,Ye,40,6,"div",0),a&2&&(c("ngIf",s.isLoading),m(),c("ngIf",!s.isLoading))},dependencies:[I,le,w,P,A],styles:[".viewExpense[_ngcontent-%COMP%]{margin-left:10px}.viewExpense[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.2rem}"]});let e=n;return e})();function $e(e,n){if(e&1){let r=S();i(0,"div")(1,"div",3)(2,"p"),o(3,"Nothing to Show "),t(),i(4,"button",4),u("click",function(){x(r);let a=f(2);return _(a.onHome())}),o(5,"Add Expense"),t(),g(6,"img",5),t()()}}function Je(e,n){if(e&1&&(i(0,"div",6),g(1,"canvas",7),t()),e&2){let r=f(2);m(),c("type","pie")("datasets",r.pieChartDatasets)("labels",r.pieChartLabels)("options",r.pieChartOptions)("plugins",r.pieChartPlugins)("legend",r.pieChartLegend)}}function Qe(e,n){if(e&1&&(i(0,"div")(1,"div")(2,"p",1),o(3,"Click on Category for more details"),t()(),h(4,$e,7,0,"div",0)(5,Je,2,6,"div",2),t()),e&2){let r=f();m(4),c("ngIf",r.pieChartLabels.length===0&&r.chartType==="pie"),m(),c("ngIf",r.pieChartLabels.length>0)}}function Ue(e,n){if(e&1&&(i(0,"mat-option",13),o(1),t()),e&2){let r=n.$implicit;c("value",r),m(),C(r)}}function qe(e,n){e&1&&(i(0,"div")(1,"div",3)(2,"p"),o(3,"Select Year for "),i(4,"b"),o(5,"Monthly"),t(),o(6," details. "),t(),g(7,"img",14),t()())}function Ze(e,n){if(e&1&&(i(0,"div",15),g(1,"canvas",16),t()),e&2){let r=f(2);m(),c("data",r.barChartData)("options",r.barChartOptions)("plugins",r.barChartPlugins)("legend",r.barChartLegend)("type","bar")}}function Ke(e,n){if(e&1){let r=S();i(0,"div")(1,"div")(2,"p",1),o(3,"Click on "),i(4,"b"),o(5,"Bars"),t(),o(6," for more details"),t()(),i(7,"div",8)(8,"mat-form-field",9)(9,"mat-label"),o(10,"Select Year"),t(),i(11,"mat-select",10),X("valueChange",function(a){x(r);let s=f();return K(s.selectedYear,a)||(s.selectedYear=a),_(a)}),u("selectionChange",function(a){x(r);let s=f();return _(s.onSelectionChange(a))}),h(12,Ue,2,2,"mat-option",11),t()()(),h(13,qe,8,0,"div",0)(14,Ze,2,5,"div",12),t()}if(e&2){let r=f();m(11),Z("value",r.selectedYear),m(),c("ngForOf",r.years),m(),c("ngIf",r.selectedYear===""&&r.chartType==="bar"),m(),c("ngIf",r.selectedYear!=="")}}var Y=(()=>{let n=class n{constructor(l,a,s){this.dialog=l,this.businessData=a,this.route=s,this.chartType=[],this.pieChartLabels=[],this.pieValues=[],this.years=[],this.selectedYear="",this.allMonths=[],this.barChartData={labels:[],datasets:[]},this.pieChartLegend=!0,this.pieChartPlugins=[],this.barChartLegend=!0,this.barChartPlugins=[],this.barChartOptions={responsive:!0},this.pieChartOptions={responsive:!0}}onHome(){this.businessData.pieDialogRef.close(),this.businessData.onHome()}ngOnInit(){this.chartType=this.businessData.chartType,this.pieChartLabels=this.businessData.pieLabels,this.pieChartDatasets=[{data:this.businessData.piedata}],this.years=[];for(let l in this.businessData.hashmap)this.years.push(l)}onSelectionChange(l){this.allMonths={Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0};let a=this.businessData.hashmap[l.value];for(let p of a)this.allMonths[p[0]]+=p[1];let s=[];for(let p in this.allMonths)s.push(this.allMonths[p]);this.barChartData={labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],datasets:[{data:s,label:l.value}]}}};n.\u0275fac=function(a){return new(a||n)(d(T),d(b),d(V))},n.\u0275cmp=v({type:n,selectors:[["app-show-chart"]],decls:2,vars:2,consts:[[4,"ngIf"],[1,"categorypara"],["class","pieChart",4,"ngIf"],[2,"display","flex","justify-content","center","align-items","center","flex-direction","column"],["mat-raised-button","",2,"margin-bottom","10px",3,"click"],["src","../../../assets/image/pie22.gif","height","200px","width","200px"],[1,"pieChart"],["baseChart","","id","myCanvas",3,"type","datasets","labels","options","plugins","legend"],[2,"display","flex","justify-content","center"],["appearance","outline"],[3,"valueChange","selectionChange","value"],[3,"value",4,"ngFor","ngForOf"],["class","barChart",4,"ngIf"],[3,"value"],["src","../../../assets/image/nobar.gif","height","220px","width","300px"],[1,"barChart"],["id","myBarCanvas","baseChart","",3,"data","options","plugins","legend","type"]],template:function(a,s){a&1&&h(0,Qe,6,2,"div",0)(1,Ke,15,4,"div",0),a&2&&(c("ngIf",s.chartType==="pie"),m(),c("ngIf",s.chartType==="bar"))},dependencies:[k,I,w,pe,me,ce,ae,je],styles:[".pieChart[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:300px;margin-top:30px}.barChart[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:300px;margin-top:10px}#myCanvas[_ngcontent-%COMP%]{width:300px!important;height:300px!important}.categorypara[_ngcontent-%COMP%]{font-size:15px;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;padding-top:10px;padding-left:10px}"]});let e=n;return e})();var tt=()=>[5,10];function it(e,n){e&1&&(i(0,"div"),g(1,"app-loader"),t())}function nt(e,n){if(e&1&&(i(0,"div",34)(1,"mat-card",35)(2,"mat-card-content")(3,"p",36)(4,"mat-icon",37),o(5),t()(),i(6,"p",38),o(7),t(),i(8,"p",39),o(9),t()()()()),e&2){let r=n.$implicit;m(5),C(r.icon),m(2),C(r.content),m(2),C(r.title)}}function at(e,n){e&1&&(i(0,"th",40),o(1," Name "),t())}function ot(e,n){if(e&1&&(i(0,"td",41),o(1),t()),e&2){let r=n.$implicit;m(),M(" ",r.name," ")}}function rt(e,n){e&1&&(i(0,"th",40),o(1," Amount "),t())}function st(e,n){if(e&1&&(i(0,"td",41),o(1),t()),e&2){let r=n.$implicit;m(),M(" ",r.amount," ")}}function lt(e,n){e&1&&(i(0,"th",40),o(1," Expense Date "),t())}function mt(e,n){if(e&1&&(i(0,"td",41),o(1),t()),e&2){let r=n.$implicit;m(),M(" ",r.expense_date," ")}}function pt(e,n){e&1&&(i(0,"th",40),o(1," Expense Category "),t())}function ct(e,n){if(e&1&&(i(0,"td",41),o(1),t()),e&2){let r=n.$implicit;m(),M(" ",r.expense_category," ")}}function dt(e,n){e&1&&(i(0,"th",40),o(1," Payment "),t())}function ht(e,n){if(e&1&&(i(0,"td",41),o(1),t()),e&2){let r=n.$implicit;m(),M(" ",r.payment," ")}}function ut(e,n){e&1&&(i(0,"th",40),o(1," Comment "),t())}function ft(e,n){if(e&1&&(i(0,"td",41),o(1),t()),e&2){let r=n.$implicit;m(),M(" ",r.comment," ")}}function gt(e,n){e&1&&g(0,"tr",42)}function xt(e,n){if(e&1){let r=S();i(0,"tr",43),u("click",function(){let a=x(r).$implicit,s=f(2);return _(s.onOpen(a))}),t()}}function _t(e,n){if(e&1){let r=S();i(0,"div",2)(1,"div",3),h(2,nt,10,3,"div",4),t(),i(3,"div",5)(4,"div",6)(5,"mat-card")(6,"mat-card-title",7),o(7,"Category Summary"),t(),i(8,"mat-card-subtitle",8),o(9,"Click to View"),t(),i(10,"mat-card-content")(11,"div",9)(12,"button",10),u("click",function(){x(r);let a=f();return _(a.openPieChart())}),g(13,"img",11),t()()()()(),i(14,"div",6)(15,"mat-card")(16,"mat-card-title",7)(17,"p"),o(18,"Expense Monthly Summary"),t()(),i(19,"mat-card-subtitle",12),o(20,"Click to View"),t(),i(21,"mat-card-content")(22,"div",13)(23,"button",10),u("click",function(){x(r);let a=f();return _(a.openBarChart())}),g(24,"img",14),t()()()()()(),i(25,"div",15)(26,"div",16)(27,"mat-card")(28,"mat-card-title",7),o(29,"Detail Summary"),t(),i(30,"mat-card-subtitle",7),o(31,"Click on row to Edit/Delete Expense"),t(),i(32,"mat-card-content",17)(33,"div",18)(34,"div",19)(35,"div",20)(36,"table",21),y(37,22),h(38,at,2,0,"th",23)(39,ot,2,1,"td",24),D(),y(40,25),h(41,rt,2,0,"th",23)(42,st,2,1,"td",24),D(),y(43,26),h(44,lt,2,0,"th",23)(45,mt,2,1,"td",24),D(),y(46,27),h(47,pt,2,0,"th",23)(48,ct,2,1,"td",24),D(),y(49,28),h(50,dt,2,0,"th",23)(51,ht,2,1,"td",24),D(),y(52,29),h(53,ut,2,0,"th",23)(54,ft,2,1,"td",24),D(),h(55,gt,1,0,"tr",30)(56,xt,1,0,"tr",31),t()(),g(57,"mat-paginator",32),t()()()()()(),i(58,"div")(59,"button",33),u("click",function(){x(r);let a=f();return _(a.onAdd())}),i(60,"mat-icon"),o(61,"add-chart"),t()()()()}if(e&2){let r=f();m(2),c("ngForOf",r.cards),m(34),c("dataSource",r.dataSource),m(19),c("matHeaderRowDef",r.displayedColumns),m(),c("matRowDefColumns",r.displayedColumns),m(),c("pageSizeOptions",ee(5,tt))}}var Ne=(()=>{let n=class n{constructor(l,a,s,p,E,R){this.businessData=l,this.dialog=a,this.http=s,this.route=p,this.authServ=E,this._snackBar=R,this.displayedColumns=["name","amount","expense_date","expense_category","payment","comment"],this.ELEMENT_DATA=[],this.isLoading=!0,this.isDelete=!1,this.dataSource=new N,this.cards=[],this.allexpense=0,this.count=0,this.hashMap={},this.userId=sessionStorage.getItem("Id")?.split(" ")[1]}ngOnInit(){this.isLoading=!0,this.isDelete=!1,this.userId=sessionStorage.getItem("Id")?.split(" ")[1],this.getAllExpense(this.userId)}onHome(){this.route.navigate(["home"])}updateExpene(){let l={expenseLogged:this.businessData.expensesLogged?this.businessData.expensesLogged:0};console.log("update expense"+this.userId,l),this.authServ.updateUserData(this.userId,l)}getAllExpense(l){this.businessData.onGetAllExpense(l).subscribe(a=>{this.ELEMENT_DATA=a.data,this.dataSource=new N(this.ELEMENT_DATA),this.count=0;let s=a.data.length;setTimeout(()=>{this.dataSource.paginator=this.paginator},5e3),this.cards=[{icon:"today",title:"First Expense Date",content:s>0?a.data[0].expense_date:"-"},{icon:"today",title:"Latest Expense Date",content:s>0?a.data[a.data.length-1].expense_date:"-"},{icon:"numbers",title:"Number of Expenses",content:s},{icon:"monetization_on",title:"Total Amount",content:"\u20B9"+this.count}],this.allexpense=s,this.businessData.expensesLogged=this.allexpense,this.updateExpene(),this.pieChartData(a.data),this.onBarChartEdit(a.data),setTimeout(()=>{this.isLoading=!1},4e3)},a=>{this._snackBar.open("Session Expired!!","",{duration:2e3}),this.authServ.onLogout()})}pieChartData(l){this.businessData.pieLabels=[],this.businessData.piedata=[],this.hashMap={},this.count=0,l&&this.businessData.onGetAllCategory().subscribe(a=>{this.cate=a.data;for(let s=0;s<this.cate.length;s++)this.hashMap[this.cate[s]]=0;for(let s=0;s<l.length;s++)this.hashMap[l[s].expense_category]+=l[s].amount;for(let s in this.hashMap)this.hashMap[s]!=0&&(this.businessData.pieLabels.push(s),this.businessData.piedata.push(this.hashMap[s]),this.count+=this.hashMap[s]);this.cards[3].content="\u20B9"+this.count})}openPieChart(){this.businessData.chartType="pie";let l=this.dialog.open(Y,{width:"500px",height:"400px"});this.businessData.pieDialogRef=l}onBarChartEdit(l){let a={};for(let s=0;s<l.length;s++){let p=l[s].expense_date.toString().split(" ");a[p[3]]=[]}for(let s=0;s<l.length;s++){let p=l[s].expense_date.toString().split(" ");a[p[3]].push([p[1],l[s].amount])}this.businessData.hashmap=a,console.log(a)}openBarChart(){this.businessData.chartType="bar";let l=this.dialog.open(Y,{width:"700px",height:"450px"})}onOpen(l){this.openDialog();let a={action:"edit",data:l};this.businessData.data=a}openDialog(){this.dialog.open(Ct,{width:"300px",height:"190px"}).afterClosed().subscribe(a=>{a==="delete"&&this.getAllExpense(this.userId)})}onAdd(){this.businessData.onNavigate("home")}};n.\u0275fac=function(a){return new(a||n)(d(b),d(T),d(ie),d(V),d(O),d(F))},n.\u0275cmp=v({type:n,selectors:[["app-view-expenses"]],viewQuery:function(a,s){if(a&1&&J(j,5),a&2){let p;Q(p=U())&&(s.paginator=p.first)}},decls:2,vars:2,consts:[[4,"ngIf"],["class","main",4,"ngIf"],[1,"main"],[1,"row","row-col-4"],["class","col-lg-3 col-xs-3 col-md-12 col-sm-6",4,"ngFor","ngForOf"],[1,"row","row-col-2"],[1,"col-sm-6","col-xs-12"],[2,"padding","10px 20px"],[2,"padding","5px 20px"],[2,"padding-bottom","20px"],[1,"btn-pie",3,"click"],["src","../../../assets/image/pie23.gif","width","250px"],[2,"padding-left","20px","padding-bottom","10px"],[2,"padding-bottom","5px"],["src","../../../assets/image/bar11.gif","width","175px"],[1,"row","row-col-1"],[1,"col","col-xs-12","col-sm-12"],[1,"tableContent"],[2,"margin","0px 8px","margin-bottom","20px"],[1,"mat-elevation-z8"],[1,"table-container"],["mat-table","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","amount"],["matColumnDef","expense_date"],["matColumnDef","expense_category"],["matColumnDef","payment"],["matColumnDef","comment"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","","matTooltip","View/Edit/Delete",3,"click",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","","aria-label","Select page of periodic elements",3,"pageSizeOptions"],["matTooltip","Add Expense","mat-mini-fab","","color","accent",1,"btns",3,"click"],[1,"col-lg-3","col-xs-3","col-md-12","col-sm-6"],[1,"matContnet"],[1,"icons"],["role","img",2,"font-size","48px","width","50px","height","50px"],[1,"front1"],[1,"front"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row","","matTooltip","View/Edit/Delete",3,"click"]],template:function(a,s){a&1&&h(0,it,2,0,"div",0)(1,_t,62,6,"div",1),a&2&&(c("ngIf",s.isLoading),m(),c("ngIf",!s.isLoading))},dependencies:[k,I,ge,ve,oe,L,be,Se,Me,we,Ee,Te,ye,De,Ie,Ve,de,ue,fe,he,j],styles:['.main[_ngcontent-%COMP%]{padding:30px 25px;background-image:url("./media/bg_spendwise-EZDWY5Y2.jpg");background-size:cover;background-repeat:no-repeat;width:100%;height:auto}mat-card[_ngcontent-%COMP%]{margin:0 25px 20px}mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}.icons[_ngcontent-%COMP%]{font-size:25px;font-weight:700}.content[_ngcontent-%COMP%]{padding-top:10px;display:flex;flex-direction:row;justify-content:space-around;align-items:center}.tableContent[_ngcontent-%COMP%]{overflow:hidden;position:relative;display:contents}.matContnet[_ngcontent-%COMP%]:hover{transform:scale(1.1);transition:.5s}.front[_ngcontent-%COMP%]{font-family:cursive;color:gray}.front1[_ngcontent-%COMP%]{font-size:24px;font-family:cursive;font-weight:700}table[_ngcontent-%COMP%]{width:100%;overflow:hidden}.table-container[_ngcontent-%COMP%]{max-width:100%;overflow-x:scroll}.noelement[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding-top:50px}.noelement[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:25px;font-weight:240;font-family:Lucida Sans,Lucida Sans Regular,Lucida Grande,Lucida Sans Unicode,Geneva,Verdana,sans-serif}.btn-pie[_ngcontent-%COMP%]{background-color:#fff;text-decoration:none;border:none}.btn-pie[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:hover{transition:.5s;cursor:pointer}.btns[_ngcontent-%COMP%]{position:fixed;bottom:10%;right:5%;z-index:100}']});let e=n;return e})(),Ct=(()=>{let n=class n{constructor(l,a,s,p,E){this.dialogRef=l,this.dialog=a,this.businessData=s,this.route=p,this._snackBar=E}onOpen(){this.route.navigate(["edit",this.businessData.data.data._id])}onDelete(){this.businessData.onDeleteExpense(this.businessData.data.data._id).subscribe(l=>{this._snackBar.open(l.message,"",{duration:2e3})})}onView(){let l=this.dialog.open(Fe,{width:"300px",height:"250px"})}};n.\u0275fac=function(a){return new(a||n)(d(ke),d(T),d(b),d(V),d(F))},n.\u0275cmp=v({type:n,selectors:[["confirm"]],decls:11,vars:0,consts:[["mat-dialog-title",""],["mat-dialog-content",""],["mat-dialog-actions","","align","end"],["mat-flat-button","","mat-dialog-close","","color","primary",3,"click"],["mat-raised-button","","mat-dialog-close","delete","color","warn",3,"click"],["mat-raised-button","","mat-dialog-close","",3,"click"]],template:function(a,s){a&1&&(i(0,"h1",0),o(1,"Confirm Action"),t(),i(2,"div",1),o(3,` Would you like to proceed?
`),t(),i(4,"div",2)(5,"button",3),u("click",function(){return s.onView()}),o(6,"View"),t(),i(7,"button",4),u("click",function(){return s.onDelete()}),o(8,"Delete"),t(),i(9,"button",5),u("click",function(){return s.onOpen()}),o(10,"Edit"),t()())},dependencies:[w,P,Oe,A,Le],encapsulation:2});let e=n;return e})();var He=(()=>{let n=class n{constructor(l,a,s){this.dialog=l,this.authService=a,this.businessData=s}ngOnInit(){let l=sessionStorage.getItem("LEAD_ID");this.authService.authAfterReferesh(!0,l),this.app_version=sessionStorage.getItem("Version")}onAdd(){this.businessData.onNavigate("home")}Profile(){this.openDialog()}openDialog(){this.dialog.open(Ae,{width:"600px"})}onLogout(){this.dialog.open(Pe,{data:{type:"alert"}})}onGithub(){this.businessData.onGithub()}onLinkedin(){this.businessData.onLinkedin()}};n.\u0275fac=function(a){return new(a||n)(d(T),d(O),d(b))},n.\u0275cmp=v({type:n,selectors:[["app-home"]],decls:35,vars:0,consts:[["drawer",""],["hasBackdrop","True","autosize","",1,"example-container",2,"height","100vh"],["mode","over",1,"example-sidenav",2,"height","100%"],[2,"border-bottom","2px solid red","font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"],[1,"side-nav-btn"],["mat-raised-button","","color","primary",3,"click"],[2,"margin-top","20px"],[2,"border-bottom","1px solid black"],["mat-icon-button","","aria-label","Example icon-button with menu icon",1,"example-icon",3,"click"],[1,"example-spacer"],["mat-raised-button","","color","accent",3,"click"],[1,"mainlogin"]],template:function(a,s){if(a&1){let p=S();i(0,"mat-drawer-container",1)(1,"mat-drawer",2,0)(3,"h2",3),o(4," Spend Wise "),t(),i(5,"div")(6,"div",4)(7,"button",5),u("click",function(){return x(p),_(s.Profile())}),i(8,"mat-icon"),o(9,"perm_identity"),t(),o(10,"Profile "),t(),i(11,"div",6)(12,"button",5),u("click",function(){return x(p),_(s.onAdd())}),i(13,"mat-icon"),o(14,"add-chart"),t(),o(15,"Add Expenses "),t()(),i(16,"div",6)(17,"button",5),u("click",function(){return x(p),_(s.onLogout())}),i(18,"mat-icon"),o(19,"logout"),t(),o(20,"Logout "),t()()()()(),i(21,"div")(22,"mat-toolbar",7)(23,"button",8),u("click",function(){x(p);let R=q(2);return _(R.toggle())}),i(24,"mat-icon"),o(25,"list"),t()(),i(26,"span"),o(27,"Spend Wise"),t(),g(28,"span",9),i(29,"button",10),u("click",function(){return x(p),_(s.onLogout())}),i(30,"mat-icon"),o(31,"logout"),t(),o(32,"Logout "),t()()(),i(33,"div",11),g(34,"app-view-expenses"),t()()}},dependencies:[xe,_e,Ce,w,re,L,Ne],styles:[".example-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.example-sidenav-content[_ngcontent-%COMP%]{display:flex;height:100%;align-items:center;justify-content:center}.example-sidenav[_ngcontent-%COMP%]{padding-left:50px;padding-right:100px;padding-top:50px}.btns[_ngcontent-%COMP%]{position:fixed;bottom:10%;right:5%;z-index:100}.social-btns[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{color:#fff;background-color:#fff}.side-nav-btn[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{transform:scale(1.1);transition:.5s}"]});let e=n;return e})();var bt=[{path:"",component:He,canActivate:[se],title:"Dashboard | SpendWise"}],ni=(()=>{let n=class n{};n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=$({type:n}),n.\u0275inj=W({imports:[te,Be,ne.forChild(bt)]});let e=n;return e})();export{ni as HomeModule};
