#! /bin/bash

REGEX='(\S+$|^$)'
REGEX_OLD='(\S+$|^$)\(?!\z\)'

FOO=`echo $1 | sed -e "s/(\S+$|^$)\(?!\z\)/g"`



echo `echo $1` | sed -e "s|(\S+$|^$)\(?!\z\)||g"