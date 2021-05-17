//Variables
var idInput = null, checkUnit = null, textDisplay = null;
var compareVal = 0, qCount = 0, resultCount = 0 ;
var ansDisplay = 0;

//Questions object
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		if(simsubscreennum == 8){
			if(soilType == "Fine grained soil")
				questions.ans1 = 3;
			else if(soilType == "Sandy soil")
				questions.ans1 = 2;
		}
		else
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		if(simsubscreennum == 8)
			document.getElementById("divq").innerHTML = qun+""+soilType;
		else
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");

		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");

		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.innerHTML = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}



function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}


//To insert input and check button
function userCalculation(elem)
{
	ansDisplay++;
	var inputVal = document.createElement("input");
	var checkVal = document.createElement("input");
	var rightVal = document.createElement("span");
	inputVal.setAttribute("type","text");
	inputVal.setAttribute("id","res"+ansDisplay);
	inputVal.setAttribute("oninput","checkInputValid(this)");
	rightVal.setAttribute("id","rightAns"+ansDisplay);
	inputVal.classList.add("inputStyle");
	checkVal.setAttribute("type","button");
	checkVal.setAttribute("id","chk"+ansDisplay);
	checkVal.setAttribute("style","cursor:pointer");
	checkVal.setAttribute("onclick","checkResult();");
	// checkVal.setAttribute("onmouseout","formulaDisplayClose();");
	checkVal.setAttribute("value","CHECK");
	elem.appendChild(inputVal);
	elem.appendChild(rightVal);
	elem.appendChild(checkVal);
	// elem.setAttribute("onmouseover","formulaDisplay(event,this);");
	// elem.setAttribute("onmouseout","formulaDisplayClose();");
	// elem.setAttribute("onmouseout","formulaDisplayClose();");
}
function checkResult()
{
	var idd = document.getElementById("res"+ansDisplay);
	var idd1 = document.getElementById("chk"+ansDisplay);
	var ansId = document.getElementById("rightAns"+ansDisplay);
	if(simsubscreennum == 3)
	{
		compareVal = values[readingnum][7];
		checkUnit = "cm<sup>3</sup>/sec";
	}
	if(simsubscreennum == 5)
	{
		compareVal = values[readingnum][9];
		checkUnit = "m";
	}

	else if(simsubscreennum == 7 && resultCount == 0)
	{
		compareVal = values[readingnum][10];
		checkUnit = "W";
	}
	else if(simsubscreennum == 7 && resultCount == 1)
	{
		compareVal = values[readingnum][11];
		checkUnit = "W";
	}
	else if(simsubscreennum == 7 && resultCount == 2)
	{
		compareVal = values[readingnum][12];
		checkUnit = "%";
	}

	if(!idd.value  || !idd.value!=" ")
	{
		// idd.setAttribute("placeholder","Please enter value");
	}
	else if(Math.round(idd.value) != Math.round(compareVal))
	{
		// console.log(2);
		qCount++;
		// blinkStop();
		ansId.classList.remove("resultStyle");
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			idd1.parentNode.removeChild(idd1);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= compareVal+checkUnit;
			goToNextFunction();
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		idd1.parentNode.removeChild(idd1);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= compareVal+checkUnit+"<span style='color:green;font-size:20px;'>&#10004;</span>";
		goToNextFunction();
	}
}
function goToNextFunction()
{
	if(simsubscreennum == 3)
	{
		qCount = 0;
		if(repetition == 0)
		{
			setTimeout(function(){
			var q1 = Object.create(questions);
			generateQuestion(q1,"Head of water (h) is calculated by: ","","h = Initial hook gauge reading - Final hook gauge reading","h = Final hook gauge reading -  Initial hook gauge reading","h = Final hook gauge reading +  Initial hook gauge reading","h = Final hook gauge reading *  Initial hook gauge reading",2,scree3Proceed,390,355,380,180);
			},500);
		}
		else
			document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 5)
	{
		qCount = 0;
		if(repetition == 1)
		{
			setTimeout(function(){
			var q2 = Object.create(questions);
			generateQuestion(q2,"Tool used to measure pressure is_____","","Manometer","Voltmeter","Thermometer","Wattmeter",1,scree4Proceed,410,375,310,150);
			},500);
		}
		else
			document.getElementById("nextButton").style.visibility = "visible";
		}
	else if(simsubscreennum == 7 && resultCount == 0)
	{
		resultCount = 1;
		qCount = 0;
		document.getElementById('step7text7by2').innerHTML = "Output Power = ";
		idInput = document.getElementById('step7text7by2');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 7 && resultCount == 1)
	{
		resultCount = 2;
		qCount = 0;
		document.getElementById('step7text8by2').innerHTML = "Efficiency = ";
		idInput = document.getElementById('step7text8by2');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 7 && resultCount == 2)
	{
		qCount = 0;
		resultCount = 0;
		step7();
	}
}
// function formulaDisplay(event,ele)
// {
// 	var xx = event.pageX;
// 	var yy = event.pageY;
// 	xx = xx -  100;
// 	yy = yy - 50;
// 	if(ele.id == "step3text4")
// 		textDisplay = "Q<sub>act</sub> (cm<sup>3</sup>/sec) = 14.17 * h<sup>(5/2)</sup>";
// 	if(ele.id == "step5text4")
// 		textDisplay = "H (m)= H<sub>d</sub>+H<sub>s</sub>+z";
// 	if(ele.id == "step7text6by2")
// 		textDisplay = "Input Power (W) = W<sub>R</sub> * W<sub>c</sub> * &eta;<sub>m</sub> * N<sub>p</sub>";
// 	if(ele.id == "step7text7by2")
// 		textDisplay = "Output Power (W) = &gamma;* Q<sub>act</sub> * H";
// 	if(ele.id == "step7text8by2")
// 		textDisplay = "&eta; (%) = (Output Power/Input Power) * 100";
//
// 	document.getElementById("formula").style = "position:absolute;visibility:visible;background-color:black;color:white;border-radius:5px;padding:5px;left:"+xx+"px;top:"+yy+"px;";
// 	document.getElementById("formula").innerHTML = textDisplay;
// }
// function formulaDisplayClose()
// {
// 	document.getElementById("formula").innerHTML = "";
// 	document.getElementById("formula").style.visibility = "hidden";
// }
function scree3Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function scree4Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function scree6Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}


