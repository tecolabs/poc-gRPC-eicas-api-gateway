#!/bin/bash
# A Simple Shell Script To Compile the code .- 
# MyH-Devops@personal.com.ar  -
if [ $1 = "build" ]; then

    /usr/local/bin/npm install && /usr/local/bin/gulp &&

    tar -jcvf target/aei-eicas-utn-api-gateway.tar.bz2 dist/;

elif [ $1 = "package" ]; then
    /opt/apache-maven-3.5.3/bin/mvn deploy:deploy-file -DgroupId=aei-eicas -DartifactId=aei-eicas-utn-api-gateway -Dversion=$2 -DgeneratePom=true -Dpackaging=tar.bz2 -DrepositoryId=artifactory-utn -Durl=$3 -Dfile=/app/target/aei-eicas-utn-api-gateway.tar.bz2 -s settings.xml;

elif [ $1 = "prepare" ]; then

     echo BUILD_NUMBER $2 >> CHANGELOG.md;
fi
