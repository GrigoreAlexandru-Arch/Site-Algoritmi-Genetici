class Populatie 
{
	constructor(t, m, num) 
	{
		this.populatie;
		this.candidati; 
		this.generati = 0; 
		this.terminat = false; 
		this.tinta = t; 
		this.rataMutatie = m;
		this.scorPerfect = 1;
		this.fruntas = "";
		this.populatie = [];
		for (let i = 0; i < num; i++) 
		{
			this.populatie[i] = new ADN(this.tinta.length);
		}
		this.candidati = [];
		this.calcValabilitate();
	}


	calcValabilitate()
	{
		for (let i = 0; i < this.populatie.length; i++) 
		{
			this.populatie[i].calcValabilitate(tinta);
		}
	}

  
	selectieNaturala() 
	{
		
		this.candidati = [];
		let maxValabilitate = 0;
		for (let i = 0; i < this.populatie.length; i++) 
		{
			if (this.populatie[i].valabilitate > maxValabilitate) 
			{
				maxValabilitate = this.populatie[i].valabilitate;
			}
		}
		
		for (let i = 0; i < this.populatie.length; i++) 
		{
			let valabilitate = map(this.populatie[i].valabilitate, 0, maxValabilitate, 0, 1);
			let n = floor(valabilitate * 100);
			for (let j = 0; j < n; j++)
			{
				this.candidati.push(this.populatie[i]);
			}
		}
	}


	genereaza() 
	{
		for (let i = 0; i < this.populatie.length; i++) 
		{
			let a = floor(random(this.candidati.length));
			let b = floor(random(this.candidati.length));
			let partnerulA = this.candidati[a];
			let partnerulB = this.candidati[b];
			let copil = partnerulA.crossover(partnerulB);
			copil.muteaza(this.rataMutatie);
			this.populatie[i] = copil;
		}
		this.generati++;
	}


	returneazaFruntas() 
	{
		return this.fruntas;
	}

	evalueaza() 
	{
		let record = 0.0;
		let index = 0;
		for (let i = 0; i < this.populatie.length; i++) 
		{
			if (this.populatie[i].valabilitate > record) 
			{
				index = i;
				record = this.populatie[i].valabilitate;
			}
		}

		this.fruntas = this.populatie[index].returneazaFraza();
		if (record === this.scorPerfect)
		{
				this.terminat = true;
		}
	}

	returneazaTerminat() 
	{
		return this.terminat;
	}  


	returneazaGenerati()
	{
		return this.generati;
	}

  
	returneazaValabilitateaMedie()
	{
		let total = 0;
		for (let i = 0; i < this.populatie.length; i++)
		{
			total += this.populatie[i].valabilitate;
		}
		return total / (this.populatie.length);
	}

	toateFrazele() 
	{
		let tot = "";	
		for (let i = 0; i < this.populatie.length; i++) 
		{
			tot += this.populatie[i].returneazaFraza() + "<br>";
		}
		return tot;
	}
}