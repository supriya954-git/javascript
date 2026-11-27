function print(num){
    console.log("Welcome")
    for(let i=1;i<15;i++){
        if(num===i && i<5){
            continue;
        }
        if(i==num && i>=5 && i<10){
            break;
        }
        if(i==num && i>=10){
            return;
        }
        console.log(i)
    }
    console.log("Thank you!")
}

print(3)