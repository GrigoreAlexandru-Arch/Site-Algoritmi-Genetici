function nouChar()
{
  let c = floor(random(62, 123));
	if(floor(random(0,101))== 100)
		c=32;
  return String.fromCharCode(c);
}

class ADN 
{
	constructor(num) 
	{
		this.gene = [];
		this.valabilitate = 0;
		for (let i = 0; i < num; i++) 
		{
			this.gene[i] = nouChar();
		}
	}

	returneazaFraza() 
	{
		return this.gene.join("");
	}


	calcValabilitate(tinta)
	{
		let scor = 0;
		for (let i = 0; i < this.gene.length; i++)
		{
			if (this.gene[i] == tinta.charAt(i)) 
			{
				scor++;
			}
		}
    this.valabilitate = scor / tinta.length;
    }

	crossover(partener) 
	{    
		let copil = new ADN(this.gene.length);
		let mijloc = floor(random(this.gene.length));

		for (let i = 0; i < this.gene.length; i++) 
		{
			if (i > mijloc) 
				copil.gene[i] = this.gene[i];
			else
				copil.gene[i] = partener.gene[i];
		}
    return copil;
	}
	
	muteaza(rataMutatie) 
	{
		for (let i = 0; i < this.gene.length; i++) 
		{
			if (random(1) < rataMutatie) 
			{
				this.gene[i] = nouChar();
			}
		}
	}
}