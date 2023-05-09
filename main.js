// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (num, dnabases) => {
  return {
    specimenNum: num,
    dna: dnabases,
    mutate(){
      let x = Math.floor(Math.random()* this.dna.length);
      let randbase = this.dna[x];
      let newBase = returnRandBase();
      if(randbase === newBase){
        newBase = returnRandBase();
      }
      this.dna[x] = newBase;
      return this.dna;
    },
    compareDNA(pAequor){
      let identical = 0;
      for (let i = 0; i <= pAequor.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          identical++;
        }
      }
      console.log(((identical/pAequor.dna.length) * 100).toFixed(1));
    },
    willLikelySurvive(){
      let percentage = 0;
      for (let i = 0; i <= this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          percentage++;
        }
      }
      const survivalRate = ((percentage/this.dna.length) * 100).toFixed(1);
      console.log('survivalRate:',survivalRate)
      if(survivalRate >= 60){
        return true;
      }else{
        return false;
      }
    },
    complementStrand(){
      let compStrand = [];
      for (let i = 0; i <= this.dna.length; i++) {
        switch(this.dna[i]){
          case 'A':
            compStrand[i] = 'T';
            break;
          case 'T':
            compStrand[i] = 'A';
            break;
          case 'C':
            compStrand[i] = 'G';
            break;
          case 'G':
            compStrand[i] = 'C';
            break;
          default:
            break;
        }
      }
      return compStrand;
    }
  }
}



//test function
const pAequor = pAequorFactory(12, ['G', 'A', 'T','C','A','G','C']);

const dnasToSurvive = () => {
  let dnabases = [];
  while(dnabases.length < 30) {
    pAequor.mutate();
    const willSurvive = pAequor.willLikelySurvive();
    if(willSurvive === true){
      dnabases.push([...pAequor.dna]);
    }
  }   
  return dnabases;
}

console.log(dnasToSurvive());