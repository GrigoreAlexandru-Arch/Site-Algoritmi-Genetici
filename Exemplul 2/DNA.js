class DNA {
  constructor(newgenes,r,g,b) {
    this.maxforce = Number(document.getElementById("forta").value);	  
    if (newgenes) {
      this.genes = newgenes;
	  this.red=r;
	  this.green=g;
	  this.blue=b;
    } else {
	  this.red=random(0,255);
	  this.green=random(0,255);
	  this.blue=random(0,255);	  
      this.genes = [];      
      for (let i = 0; i < lifetime; i++) {
        let angle = random(TWO_PI);
        this.genes[i] = createVector(cos(angle), sin(angle));
        this.genes[i].mult(random(0, this.maxforce));
      }
    }    
    this.genes[0].normalize();
  }  
  crossover(partner) {
    let child = new Array(this.genes.length);
    let crossover = int(random(this.genes.length));    
    for (let i = 0; i < this.genes.length; i++) {
      if (i > crossover) child[i] = this.genes[i];
      else child[i] = partner.genes[i];
    }
    let newgenes = new DNA(child,this.red,this.green, this.blue);
    return newgenes;
  }

  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        let angle = random(TWO_PI);
        this.genes[i] = createVector(cos(angle), sin(angle));
        this.genes[i].mult(random(0, this.maxforce));               
        if (i == 0) this.genes[i].normalize();
      }
    }
  }
}