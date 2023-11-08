$(function(){
	var atts = [
		"Non-Smoker",
		"Early Riser",
		"Clean",
		"Drinker",
		"Pet Friendly",
		"Quiet",
		"Social",
		"Introvert",
		"Employed",
		"Has Car",
	]
	var fuckers = [
		{
			"name": "Nick",
			"age": 19,
			"atts": ["Introvert", "Quiet", "Drinker", "Has Car"]
		},
		{
			"name": "Trey",
			"age": 25,
			"atts": ["Employed", "Clean", "Has Car", "Social"]
		},
		{
			"name": "David",
			"age": 18,
			"atts": ["Non-Smoker", "Clean", "Pet Friendly", "Quiet"]
		},
		{
			"name": "Peter",
			"age": 20,
			"atts": ["Quiet", "Employed", "Drinker", "Clean"]
		},
		{
			"name": "Rob",
			"age": 22,
			"atts": ["Has Car", "Non-Smoker", "Introvert", "Clean"]
		},
		{
			"name": "John",
			"age": 20,
			"atts": ["Early Riser", "Social", "Clean", "Drinker"]
		},
		// {
		// 	"name": "Victor",
		// 	"age": 21,
		// 	"atts": ["Pet Friendly", "Has Car", "Quiet", "Employed"]
		// },
		// {
		// 	"name": "Sam",
		// 	"age": 20,
		// 	"atts": ["Social", "Has Car", "Drinker", "Quiet"]
		// },
		// {
		// 	"name": "Ben",
		// 	"age": 21,
		// 	"atts": ["Introvert", "Employed", "Early Riser", "Non-Smoker"]
		// }
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
				let gx = 255 - (r*73)
				console.log(gg, gx, "|", g, r)
				elx.css('background', "rgba(0, "+gx+", 0, "+gg+")")
			}else if (r > g) {
				//let rr = 1.0 - ( (4 - (r - g)) * 0.1 )
				let rr = 1.0 - (g*0.3)
				let rx = 255 - (g*73)
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

	$( ".circleFuckers" ).on( "click", function() {
		let el = $(this)
		console.log(el.hasClass("good"), el.hasClass("circleFuckers"))
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
		updatePeople()
	} );

	let strx = ""
	for (let i in fuckers) {
		let k = fuckers[i];

		let attList = ``;
		for (let _i in k.atts) {
			let _k = k.atts[_i];
			attList += `<li class="list-group-item">${_k}</li>`
		}

		strx += `<div class="col-2">
                    <div class="row">
                        <div class="container mt-4">
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