//on click of next button
function navNext()
{

	for (temp = 0; temp <=8 ; temp++)
	{
		document.getElementById('canvas'+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById('canvas'+(simsubscreennum)).style.visibility="visible";
	document.getElementById('nextButton').style.visibility="hidden";
	magic();
}

//on click of previous button
function navPrev()
{
	temp=simsubscreennum;
	document.getElementById('canvas'+temp).style.visibility="hidden";
	document.getElementById('canvas'+(temp-1)).style.visibility="visible";
	simsubscreennum=temp-1;
	document.getElementById('prevButton').style.visibility="hidden";
	magic();
}

//blink arrow on the next step
function animatearrow()
{
	if (document.getElementById('arrow').style.visibility=="hidden")
	document.getElementById('arrow').style.visibility="visible";
	else
	document.getElementById('arrow').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction()
{
	clearInterval(myInt);
	document.getElementById('arrow').style.visibility="hidden";
}

//hide and show objects based on step number
function magic()
{
	if (simsubscreennum==1)
	{
		if(repetition<3)
		{

			document.getElementById('titlestep').innerHTML="STEP ";
			document.getElementById('stepnumber').innerHTML="&nbsp;1&nbsp;";
			document.getElementById('pumptext').innerHTML="&nbsp;Start the pump by pressing the start button.";
			document.getElementById('onimg').style="visibility:visible; position: absolute; left: 597px;top: 135px;cursor: pointer;border: solid 1px;"

			document.getElementById('onimg').onclick=function() { step1(); };
			document.getElementById('offimg').style="visibility:visible; position: absolute;left: 597px;top: 149px;border: solid 1px;"
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById("pumponarm").style="margin-left:-50px; margin-top: -50px; position:absolute;";
			document.getElementById('arrow').style="visibility:visible ;position:absolute; left: 630px; top: 130px; height: 50px; z-index: 10;";
		}
		else
		{
			document.getElementById('arrow').style.visibility="visible";
			document.getElementById('arrow').style.left="670px";
			document.getElementById('arrow').style.top="173px";
			document.getElementById('arrow').style.position="absolute";
			// Code for Chrome, Safari, Opera
			document.getElementById("arrow").style.WebkitTransform = "rotate(90deg)";
			// Code for IE9
			document.getElementById("arrow").style.msTransform = "rotate(90deg)";
			// Standard syntax
			 document.getElementById("arrow").style.transform = "rotate(90deg)";
			document.getElementById('formula').style.visibility="hidden";
			document.getElementById('canvas7').style.visibility="hidden";
			document.getElementById('step7text6by2').style.visibility="hidden";
			document.getElementById('step7text7by2').style.visibility="hidden";
			document.getElementById('step7text8by2').style.visibility="hidden";
			document.getElementById('titlestep').innerHTML="STEP";
			document.getElementById('stepnumber').innerHTML="8";
			document.getElementById('pumptext').innerHTML="Please stop the pump by pressing the stop button";
			document.getElementById('trial').style="visibility:hidden;";
			document.getElementById('onimg').style="visibility:visible; position: absolute; left: 597px;top: 135px;border: solid 1px;"
			document.getElementById('onimg').onclick=null;
			document.getElementById('offimg').style="visibility:visible; position: absolute;left: 597px;top: 149px;cursor:pointer; border: solid 1px;";
			document.getElementById('offimg').onclick=function(){step1bar();};
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById("pumponarm").style="margin-left:-50px; margin-top: -50px; position:absolute;";
		}
	}
	else if (simsubscreennum==2)
	{

		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('pumponarm').style.visibility="hidden";
		document.getElementById('onimg').style.visibility="hidden";
		document.getElementById('offimg').style.visibility="hidden";
		document.getElementById("step2handle").style="position:absolute;left: 430px; top: 85px";
		// Code for Chrome, Safari, Opera
		document.getElementById("arrow").style.WebkitTransform = "rotate(-90deg)";
		// Code for IE9
		document.getElementById("arrow").style.msTransform = "rotate(-90deg)";
		// Standard syntax
		document.getElementById("arrow").style.transform = "rotate(-90deg)";
		// Code for Chrome, Safari, Opera
		document.getElementById("needle").style.WebkitTransformOrigin = "67% 79%";
		document.getElementById("needle").style.WebkitTransform = "rotate(-75deg)";
		// Code for IE9
		document.getElementById("needle").style.msTransformOrigin = "67% 79%";
		document.getElementById("needle").style.msTransform = "rotate(-75deg)";
		// Standard syntax
		document.getElementById("needle").style.transformOrigin = "67% 79%";
		document.getElementById("needle").style.transform = "rotate(-75deg)";
		document.getElementById('arrow').style.left="505px";
		document.getElementById('arrow').style.top="90px";
		document.getElementById('arrow').style.visibility="visible";
		animatearrow();
	}
	else if (simsubscreennum==3)
	{
		document.getElementById('trial').style="visibility:visible ;left: 700px; top: 100px;position: absolute;font-weight: bold;text-transform: uppercase;";
		document.getElementById('trial').innerHTML="Trial : " + (repetition+1);
		myInt = setInterval(function(){ animatearrow(); }, 500);
		refresh();
		document.getElementById("magnify").onclick=function(){step3();};
		document.getElementById('water').style="visibility:visible;position: absolute; left: 200px;top: 477px;height: 30px;width: 100px; ";
		document.getElementById('hook4').style="visibility:visible;position: absolute; left: 200px;top: 280px;height: 50px;width: 100px;"
		document.getElementById('magnify').style="visibility:visible; padding: 6px; width:30px; height:30px; position: absolute; top: 355px; left: 140px; cursor: zoom-in; z-index:10";
		document.getElementById('hook5').style="visibility:visible;position: absolute; left: 200px;top: 476px;height: 40px;width: 100px;z-index:5"
		document.getElementById('step7text6by2').style.visibility="hidden";
		document.getElementById('step7text7by2').style.visibility="hidden";
		document.getElementById('step7text8by2').style.visibility="hidden";
		document.getElementById('tachoarm').style.visibility="hidden";
		document.getElementById('valvearm').style="visibility:visible; position:absolute;left: 445px; top: 113px;";
		document.getElementById('arrow').style.left="170px";
		document.getElementById('arrow').style.top="325px";
		// Code for Chrome, Safari, Opera
		document.getElementById("arrow").style.WebkitTransform = "rotate(45deg)";
		// Code for IE9
		document.getElementById("arrow").style.msTransform = "rotate(45deg)";
		// Standard syntax
		document.getElementById("arrow").style.transform = "rotate(45deg)";
		document.getElementById('step3text1').style.visibility="visible";
		document.getElementById('step3text2').style.visibility="visible";
		document.getElementById('step3text3').style.visibility="visible";
		document.getElementById('step3text4').style.visibility="visible";
		document.getElementById('delvalve').style.visibility="visible";
		document.getElementById('hookguage').style.visibility="visible";
		document.getElementById('41').style.visibility="visible";
		document.getElementById('step3text1').innerHTML="Initial reading (water level till crest) = ____ cm";
		document.getElementById('step3text2').innerHTML="Final reading = ____ cm";
		document.getElementById('step3text3').innerHTML="Head of water (h) = ____ cm";
	}
	else if (simsubscreennum==4)
	{
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('valvearm').style.visibility="hidden";
		document.getElementById('hookguage').style.visibility="hidden";
		document.getElementById('step3text1').style.visibility="hidden";
		document.getElementById('step3text2').style.visibility="hidden";
		document.getElementById('step3text3').style.visibility="hidden";
		document.getElementById('step3text4').style.visibility="hidden";
		document.getElementById('formula').style.visibility="hidden";
		document.getElementById('magnify').onclick= function(){step4();};
		document.getElementById('needle4').style.animation=null;
		document.getElementById('delvalve').style.visibility="hidden";
		document.getElementById('41').style.visibility="hidden";
		document.getElementById('magnify').style="padding: 6px; width:30px; height:30px; position: absolute; top: 135px; left: 230px; cursor: zoom-in; z-index:10";
		document.getElementById('hook1').style.visibility="hidden";
		document.getElementById('hook2').style.visibility="hidden";
		document.getElementById('hook3').style.visibility="hidden";
		document.getElementById('hook4').style.visibility="hidden";
		document.getElementById('hook5').style.visibility="hidden";
		document.getElementById('water').style.visibility="hidden";
		document.getElementById('delhead').style.visibility="hidden";
		document.getElementById('needle4').style.visibility="hidden";
		document.getElementById('arrow').style.left="250px";
		document.getElementById('arrow').style.top="100px";
		// Code for Chrome, Safari, Opera
		document.getElementById("arrow").style.WebkitTransform = "rotate(45deg)";
		// Code for IE9
		document.getElementById("arrow").style.msTransform = "rotate(45deg)";
		// Standard syntax
		document.getElementById("arrow").style.transform = "rotate(45deg)";
		// Code for Chrome, Safari, Opera
		document.getElementById("needle4").style.WebkitTransformOrigin = "67% 79%";
		document.getElementById("needle4").style.WebkitTransform = "rotate(-40deg)";
		// Code for IE9
		document.getElementById("needle4").style.msTransformOrigin = "67% 79%";
		document.getElementById("needle4").style.msTransform = "rotate(-40deg)";
	 // Standard syntax
		document.getElementById("needle4").style.transformOrigin = "67% 79%";
		document.getElementById("needle4").style.transform = "rotate(-40deg)";
		document.getElementById('step4text1').innerHTML="Delivery Head (H<sub>d</sub>) = ____ kg/cm<sup>2</sup>";
		document.getElementById('step4text2').innerHTML="Delivery Head (H<sub>d</sub>) = ____ m";
	}
	else if (simsubscreennum==5)
	{
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('delhead').style.visibility="hidden";
		document.getElementById('suchead').style.visibility="hidden";
		document.getElementById('needle4').style.visibility="hidden";
		document.getElementById('needle5').style.visibility="hidden";
		document.getElementById('arrow').style.left="300px";
		document.getElementById('arrow').style.top="170px";
		// Code for Chrome, Safari, Opera
		 document.getElementById("arrow").style.WebkitTransform = "rotate(60deg)";
		// Code for IE9
		document.getElementById("arrow").style.msTransform = "rotate(60deg)";
		// Standard syntax
		document.getElementById("arrow").style.transform = "rotate(60deg)";
		document.getElementById('magnify').style= "padding: 6px; width:30px; height:30px; position: absolute; top: 190px; left: 270px; cursor: zoom-in; z-index:10";
		document.getElementById('magnify').onclick= function(){step5();};
		// Code for Chrome, Safari, Opera
		document.getElementById("needle5").style.WebkitTransformOrigin = "67% 79%";
		document.getElementById("needle5").style.WebkitTransform = "rotate(-75deg)";
		// Code for IE9
		document.getElementById("needle5").style.msTransformOrigin = "67% 79%";
		document.getElementById("needle5").style.msTransform = "rotate(-75deg)";
		// Standard syntax
		document.getElementById("needle5").style.transformOrigin = "67% 79%";
		document.getElementById("needle5").style.transform = "rotate(-75deg)";
		document.getElementById('needle5').style.animation=null;
		document.getElementById('step5text1').innerHTML="Suction Head (H<sub>s</sub>)= ____ kg/cm<sup>2</sup>";
		document.getElementById('step5text2').innerHTML="Suction Head (H<sub>s</sub>)= ____ m";
		// document.getElementById('step5text4').innerHTML="Total Head (H)= ____ m";
	}
	else if (simsubscreennum==6)
	{
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow').style.left="310px";
		document.getElementById('arrow').style.top="75px";
		// Code for Chrome, Safari, Opera
		document.getElementById("arrow").style.WebkitTransform = "rotate(60deg)";
		// Code for IE9
		document.getElementById("arrow").style.msTransform = "rotate(60deg)";
		// Standard syntax
		document.getElementById("arrow").style.transform = "rotate(60deg)";
		document.getElementById('magnify').style="padding: 6px; width:30px; height:30px; position: absolute; top: 95px; left: 285px; cursor: zoom-in; z-index:10;";
		document.getElementById('magnify').onclick= function(){step6();};
		document.getElementById('formula').style.visibility="hidden";
		document.getElementById('suchead').style.visibility="hidden";
		document.getElementById('needle5').style.visibility="hidden";
		document.getElementById('wattmeter2').style.visibility="hidden";
		document.getElementById('wattmeter3').style.visibility="hidden";
		document.getElementById('needlewatt').style.visibility="hidden";
		document.getElementById('needlewatt').style.animation=null;
		document.getElementById('step6text1').innerHTML=" Wattmeter Reading (W<sub>R</sub>) = ____ W";
	}
	else if (simsubscreennum==7)
	{
		document.getElementById('wattmeter2').style.visibility="hidden";
		document.getElementById('wattmeter3').style.visibility="hidden";
		document.getElementById('needlewatt').style.visibility="hidden";
		document.getElementById('magnify').style.visibility="hidden";
		document.getElementById("magnify").onclick=null;
		document.getElementById('step7text6by2').style.visibility="visible";
		document.getElementById('step7text7by2').style.visibility="visible";
		document.getElementById('step7text8by2').style.visibility="visible";
		document.getElementById("can6-1").innerHTML = " Wattmeter Reading (W<sub>R</sub>) = "+values[readingnum][8]+" W";
		document.getElementById("can6-2").innerHTML = "Actual discharge (Q<sub>act</sub>) = "+values[readingnum][7]+"cm<sup>3</sup>/sec";
		document.getElementById("can6-3").innerHTML = "Total Head (H)="+values[readingnum][9]+"m";
		document.getElementById('step7text7by2').innerHTML="Output Power =_______ ";
		document.getElementById('step7text8by2').innerHTML="Efficiency =_______ ";
		document.getElementById('step7text6by2').innerHTML="Input Power = ";
		idInput = document.getElementById('step7text6by2');
		userCalculation(idInput);
	}
	else if(simsubscreennum == 8)
	{
		document.getElementById('step7text6by2').style.visibility = "hidden";
		document.getElementById('step7text7by2').style.visibility = "hidden";
		document.getElementById('step7text8by2').style.visibility = "hidden";
		document.getElementById('can1-1').style.visibility = "hidden";
		document.getElementById('onimg').style.visibility = "hidden";
		document.getElementById('offimg').style.visibility = "hidden";
		document.getElementById('formula').style.visibility = "hidden";
		document.getElementById('trial').style.visibility = "hidden";
		var stepSkip = document.getElementById("can8-1");
		stepSkip.classList.toggle('fade');
		setTimeout(function()
		{
			document.getElementById("nextButton").style.visibility = "visible";
		},500);
	}
	else if(simsubscreennum == 9)
	{
		document.getElementById('can8-1').style.visibility="hidden";
		document.getElementById('can8-1').style.animation = "";
		document.getElementById('canvas8').style.visibility="hidden";
		document.getElementById('can8-1').style.visibility="hidden";
		document.getElementById('onimg').style.visibility="hidden";
		document.getElementById('offimg').style.visibility="hidden";
		document.getElementById('step9text1').onclick=function() { step9a();}
		document.getElementById('step9text2').onclick=function() { step9b();}
		document.getElementById('step9text3').onclick=function() { step9c();}
		document.getElementById('step9text4').onclick=function() { step9d();}
	}
}


//Move pointing finger with mouse
$(document).mousemove(function(e)
{
	if(simsubscreennum==1 && (!pumpstatus || repetition==3))
	{
		if(e.pageX<800 && e.pageY<600)
		{
			document.getElementById('pumponarm').style.visibility="visible";
			$("#pumponarm").css({left:e.pageX, top:e.pageY});
		}
		else
		document.getElementById('pumponarm').style.visibility="hidden";
	}
	else if(simsubscreennum==2 && speedset && !speedmeasured)
	{
		if(e.pageX<800 && e.pageY<600)
		{
			document.getElementById('tachoarm').style.visibility="visible";
			$("#tachoarm").css({left:e.pageX, top:e.pageY});
		}
		else
			document.getElementById('tachoarm').style.visibility="hidden";
	}
});



function step1()
{
pumpstatus=1;

myStopFunction();
document.getElementById('pumponarm').style.margin="-60px 0 0 -78px";
setTimeout(function(){ document.getElementById('pumponarm').style.margin="-50px 0 0 -60px"; }, 500);
document.getElementById('pumponarm').style.left="680px";
document.getElementById('pumponarm').style.top="200px";

setTimeout(function(){ document.getElementById('nextButton').style.visibility="visible"; }, 250);

}

function step1bar()
{
	pumpstatus=0;
	myStopFunction();
	document.getElementById('pumponarm').style.margin="-60px 0 0 -78px";
	setTimeout(function(){ document.getElementById('pumponarm').style.margin="-50px 0 0 -60px"; }, 500);
	document.getElementById('pumponarm').style.left="680px";
	document.getElementById('pumponarm').style.top="215px";
	setTimeout(function(){
	simsubscreennum=7;
	//document.getElementById('step7text9').style.visibility="visible";
	// document.getElementById('pumptext').style.visibility="hidden";
	//document.getElementById('step7text9').innerHTML="Well Done! You have finished the experiment.<br> Click next to view graphical results. ";
	document.getElementById('pumponarm').style.visibility="hidden";
	document.getElementById('nextButton').style.visibility="visible"; }, 1000);
};


function step2()
{
	// Code for Chrome, Safari, Opera
    document.getElementById("lever").style.WebkitTransformOrigin = "70% 92%";
	document.getElementById("lever").style.WebkitTransform = "rotate(20deg)";
	// Code for IE9
    document.getElementById("lever").style.msTransformOrigin = "70% 92%";
	document.getElementById("lever").style.msTransform = "rotate(20deg)";
	// Standard syntax
    document.getElementById("lever").style.transformOrigin = "70% 92%";
    document.getElementById("lever").style.transform = "rotate(20deg)";
	speedset=1;
	document.getElementById('arrow').style.left="305px";
	document.getElementById('arrow').style.top="390px";
	// Code for Chrome, Safari, Opera
	 document.getElementById("arrow").style.WebkitTransform = "rotate(-180deg)";
	 // Code for IE9
	 document.getElementById("arrow").style.msTransform = "rotate(-180deg)";
	 // Standard syntax
	 document.getElementById("arrow").style.transform = "rotate(-180deg)";

	 document.getElementById("lever").style.cursor = "auto";
}

function step2nhalf()
{
	speedmeasured=1;
	document.getElementById('tachoarm').style.margin="0px";
	document.getElementById('tachoarm').style.position="absolute";
	document.getElementById('tachoarm').style.left= "179px";
	document.getElementById('tachoarm').style.top= "257px";
	myStopFunction();
	document.getElementById("tachohole").style.cursor = "auto";
	document.getElementById("needle").style.animation= "myturn 1s 1 forwards";
	setTimeout(function(){
		document.getElementById('step2text').innerHTML="Speed of Motor = "+1000+" rpm";
	}, 1500);
	setTimeout(function(){ document.getElementById('nextButton').style.visibility="visible"; }, 2000);
}


function step3()
{
	document.getElementById("magnify").onclick=null;
	document.getElementById('hook1').style.visibility="visible";
	document.getElementById('hook2').style.visibility="visible";
	document.getElementById('hook3').style.visibility="visible";
	document.getElementById('hook4').style.visibility="visible";
	document.getElementById('hook5').style.visibility="visible";
	document.getElementById('water').style.visibility="visible";
	document.getElementById('arrow').style.left="440px";
	document.getElementById('arrow').style.top="150px";
	// Code for Chrome, Safari, Opera
	document.getElementById("arrow").style.WebkitTransform = "rotate(-90deg)";
	// Code for IE9
	document.getElementById("arrow").style.msTransform = "rotate(-90deg)";
	// Standard syntax
	document.getElementById("arrow").style.transform = "rotate(-90deg)";
	document.getElementById("valvearm").onclick=function(){step3nhalf();};
	document.getElementById('magnify').style.cursor= "auto";
	document.getElementById('valvearm').style.cursor= "pointer";
	document.getElementById('sethook').style.cursor= "auto";
	showgauge==1;
}

function step3nquarter()
{
if(showgauge==1)
{
	document.getElementById('hook2').style.animation=" myhook 2s 1 forwards";
	setTimeout(function(){
		document.getElementById('step3text1').innerHTML="Initial reading (water level till crest) = "+values[readingnum][4]+" cm";
		document.getElementById('arrow').style.left="440px";
		document.getElementById('arrow').style.top="150px";
		// Code for Chrome, Safari, Opera
		document.getElementById("arrow").style.WebkitTransform = "rotate(-90deg)";
		// Code for IE9
		document.getElementById("arrow").style.msTransform = "rotate(-90deg)";
		// Standard syntax
		document.getElementById("arrow").style.transform = "rotate(-90deg)";
		document.getElementById("valvearm").style.cursor = "pointer";
		document.getElementById("sethook").style.cursor = "auto";
		showgauge=3;
		document.getElementById("valvearm").style.animation = null;
		document.getElementById("sethook").onclick=null;
		document.getElementById("valvearm").onclick=function(){ step3nhalf();};
	}, 2000);
}
else if (showgauge==3)
{
	document.getElementById('hook2').style.animation=" myhookfinal 2s 1 forwards";
	setTimeout(function(){
		document.getElementById('step3text2').innerHTML="Final reading = "+values[readingnum][5]+" cm";
		document.getElementById('step3text3').innerHTML="Head of water(h) = "+values[readingnum][6]+" cm";
		document.getElementById('step3text4').style.visibility = "visible";
		document.getElementById('step3text4').innerHTML = "Actual discharge Q<sub>act</sub> =";
		idInput = document.getElementById('step3text4');
		userCalculation(idInput);
		document.getElementById("sethook").style.cursor = "auto";
		myStopFunction();
		showgauge=1;
		document.getElementById("sethook").onclick=null;
	}, 2000);
	}
}


function step3nhalf()
{
	if (showgauge==1)
	{
		document.getElementById("valvearm").style.transformOrigin = "10% 15%";
		document.getElementById("valvearm").style.animation = "valveturn 0.5s "+2+" ";
		document.getElementById("water").style.animation = "water0 "+1.5+"s 1 forwards";
		setTimeout(function(){
			document.getElementById('valvearm').style.cursor="auto";
			document.getElementById("sethook").style.cursor = "pointer";
			document.getElementById('arrow').style.left="325px";
			document.getElementById('arrow').style.top="365px";
			// Code for Chrome, Safari, Opera
			document.getElementById("arrow").style.WebkitTransform = "rotate(45deg)";
			// Code for IE9
			document.getElementById("arrow").style.msTransform = "rotate(45deg)";
			// Standard syntax
			document.getElementById("arrow").style.transform = "rotate(45deg)";
			document.getElementById("valvearm").onclick=null;
			document.getElementById("sethook").onclick=function(){step3nquarter();};
		},1250);
	}
	if (showgauge==3)
	{
		document.getElementById("valvearm").style.transformOrigin = "10% 15%";
		document.getElementById("valvearm").style.animation = "valveturn 0.5s 2 ";
		document.getElementById("water").style.animation = "water "+1.5*(repetition+1)+"s 1 forwards";
		setTimeout(function(){
			document.getElementById('valvearm').style.cursor="auto";
			document.getElementById("sethook").style.cursor = "pointer";
			document.getElementById('arrow').style.left="325px";
			document.getElementById('arrow').style.top="365px";

			// Code for Chrome, Safari, Opera
			document.getElementById("arrow").style.WebkitTransform = "rotate(45deg)";
			// Code for IE9
			document.getElementById("arrow").style.msTransform = "rotate(45deg)";
			// Standard syntax
			document.getElementById("arrow").style.transform = "rotate(45deg)";
			document.getElementById("valvearm").onclick=null;
			document.getElementById("sethook").onclick=function(){step3nquarter();};
		},(repetition+1)*1000);
	}
}


function step4()
{
	myStopFunction();
	document.getElementById('magnify').style.cursor= "auto";
	document.getElementById('magnify').onclick= null;
	document.getElementById('delhead').style.visibility="visible";
	document.getElementById('needle4').style.visibility="visible";
	document.getElementById('needle4').style.animation="myturn  2s 1 forwards";
	setTimeout(function(){
		document.getElementById('step4text1').innerHTML="Delivery Head (H<sub>d</sub>) = "+values[readingnum][0]+" kg/cm<sup>2</sup>";
		document.getElementById('step4text2').innerHTML="Delivery Head (H<sub>d</sub>) = "+values[readingnum][1]+" m";
	}, 1000);
	myStopFunction();
	setTimeout(function(){ document.getElementById('nextButton').style.visibility="visible"; }, 1250);
}

function step5()
{
	document.getElementById('suchead').style.visibility="visible";
	document.getElementById('needle5').style.visibility="visible";
	document.getElementById('magnify').style.cursor= "auto";
	document.getElementById('needle5').style.animation="myturn  2s 1 forwards";
	setTimeout(function(){
		myStopFunction();
		document.getElementById('step5text1').innerHTML="Suction Head (H<sub>s</sub>) = "+values[readingnum][2]+" kg/cm<sup>2</sup>";
		document.getElementById('step5text2').innerHTML="Suction Head (H<sub>s</sub>) = "+values[readingnum][3]+" m";
		document.getElementById('step5text4').innerHTML="Total Head (H)=";
		idInput = document.getElementById('step5text4');
		userCalculation(idInput);
	}, 1000);
}

function step6()
{
	document.getElementById('magnify').style.cursor= "auto";
	document.getElementById('wattmeter2').style.visibility="visible";
	document.getElementById('wattmeter3').style.visibility="visible";
	document.getElementById('needlewatt').style.visibility="visible";
	// Code for Chrome, Safari, Opera
    document.getElementById("needlewatt").style.WebkitTransformOrigin = "50% 73%";
	// Code for IE9
    document.getElementById("needlewatt").style.msTransformOrigin = "50% 73%";
	// Standard syntax
    document.getElementById("needlewatt").style.transformOrigin = "50% 73%";
	document.getElementById('needlewatt').style.animation="myturn2  1s 1 forwards";
	myStopFunction();
	setTimeout(function(){
		document.getElementById('step6text1').innerHTML=" Wattmeter Reading (W<sub>R</sub>) = "+values[readingnum][8]+" W";
	}, 1000);
	setTimeout(function(){
		if(repetition == 2)
		{
				var q3 = Object.create(questions);
			generateQuestion(q3,"Wattmeter constant(W<sub>c</sub>) value is: ","","4W","3W","2W","7W",3,scree6Proceed,410,355,310,150);
		}
		else
			document.getElementById('nextButton').style.visibility="visible";
	}, 1250);
}

function step7()
{
	repetition+=1;
	setTimeout(function(){
		setTimeout(function(){
			if (repetition<3)
			{
			//readingnum+=Math.ceil(Math.random()*3);
			readingnum+=1;
			simsubscreennum=2;
			//document.getElementById('step7text9').innerHTML="Repeat Steps 3, 4, 5 and 6 to get more data points for plotting graph";
			}
			else
			{
			simsubscreennum=0;
			}
		}, 250);
		setTimeout(function(){
		document.getElementById('nextButton').style.visibility="visible"; }, 500);
	}, 1000);
}
function refresh()
{
	qCount = 0;
	ansDisplay = 0;
	document.getElementById("step3text4").innerHTML = "";
	document.getElementById('step5text4').innerHTML = "";
	document.getElementById('step7text6by2').innerHTML = "";
	document.getElementById('step7text7by2').innerHTML = "";
	document.getElementById('step7text8by2').innerHTML = "";
	document.getElementById('formula').innerHTML = "";
	document.getElementById('formula').style.visibility = "hidden";
}
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";
	document.getElementById('question-div').style.top=dright+"px";
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);
	qObject.setCallBack(fn);
}

function step9a()
{
	$("#chartContainer").ejChart(
        {

		    //Initializing Primary X Axis
		    primaryXAxis:
            {
			   labelFormat: "{value}",
                title: { text: 'Actual Discharge (Qact) (Cumecs)' },
                range: { min: 2000, max: 12000, interval: 1000}
            },

			//Initializing Primary Y Axis
            primaryYAxis:
            {
                labelFormat: "{value}",
                title: { text: 'Efficiency (%)' },
                range: { min: 10, max: 50, interval: 5 }
            },

			//Initializing Common Properties for all the series

            //Initializing Series
            series:
			[
			    {
                points: [
				{ x: values[0][7], y: values[0][12]},
				{ x: values[1][7], y: values[1][12]},
				{ x: values[2][7], y: values[2][12]},
				{ x: values[3][7], y: values[3][12]},
				{ x: values[4][7], y: values[4][12]},
				{ x: values[5][7], y: values[5][12]},
				{ x: values[6][7], y: values[6][12]},
				{ x: values[7][7], y: values[7][12]},
				{ x: values[8][7], y: values[8][12]}


				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,

			legend:{visible:false}
        });
}

function step9b()
{
	$("#chartContainer").ejChart(
        {

		    //Initializing Primary X Axis
		    primaryXAxis:
            {
			   labelFormat: "{value}",
                title: { text: 'Actual Discharge (Qact) (Cumecs)' },
                range: { min: 5000, max: 11000, interval: 1000}
            },

			//Initializing Primary Y Axis
            primaryYAxis:
            {
                labelFormat: "{value}",
                title: { text: 'Input Power (W)' },
                range: { min: 0, max: 3000, interval: 500 }
            },

			//Initializing Common Properties for all the series

            //Initializing Series
            series:
			[
			    {
                points: [
				{ x: values[0][7], y: values[0][10]},
				{ x: values[1][7], y: values[1][10]},
				{ x: values[2][7], y: values[2][10]},
				{ x: values[3][7], y: values[3][10]},
				{ x: values[4][7], y: values[4][10]},
				{ x: values[5][7], y: values[5][10]},
				{ x: values[6][7], y: values[6][10]},
				{ x: values[7][7], y: values[7][10]},
				{ x: values[8][7], y: values[8][10]}


				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,

			legend:{visible:false}
        });
}
function step9c()
{
	$("#chartContainer").ejChart(
        {

		    //Initializing Primary X Axis
		    primaryXAxis:
            {
			   labelFormat: "{value}",
                title: { text: 'Actual Discharge Qact(Cumecs)' },
                range: { min: 2000, max: 12000, interval: 1000}
            },

			//Initializing Primary Y Axis
            primaryYAxis:
            {
                labelFormat: "{value}",
                title: { text: 'Output Power (W)' },
                range: { min: 500, max: 750, interval: 50 }
            },

			//Initializing Common Properties for all the series

            //Initializing Series
            series:
			[
			    {
                points: [
				{ x: values[0][7], y: values[0][11]},
				{ x: values[1][7], y: values[1][11]},
				{ x: values[2][7], y: values[2][11]},
				{ x: values[3][7], y: values[3][11]},
				{ x: values[4][7], y: values[4][11]},
				{ x: values[5][7], y: values[5][11]},
				{ x: values[6][7], y: values[6][11]},
				{ x: values[7][7], y: values[7][11]},
				{ x: values[8][7], y: values[8][11]}


				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,

			legend:{visible:false}
        });
}
function step9d()
{
	$("#chartContainer").ejChart(
        {

		    //Initializing Primary X Axis
		    primaryXAxis:
            {
			   labelFormat: "{value}",
                title: { text: 'Actual Discharge (Qact) (Cumecs)' },
                range: { min: 2000, max: 12000, interval: 1000}
            },

			//Initializing Primary Y Axis
            primaryYAxis:
            {
                labelFormat: "{value}",
                title: { text: 'Total Head (m)' },
                range: { min: 5, max: 15, interval: 1 }
            },

			//Initializing Common Properties for all the series

            //Initializing Series
            series:
			[
			    {
                points: [
				{ x: values[0][7], y: values[0][9]},
				{ x: values[1][7], y: values[1][9]},
				{ x: values[2][7], y: values[2][9]},
				{ x: values[3][7], y: values[3][9]},
				{ x: values[4][7], y: values[4][9]},
				{ x: values[5][7], y: values[5][9]},
				{ x: values[6][7], y: values[6][9]},
				{ x: values[7][7], y: values[7][9]},
				{ x: values[8][7], y: values[8][9]}


				],
				type: 'line',
					fill: "#0066FF",
					border :{width:5},
					tooltip:{visible:true},
					marker:{
                        shape: 'circle',
						size:
                        {
                            height: 5, width: 5
                        },
                        visible: true
                    },
					enableAnimation :true
                }
			],
             load:"loadTheme",
			isResponsive: true,

			legend:{visible:false}
        });
}


// function highlightOn(ele) {
	// ele.style.backgroundColor = "black";
	// ele.style.color = "white";
// }