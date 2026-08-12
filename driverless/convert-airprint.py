#
# Code to convert Apple's AirPrint search API output to the format we use
# for the driverless search page.  We have to run this multiple times since
# the Apple API doesn't allow you to get all AirPrint printers in one go...
#
# Usage:
#
#   python[3] convert-airprint.py AIRPRINT.json IPPEVE.json >DRIVERLESS.json
#
# Copyright © 2026 by Michael R Sweet
#

import sys
import json

# Load the AirPrint and IPP Everywhere JSON files provided on the command-line...
with open(sys.argv[1], "r") as file:
    airprint = json.load(file)

with open(sys.argv[2], "r") as file:
    ippeve = json.load(file)

# Loop through the AirPrint printers and generate a driverless entry for each...
for printer in airprint["content"]:
    make_model = printer["brand"] + " " + printer["models"]

    # Determine whether this printer also supports IPP Everywhere...
    is_ippeve = 0
    for eveprinter in ippeve:
        if eveprinter["model"] == make_model or eveprinter["model"] == printer["models"]:
            is_ippeve = 1
            break

    # Save this entry...
    print(",\n{",end="")
    print(f"\"model\":\"{make_model}\",\"airprt\":\"1\",\"ippeve\":\"{is_ippeve}\"",end="")
    print("}",end="")
