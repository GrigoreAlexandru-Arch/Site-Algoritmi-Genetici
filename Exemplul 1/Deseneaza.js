let tinta;
let popmax;
let rataMutatie;
let populatie;

let fruntas;
let toateFrazele;
let statistici;

let buton;
let input_text;
let input_popmax;
let input_rataMutatie;

function setup()
{
	fruntas = createP("Cea mai apropiata frază:");
	fruntas.position(10,475);
	fruntas.class("fruntas");

	toateFrazele = createP("Toate frazele:");
	toateFrazele.position(600, 10);
	toateFrazele.class("tot");

	statistici = createP("statistici");
	statistici.position(10,200);
	statistici.class("statistici");
  
  
	input_text=createInput("Introdu o fraza","text");
	input_text.position(10,25);
  
  
  
	input_popmax=createInput(200,"number");
	input_popmax.position(10,50);
  
 
	input_rataMutatie=createInput(0.01,"number");
	input_rataMutatie.position(10,75);
  
	buton=createButton("Start");
	buton.position(25,125);
	buton.mousePressed(butonApasat);
	
	tinta = input_text.value();
	popmax = input_popmax.value();
	rataMutatie = input_rataMutatie.value();
	
	populatie = new Populatie(tinta, rataMutatie, popmax);
}
function butonApasat()
{
	tinta = input_text.value();
	popmax = input_popmax.value();
	rataMutatie = input_rataMutatie.value();
	populatie = new Populatie(tinta, rataMutatie, popmax);	
	
	loop();
}
function draw()
 {
	populatie.selectieNaturala();
	populatie.genereaza();
	populatie.calcValabilitate();
	populatie.evalueaza();

	if (populatie.returneazaTerminat())
	{    
		noLoop();
	}
	afiseazaInformatii();
	
	afiseazaInformatii();
}

function afiseazaInformatii() 
{
	let raspuns = populatie.returneazaFruntas();

	fruntas.html("Cea mai apropiata frază:<br>" + raspuns);

	let statisticiText = "Genetații totale:     " + populatie.returneazaGenerati() + "<br>";
	statisticiText += "Valabilitate medie:       " + nf(populatie.returneazaValabilitateaMedie()) + "<br>";
	statisticiText += "Populație totală:      " + popmax + "<br>";
	statisticiText += "Șansa de mutație:         " + floor(rataMutatie * 100) + "%";

	statistici.html(statisticiText);

	toateFrazele.html("Toate frazele:<br>" + populatie.toateFrazele());
}