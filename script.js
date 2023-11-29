$(function(){
	var atts = [
		"Non-Smoker",
		"Smoker",
		"Early Riser",
		"Night Owl",
		"Clean",
		"Gamer",
		"Pet Friendly",
		"Social",
		"Introvert",
		"Employed",
		"Has Car",
	]
	var fuckers = [
		{
			"name": "Nick",
			"age": 19,
			"atts": ["Introvert", "Night Owl", "Gamer", "Has Car"]
		},
		{
			"name": "Trey",
			"age": 25,
			"atts": ["Employed", "Smoker", "Has Car", "Social"]
		},
		{
			"name": "David",
			"age": 18,
			"atts": ["Non-Smoker", "Clean", "Pet Friendly", "Night Owl"]
		},
		{
			"name": "Peter",
			"age": 20,
			"atts": ["Night Owl", "Employed", "Gamer", "Clean"]
		},
		{
			"name": "Rob",
			"age": 22,
			"atts": ["Has Car", "Non-Smoker", "Introvert", "Clean"]
		},
		{
			"name": "John",
			"age": 20,
			"atts": ["Early Riser", "Social", "Clean", "Gamer"]
		},
	]

	let strxList = "";
	for (let i in atts) {
		let k = atts[i];
		strxList += `<div class="circleFuckers">${k}</div>`
	}
	$("#fuckersParentList").html(strxList);

	function updatePeople() {
		let liked = [];
		let bad = [];
		console.log("doing update")
		$(".circleFuckers").each( function( i ) {
			let el = $( this );
			if ( el.hasClass("good")) {
				let text  = el.clone()    //clone the element
					.children() //select all the children
					.remove()   //remove all the children
					.end()  //again go back to selected element
					.text();

				liked.push(text)
			} else if ( el.hasClass("bad")) {
				let text  = el.clone()    //clone the element
					.children() //select all the children
					.remove()   //remove all the children
					.end()  //again go back to selected element
					.text();

				bad.push(text)
			}
		} );
		for (let i in fuckers) {
			let k = fuckers[i];
			let r = 0;
			let g = 0;

			for (let _i in k.atts) {
				let _k = k.atts[_i];
				if (liked.includes(_k)) {
					g = g + 1
				}else if (bad.includes(_k)) {
					r = r + 1
				}
			}
			let elx = $("#personFucker_"+k.name+"_"+k.age)
			if (g > r) {
				//let gg = 1.0 - ( (4 - (g - r)) * 0.1 )
				let gg = 1.0 - (r*0.3)
				let gx = 255 - (r*193)
				console.log(gg, gx, "|", g, r)
				elx.css('background', "rgba(0, "+gx+", 0, "+gg+")")
			}else if (r > g) {
				//let rr = 1.0 - ( (4 - (r - g)) * 0.1 )
				let rr = 1.0 - (g*0.3)
				let rx = 255 - (g*193)
				console.log(rr, rx, "|", g, r)
				elx.css('background', "rgba("+rx+", 0, 0, "+rr+")")
			}else if (r === 0 && g === 0) {
				elx.css('background', "rgba(255, 255, 255)")
			}else {
				// combo 2 / 2
				elx.css('background', "rgba(98, 98, 98, 0.8)")
			}
		}
	}

	let presses = {}
	$(document).on( "keydown", function (event) {
		let keycode = (event.keyCode ? event.keyCode : event.which);
		presses[keycode] = true
	} ).on( "keypress", function (event) {
		let keycode = (event.keyCode ? event.keyCode : event.which);
	} ).on( "keyup", function (event) {
		let keycode = (event.keyCode ? event.keyCode : event.which);
		presses[keycode] = false
	} );


	$( ".circleFuckers" ).on( "click", function() {
		let el = $(this)
		console.log(el.hasClass("good"), el.hasClass("circleFuckers"))

		if (presses[16]) {
			if (el.hasClass("good")) {
				el.removeClass("good");
				el.addClass("bad");
			}else if (el.hasClass("bad")) {

			}else {
				el.addClass("bad");
				el.prepend(`<div class="selectedFucker">X</div>`)
			}
		}else {
			if (el.hasClass("good")) {
				el.removeClass("good");
				el.addClass("bad");
			}else if (el.hasClass("bad")) {
				el.removeClass("bad");
				el.find(">:first-child").remove();
			}else {
				el.addClass("good");
				el.prepend(`<div class="selectedFucker">X</div>`)
			}
		}


		updatePeople()
	} );

	$( ".circleFuckersClear" ).on( "click", function() {
		history.go(0) // Refreshes the page, I know its shit idc it does it job also project-mates forced me to do this
	} );

	let strx = ""
	for (let i in fuckers) {
		let k = fuckers[i];

		let attList = ``;
		for (let _i in k.atts) {
			let _k = k.atts[_i];
			attList += `<li class="list-group-item attFuckersItem">${_k}</li>`
		}

		strx += `<div class="col-2">
                    <div class="row">
                        <div class="container mt-2">
                            <div class="card">
                                <div class="card-header">
                                    <h2 style="text-align: center;">${k.name}</h2>
                                </div>
                                <div class="card-body" id="personFucker_`+(k.name+'_'+k.age)+`">
                                    <div class="col">
                                        <div class="row" style="width: 110%">
                                            <h1 class="mb-3" style="margin-left: auto;">${k.age}</h1>
                                        </div>
                                        <div class="row">
                                            <ul class="list-group">
                                                `+attList+`
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
	}
	$("#fill-me-daddy").html(strx)

});
