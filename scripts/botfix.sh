#! /bin/bash
#Bash Script to (re)start ASBot

declare -A bots
bots=(["ASBot2.0"]='Documents/ASBot2.0')

#loop through all of the bots
for key in ${!bots[@]}; do
    
    #go to the correct directory
    echo "restarting bot" ${key} "in directory:" ${bots[${key}]}
    cd 
    cd ${bots[${key}]}
    #stop the bot and then restart it. 
    {

	pm2 stop ${key} 	
	cd Updater 
	node downloadFile.js
	java errorCheck 
	cd ..
	pm2 start app.js --name "${key}"

    } &> /dev/null 
    
done
echo "Done"





