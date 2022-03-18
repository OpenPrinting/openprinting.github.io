#!/bin/sh
#
# Script to update the list of "driverless" printers...
#
# Copyright © 2022 by Michael R Sweet
#
# Needs curl and xargs...
#

# The "driverless.json" file is an array of JSON objects of the form:
#
# { "model":"Model Name", "airprt":"0/1", "ippeve":"0/1" }
#
# We use curl to get the current IPP Everywhere and AirPrint models, and
# generate a composite list of driverless printers.
#
# Should Mopria start publishing an updated printer list, we can include
# them, too...
AIRPRT="/tmp/airprint.json"
DRIVERLESS="assets/json/driverless.json"
IPPEVE="/tmp/ipp-everywhere.json"

if test $# = 0; then
	# Generate the driverless.json file...
	# IPP Everywhere list
	echo "Getting IPP Everywhere printer list..."
	curl -s https://www.pwg.org/printers/printers.json >$IPPEVE

	# AirPrint list (should be a superset of all)
	echo "Getting AirPrint printer list..."
	curl -s https://support.apple.com/en-ca/HT201311 | grep '^<li>' | grep -v '<li><' | sed -e '1,$s/<li>/"/g' -e '1,$s/<\/li>/"/g' >$AIRPRT

	# Loop through the AirPrint printers...
	echo "Generating driverless.json\c"
	echo "[{\"model\":\"_dummy_\"}\c" >$DRIVERLESS

	xargs -n 1 ./update-printer-list.sh <$AIRPRT

	# End of array...
	echo "" >>$DRIVERLESS
	echo "]" >>$DRIVERLESS

	echo "done."

	# Clean up...
	rm $AIRPRT
	rm $IPPEVE
else
	# Write a single printer entry using the model name on the command-line...
	echo ".\c"
	printer="$*"

	# See if the printer is in the IPP Everywhere list
	if grep -q "$printer" $IPPEVE; then
		ippeve="1"
	else
		ippeve="0"
	fi

	# Write the entry...
	echo "," >>$DRIVERLESS
	echo "{\"model\":\"$printer\",\"airprt\":\"1\",\"ippeve\":\"$ippeve\"}\c" >>$DRIVERLESS
fi
