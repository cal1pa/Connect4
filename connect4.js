// 7by7 grid
// user 1 uses +1
//user 2 uses -1
const prompt = require('prompt-sync')()

let gameGrid = [[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0], 
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]
]



function verify(gameGrid, wincomb){

    let combs = []
    const rows = 7;
    const columns = 7;

    // column combinations
    for(i=0; i<7; i++){
        for(j=0; j<4;j++){
            let comb = [];
            for(k=0; k<4; k++){
                comb.push(gameGrid[i][j+k])}
            combs.push(comb)}}

    // row combinations
    for(j=0; j<7; j++){
        for(i=0; i<4;i++){
            let comb = [];
            for(k=0; k<4; k++){
                comb.push(gameGrid[i+k][j])}
            combs.push(comb)}}

    // diagonal combinations left_rtght

    for(i=0; i < 6; i++){
        for(j= 0; j < 6; j++){
            let comb = []
            for(k=0; k<4; k++){
                try{
                    let value = gameGrid[i+k][j+k];
                    comb.push(value)}
                catch {break}}

            combs.push(comb)}}

// diagonal combinations right_left

    for(i=6; i >= 0; i--){
        for(j= 6; j >= 0; j--){
            let comb = []
            for(k=0; k<4; k++){
                try{
                    let value = gameGrid[i-k][j-k];
                    comb.push(value)}
                catch {break}}

            combs.push(comb)}}

// winner combination finder
    for(i=0; i<combs.length; i++){      
        if(JSON.stringify(combs[i]) === JSON.stringify(wincomb)){return true} 
}}



function graphics(){
    let symbols = {
        0:' ',
        1:'◉',
        2:'◎'
    }
    let graphicGrid = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0], [0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]
    
    for(i = 0; i < 7; i++){
        for(j = 0 ; j < 7; j++){
            console.log
            graphicGrid[j][i] = gameGrid[i][j]
        }
    }
    let header = "\n  0   1   2   3   4   5   6  \n|   |   |   |   |   |   |   |\n"
    let divider =  '+---+---+---+---+---+---+---+'

    console.log(header)
    console.log(divider)
    
    for(i=0; i<7; i++){
        a = graphicGrid[i].map(elem => symbols[elem] )
        console.log(`| ${a[0]} | ${a[1]} | ${a[2]} | ${a[3]} | ${a[4]} | ${a[5]} | ${a[6]} |`)
        console.log(divider)
    }
    console.log('\n')
}



function move(userSymbol, userInput){
    let symbol = userSymbol
    let column = userInput
    let placed = false
     
    for(i=6; i>=0;i--){
        if(gameGrid[column][i]==0){
            gameGrid[column][i] = symbol;
            placed = true
            break}}
    if(!placed){newInput = prompt('Column full, try again: '), move(symbol, newInput)}
}   



function game(){
    console.log('\n Welcome to connect 4\n')
    graphics()

    while (true){
        let user1Wins = [1,1,1,1]
        let user2Wins = [2,2,2,2]

        let user1 = prompt('User 1! Choose you column: ')
            move(1, user1)
            graphics()
            if(verify(gameGrid, user1Wins)){
                console.log("User1 Wins")
                return null} 

        let user2 = prompt('User 2! Choose you column: ')
            move(2, user2)
            graphics()
            if(verify(gameGrid, user2Wins)){
                console.log('User2 Wins')
                return null}}
}

game()