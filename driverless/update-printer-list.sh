#!/bin/sh
#
# Script to update the list of "driverless" printers...
#
# DO NOT REMOVE THIS FILE FROM THE REPOSITORY, IT IS USED TO UPDATE THE
# DRIVERLESS PRINTERS PAGE DATA!
#
# Copyright © 2022-2026 by Michael R Sweet
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
DRIVERLESS="../public/assets/json/driverless.json"
TMPDRIVERLESS="/tmp/driverless.json"
IPPEVE="/tmp/ipp-everywhere.json"

# Apple now provides a search page that is backed by a REST API:
#
# https://mfi.apple.com/account/web/api/licensee/getAirprintSearchDetails?PARAMS
#
# Parameters:
#
# - "size": Number of entries to return (always pass 20000 to get them all)
# - "searchType": "BRAND", "CATEGORY", or "MODEL"
# - "page": The page number (always pass 0)
# - "searchTerm": Any search term (always pass "")
# - "keyword": Any keyword of interest (always pass "")
# - "technology": Any technology of interest (always pass "")
# - "category"
#   - "accessory_question_v4_pp_print_device_type_dye_sub" for dye-sub
#   - "accessory_question_v4_pp_print_device_type_ink_print" for inkjet
#   - "accessory_question_v4_pp_print_device_type_laser" for laser
#   - "accessory_question_v4_pp_print_device_type_usb_only" for USB-only
#   - "accessory_question_v4_pp_print_device_type_other" for label
APURL="https://mfi.apple.com/account/web/api/licensee/getAirprintSearchDetails?size=20000&searchType=CATEGORY&page=0&searchTerm=&keyword=&technology=&category=accessory_question_v4_pp_print_device_type_"

# Figure out where Python lives...
python=$(which python)
if test "x$python" = x; then
	python=$(which python3)
fi
if test "x$python" = x; then
	echo "Unable to find python on your system."
	exit 1
fi

# IPP Everywhere list
echo "Getting IPP Everywhere printer list..."
curl -s https://www.pwg.org/printers/printers.json >$IPPEVE

# Generate the driverless.json file...
echo "Generating driverless.json:"
echo "[{\"model\":\"_dummy_\"}\c" >$TMPDRIVERLESS

# AirPrint lists (should be a superset of all)
for category in dye_sub ink_print laser usb_only other; do
	echo "    ${category} printers..."
	curl -s "$APURL$category" >$AIRPRT
	$python ./convert-airprint.py $AIRPRT $IPPEVE >>$TMPDRIVERLESS
done

# End of array...
echo "" >>$TMPDRIVERLESS
echo "]" >>$TMPDRIVERLESS

# Add IPP Everywhere only printers...
echo "    IPP Everywhere only printers..."
$python ./add-ippeve-only.py $TMPDRIVERLESS $IPPEVE >$DRIVERLESS

# All done!
echo "Done."

# Clean up...
rm $AIRPRT
rm $IPPEVE
rm $TMPDRIVERLESS
